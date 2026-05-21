"use client";

import { createContext, useContext, useState, useEffect } from "react";
import content from "@/content/index";

export type Lang = "pl" | "en" | "ua" | "ru";

const LANGS: Lang[] = ["pl", "en", "ua", "ru"];
const LANG_STORAGE_KEY = "pcw_lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "pl",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pl");

  useEffect(() => {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && LANGS.includes(stored as Lang)) {
      setLang(stored as Lang);
      return;
    }

    const browser = navigator.language.slice(0, 2).toLowerCase();
    const normalized = browser === "uk" ? "ua" : browser;
    if (LANGS.includes(normalized as Lang)) {
      setLang(normalized as Lang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
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
