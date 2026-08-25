import Link from "next/link";
import { Eyebrow } from "@/components/ui";
import { getDictionary, translator } from "@/lib/i18n/dictionary";
import { defaultLocale, localePath } from "@/lib/i18n/config";

/* not-found cannot read route params, so it renders in the default locale.
   A Thai visitor hitting a bad URL sees English here; acceptable for a 404. */
export default async function NotFound() {
  const t = translator(await getDictionary(defaultLocale));
  return (
    <section className="flex min-h-[60svh] items-center bg-base">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Eyebrow>{t("404.eyebrow")}</Eyebrow>
        <h1 className="display mt-4 text-4xl text-snow sm:text-5xl">
          {t("404.heading")}
        </h1>
        <p className="mt-5 max-w-md leading-relaxed text-fog">
          {t("404.body")}
        </p>
        <Link
          href={localePath(defaultLocale, "/robots")}
          className="stencil mt-8 inline-block rounded-sm bg-amber px-7 py-4 text-ink transition-colors hover:bg-amber-hot"
        >
          {t("404.cta")}
        </Link>
      </div>
    </section>
  );
}
