import type { Metadata } from "next";
import SiteDocument from "@/app/site-document";
import { OG_IMAGE_URL, siteIcons } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Polskie Centrum Wizowe — Doradztwo wizowe i migracyjne",
  description:
    "Profesjonalne doradztwo wizowe i migracyjne dla osób prywatnych i firm. Pomagamy uzyskać wizy, zezwolenia na pobyt i kartę stałego pobytu w Polsce.",
  keywords:
    "wiza Polska, zezwolenie na pobyt, karta stałego pobytu, doradztwo wizowe, migracja do Polski",
  icons: siteIcons,
  alternates: {
    canonical: "/",
    languages: {
      pl: "/",
      en: "/en",
      ru: "/ru",
      uk: "/ua",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "Polskie Centrum Wizowe",
    title: "Polskie Centrum Wizowe — Doradztwo wizowe i migracyjne",
    description:
      "Profesjonalne doradztwo wizowe i migracyjne dla osób prywatnych i firm. Pomagamy uzyskać wizy, zezwolenia na pobyt i kartę stałego pobytu w Polsce.",
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polskie Centrum Wizowe — Doradztwo wizowe i migracyjne",
    description:
      "Profesjonalne doradztwo wizowe i migracyjne dla osób prywatnych i firm. Pomagamy uzyskać wizy, zezwolenia na pobyt i kartę stałego pobytu w Polsce.",
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolishLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="pl">{children}</SiteDocument>;
}
