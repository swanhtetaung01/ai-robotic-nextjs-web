export function LogoMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {/* Triangle mark echoing the badge on the machines */}
      <path d="M16 3 30 29H2L16 3Z" fill="currentColor" />
      <path d="M16 12 23.5 26h-15L16 12Z" fill="var(--color-base)" />
      <path d="M16 18.5 19.8 26h-7.6L16 18.5Z" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className="h-6 w-6 text-amber" />
      <span className="display text-[1.05rem] tracking-[0.08em] text-snow">
        AI&nbsp;Robotic
      </span>
      {!compact && (
        <span className="sr-only">AI Robotic — autonomous cleaning robots</span>
      )}
    </span>
  );
}
