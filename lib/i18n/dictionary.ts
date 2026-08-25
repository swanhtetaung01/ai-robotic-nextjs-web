import "server-only";
import { defaultLocale, type Locale } from "./config";

/* Generated from docs/translation/*.txt by scripts/build-dictionaries.mjs. */
const files = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  th: () => import("./dictionaries/th.json").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Record<string, string>>>;

export type Dictionary = Record<string, string>;

/** A non-default locale is layered over English, so a key added to the site
 *  but not yet translated renders as readable English instead of a raw key or
 *  an empty gap. Copy written after a translation round-trip is the normal
 *  cause; see docs/translation/README.md. */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const base = await files[defaultLocale]();
  if (locale === defaultLocale) return base;
  return { ...base, ...(await files[locale]()) };
}

export function translator(dict: Dictionary) {
  return function t(key: string, vars?: Record<string, string>): string {
    let value = dict[key] ?? key;
    if (vars) {
      for (const [name, replacement] of Object.entries(vars)) {
        value = value.replaceAll(`{${name}}`, replacement);
      }
    }
    return value;
  };
}

export type T = ReturnType<typeof translator>;
