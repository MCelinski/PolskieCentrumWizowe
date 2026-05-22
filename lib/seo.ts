import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";

const SITE_NAME = "Polskie Centrum Wizowe";

export function pageAlternates(path: string): Metadata["alternates"] {
  const normalized = path === "/" ? "" : path;

  return {
    canonical: normalized || "/",
    languages: {
      pl: normalized || "/",
      en: `/en${normalized}`,
      ru: `/ru${normalized}`,
      uk: `/ua${normalized}`,
      "x-default": normalized || "/",
    },
  };
}

export function titled(title: string) {
  return title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
}

export function localizedPath(lang: Lang, path: string) {
  if (lang === "pl") return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}
