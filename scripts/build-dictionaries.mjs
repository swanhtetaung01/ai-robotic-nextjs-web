/* Turns the translator hand-off files in docs/translation/ into JSON
 * dictionaries. Run after a translation round-trip:
 *   node scripts/build-dictionaries.mjs
 * The .txt files stay the source of truth for translators; the JSON is
 * generated and should not be hand-edited. */
import { readFileSync, writeFileSync } from "node:fs";

function parse(path, line) {
  const out = {};
  let key = null;
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
    const m = raw.match(/^\[([^\]]+)\]$/);
    if (m) { key = m[1]; continue; }
    if (key && raw.startsWith(line)) { out[key] = raw.slice(line.length).trim(); key = null; }
  }
  return out;
}

const en = parse("docs/translation/website-copy-en.txt", "EN: ");
const th = parse("docs/translation/website-copy-th.txt", "TH: ");

const missing = Object.keys(en).filter((k) => !th[k]);
if (missing.length) {
  console.error(`${missing.length} key(s) untranslated:`);
  for (const k of missing.slice(0, 20)) console.error("  " + k);
  process.exitCode = 1;
}

for (const [loc, dict] of [["en", en], ["th", th]]) {
  const sorted = Object.fromEntries(Object.keys(dict).sort().map((k) => [k, dict[k]]));
  writeFileSync(`lib/i18n/dictionaries/${loc}.json`, JSON.stringify(sorted, null, 2) + "\n", "utf8");
  console.log(`${loc}.json  ${Object.keys(sorted).length} keys`);
}

/* ── Guard against silent fallbacks ───────────────────────────────────────
 * Thai layers over English, so a key the code asks for but the dictionary
 * lacks renders as English instead of failing. That is right for copy added
 * between translation rounds, but it also hides typos — a camelCase/lowercase
 * mismatch on `bestfor` and `pickif` shipped English robot descriptions to the
 * Thai site unnoticed. This asserts every key the robot overlay derives is
 * really present, so drift surfaces here rather than on the page. */
import { robots } from "../lib/robots.ts";

const specSlug = (label) => label.toLowerCase().replace(/[^a-z0-9]/g, "");
const expected = [];

for (const r of robots) {
  const p = `ROBOT.${r.slug}`;
  expected.push(
    `${p}.kind`, `${p}.tagline`, `${p}.pitch`,
    `${p}.bestfor`, `${p}.pickif`, `${p}.intro`
  );
  r.highlights.forEach((_, i) => expected.push(`${p}.highlight${i + 1}`));
  r.heroStats.forEach((_, i) => expected.push(`${p}.stat${i + 1}_label`));
  r.environments.forEach((_, i) => expected.push(`${p}.env${i + 1}`));
  r.features.forEach((f, i) => {
    expected.push(`${p}.f${i + 1}.eyebrow`, `${p}.f${i + 1}.title`, `${p}.f${i + 1}.body`);
    f.bullets?.forEach((_, j) => expected.push(`${p}.f${i + 1}.bullet${j + 1}`));
  });
  r.specGroups.forEach((g, i) => {
    expected.push(`${p}.specgroup${i + 1}_title`);
    g.specs.forEach((s) => {
      expected.push(`${p}.spec_${specSlug(s.label)}`);
      // A spec value with no digit in it is prose ("Detected", "Automatic")
      // and needs its own string; figures carry across locales unchanged.
      if (!/\d/.test(s.metric)) expected.push(`${p}.spec_${specSlug(s.label)}_value`);
    });
  });
}

/* Same trap, same shape: the reference overlay derives its prefix from each
 * customer's slug, so a file that spelled Aspirus Hospital's keys REF.aspirus.*
 * instead of REF.aspirushospital.* shipped an English testimonial to the Thai
 * page with nothing to show for it. */
import { references } from "../lib/references.ts";

for (const ref of references) {
  const p = `REF.${ref.slug.replace(/-/g, "")}`;
  expected.push(`${p}.quote`, `${p}.role`, `${p}.location`, `${p}.sector`);
  // Only some customers stated an outcome; the overlay skips the rest.
  if (ref.outcome) expected.push(`${p}.outcome`);
}

/* The FAQ derives its keys from an id list too, and translator() falls back to
 * the raw key — so a typo here doesn't render English, it renders
 * "HOME.faq.tops_q" on the home page. */
import { faqIds } from "../lib/faq.ts";

for (const id of faqIds) {
  expected.push(`HOME.faq.${id}_q`, `HOME.faq.${id}_a`);
}
expected.push("HOME.faq.eyebrow", "HOME.faq.heading");

const absent = [...new Set(expected)].filter((k) => !en[k]);
if (absent.length) {
  console.error(`\n${absent.length} key(s) the overlays need are absent from en.json:`);
  for (const k of absent.slice(0, 25)) console.error("  " + k);
  console.error("These would silently render English. Fix the key name or add the string.");
  process.exitCode = 1;
} else {
  console.log(`overlays: all ${new Set(expected).size} derived keys present`);
}
