/* Builds the social preview card:
 *   node scripts/build-og-image.mjs
 *
 * Written to public/og-card.png and referenced explicitly from the layout
 * metadata.
 *
 * Not the app/opengraph-image convention: the root layout lives under
 * app/[lang], so the generated route came out as /-/opengraph-image.png with
 * the dynamic segment unresolved — a URL that 404s for the crawler, which
 * means no picture at all. A file in public/ has one fixed URL that always
 * resolves.
 *
 * 1200x630 is the size LINE, Facebook, Slack and X all crop to. It carries
 * no words beyond the wordmark: the title and description come from the page
 * metadata and render as real text beside the image, so baking a headline in
 * would only duplicate it — and at the thumbnail size a chat list shows,
 * small type is unreadable anyway.
 */
import sharp from "sharp";

const W = 1200;
const H = 630;

/* The signature plate: an empty aisle at night, floor freshly scrubbed.
 * Cropped from the right, where the depth is. */
const plate = await sharp("public/robots/shared/home-hero-warehouse.webp")
  .resize(W, H, { fit: "cover", position: "right" })
  .toBuffer();

/* Darkened so the white wordmark holds against it, heaviest on the left
 * where the mark sits — the same left-to-right scrim the page heroes use. */
const scrim = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const t = x / (W - 1);
    const alpha = 0.88 - 0.4 * t; // 0.88 at the left edge, 0.48 at the right
    const i = (y * W + x) * 4;
    scrim[i] = 18;
    scrim[i + 1] = 20;
    scrim[i + 2] = 26;
    scrim[i + 3] = Math.round(alpha * 255);
  }
}

const wordmark = await sharp("public/brand/wordmark-white.png")
  .resize({ width: 460 })
  .toBuffer();
const wm = await sharp(wordmark).metadata();

/* The machine, right of centre, standing on the aisle floor. */
const robot = await sharp("public/robots/l50/l50-front.png")
  .resize({ height: 470 })
  .toBuffer();
const rb = await sharp(robot).metadata();

/* Safety-amber rule under the wordmark — the site's one accent, and the
 * detail that makes the card read as ours rather than a stock photo. */
const rule = await sharp({
  create: { width: 96, height: 5, channels: 4, background: { r: 255, g: 154, b: 31, alpha: 1 } },
}).png().toBuffer();

await sharp(plate)
  .composite([
    { input: scrim, raw: { width: W, height: H, channels: 4 } },
    { input: wordmark, left: 80, top: Math.round(H / 2 - wm.height / 2 - 40) },
    { input: rule, left: 80, top: Math.round(H / 2 - wm.height / 2 + wm.height + 4) },
    // Sits on the bottom edge: the render's own base is the machine's base.
    { input: robot, left: W - rb.width - 90, top: H - rb.height },
  ])
  .png({ compressionLevel: 9 })
  .toFile("public/og-card.png");

const out = await sharp("public/og-card.png").metadata();
console.log(`public/og-card.png  ${out.width}x${out.height}`);
