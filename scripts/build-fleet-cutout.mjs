/* Builds one machine's cutout for the home-page fleet line and the machine
 * finder, from a front-facing render with a transparent background:
 *
 *   node scripts/build-fleet-cutout.mjs l50 public/robots/l50/l50-front.png
 *
 * The fleet line stands every machine at one uniform height and aligns them
 * on their wheels (see components/hero-fleet.tsx), which only works because
 * these files are trimmed so the image edge *is* the machine's edge. Any
 * transparent margin left in the file reads as the machine floating.
 *
 * sharp's .trim() keys off the top-left pixel and gave up on these renders —
 * faint shadow pixels reach the border — so the alpha bounding box is walked
 * directly instead, at a threshold that ignores that haze.
 */
import sharp from "sharp";
import { existsSync, readFileSync, renameSync } from "node:fs";

/* Third argument overrides the destination, for cutouts that are not the
 * fleet line — a hero foreground has the same requirement, that the image
 * edge be the machine edge, so the layout can size it predictably. */
const [slug, source, dest] = process.argv.slice(2);
if (!slug || !source) {
  console.error("usage: node scripts/build-fleet-cutout.mjs <slug> <source.png> [dest]");
  process.exit(1);
}
if (!existsSync(source)) {
  console.error(`no such file: ${source}`);
  process.exit(1);
}

/** Alpha below this is treated as empty — drop shadows fade out well under it. */
const ALPHA_FLOOR = 16;

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: w, height: h, channels: c } = info;
let x0 = w, y0 = h, x1 = -1, y1 = -1;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (data[(y * w + x) * c + 3] <= ALPHA_FLOOR) continue;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
}

if (x1 < 0) {
  console.error("the source is fully transparent — is it the right file?");
  process.exit(1);
}

const out = dest ?? `public/robots/fleet/${slug}.webp`;
const before = existsSync(out) ? await sharp(readFileSync(out)).metadata() : null;

// Never upscale: these renders are the only resolution we have.
// Written beside the target and moved into place — sharp cannot write a path
// it has already opened for reading, which is what `before` above just did.
const tmp = `${out}.tmp`;
await sharp(source)
  .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 })
  [out.endsWith(".png") ? "png" : "webp"]({ quality: 92, compressionLevel: 9 })
  .toFile(tmp);
renameSync(tmp, out);

const after = await sharp(out).metadata();
const aspect = (m) => (m.width / m.height).toFixed(3);
console.log(`source   ${w}x${h}  (ink ${x1 - x0 + 1}x${y1 - y0 + 1})`);
if (before) console.log(`was      ${before.width}x${before.height}  aspect ${aspect(before)}`);
console.log(`now      ${after.width}x${after.height}  aspect ${aspect(after)}   → ${out}`);
