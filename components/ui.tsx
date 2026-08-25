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
