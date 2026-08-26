export const locales = ["en", "th"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Where a visitor with no saved preference lands.
 *
 *  Deliberately separate from `defaultLocale`, which is the dictionary&apos;s
 *  fallback layer: English stays the base every other locale layers over, so
 *  a key added between translation rounds renders readable English rather
 *  than a gap. Changing that would flip the fallback direction. This constant
 *  only decides which language the site opens in. */
export const landingLocale: Locale = "th";

/** Shown in the language switcher, in the language itself. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  th: "ไทย",
};

/** Thailand is the market, so Thai copy carries metric figures throughout.
 *  The English site keeps imperial, which is what its source specs use. */
export const localeUnits: Record<Locale, "metric" | "imperial"> = {
  en: "imperial",
  th: "metric",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Build a locale-prefixed href. Every route lives under /[lang], so links
 *  must carry the locale or the Proxy will bounce them through a redirect. */
export function localePath(locale: Locale, path = "/") {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
