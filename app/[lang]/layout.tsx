import type { Metadata } from "next";
import SiteDocument from "@/app/site-document";
import { isRouteLang, ROUTE_LANGS } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  keywords:
    "wiza Polska, zezwolenie na pobyt, karta stałego pobytu, doradztwo wizowe, migracja do Polski",
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return ROUTE_LANGS.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = isRouteLang(rawLang) ? rawLang : "en";

  return <SiteDocument lang={lang}>{children}</SiteDocument>;
}
