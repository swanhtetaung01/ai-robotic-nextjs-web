import Link from "next/link";
import type { HeroStat } from "@/lib/robots";

/** Floor-marking style section label: amber tick + stencil text. */
export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`stencil flex items-center gap-2.5 ${
        tone === "dark" ? "text-amber" : "text-amber-deep"
      }`}
    >
      <span className="inline-block h-2 w-2 bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Instrument-style stat readout. */
export function StatTile({
  stat,
  tone = "dark",
}: {
  stat: HeroStat;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`border-l-2 py-1 pl-4 ${dark ? "border-amber" : "border-amber-deep"}`}
    >
      <p
        className={`font-mono text-2xl font-semibold tabular-nums sm:text-3xl ${
          dark ? "text-snow" : "text-ink"
        }`}
      >
        {stat.value}
        <span className={`ml-1 text-sm font-normal ${dark ? "text-fog" : "text-ink-soft"}`}>
          {stat.unit}
        </span>
      </p>
      <p className={`mt-1 text-xs uppercase tracking-[0.08em] ${dark ? "text-fog" : "text-ink-soft"}`}>
        {stat.label}
      </p>
    </div>
  );
}

/** Full-width quote call-to-action band, optionally pre-targeting a robot. */
export function QuoteBand({
  robotSlug,
  robotModel,
}: {
  robotSlug?: string;
  robotModel?: string;
}) {
  const href = robotSlug ? `/contact?robot=${robotSlug}` : "/contact";
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 sm:py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="display text-3xl text-snow sm:text-4xl">
            {robotModel
              ? `Put the ${robotModel} on your floor.`
              : "Put a robot on your floor."}
          </h2>
          <p className="mt-4 text-fog">
            Tell us about your facility — square footage, floor type, operating
            hours — and we&rsquo;ll come back with a recommendation and a
            quotation, usually within one business day.
          </p>
        </div>
        <Link
          href={href}
          className="group relative shrink-0 rounded-sm bg-amber px-8 py-4 text-ink transition-colors hover:bg-amber-hot"
        >
          <span className="stencil">Request a quote</span>
          <span
            className="hazard-thin absolute -bottom-1.5 left-0 w-full scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
