import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import KonsultacjeContent from "@/components/sections/KonsultacjeContent";

export const metadata: Metadata = {
  title: "Konsultacje — Polskie Centrum Wizowe",
  description:
    "Umów konsultację wizową lub ogólną. Wstępna kwalifikacja wizowa online — odpowiadamy w ciągu 24 godzin.",
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
