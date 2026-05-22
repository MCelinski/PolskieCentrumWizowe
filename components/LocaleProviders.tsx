"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import CookieBanner from "@/components/ui/CookieBanner";
import type { Lang } from "@/lib/i18n";

export default function LocaleProviders({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) {
  return (
    <LanguageProvider initialLang={lang}>
      {children}
      <CookieBanner />
    </LanguageProvider>
  );
}
