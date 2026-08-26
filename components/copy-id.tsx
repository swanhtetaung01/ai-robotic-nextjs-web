"use client";

import { useEffect, useState } from "react";

/** Click-to-copy for a short value like a LINE id — the thing a visitor on a
 *  phone would otherwise have to select by hand.
 *
 *  The value stays real, selectable text inside the button, so if the
 *  Clipboard API is unavailable (it needs a secure context, and a browser can
 *  refuse it) the visitor can still select and copy it the usual way. */
export function CopyId({
  value,
  hint,
  copied: copiedLabel,
  ariaLabel,
}: {
  value: string;
  /** resting hint, e.g. "Tap to copy" */
  hint: string;
  /** confirmation, e.g. "Copied" */
  copied: string;
  /** full instruction for screen readers, e.g. "Copy LINE ID @raaspal" */
  ariaLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  // Clear the confirmation on a timer, cancelled on unmount so a click just
  // before navigation can't set state on a gone component.
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Refused or unavailable — the id is still selectable above.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={ariaLabel}
      className="group flex w-full items-center justify-between gap-4 border border-line bg-raise px-4 py-3 text-left transition-colors hover:border-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
    >
      <span className="font-mono text-lg text-snow">{value}</span>
      <span
        className={`stencil shrink-0 transition-colors ${
          copied ? "text-amber" : "text-fog group-hover:text-amber"
        }`}
      >
        {copied ? copiedLabel : hint}
      </span>
      {/* Announced to screen readers only when it changes. */}
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </button>
  );
}
