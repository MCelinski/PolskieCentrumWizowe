"use client";

import { createContext, useContext, useState, useEffect } from "react";
import content from "@/content/index";
import { LANG_HTML, type Lang } from "@/lib/i18n";

export type { Lang };

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "pl",
  setLang: () => {},
});

export function LanguageProvider({
  children,
  initialLang = "pl",
}: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = LANG_HTML[lang];
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useLangContent() {
  const { lang } = useLanguage();
  return content[lang];
}
