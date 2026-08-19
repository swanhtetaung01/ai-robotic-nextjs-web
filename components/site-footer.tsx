import Link from "next/link";
import { Wordmark } from "@/components/logo";
import { robots } from "@/lib/robots";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-base">
      <div className="hazard-thin" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Wordmark compact />
          <p className="max-w-xs text-sm leading-relaxed text-fog">
            Autonomous cleaning robots for facilities that can&rsquo;t afford a
            missed night. Every machine is configured, delivered and supported
            by AI Robotic.
          </p>
        </div>

        <div>
          <h2 className="stencil mb-4 text-amber">The fleet</h2>
          <ul className="space-y-2.5 text-sm">
            {robots.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/robots/${r.slug}`}
                  className="text-fog transition-colors hover:text-snow"
                >
                  {r.model} — {r.kind}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="stencil mb-4 text-amber">Company</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/robots" className="text-fog transition-colors hover:text-snow">
                Compare models
              </Link>
            </li>
            <li>
              <Link href="/#why" className="text-fog transition-colors hover:text-snow">
                Why autonomous
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-fog transition-colors hover:text-snow">
                Request a quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="stencil mb-4 text-amber">Talk to us</h2>
          <p className="text-sm leading-relaxed text-fog">
            Tell us about your facility and we&rsquo;ll match a robot to it —
            usually within one business day.
          </p>
          <Link
            href="/contact"
            className="stencil mt-5 inline-block rounded-sm border border-amber px-4 py-2.5 text-amber transition-colors hover:bg-amber hover:text-ink"
          >
            Get a quote
          </Link>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 font-mono text-xs text-fog">
          © {new Date().getFullYear()} AI Robotic. All robot specifications are
          manufacturer figures.
        </p>
      </div>
    </footer>
  );
}
