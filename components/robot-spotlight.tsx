"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Robot } from "@/lib/robots";
import { Eyebrow } from "@/components/ui";

export type SpotlightCallout = {
  /** anchor position, % of the robot image box */
  x: number;
  y: number;
  /** which side the label chip sits on */
  side: "left" | "right";
  label: string;
  value: string;
};

/* Fixed point-cloud: deterministic positions so server and client agree. */
const POINTS: ReadonlyArray<{ x: number; y: number; d: number; hot?: boolean }> = [
  { x: 8, y: 18, d: 0.0 }, { x: 14, y: 62, d: 1.1 }, { x: 6, y: 44, d: 2.3 },
  { x: 12, y: 82, d: 0.6 }, { x: 20, y: 30, d: 1.8, hot: true }, { x: 26, y: 10, d: 0.9 },
  { x: 88, y: 24, d: 1.4 }, { x: 93, y: 48, d: 0.3, hot: true }, { x: 86, y: 70, d: 2.0 },
  { x: 94, y: 86, d: 1.2 }, { x: 80, y: 8, d: 2.6 }, { x: 74, y: 90, d: 0.2 },
  { x: 30, y: 92, d: 1.6 }, { x: 60, y: 94, d: 2.2 }, { x: 44, y: 6, d: 1.9 },
  { x: 68, y: 14, d: 0.4 }, { x: 4, y: 70, d: 2.8, hot: true }, { x: 96, y: 12, d: 1.7 },
  { x: 10, y: 6, d: 2.1 }, { x: 90, y: 60, d: 0.8 }, { x: 24, y: 74, d: 2.5 },
  { x: 78, y: 40, d: 1.0 },
];

function CalloutTag({
  callout,
  index,
  still,
}: {
  callout: SpotlightCallout;
  index: number;
  still: boolean;
}) {
  const left = callout.side === "left";
  return (
    <motion.div
      className={`absolute z-20 hidden items-center sm:flex ${
        left ? "flex-row-reverse" : ""
      }`}
      style={{
        left: `${callout.x}%`,
        top: `${callout.y}%`,
        transform: left ? "translate(-100%, -50%)" : "translateY(-50%)",
      }}
      initial={still ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.5 + index * 0.25, duration: 0.5 }}
    >
      {/* contact dot */}
      <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
        <span className="absolute h-full w-full rounded-full bg-amber/80" />
        {!still && (
          <motion.span
            className="absolute h-full w-full rounded-full bg-amber"
            animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: index * 0.5 }}
          />
        )}
      </span>
      {/* leader line */}
      <span className="h-px w-10 bg-amber/50 lg:w-16" aria-hidden="true" />
      {/* readout chip */}
      <span
        className={`border border-line bg-base/90 px-3 py-2 backdrop-blur-sm ${
          left ? "text-right" : ""
        }`}
      >
        <span className="block font-mono text-sm font-semibold tabular-nums text-snow">
          {callout.value}
        </span>
        <span className="block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fog">
          {callout.label}
        </span>
      </span>
    </motion.div>
  );
}

/** Animated robot showcase: a LiDAR-style sweep passes over the machine while
 *  spec callouts ping in like radar contacts. Everything animated is something
 *  the robot actually does — no decorative confetti. */
export function RobotSpotlight({
  robot,
  image,
  beacon,
  callouts,
  index = 1,
  total = 5,
}: {
  robot: Robot;
  image: StaticImageData;
  /** amber beacon position, % of the robot image box */
  beacon: { x: number; y: number };
  callouts: SpotlightCallout[];
  index?: number;
  total?: number;
}) {
  const still = useReducedMotion() ?? false;

  return (
    <section aria-labelledby="spotlight-title" className="border-b border-line bg-base">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr]">
        {/* ── Copy ── */}
        <motion.div
          initial={still ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>Fleet spotlight</Eyebrow>
          <h2 id="spotlight-title" className="display mt-5 text-6xl text-snow sm:text-7xl">
            {robot.model}
          </h2>
          <p className="display mt-2 max-w-md text-2xl text-amber sm:text-3xl">
            {robot.tagline}
          </p>
          <p className="mt-6 max-w-md leading-relaxed text-fog">{robot.pitch}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href={`/robots/${robot.slug}`}
              className="stencil rounded-sm bg-amber px-7 py-4 text-ink transition-colors hover:bg-amber-hot"
            >
              View the {robot.model}
            </Link>
            <Link
              href={`/contact?robot=${robot.slug}`}
              className="stencil rounded-sm border border-snow/40 px-7 py-4 text-snow transition-colors hover:border-snow hover:bg-snow/10"
            >
              Get a quote
            </Link>
          </div>
        </motion.div>

        {/* ── Scanner stage ── */}
        <div className="relative">
          <div className="grid-plate relative overflow-hidden border border-line bg-surface">
            {/* viewfinder corners */}
            {(["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"] as const).map((pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`absolute z-20 h-4 w-4 border-amber/70 ${pos}`}
              />
            ))}

            {/* fleet position readout */}
            <p className="absolute right-5 top-4 z-20 font-mono text-xs tabular-nums text-fog">
              <span className="text-amber">{String(index).padStart(2, "0")}</span>
              {" / "}
              {String(total).padStart(2, "0")}
            </p>

            {/* point cloud */}
            {POINTS.map((p, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className={`absolute z-0 h-1 w-1 rounded-full ${p.hot ? "bg-amber" : "bg-fog"}`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                animate={still ? { opacity: 0.3 } : { opacity: [0.08, 0.55, 0.08] }}
                transition={
                  still
                    ? undefined
                    : { duration: 3 + (i % 5) * 0.7, delay: p.d, repeat: Infinity, ease: "easeInOut" }
                }
              />
            ))}

            {/* sweep beam */}
            {!still && (
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-4 z-10 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--color-amber) 20%, var(--color-amber) 80%, transparent)",
                  boxShadow: "0 0 18px 2px rgba(255, 154, 31, 0.35)",
                }}
                animate={{ top: ["7%", "90%", "7%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* the machine + anchored overlays */}
            <div className="relative mx-auto my-10 w-[62%] max-w-xs sm:my-12">
              <motion.div
                initial={still ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Image
                  src={image}
                  alt={`${robot.model} ${robot.kind}, front three-quarter view`}
                  className="relative z-[5] h-auto w-full"
                  sizes="(min-width: 1024px) 340px, 62vw"
                />
              </motion.div>

              {/* beacon glow — the robot's real amber beacon, breathing */}
              <motion.span
                aria-hidden="true"
                className="absolute z-[6] h-6 w-6 rounded-full bg-amber blur-md"
                style={{
                  left: `${beacon.x}%`,
                  top: `${beacon.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={still ? { opacity: 0.5 } : { opacity: [0.15, 0.7, 0.15], scale: [0.9, 1.15, 0.9] }}
                transition={still ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />

              {callouts.map((c, i) => (
                <CalloutTag key={c.label} callout={c} index={i} still={still} />
              ))}
            </div>
          </div>

          {/* mobile fallback for the hidden callouts */}
          <dl className="mt-4 grid grid-cols-3 gap-px border border-line bg-line sm:hidden">
            {callouts.map((c) => (
              <div key={c.label} className="bg-surface p-3">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-fog">
                  {c.label}
                </dt>
                <dd className="mt-1 font-mono text-sm font-semibold tabular-nums text-snow">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
