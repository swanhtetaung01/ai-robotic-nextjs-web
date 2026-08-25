"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/logo";
import { localePath, locales, localeNames, type Locale } from "@/lib/i18n/config";

export type NavStrings = {
  fleet: string;
  why: string;
  reference: string;
  contact: string;
  quote: string;
  openMenu: string;
  closeMenu: string;
};

/** Swaps the locale segment of the current path, so switching language keeps
 *  you on the page you were reading instead of dumping you at the home page. */
function swapLocale(pathname: string, next: Locale) {
  const rest = pathname.replace(/^\/(en|th)(?=\/|$)/, "");
  return localePath(next, rest || "/");
}

export function SiteHeader({
  locale,
  nav,
}: {
  locale: Locale;
  nav: NavStrings;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the sheet on navigation
  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { href: localePath(locale, "/robots"), label: nav.fleet },
    { href: `${localePath(locale)}#why`, label: nav.why },
    { href: localePath(locale, "/reference"), label: nav.reference },
    { href: localePath(locale, "/contact"), label: nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href={localePath(locale)} className="shrink-0">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="stencil text-fog transition-colors hover:text-snow"
            >
              {item.label}
            </Link>
          ))}

          <LocaleSwitcher locale={locale} pathname={pathname} />

          <Link
            href={localePath(locale, "/contact")}
            className="stencil rounded-sm bg-amber px-4 py-2.5 text-ink transition-colors hover:bg-amber-hot"
          >
            {nav.quote}
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-snow md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? nav.closeMenu : nav.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-line bg-base px-5 pb-6 pt-3 md:hidden"
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="stencil block border-b border-line py-4 text-fog"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-b border-line py-4">
            <LocaleSwitcher locale={locale} pathname={pathname} />
          </div>
          <Link
            href={localePath(locale, "/contact")}
            className="stencil mt-5 block rounded-sm bg-amber px-4 py-3.5 text-center text-ink"
          >
            {nav.quote}
          </Link>
        </nav>
      )}
    </header>
  );
}

/** Remembers the choice in a cookie so the Proxy honours it on the next
 *  bare-path visit rather than re-guessing from Accept-Language. */
function LocaleSwitcher({
  locale,
  pathname,
}: {
  locale: Locale;
  pathname: string;
}) {
  return (
    <div className="flex items-center gap-px border border-line" role="group" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={swapLocale(pathname, l)}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          onClick={() => {
            document.cookie = `locale=${l};path=/;max-age=31536000;samesite=lax`;
          }}
          className={`px-2.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] transition-colors ${
            l === locale
              ? "bg-amber text-ink"
              : "bg-surface text-fog hover:text-snow"
          }`}
        >
          {l === "th" ? localeNames.th : l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
