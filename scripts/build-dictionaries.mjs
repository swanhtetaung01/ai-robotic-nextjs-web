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
