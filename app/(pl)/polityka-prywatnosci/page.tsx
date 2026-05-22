import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LegalPageContent from "@/components/sections/LegalPageContent";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Polityka prywatności — Polskie Centrum Wizowe",
  description: "Polityka ochrony danych osobowych Polskiego Centrum Wizowego zgodna z RODO.",
  alternates: pageAlternates("/polityka-prywatnosci"),
};

export default function PolitykaPrywatnosciPage() {
  return (
    <>
      <Navbar />
      <LegalPageContent pageKey="polityka_prywatnosci" />
      <Footer />
    </>
  );
}
