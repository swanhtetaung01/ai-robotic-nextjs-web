# Translation workflow

The site ships in English (`/en`) and Thai (`/th`).

## Files

| File | Role |
|---|---|
| `website-copy-en.txt` | **Source of truth for English.** Every visible string, keyed. |
| `website-copy-th.txt` | The same file with Thai on the `TH:` lines. |
| `../../lib/i18n/dictionaries/*.json` | **Generated — do not hand-edit.** |

## Round-trip

1. Add or change a string in `website-copy-en.txt`, keeping the `[KEY]` /
   `EN:` / `TH:` shape. Use the same key in the code via `t("KEY")`.
2. Send `website-copy-en.txt` to the translator; they fill the `TH:` lines.
3. Save their reply over `website-copy-th.txt`.
4. Rebuild the dictionaries:

   ```
   node scripts/build-dictionaries.mjs
   ```

   It exits non-zero and names any key that is still untranslated.

## Untranslated strings do not break the page

Thai is layered over English, so a key that exists in `en` but not `th`
renders in **English** rather than showing a raw key or an empty gap. That
makes a missed string visible without making the page look broken — which is
how the machine-finder section was caught after the first round-trip.

## Units

Thai copy is metric throughout, because that is what the market uses. This is
enforced in two places, not just in the prose:

- `lib/i18n/config.ts` → `localeUnits` marks `th` as metric.
- `lib/i18n/localize-robots.ts` swaps the imperial headline figures for their
  metric equivalents and drops the imperial column from spec tables, so the
  metric/imperial toggle does not appear on Thai pages.

If you add a robot whose headline stat is in ft²/h, add its metric equivalent
to `METRIC_HEROSTATS` or the Thai page will contradict its own prose.

## What is deliberately not translated

Brand name, model names (L3, L4, L50, C5, S5), technology names (NVIDIA,
LiDAR, TOPS, TeamClean, WS3, WT3, CWS), units, figures, URLs and email
addresses. Customer names and organisations stay in Latin script; their
roles, locations and sectors are translated.
