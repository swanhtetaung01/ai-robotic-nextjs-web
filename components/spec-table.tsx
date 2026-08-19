"use client";

import { useState } from "react";
import type { SpecGroup } from "@/lib/robots";

/** Full specification table with a metric / imperial readout toggle.
 *  Values without an imperial variant are unit-independent. */
export function SpecTable({ groups }: { groups: SpecGroup[] }) {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="display text-2xl text-snow sm:text-3xl">
          Full specifications
        </h2>
        <div
          role="group"
          aria-label="Measurement units"
          className="flex rounded-sm border border-line font-mono text-xs"
        >
          {(["metric", "imperial"] as const).map((u) => (
            <button
              key={u}
              type="button"
              aria-pressed={units === u}
              onClick={() => setUnits(u)}
              className={`px-4 py-2.5 uppercase tracking-[0.1em] transition-colors ${
                units === u
                  ? "bg-amber text-ink"
                  : "text-fog hover:text-snow"
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.title}>
            <h3 className="stencil mb-3 flex items-center gap-2 text-amber">
              <span className="inline-block h-2 w-2 bg-amber" aria-hidden="true" />
              {group.title}
            </h3>
            <dl>
              {group.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-3"
                >
                  <dt className="text-sm text-fog">{spec.label}</dt>
                  <dd className="font-mono text-sm text-snow">
                    {units === "imperial" && spec.imperial
                      ? spec.imperial
                      : spec.metric}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
