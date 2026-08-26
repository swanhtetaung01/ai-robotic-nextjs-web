import { NextResponse, type NextRequest } from "next/server";
import { landingLocale, locales } from "@/lib/i18n/config";

/* Next 16 renamed Middleware to Proxy; the behaviour is unchanged.
 *
 * Every page lives under /[lang], so a request for /robots has to be sent
 * somewhere. We honour an explicit choice first (the year-long cookie the
 * switcher sets) and otherwise open in Thai.
 *
 * Accept-Language is deliberately not consulted. Plenty of Thai buyers run
 * their phone or laptop in English, so matching on it sent a large part of
 * the target market to the wrong language. Anyone who wants English is one
 * click away in the header, and that choice sticks. */

const COOKIE = "locale";

function preferredLocale(request: NextRequest) {
  const chosen = request.cookies.get(COOKIE)?.value;
  if (chosen && locales.includes(chosen as (typeof locales)[number])) {
    return chosen;
  }

  return landingLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  /* Skip Next internals and anything with a file extension, so the icons,
   * sitemap.xml and robots.txt keep serving from the root unprefixed. */
  matcher: ["/((?!_next|.*\\.).*)"],
};
