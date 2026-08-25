export const locales = ["en", "th"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

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
