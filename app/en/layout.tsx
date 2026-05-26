import type { Metadata } from "next";
import SiteDocument from "@/app/site-document";
import { siteIcons } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  keywords:
    "wiza Polska, zezwolenie na pobyt, karta sta\u0142ego pobytu, doradztwo wizowe, migracja do Polski",
  icons: siteIcons,
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
