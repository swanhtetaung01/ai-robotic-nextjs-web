import type { Metadata } from "next";
import { references } from "@/lib/references";
import { ReferenceGallery } from "@/components/reference-gallery";
import { Reveal } from "@/components/reveal";
import { Eyebrow, QuoteBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "Reference",
  description:
    "Operators running AI Robotic machines on live sites — hospitals, resorts and facility management — in their own words.",
};

export default function ReferencePage() {
  return (
    <>
      <section className="border-b border-line bg-base">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:pt-20">
          <Reveal>
            <Eyebrow>Reference</Eyebrow>
            <h1 className="display mt-4 max-w-3xl text-4xl text-snow sm:text-5xl">
              Operators, in their own words
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-fog">
              Facility managers, EVS teams and operations directors running these
              machines on live floors — hospitals mid-shift, resorts during
              season, warehouses overnight. Quotes are reproduced as published.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="bg-base">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-6 lg:grid-cols-3">
            {references.map((ref, i) => (
              <Reveal key={ref.slug} delay={(i % 3) * 80} className="h-full">
                <figure className="flex h-full flex-col border border-line bg-surface p-7">
                  <p className="stencil text-amber">{ref.sector}</p>

                  <span
                    className="mt-4 font-mono text-3xl leading-none text-amber"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 flex-1 leading-relaxed text-cloud">
                    {ref.quote}
                  </blockquote>

                  {ref.outcome && (
                    <p className="mt-5 border-l-2 border-amber py-1 pl-3 font-mono text-xs text-snow">
                      {ref.outcome}
                    </p>
                  )}

                  <figcaption className="mt-6 border-t border-line pt-4">
                    <p className="text-sm font-semibold text-snow">{ref.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-fog">
                      {ref.role}
                      <br />
                      {ref.organisation} — {ref.location}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ReferenceGallery />

      <QuoteBand />
    </>
  );
}
