"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage, useLangContent, type Lang } from "@/contexts/LanguageContext";

const LANG_LABELS: Record<Lang, string> = { pl: "PL", en: "EN", ua: "UA", ru: "RU" };

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const content = useLangContent();
  const { nav } = content;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#o-nas");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    const handleHash = () => setActiveHash(window.location.hash || "#o-nas");

    handleScroll();
    handleHash();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(4, 28, 45, 0.97)" : "rgba(4, 28, 45, 0.92)",
        borderColor: scrolled ? "rgba(231, 236, 245, 0.16)" : "rgba(231, 236, 245, 0.1)",
        backdropFilter: "blur(14px)",
        boxShadow: scrolled ? "0 10px 30px rgba(2, 6, 23, 0.18)" : "none",
      }}
    >
      <div className="container-editorial">
        <div className="flex h-[4.5rem] md:h-[5.25rem] items-center justify-between">
          <Link href="/" aria-label="Polskie Centrum Wizowe - strona główna" className="shrink-0">
            <Image
              src="/logo-dark.svg"
              alt="Polskie Centrum Wizowe"
              width={380}
              height={92}
              priority
              style={{ height: "56px", width: "auto" }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Nawigacja główna">
            {nav.links.map((link) => {
              const hash = link.href.split("#")[1] ? `#${link.href.split("#")[1]}` : "";
              const active = hash && hash === activeHash;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveHash(hash || activeHash)}
                  className="font-sans text-sm font-semibold tracking-[0.02em] pb-1 border-b transition-colors duration-200"
                  style={{
                    color: active ? "var(--color-white)" : "rgba(231, 238, 246, 0.84)",
                    borderColor: active ? "var(--color-red-500)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1" role="group" aria-label="Wybor jezyka">
              {(["pl", "en", "ua", "ru"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="font-sans text-xs font-semibold px-2 py-1 transition-colors duration-150 cursor-pointer"
                  style={{
                    color: l === lang ? "var(--color-white)" : "rgba(231, 238, 246, 0.5)",
                    borderBottom: l === lang ? "1px solid var(--color-red-500)" : "1px solid transparent",
                  }}
                  aria-pressed={l === lang}
                  aria-label={`Jezyk: ${LANG_LABELS[l]}`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>

            <Link
              href="/konsultacje"
              className="inline-flex items-center justify-center px-5 py-2.5 font-sans text-sm font-semibold tracking-[0.02em] border transition-colors duration-200"
              style={{
                color: "var(--color-white)",
                borderColor: "rgba(231, 238, 246, 0.5)",
              }}
            >
              {nav.cta}
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-5 h-px transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-white)",
                  transform:
                    menuOpen && i === 0
                      ? "rotate(45deg) translate(4px, 4px)"
                      : menuOpen && i === 1
                        ? "scaleX(0)"
                        : menuOpen && i === 2
                          ? "rotate(-45deg) translate(4px, -4px)"
                          : "none",
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t surface-soft" style={{ borderColor: "var(--color-sand-300)" }}>
          <nav className="container-editorial py-6 flex flex-col gap-5" aria-label="Nawigacja mobilna">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-base font-semibold pb-1 border-b"
                style={{ color: "var(--color-navy-800)", borderColor: "var(--color-sand-300)" }}
                onClick={() => {
                  const hash = link.href.split("#")[1] ? `#${link.href.split("#")[1]}` : "#o-nas";
                  setActiveHash(hash);
                  setMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-2 pt-1">
              {(["pl", "en", "ua", "ru"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setMenuOpen(false); }}
                  className="font-sans text-xs font-semibold px-3 py-1.5 border transition-colors duration-150 cursor-pointer"
                  style={{
                    color: l === lang ? "var(--color-white)" : "var(--color-navy-600)",
                    backgroundColor: l === lang ? "var(--color-navy-800)" : "transparent",
                    borderColor: l === lang ? "var(--color-navy-800)" : "var(--color-sand-300)",
                  }}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>

            <Link
              href="/konsultacje"
              className="mt-2 inline-flex items-center justify-center px-5 py-3 font-sans text-sm font-semibold"
              style={{ backgroundColor: "var(--color-navy-800)", color: "var(--color-white)" }}
              onClick={() => setMenuOpen(false)}
            >
              {nav.cta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
