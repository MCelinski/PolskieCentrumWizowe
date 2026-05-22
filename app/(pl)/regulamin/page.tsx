import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LegalPageContent from "@/components/sections/LegalPageContent";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Regulamin — Polskie Centrum Wizowe",
  description: "Warunki świadczenia usług doradczych przez Polskie Centrum Wizowe.",
  alternates: pageAlternates("/regulamin"),
};

export default function RegulaminPage() {
  return (
    <>
      <Navbar />
      <LegalPageContent pageKey="regulamin" />
      <Footer />
    </>
  );
}
