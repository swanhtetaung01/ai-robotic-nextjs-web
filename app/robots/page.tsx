import type { Metadata } from "next";
import Link from "next/link";
import { robots } from "@/lib/robots";
import { RobotCard } from "@/components/robot-card";
import { Reveal } from "@/components/reveal";
import { Eyebrow, QuoteBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "The fleet",
  description:
    "Compare the AI Robotic fleet: L3 and L4 autonomous scrubbers, the L50 industrial workhorse, the C5 3-in-1 cleaning machine and the S5 industrial sweeper.",
};

/** slug → row value */
type CompareRow = { label: string; values: Record<string, string> };

const compareRows: CompareRow[] = [
  {
    label: "Job",
    values: {
      l3: "Scrub · tight spaces",
      l4: "Scrub · retail & hospitality",
      l50: "Scrub · warehouse scale",
      c5: "Sweep + scrub + mop",
      s5: "Sweep · dry debris",
    },
  },
  {
    label: "Max productivity",
    values: {
      l3: "21,674 ft²/h",
      l4: "20,925 ft²/h",
      l50: "23,713 ft²/h",
      c5: "21,313 ft²/h",
      s5: "27,000 ft²/h",
    },
  },
  {
    label: "Passage width",
    values: {
      l3: "700 mm / 27.6 in",
      l4: "810 mm / 31.9 in",
      l50: "—",
      c5: "—",
      s5: "—",
    },
  },
  {
    label: "Tank / hopper",
    values: {
      l3: "25 L solution",
      l4: "38 L solution",
      l50: "55 L solution",
      c5: "90 L solution",
      s5: "50 L hopper",
    },
  },
  {
    label: "AI compute",
    values: {
      l3: "100 TOPS",
      l4: "32 TOPS",
      l50: "NVIDIA AI",
      c5: "Laser-vision fusion",
      s5: "100 TOPS",
    },
  },
  {
    label: "LiDAR",
    values: {
      l3: "96-beam 3D",
      l4: "32-beam 3D",
      l50: "150 m range",
      c5: "Laser + vision fusion",
      s5: "32-beam 3D",
    },
  },
  {
    label: "Runtime",
    values: {
      l3: "Extended (WT3)",
      l4: "24/7 with dock",
      l50: "Up to 6 h",
      c5: "3 h scrubbing",
      s5: "2 h fast charge",
    },
  },
  {
    label: "Best for",
    values: {
      l3: "Hospitals, schools",
      l4: "Retail, hotels",
      l50: "Warehouses, logistics",
      c5: "Malls, airports, factories",
      s5: "Industry, garages",
    },
  },
];

export default function FleetPage() {
  return (
    <>
      <section className="border-b border-line bg-base">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:pt-20">
          <Reveal>
            <Eyebrow>The fleet</Eyebrow>
            <h1 className="display mt-4 max-w-3xl text-4xl text-snow sm:text-5xl">
              Wet or dry. Tight or vast. Covered.
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-fog">
              Two compact scrubbers for occupied buildings, an industrial
              workhorse for warehouse floors, a 3-in-1 machine that sweeps,
              scrubs and mops in one pass, and a fleet-capable dry sweeper —
              all reporting to the same AI Robotic app.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-base">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {robots.map((robot, i) => (
              <Reveal key={robot.slug} delay={(i % 3) * 80} className="h-full">
                <RobotCard robot={robot} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table ─────────────────────────────────── */}
      <section className="border-t border-line bg-base">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <Eyebrow>Side by side</Eyebrow>
            <h2 className="display mt-4 text-3xl text-snow sm:text-4xl">
              Pick the machine for your floor
            </h2>
          </Reveal>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="sr-only">Specification</th>
                  {robots.map((r) => (
                    <th
                      key={r.slug}
                      scope="col"
                      className="border-b-2 border-amber px-4 pb-4 text-left"
                    >
                      <Link
                        href={`/robots/${r.slug}`}
                        className="display text-lg text-snow hover:text-amber"
                      >
                        {r.model}
                      </Link>
                      <p className="mt-1 font-sans text-xs font-normal normal-case tracking-normal text-fog">
                        {r.kind}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label} className="border-b border-line">
                    <th
                      scope="row"
                      className="stencil py-4 pr-4 text-left align-top text-fog"
                    >
                      {row.label}
                    </th>
                    {robots.map((r) => (
                      <td
                        key={r.slug}
                        className="px-4 py-4 align-top font-mono text-xs text-cloud"
                      >
                        {row.values[r.slug]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th className="sr-only" scope="row">
                    Actions
                  </th>
                  {robots.map((r) => (
                    <td key={r.slug} className="px-4 py-5 align-top">
                      <Link
                        href={`/contact?robot=${r.slug}`}
                        className="stencil text-amber hover:text-amber-hot"
                      >
                        Get a quote →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
