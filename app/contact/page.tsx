import type { Metadata } from "next";
import { getRobot } from "@/lib/robots";
import { Eyebrow } from "@/components/ui";
import { QuoteForm } from "./quote-form";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Tell us about your facility and get a quotation for the AI Robotic autonomous cleaning fleet — usually within one business day.",
};

const steps = [
  {
    title: "Tell us about the floor",
    body: "Square footage, floor type, operating hours — thirty seconds of form.",
  },
  {
    title: "Get a recommendation",
    body: "We match a machine (or a fleet) to your facility and send a quotation.",
  },
  {
    title: "See it on your floor",
    body: "We arrange a live demo in your building before you commit to anything.",
  },
] as const;

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const sp = await searchParams;
  const robotParam = typeof sp.robot === "string" ? sp.robot : undefined;
  const robot = robotParam ? getRobot(robotParam) : undefined;

  return (
    <section className="bg-base">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow>Request a quote</Eyebrow>
          <h1 className="display mt-4 text-4xl text-snow sm:text-5xl">
            {robot ? `Quote for the ${robot.model}` : "Let’s spec your floor"}
          </h1>
          <p className="mt-6 leading-relaxed text-fog">
            {robot
              ? `Good choice — the ${robot.model} is ${robot.pitch.charAt(0).toLowerCase()}${robot.pitch.slice(1)} Fill in your details and we’ll quote it for your facility.`
              : "Not sure which machine fits? That’s fine — describe the building and we’ll do the matching. No pricing games, no obligation."}
          </p>

          <ol className="mt-10 space-y-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  className="stencil flex h-9 w-9 shrink-0 items-center justify-center border border-amber text-amber"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-snow">{step.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-fog">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative">
          <QuoteForm preselect={robot?.slug} />
        </div>
      </div>
    </section>
  );
}
