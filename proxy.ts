import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

/* Next 16 renamed Middleware to Proxy; the behaviour is unchanged.
 *
 * Every page lives under /[lang], so a request for /robots has to be sent
 * somewhere. We honour an explicit choice first (the cookie the switcher
 * sets), then the browser's Accept-Language, then fall back to English. */

const COOKIE = "locale";

function preferredLocale(request: NextRequest) {
  const chosen = request.cookies.get(COOKIE)?.value;
  if (chosen && locales.includes(chosen as (typeof locales)[number])) {
    return chosen;
  }

  // Accept-Language: "th,en-US;q=0.9" — first supported tag wins.
  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase();
    const base = tag.split("-")[0];
    const hit = locales.find((l) => l === tag || l === base);
    if (hit) return hit;
  }

  return defaultLocale;
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
