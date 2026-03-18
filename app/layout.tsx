import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Polskie Centrum Wizowe — Doradztwo wizowe i migracyjne",
  description:
    "Profesjonalne doradztwo wizowe i migracyjne dla osób prywatnych i firm. Pomagamy uzyskać wizy, zezwolenia na pobyt i kartę stałego pobytu w Polsce.",
  keywords:
    "wiza Polska, zezwolenie na pobyt, karta stałego pobytu, doradztwo wizowe, migracja do Polski",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${cormorant.variable} ${sourceSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
