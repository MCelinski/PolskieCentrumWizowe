import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import KonsultacjeContent from "@/components/sections/KonsultacjeContent";
import { OG_IMAGE_URL, pageAlternates } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const title = "Konsultacje — Polskie Centrum Wizowe";
const description =
  "Umów konsultację wizową lub ogólną. Wstępna kwalifikacja wizowa online — odpowiadamy w ciągu 24 godzin.";

export const metadata: Metadata = {
  title,
  description,
  alternates: pageAlternates("/konsultacje"),
  openGraph: {
    type: "website",
    url: `${SITE_URL}/konsultacje`,
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

export default function KonsultacjePage() {
  return (
    <>
      <Navbar />
      <KonsultacjeContent />
      <Footer />
    </>
  );
}
