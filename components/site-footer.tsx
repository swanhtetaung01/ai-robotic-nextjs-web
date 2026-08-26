import Link from "next/link";
import { Wordmark } from "@/components/logo";
import { localizeRobots } from "@/lib/i18n/localize-robots";
import { getDictionary, translator } from "@/lib/i18n/dictionary";
import { localePath, type Locale } from "@/lib/i18n/config";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const t = translator(dict);
  const robots = localizeRobots(dict, locale);

  return (
    <footer className="border-t border-line bg-base">
      <div className="hazard-thin" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Wordmark className="h-8 w-auto" />
          <p className="max-w-xs text-sm leading-relaxed text-fog">
            {t("FOOTER.tagline")}
          </p>
        </div>

        <div>
          <h2 className="stencil mb-4 text-amber">
            {t("FOOTER.col_fleet_heading")}
          </h2>
          <ul className="space-y-2.5 text-sm">
            {robots.map((r) => (
              <li key={r.slug}>
                <Link
                  href={localePath(locale, `/robots/${r.slug}`)}
                  className="text-fog transition-colors hover:text-snow"
                >
                  {r.model} — {r.kind}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="stencil mb-4 text-amber">
            {t("FOOTER.col_company_heading")}
          </h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href={localePath(locale, "/robots")} className="text-fog transition-colors hover:text-snow">
                {t("FOOTER.link_compare")}
              </Link>
            </li>
            <li>
              <Link href={`${localePath(locale)}#why`} className="text-fog transition-colors hover:text-snow">
                {t("FOOTER.link_why")}
              </Link>
            </li>
            <li>
              <Link href={localePath(locale, "/reference")} className="text-fog transition-colors hover:text-snow">
                {t("FOOTER.link_reference")}
              </Link>
            </li>
            <li>
              <Link href={localePath(locale, "/quote")} className="text-fog transition-colors hover:text-snow">
                {t("FOOTER.link_quote")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="stencil mb-4 text-amber">
            {t("FOOTER.col_contact_heading")}
          </h2>
          <p className="text-sm leading-relaxed text-fog">
            {t("FOOTER.contact_body")}
          </p>
          <Link
            href={localePath(locale, "/quote")}
            className="stencil mt-5 inline-block rounded-sm border border-amber px-4 py-2.5 text-amber transition-colors hover:bg-amber hover:text-ink"
          >
            {t("FOOTER.contact_cta")}
          </Link>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 font-mono text-xs text-fog">
          {t("FOOTER.copyright", { year: String(new Date().getFullYear()) })}
        </p>
      </div>
    </footer>
  );
}
