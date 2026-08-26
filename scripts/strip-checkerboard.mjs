/* The SP50 renders arrived with the transparency checkerboard flattened into
 * the pixels — 3-channel RGB, no alpha, background alternating ~254 and ~232
 * grey. Dropped onto the graphite site they would show as a light checkered
 * slab behind each machine.
 *
 * Keying purely by colour would punch holes in the robot: its brushed-metal
 * highlights hit the same values as the checker. Instead this flood-fills
 * inward from the border, so only background reachable from the edge is
 * cleared and enclosed highlights are left alone. Edge pixels get partial
 * alpha to avoid a hard, aliased outline.
 */
import sharp from "sharp";

const FILES = process.argv.slice(2);
if (FILES.length === 0) {
  console.error("usage: node scripts/strip-checkerboard.mjs <file.png> [more.png ...]");
  process.exit(1);
}

/** Checker background: light, and near-neutral in hue. */
function isBackground(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return min > 212 && max - min < 14;
}

for (const path of FILES) {
  const name = path.split("/").pop();
  const { data, info } = await sharp(path)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels: c } = info;
  const out = Buffer.from(data);
  const seen = new Uint8Array(w * h);
  const stack = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = y * w + x;
    if (seen[p]) return;
    seen[p] = 1;
    stack.push(p);
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  let cleared = 0;
  while (stack.length) {
    const p = stack.pop();
    const i = p * c;
    if (!isBackground(data[i], data[i + 1], data[i + 2])) continue;
    out[i + 3] = 0;
    cleared++;
    const x = p % w;
    const y = (p - x) / w;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  // Soften the boundary: a still-opaque pixel touching cleared space keeps a
  // partial alpha, so the cutout does not read as a hard sticker edge.
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = (y * w + x) * c;
      if (out[i + 3] === 0) continue;
      const near =
        out[(y * w + x + 1) * c + 3] === 0 ||
        out[(y * w + x - 1) * c + 3] === 0 ||
        out[((y + 1) * w + x) * c + 3] === 0 ||
        out[((y - 1) * w + x) * c + 3] === 0;
      if (near && isBackground(out[i], out[i + 1], out[i + 2])) out[i + 3] = 90;
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(path.replace(/\.png$/, ".tmp.png"));

  const pct = ((cleared / (w * h)) * 100).toFixed(1);
  console.log(`${name.padEnd(26)} ${w}x${h}  cleared ${pct}% to transparent`);
}
