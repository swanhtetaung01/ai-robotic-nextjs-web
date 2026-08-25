import Link from "next/link";
import { getDictionary, translator } from "@/lib/i18n/dictionary";
import { localePath, type Locale } from "@/lib/i18n/config";

/** Full-width quote call-to-action band, optionally pre-targeting a robot. */
export async function QuoteBand({
  locale,
  robotSlug,
  robotModel,
}: {
  locale: Locale;
  robotSlug?: string;
  robotModel?: string;
}) {
  const t = translator(await getDictionary(locale));
  const href = localePath(
    locale,
    robotSlug ? `/contact?robot=${robotSlug}` : "/contact"
  );
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 sm:py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="display text-3xl text-snow sm:text-4xl">
            {robotModel
              ? t("QUOTEBAND.heading_with_model", { model: robotModel })
              : t("QUOTEBAND.heading_generic")}
          </h2>
          <p className="mt-4 text-fog">{t("QUOTEBAND.body")}</p>
        </div>
        <Link
          href={href}
          className="group relative shrink-0 rounded-sm bg-amber px-8 py-4 text-ink transition-colors hover:bg-amber-hot"
        >
          <span className="stencil">{t("QUOTEBAND.cta")}</span>
          <span
            className="hazard-thin absolute -bottom-1.5 left-0 w-full scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
