export type Lang = "pl" | "en" | "ua" | "ru";

export const LANGS: Lang[] = ["pl", "en", "ua", "ru"];
export const ROUTE_LANGS: Exclude<Lang, "pl">[] = ["en", "ua", "ru"];

export const LANG_HTML: Record<Lang, string> = {
  pl: "pl",
  en: "en",
  ua: "uk",
  ru: "ru",
};

export function isLang(value: string | undefined): value is Lang {
  return !!value && LANGS.includes(value as Lang);
}

export function isRouteLang(value: string | undefined): value is Exclude<Lang, "pl"> {
  return !!value && ROUTE_LANGS.includes(value as Exclude<Lang, "pl">);
}

export function localePrefix(lang: Lang) {
  return lang === "pl" ? "" : `/${lang}`;
}

export function localizePath(path: string, lang: Lang) {
  if (path.startsWith("mailto:") || path.startsWith("tel:") || path.startsWith("http")) {
    return path;
  }

  const prefix = localePrefix(lang);
  if (path === "/") return prefix || "/";
  if (path.startsWith("/#")) return `${prefix || "/"}${path.slice(1)}`;
  if (path.startsWith("/")) return `${prefix}${path}`;
  if (path.startsWith("#")) return `${prefix || "/"}${path}`;
  return `${prefix}/${path}`;
}

export function stripLocalePrefix(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];

  if (isRouteLang(first)) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return pathname || "/";
}
