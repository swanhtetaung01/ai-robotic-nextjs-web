"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/logo";

const nav = [
  { href: "/robots", label: "The fleet" },
  { href: "/#why", label: "Why autonomous" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the sheet on navigation
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="AI Robotic home" className="shrink-0">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="stencil text-fog transition-colors hover:text-snow"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="stencil rounded-sm bg-amber px-4 py-2.5 text-ink transition-colors hover:bg-amber-hot"
          >
            Request a quote
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-snow md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
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
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="stencil block border-b border-line py-4 text-fog"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="stencil mt-5 block rounded-sm bg-amber px-4 py-3.5 text-center text-ink"
          >
            Request a quote
          </Link>
        </nav>
      )}
    </header>
  );
}
