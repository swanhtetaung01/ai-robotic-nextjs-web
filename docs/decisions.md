# Decision log

Choices that look arbitrary from the code alone. **Check here before overriding one.**

Status: **Locked** = confirmed by the user, don't change without asking ·
**Working** = a judgement call, open to revision.

---

## Commercial

### D-001 · Sell everything as AI Robotics {#d-001}
**Locked · 2026-08-19** (revised from an earlier distributor framing)

Machines are branded, sold and supported as AI Robotics. Manufacturer names (Cenobots,
Agibot) stay in internal docs and out of customer-facing copy.

Earlier the site carried "Authorized Cenobots partner" in the hero eyebrow and footer;
that was removed. Model names (L3, L4, L50, C5, S5) are kept as-is.

**Consequence:** the testimonials section is headed "From the field, worldwide" with the
neutral subtitle "operator reports from live deployments of our robot platform" — the
quotes keep their real names and organizations, so nothing is fabricated, but they are
not claimed as AI Robotics's own customers.

---

### D-002 · Fleet is 5 machines; SP50 dropped {#d-002}
**Locked · 2026-08-19**

L3, L4, L50, C5, S5. The SP50 spot cleaner was removed — not sold. Its page, lineup card,
comparison column and quote-form entry are gone, and `/robots/sp50` correctly 404s.

**Do not re-add it** without being asked.

---

### D-003 · No prices on the site {#d-003}
**Locked · 2026-08-16**

Every CTA drives to the quote form. Reseller pricing exists in
[research/cenobots-research.md](research/cenobots-research.md) for **internal tier
positioning only — do not publish it**.

**Consequence:** any future ROI calculator must output savings and payback framing, never
a price, and must end in a quote request.

---

## Visual identity

### D-004 · Industrial Graphite + Safety Amber — deliberately anti-blue {#d-004}
**Locked · 2026-08-16**

Live CSS was extracted from every major competitor:

| Company | Dominant color |
|---|---|
| Cenobots | `#1257FA` electric blue |
| Pudu Robotics | `#0066FF` blue |
| Gausium | `#051AD0` deep blue on near-black |
| Tennant | `#007B9F` teal-blue |
| **Avidbots** | **`#00FF62` green — the only one that breaks out** |

Four of five are blue. Choosing blue means looking like a Cenobots clone and
disappearing into the category. Amber is native to the industrial world (hi-vis, warning
beacons, heavy equipment) rather than borrowed from consumer tech, and it's warm, which
softens the "robots replacing jobs" objection.

**This is the single most consequential design decision on the project. Do not drift
toward blue.**

---

### D-005 · Archivo expanded uppercase for display type {#d-005}
**Working · 2026-08-17**

Cenobots ships the **default OS font stack** with a `SimSun` fallback — no brand
typeface at all. Having any real typographic identity is an easy win.

Archivo at `font-stretch: 125%`, weight 800, uppercase reads like the badging stamped on
industrial equipment. IBM Plex Mono for all figures makes spec tables feel like
instrument readouts rather than marketing.

---

### D-006 · Hazard striping as the signature motif {#d-006}
**Working · 2026-08-17**

Diagonal amber/black bands lifted from warehouse floor marking. Used sparingly — section
seams, under the footer, under the quote CTA on hover. It's the one memorable element;
everything around it stays disciplined.

---

### D-007 · Homepage hero sandwiches the machine {#d-007}
**Locked · 2026-08-19**

The hero photo has the robot dead-centre. The original centred headline printed straight
over its face and read as clutter.

Now: **headline in the sky above the machine, subcopy and CTAs on the dark ground below
it**, with a flexible spacer reserving the middle of the viewport for the robot. The
overlay gradient is tuned to match — dark at top for headline contrast, near-transparent
through the middle so the machine stays vivid, solid at the base.

This is how the photo was composed to be used; the L50 dome banner does the same thing.

---

### D-008 · The spotlight animates real machine behaviour {#d-008}
**Working · 2026-08-18**

Cenobots' equivalent section is a robot on a bed of random constellation particles.
Ours is a **scanner stage**: a LiDAR sweep beam crosses the machine, spec callouts ping
in like radar contacts anchored to the real parts they describe, and the robot's own
amber beacon breathes.

**Principle: no decorative confetti. If it moves, it should be something the robot does.**

Point-cloud positions are hard-coded rather than random so server and client markup
match — don't introduce `Math.random()` there.

---

### D-009 · Favicon uses the triangle mark, not the full lockup {#d-009}
**Working · 2026-08-19**

The client asked for the stacked lockup (then `AI-ROBOTIC-QUAD.png`, now
`AI-ROBOTICS-02.png`) in the browser bar. Its
internals measure: mark 2260×2002, wordmark only 405 px tall. Scaled to a 32 px tab, that
wordmark renders **3.7 pixels tall** — an unreadable smear that also shrinks the mark to
nothing.

So: `app/icon.png` is the **triangle mark alone** (crisp at tab sizes, and it's the mark
printed on the robots); `app/apple-icon.png` is the **full lockup** at 180 px where it
reads perfectly, flattened on white because iOS blackens transparency.

**Open:** the navy mark is a little dark against Chrome's dark-theme tab strip. A white
mark on a graphite tile was offered as an alternative; the user hasn't chosen.

---

## Engineering

### D-010 · Never invent a specification {#d-010}
**Locked**

If a manufacturer doesn't publish a figure, the spec row shows `—`. Agibot publishes no
physical dimensions, travel speed or passage width for the C5, so those are blank rather
than estimated.

Buyers compare these numbers against competitors and procurement documents. A plausible
guess is worse than an honest gap.

---

### D-011 · One template renders every product page {#d-011}
**Working · 2026-08-17**

`app/robots/[slug]/page.tsx` renders all 5 machines from `lib/robots.ts` +
`lib/robot-images.ts`. Adding a robot is a data edit.

Page rhythm is controlled by data, not props: features **with** an `imageKey` render as
light image/text sections, features **without** render as dark statement columns. This
avoids the boolean-prop sprawl that a per-robot page variant would create.

**Caveat:** the comparison table in `app/robots/page.tsx` is hand-maintained and does
*not* auto-update — add the new slug to every row.

---

### D-012 · Missing photography degrades gracefully {#d-012}
**Working · 2026-08-17**

Every image field is optional. Cards without a `product` image show a
"Photography in progress" placeholder; robots without `scenes` fall back to text
environment chips; robots without a `hero` render on the plain graphite ground.

This let all 5 machines ship with full pages while photos arrived in batches.

---

### D-013 · Portrait feature images are detected, not configured {#d-013}
**Working · 2026-08-19**

Feature images stretch to the full column width, which is right for landscape shots but
turned the C5's portrait workstation cutout (349×660) into a >1000 px tower.

Rather than hard-code a size, the template reads each image's intrinsic dimensions and
renders taller-than-wide images centred at a capped height on a soft panel. Handles any
future portrait photo with no config.
