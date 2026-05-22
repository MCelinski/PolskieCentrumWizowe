import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import KonsultacjeContent from "@/components/sections/KonsultacjeContent";
import content from "@/content";
import { isRouteLang, ROUTE_LANGS } from "@/lib/i18n";
import { localizedPath, pageAlternates, titled } from "@/lib/seo";

export function generateStaticParams() {
  return ROUTE_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = isRouteLang(rawLang) ? rawLang : "en";
  const page = content[lang].consultations;

  return {
    title: titled(page.hero.headline),
    description: page.hero.subheadline,
    alternates: {
      ...pageAlternates("/konsultacje"),
      canonical: localizedPath(lang, "/konsultacje"),
    },
  };
}

export default function LocalizedKonsultacjePage() {
  return (
    <>
      <Navbar />
      <KonsultacjeContent />
      <Footer />
    </>
  );
}
