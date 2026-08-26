import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export type FaqItem = { q: string; a: string };

/** Home-page FAQ. Built on native <details>, so it opens without JavaScript,
 *  is keyboard-operable for free, and the answers stay in the page for search
 *  engines and in-page find rather than being mounted on click. */
export function Faq({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: FaqItem[];
}) {
  return (
    <section className="border-t border-line bg-base">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="display mt-4 max-w-2xl text-3xl sm:text-4xl">
            {heading}
          </h2>
        </Reveal>

        {/* Answers are prose, so the column is capped near a comfortable
            measure rather than running the full six-column width. */}
        <div className="mt-10 max-w-3xl border-t border-line">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i, 4) * 60}>
              <details className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left font-medium text-snow transition-colors hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  {/* + rotates into × when the answer is open */}
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 font-mono text-lg leading-none text-amber transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-sm leading-relaxed text-fog">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** FAQPage structured data. Google renders these answers directly in search
 *  results, which is most of the reason a home-page FAQ earns its space.
 *  Content is our own dictionary copy, never user input; `<` is still escaped
 *  so a future answer containing markup can't close the script tag early. */
export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
