import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
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
    <html lang="pl" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
