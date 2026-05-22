import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LegalPageContent from "@/components/sections/LegalPageContent";
import content from "@/content";
import { isRouteLang, ROUTE_LANGS } from "@/lib/i18n";
import { localizedPath, pageAlternates, titled } from "@/lib/seo";

export function generateStaticParams() {
  return ROUTE_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = isRouteLang(rawLang) ? rawLang : "en";
  const page = content[lang].legal_pages.polityka_prywatnosci;

  return {
    title: titled(page.title),
    description: page.subtitle,
    alternates: {
      ...pageAlternates("/polityka-prywatnosci"),
      canonical: localizedPath(lang, "/polityka-prywatnosci"),
    },
  };
}

export default function LocalizedPolitykaPrywatnosciPage() {
  return (
    <>
      <Navbar />
      <LegalPageContent pageKey="polityka_prywatnosci" />
      <Footer />
    </>
  );
}
