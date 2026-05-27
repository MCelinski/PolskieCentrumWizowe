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
import ClientLogos from "@/components/sections/ClientLogos";
import Contact from "@/components/sections/Contact";
import KonsultacjeContent from "@/components/sections/KonsultacjeContent";
import LegalPageContent from "@/components/sections/LegalPageContent";
import content from "@/content";
import type { Lang } from "@/lib/i18n";
import { localizedPath, OG_IMAGE_URL, pageAlternates, titled } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

type RouteLang = Exclude<Lang, "pl">;
type LegalPageKey = "polityka_prywatnosci" | "regulamin";

export function homeMetadata(lang: RouteLang): Metadata {
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

export function consultationsMetadata(lang: RouteLang): Metadata {
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

export function legalMetadata(lang: RouteLang, pageKey: LegalPageKey, path: string): Metadata {
  const page = content[lang].legal_pages[pageKey];

  return {
    title: titled(page.title),
    description: page.subtitle,
    alternates: {
      ...pageAlternates(path),
      canonical: localizedPath(lang, path),
    },
  };
}

export function LocalizedHomePage() {
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
        <ClientLogos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export function LocalizedKonsultacjePage() {
  return (
    <>
      <Navbar />
      <KonsultacjeContent />
      <Footer />
    </>
  );
}

export function LocalizedLegalPage({ pageKey }: { pageKey: LegalPageKey }) {
  return (
    <>
      <Navbar />
      <LegalPageContent pageKey={pageKey} />
      <Footer />
    </>
  );
}
