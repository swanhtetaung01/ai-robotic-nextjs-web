import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Sans_Thai } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/site";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary, translator } from "@/lib/i18n/dictionary";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/* IBM Plex Sans carries no Thai glyphs. Plex Sans Thai is the same family
 * drawn for the Thai script, so /th reads as the same design as /en rather
 * than as a different site — which is what a generic Thai fallback gave us. */
const plexThai = IBM_Plex_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = translator(await getDictionary(lang));

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("META.site_title_default"),
      template: t("META.site_title_template", { page: "%s" }),
    },
    description: t("META.site_description"),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        th: "/th",
        "x-default": "/th",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const t = translator(await getDictionary(locale));

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      data-locale={locale}
      className={`${plexSans.variable} ${plexMono.variable} ${plexThai.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader
          locale={locale}
          nav={{
            fleet: t("NAV.fleet"),
            why: t("NAV.why"),
            reference: t("NAV.reference"),
            contact: t("NAV.contact"),
            quote: t("NAV.quote_cta"),
            openMenu: t("NAV.menu_open"),
            closeMenu: t("NAV.menu_close"),
          }}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
