import { visibleRobots, type Robot, type Spec } from "@/lib/robots";
import type { Dictionary } from "./dictionary";
import { localeUnits, type Locale } from "./config";

/* The English robot data in lib/robots.ts stays the single structural source:
 * slugs, numbers, image keys and ordering all live there. Translations are an
 * overlay applied by key, so the two can never drift out of shape — a missing
 * Thai string falls back to the English one rather than collapsing a field.
 *
 * Key scheme mirrors docs/translation/website-copy-*.txt, e.g.
 *   ROBOT.l3.tagline
 *   ROBOT.l3.f2.bullet1
 *   ROBOT.l3.spec_passagewidth        (a spec's label)
 *   ROBOT.l3.spec_voicecontrol_value  (a spec's non-numeric value)
 */

/** "Max productivity" -> "maxproductivity", matching the generated keys. */
function specSlug(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** True when a spec value is prose rather than a figure, so it needs
 *  translating (e.g. "Detected", "Automatic") — numbers never do. */
function isProseValue(value: string) {
  return !/\d/.test(value);
}

function localizeSpec(
  spec: Spec,
  slug: string,
  dict: Dictionary,
  units: "metric" | "imperial"
): Spec {
  const base = `ROBOT.${slug}.spec_${specSlug(spec.label)}`;
  const label = dict[base] ?? spec.label;

  // spec.metric already holds the metric figure in both locales; only prose
  // values ("Detected", "Automatic") need translating. Thai drops the
  // imperial alternate entirely — that market has no use for the toggle.
  const value = isProseValue(spec.metric)
    ? dict[`${base}_value`] ?? spec.metric
    : spec.metric;

  return {
    label,
    metric: value,
    imperial: units === "metric" ? undefined : spec.imperial,
  };
}

export function localizeRobots(dict: Dictionary, locale: Locale): Robot[] {
  const units = localeUnits[locale];

  return visibleRobots.map((robot) => {
    const p = `ROBOT.${robot.slug}`;
    const pick = (key: string, fallback: string) => dict[`${p}.${key}`] ?? fallback;

    return {
      ...robot,
      kind: pick("kind", robot.kind),
      tagline: pick("tagline", robot.tagline),
      pitch: pick("pitch", robot.pitch),
      bestFor: pick("bestfor", robot.bestFor),
      pickIf: pick("pickif", robot.pickIf),
      intro: pick("intro", robot.intro),

      highlights: robot.highlights.map((h, i) => pick(`highlight${i + 1}`, h)),

      heroStats: robot.heroStats.map((stat, i) => ({
        ...statForUnits(stat, units),
        label: pick(`stat${i + 1}_label`, stat.label),
      })),

      features: robot.features.map((feature, i) => {
        const f = `${p}.f${i + 1}`;
        return {
          ...feature,
          eyebrow: dict[`${f}.eyebrow`] ?? feature.eyebrow,
          title: dict[`${f}.title`] ?? feature.title,
          body: dict[`${f}.body`] ?? feature.body,
          bullets: feature.bullets?.map(
            (b, j) => dict[`${f}.bullet${j + 1}`] ?? b
          ),
        };
      }),

      specGroups: robot.specGroups.map((group, i) => ({
        title: dict[`${p}.specgroup${i + 1}_title`] ?? group.title,
        specs: group.specs.map((s) => localizeSpec(s, robot.slug, dict, units)),
      })),

      environments: robot.environments.map((e, i) => pick(`env${i + 1}`, e)),
    };
  });
}

/* ── Units ────────────────────────────────────────────────────────────────
 * Headline stats are authored in whichever unit reads best in English, which
 * left a mix: most are imperial (ft²/h) but the C5's are already metric. Thai
 * copy converts everything to metric, so a Thai page showing "27,000 ft²/h"
 * beside prose saying "2,500 ตร.ม./h" would contradict itself. This maps the
 * imperial headline figures onto their metric equivalents, taken from the
 * same spec tables in lib/robots.ts rather than recomputed here. */
const METRIC_HEROSTATS: Record<string, { value: string; unit: string }> = {
  "21,674|ft²/h": { value: "2,016", unit: "m²/h" },
  "20,925|ft²/h": { value: "1,944", unit: "m²/h" },
  "23,713|ft²/h": { value: "2,203", unit: "m²/h" },
  "27,000|ft²/h": { value: "~2,500", unit: "m²/h" },
  "167,379|ft²/h": { value: "15,550", unit: "m²/h" },
};

function statForUnits(
  stat: { value: string; unit: string; label: string },
  units: "metric" | "imperial"
) {
  if (units !== "metric") return stat;
  const swap = METRIC_HEROSTATS[`${stat.value}|${stat.unit}`];
  return swap ? { ...stat, ...swap } : stat;
}
