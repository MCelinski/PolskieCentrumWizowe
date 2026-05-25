import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import KonsultacjeContent from "@/components/sections/KonsultacjeContent";
import content from "@/content";
import { isRouteLang, ROUTE_LANGS } from "@/lib/i18n";
import { localizedPath, OG_IMAGE_URL, pageAlternates, titled } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return ROUTE_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = isRouteLang(rawLang) ? rawLang : "en";
  const page = content[lang].consultations;

  const title = titled(page.hero.headline);
  const description = page.hero.subheadline;
  const url = `${SITE_URL}${localizedPath(lang, "/konsultacje")}`;

  return {
    title,
    description,
    alternates: {
      ...pageAlternates("/konsultacje"),
      canonical: localizedPath(lang, "/konsultacje"),
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Polskie Centrum Wizowe",
      title,
      description,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_URL],
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
