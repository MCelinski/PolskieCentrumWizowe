import { Manrope, Playfair_Display } from "next/font/google";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import LocaleProviders from "@/components/LocaleProviders";
import { LANG_HTML, type Lang } from "@/lib/i18n";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export default function SiteDocument({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) {
  return (
    <html lang={LANG_HTML[lang]} className={`${playfair.variable} ${manrope.variable}`}>
      <head>
        {/* Consent Mode v2 defaults - must fire before gtag.js loads */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});",
          }}
        />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <LocaleProviders lang={lang}>{children}</LocaleProviders>
      </body>
    </html>
  );
}
