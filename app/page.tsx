import Image from "next/image";
import Link from "next/link";
import { getRobot, robots } from "@/lib/robots";
import { homeHero, robotImages } from "@/lib/robot-images";
import { RobotCard } from "@/components/robot-card";
import { RobotSpotlight } from "@/components/robot-spotlight";
import { HeroFleet } from "@/components/hero-fleet";
import { Reveal } from "@/components/reveal";
import { Eyebrow, QuoteBand } from "@/components/ui";

const proof = [
  { value: "$0.008", unit: "/ft²", label: "cleaning cost — 5–7× below manual labor" },
  { value: "50", unit: "%", label: "typical labor cost reduction" },
  { value: "9–12", unit: "mo", label: "payback on large open floors" },
  { value: "62", unit: "dB", label: "quiet enough for open trading hours" },
] as const;

const verticals = [
  "Healthcare",
  "Warehousing",
  "Retail",
  "Hospitality",
  "Education",
  "Transportation",
] as const;

const testimonials = [
  {
    quote:
      "600,000 square feet of carpet cleaned automatically. We anticipate saving tons of money.",
    name: "Jeff Heugli",
    role: "CEO, Beacon Hill — Detroit, MI",
  },
  {
    quote:
      "The bots are making a huge difference in our hospital cleanliness. Our staff now focus on deep scrubbing, stripping and waxing.",
    name: "Brindy Literski",
    role: "Environmental Services, Aspirus Hospital — Wausau, WI",
  },
  {
    quote:
      "A game-changer for maintaining high cleaning standards in high-traffic areas. An invaluable investment.",
    name: "David Harris",
    role: "EVS Manager, University Health System — Austin, TX",
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-ink">
        <Image
          src={homeHero}
          alt="A distribution-centre aisle at night with the AI Robotic fleet at work, its floor freshly scrubbed and reflecting the overhead worklights"
          preload
          quality={92}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_38%] sm:object-center"
          sizes="100vw"
        />
        {/* Minimal scrim — only enough to keep the headline and CTAs legible.
            The plate itself is left unfiltered. */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,11,14,0.55) 0%, rgba(10,11,14,0.12) 24%, rgba(10,11,14,0) 46%, rgba(18,20,26,0.62) 78%, var(--color-base) 100%)",
          }}
          aria-hidden="true"
        />
        <HeroFleet />
        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-6xl flex-col items-center justify-between px-5 pb-10 pt-16 text-center sm:pt-20">
          {/* headline in the sky, above the machine */}
          <div>
            <p className="stencil text-amber">
              AI Robotic · Autonomous cleaning fleet
            </p>
            <h1 className="display mx-auto mt-5 max-w-2xl text-4xl text-snow sm:text-5xl lg:text-6xl">
              The night shift that never calls in sick
            </h1>
          </div>

          {/* lets the aisle and its vanishing point breathe */}
          <div className="min-h-[14svh] flex-1" aria-hidden="true" />

          {/* subcopy and actions on the ground, below the machine */}
          <div className="max-w-2xl">
            <p className="mx-auto max-w-xl text-base leading-relaxed text-cloud sm:text-lg">
              Autonomous floor-cleaning robots for hospitals, warehouses,
              retail and schools — machines that map your building, plan their
              own routes, and clean every night to the same standard.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/robots"
                className="stencil rounded-sm bg-amber px-7 py-4 text-ink transition-colors hover:bg-amber-hot"
              >
                Explore the fleet
              </Link>
              <Link
                href="/contact"
                className="stencil rounded-sm border border-snow/40 px-7 py-4 text-snow transition-colors hover:border-snow hover:bg-snow/10"
              >
                Request a quote
              </Link>
            </div>
            <p className="stencil mt-9 animate-pulse text-fog" aria-hidden="true">
              ▼ Scroll
            </p>
          </div>
        </div>
      </section>

      {/* ── Fleet spotlight: animated L3 scanner stage ───────── */}
      <RobotSpotlight
        robot={getRobot("l3")!}
        image={robotImages.l3.product!}
        beacon={{ x: 55, y: 10 }}
        callouts={[
          { x: 80, y: 9, side: "right", value: "96-beam", label: "3D LiDAR array" },
          { x: 10, y: 46, side: "left", value: "700 mm", label: "Passage width" },
          { x: 55, y: 91, side: "right", value: "18 kg", label: "Brush pressure" },
        ]}
        index={1}
        total={5}
      />

      {/* ── Proof band ───────────────────────────────────────── */}
      <section id="why" className="scroll-mt-16 border-y border-line bg-base">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Reveal>
            <Eyebrow>Why autonomous</Eyebrow>
            <h2 className="display mt-4 max-w-2xl text-3xl text-snow sm:text-4xl">
              The math your CFO will do anyway
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {proof.map((p, i) => (
              <Reveal key={p.label} delay={i * 80} className="bg-surface p-6">
                <p className="font-mono text-3xl font-semibold tabular-nums text-amber">
                  {p.value}
                  <span className="ml-1 text-base text-fog">{p.unit}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fog">{p.label}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fog">
            One deployed scrubber has logged 345+ autonomous hours a month — the
            working hours of two full-time staff — while floor maps guarantee
            identical coverage every night, independent of turnover, sickness
            and fatigue.
          </p>
        </div>
      </section>

      {/* ── Fleet lineup ─────────────────────────────────────── */}
      <section className="bg-base">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>The fleet</Eyebrow>
              <h2 className="display mt-4 text-3xl text-snow sm:text-4xl">
                Five machines. Every floor covered.
              </h2>
            </div>
            <Link href="/robots" className="stencil text-amber hover:text-amber-hot">
              Compare all models →
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {robots.map((robot, i) => (
              <Reveal key={robot.slug} delay={(i % 3) * 80} className="h-full">
                <RobotCard robot={robot} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Verticals ────────────────────────────────────────── */}
      <section className="border-y border-line bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Reveal>
            <Eyebrow tone="light">Where they work</Eyebrow>
            <h2 className="display mt-4 max-w-2xl text-3xl sm:text-4xl">
              Built for buildings that never really close
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden border border-cloud bg-cloud sm:grid-cols-3">
            {verticals.map((v, i) => (
              <Reveal key={v} delay={i * 60} className="bg-paper">
                <div className="flex items-center justify-between p-6">
                  <span className="display text-lg">{v}</span>
                  <span className="font-mono text-xs text-ink-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="bg-base">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Reveal>
            <Eyebrow>Field reports</Eyebrow>
            <h2 className="display mt-4 text-3xl text-snow sm:text-4xl">
              From the field, worldwide
            </h2>
            <p className="mt-3 max-w-xl text-sm text-fog">
              Operator reports from live deployments of our robot platform.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <figure className="flex h-full flex-col border border-line bg-surface p-7">
                  <span className="font-mono text-3xl text-amber" aria-hidden="true">
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-cloud">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4">
                    <p className="text-sm font-semibold text-snow">{t.name}</p>
                    <p className="mt-1 text-xs text-fog">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
