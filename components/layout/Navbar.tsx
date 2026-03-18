"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import content from "@/content/site-content.json";

export default function Navbar() {
  const { nav } = content;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(248, 247, 244, 0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--color-sand-300)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="container-editorial">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Polskie Centrum Wizowe — strona główna">
            {/* Logo mark */}
            <div
              className="w-7 h-7 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--color-navy-900)" }}
              aria-hidden="true"
            >
              <span
                className="font-serif font-medium text-sm"
                style={{ color: "var(--color-cream)", lineHeight: 1 }}
              >
                P
              </span>
            </div>
            {/* Logo text */}
            <div className="hidden sm:block">
              <span
                className="font-sans text-sm font-medium tracking-wide"
                style={{ color: scrolled ? "var(--color-navy-900)" : "var(--color-cream)" }}
              >
                Polskie Centrum Wizowe
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Nawigacja główna">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium transition-colors duration-200 hover:opacity-70"
                style={{ color: scrolled ? "var(--color-navy-800)" : "rgba(248,247,244,0.85)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/konsultacje"
              className="font-sans text-sm font-medium px-5 py-2.5 transition-all duration-200"
              style={{
                backgroundColor: scrolled ? "var(--color-navy-900)" : "transparent",
                color: scrolled ? "var(--color-cream)" : "var(--color-cream)",
                border: `1px solid ${scrolled ? "var(--color-navy-900)" : "rgba(248,247,244,0.5)"}`,
              }}
            >
              {nav.cta}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={menuOpen}
          >
            <span
              className="w-5 h-px transition-all duration-200"
              style={{
                backgroundColor: scrolled || menuOpen ? "var(--color-navy-900)" : "var(--color-cream)",
                transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }}
            />
            <span
              className="w-5 h-px transition-all duration-200"
              style={{
                backgroundColor: scrolled || menuOpen ? "var(--color-navy-900)" : "var(--color-cream)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="w-5 h-px transition-all duration-200"
              style={{
                backgroundColor: scrolled || menuOpen ? "var(--color-navy-900)" : "var(--color-cream)",
                transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "var(--color-cream)",
            borderColor: "var(--color-sand-300)",
          }}
        >
          <nav className="container-editorial py-6 flex flex-col gap-5" aria-label="Nawigacja mobilna">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-base font-medium"
                style={{ color: "var(--color-navy-800)" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/konsultacje"
              className="font-sans text-sm font-medium px-5 py-3 text-center mt-2 transition-colors duration-200"
              style={{
                backgroundColor: "var(--color-navy-900)",
                color: "var(--color-cream)",
              }}
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
