# Build history

What was built when, and what was tried and rejected. Newest last.

---

## 2026-08-16 · Research and direction

Researched cenobots.com, its five products, reseller listings and five competitors.
Findings captured in [research/cenobots-research.md](research/cenobots-research.md).

Key findings that shaped everything after:

- **The category is a sea of blue** — 4 of 5 major competitors use blue as their primary.
  Led to [D-004](decisions.md#d-004).
- **Cenobots ships no brand typeface** — default OS font stack with a `SimSun` fallback,
  two near-identical blues, five unrelated corner radii. Led to [D-005](decisions.md#d-005).
- **No ROI calculator exists anywhere in the category**, despite every vendor's ROI claims
  living in blog prose. Still the biggest unexploited conversion gap.
- Sales figures worth leading with: ~$0.008/ft² (5–7× cheaper than manual labor),
  ~50% labor reduction, 9–12 month payback, 62 dB, 345+ autonomous hrs/month.

**Decisions taken:** graphite + amber palette, distributor framing (later revised by
[D-001](decisions.md#d-001)), quote-only pricing.

---

## 2026-08-17 · Foundation and the L3

Built the design system (`app/globals.css` `@theme` tokens, Archivo/Plex typography,
hazard-stripe motifs) and every page: homepage, `/robots` with comparison table, the
shared product template, and the `/contact` quote form with a server action.

All five machines shipped with full written pages from research data. Only the L3 had
photography — the rest showed "Photography in progress" placeholders
([D-012](decisions.md#d-012)).

Also established: metric/imperial unit toggle on spec tables, quote form pre-selecting a
machine via `?robot=<slug>`.

---

## 2026-08-18 · The animated spotlight

Client asked for something in the spirit of Cenobots' animated product carousel, but
distinct from it.

**Rejected:** the constellation-particle treatment they use — decorative and generic.
**Built instead:** the scanner stage ([D-008](decisions.md#d-008)) — LiDAR sweep beam,
radar-contact spec callouts anchored to real machine parts, breathing amber beacon.

Added **motion v13** (`motion/react`). No framer-motion skill existed locally or in the
searchable registry, so the API was verified against motion.dev's official LLM docs.

---

## 2026-08-19 · Fleet completion, branding, C5

A dense session. Four distinct pieces of work:

### Photos for L4, L50, S5 + SP50 removed
All three received full photo-rich pages. Template gained three capabilities:
`heroClass` (crop bias — the L50 dome banner has baked-in stats that clashed with our
stat band), `heroForeground` (transparent cutout composited over a background-only
banner, for the S5), and `scenes` (in-situ gallery replacing text chips, L50 only).

SP50 excised throughout ([D-002](decisions.md#d-002)). Copy rebranded to sell as
AI Robotics ([D-001](decisions.md#d-001)).

*Flagged, unresolved:* `l50-console.jpg` shows CenoBots branding on the robot's
touchscreen UI.

### Homepage hero redesign
The centred headline was printing over the robot's face. Rebuilt as a sandwich
([D-007](decisions.md#d-007)).

### Real brand logos
Client supplied three lockups. Generated trimmed derivatives and both favicons with
sharp ([D-009](decisions.md#d-009)); replaced the placeholder SVG wordmark in the header
and footer with the real white lockup; deleted the create-next-app favicon.

*Learned the hard way:* sharp applies `.extend()` after `.resize()` regardless of chain
order — first attempt produced 738×996 and 806×1622 instead of 512² and 180².

### C5 added
The Agibot C5 joined as the fifth machine. **It is not a humanoid** despite Agibot's
humanoid reputation — checking the reference link first avoided writing an entire page on
a false premise. It's a 3-in-1 sweep/scrub/mop machine, the largest tank in the fleet
(90 L) and the only one that self-cleans its sewage tank.

Physical dimensions, speed and passage width left blank per [D-010](decisions.md#d-010).

### Two layout fixes
Lineup cards weren't filling their grid cells, so shorter copy produced shorter boxes —
fixed, with a two-line tagline slot so descriptions share a baseline. Portrait feature
images were rendering >1000 px tall — fixed by automatic detection
([D-013](decisions.md#d-013)).

---

## Ideas raised but not built

Worth revisiting — each was researched or scoped, none is started.

| Idea | Why it matters |
|---|---|
| **ROI / payback calculator** | Enter facility sq ft, cleaning hours, labor rate → monthly savings and payback. No competitor has one. Biggest conversion gap in the category. |
| **Robot finder** | 3 questions (space type, floor area, wet or dry) → recommended model. Turns 5 confusing SKUs into one answer. |
| **Cycling spotlight** | The homepage spotlight is props-driven and shows `01 / 05`. The S5 cutout also has an amber beacon, so cycling the fleet is a small extension. |
| **`/solutions/[industry]` pages** | Planned in the original architecture, never built. Retail, healthcare, hospitality, education, warehouse, transport. |
| **`/about` and `/technology` pages** | Also in the original architecture. Header nav currently has no link to either. |
| **L4 desert-night photo** | Unused and striking — a natural spotlight stage if the section starts cycling. |
| **`.gitattributes`** | Would silence the constant `LF will be replaced by CRLF` warnings. |
