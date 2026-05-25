import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import PrivateClient from "@/components/sections/PrivateClient";
import ProcessSection from "@/components/sections/ProcessSection";
import TrustMetrics from "@/components/sections/TrustMetrics";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
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
  const home = content[lang].home;

  const title = titled(home.hero.headline);
  const description = home.hero.subheadline;
  const url = `${SITE_URL}${localizedPath(lang, "/")}`;

  return {
    title,
    description,
    alternates: {
      ...pageAlternates("/"),
      canonical: localizedPath(lang, "/"),
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

export default function LocalizedHomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <div className="flex flex-col min-h-[100svh]">
          <Hero />
          <TrustBar />
        </div>
        <About />
        <Services />
        <PrivateClient />
        <ProcessSection />
        <TrustMetrics />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
