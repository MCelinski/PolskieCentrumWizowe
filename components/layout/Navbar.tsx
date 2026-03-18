"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
        backgroundColor: scrolled ? "rgba(26, 29, 34, 0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="container-editorial">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" aria-label="Polskie Centrum Wizowe — strona główna">
            <Image
              src="/logo-dark.svg"
              alt="Polskie Centrum Wizowe"
              width={380}
              height={80}
              priority
              style={{
                height: "52px",
                width: "auto",
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Nawigacja główna">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium transition-colors duration-200 hover:opacity-70"
                style={{ color: "rgba(240,237,232,0.85)" }}
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
                backgroundColor: "transparent",
                color: "var(--color-cream)",
                border: "1px solid rgba(240,237,232,0.4)",
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
                backgroundColor: "var(--color-cream)",
                transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }}
            />
            <span
              className="w-5 h-px transition-all duration-200"
              style={{
                backgroundColor: "var(--color-cream)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="w-5 h-px transition-all duration-200"
              style={{
                backgroundColor: "var(--color-cream)",
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
