# Robot image drop

Put robot photos here. One folder per model. Any of these can be skipped — the build will
use placeholders for anything missing and swap them in later.

```
public/robots/
  l3/    l4/    l50/    sp50/    s5/     shared/
public/brand/          ← logo, favicon source
```

## What to drop in each model folder

Name files exactly like this so the build picks them up automatically:

| Filename | What it is | Priority |
|---|---|---|
| `hero.png` | Main product shot, **transparent or plain white background**, robot facing 3/4 left | ★ essential |
| `front.png` | Straight-on front view | nice to have |
| `side.png` | Side profile — shows the passage-width story | nice to have |
| `detail-1.png` | Close-up: brush head, squeegee, LiDAR dome, or touchscreen | nice to have |
| `in-situ-1.jpg` | Robot working in a real space (warehouse, hospital corridor, retail aisle) | ★ high value |
| `in-situ-2.jpg` | Second environment shot | nice to have |
| `workstation.png` | Charging dock / workstation accessory, if any | optional |

## Guidance

- **Highest resolution you have.** Next.js downscales automatically; it cannot upscale.
  2000px+ on the long edge is ideal.
- **PNG with transparency** for product shots — lets us place robots on the graphite
  background cleanly. JPG is fine for in-situ environment photos.
- **In-situ photos matter most.** A robot working in a real hospital corridor sells
  harder than any studio render. If you only supply one type, supply these.
- Video (`.mp4`) is welcome for the homepage hero — drop as `shared/hero.mp4`, ideally a
  short silent loop under ~8 seconds.

## `shared/` folder

For anything not tied to one model: lineup group shots, fleet photos, the homepage hero
video, environment/vertical imagery (retail, healthcare, hospitality, education,
warehouse, transportation).

## `brand/` folder

- `logo.svg` — AI Robotic logo, vector preferred. If you only have raster, supply the
  largest PNG with transparency.
- `logo-mark.svg` — icon-only version for the favicon and mobile header, if one exists.

If no logo exists yet, say so — a wordmark can be set in the brand typeface as a
starting point.
