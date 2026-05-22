"use client";
import Link from "next/link";
import { useLangContent, useLanguage } from "@/contexts/LanguageContext";
import { localizePath } from "@/lib/i18n";

interface LegalPageContentProps {
  pageKey: "regulamin" | "polityka_prywatnosci";
}

export default function LegalPageContent({ pageKey }: LegalPageContentProps) {
  const content = useLangContent();
  const { lang } = useLanguage();
  const legalPages = content.legal_pages;
  const page = legalPages[pageKey];

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="container-editorial pt-28 pb-24">

        <Link
          href={localizePath("/", lang)}
          className="inline-flex items-center gap-2 font-sans text-sm font-medium mb-12 transition-colors hover:opacity-70"
          style={{ color: "var(--color-navy-500)" }}
        >
          {legalPages.back_label}
        </Link>

        <header
          className="mb-16 border-b pb-12"
          style={{ borderColor: "var(--color-sand-300)" }}
        >
          <p
            className="font-sans text-xs font-semibold uppercase tracking-[0.18em] mb-4"
            style={{ color: "var(--color-navy-500)" }}
          >
            {page.subtitle}
          </p>
          <h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
            style={{ color: "var(--color-navy-900)" }}
          >
            {page.title}
          </h1>
          <p
            className="font-sans text-sm"
            style={{ color: "var(--color-sand-600)" }}
          >
            {page.last_updated}
          </p>
        </header>

        <div style={{ maxWidth: "800px" }}>
          {page.sections.map((section, i) => (
            <section key={i} className="mb-12">
              <h2
                className="font-serif text-xl md:text-2xl font-semibold mb-5"
                style={{ color: "var(--color-navy-800)" }}
              >
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.paragraphs.map((para, j) => (
                  <p
                    key={j}
                    className="font-sans text-base leading-relaxed"
                    style={{ color: "var(--color-navy-700)" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t" style={{ borderColor: "var(--color-sand-300)" }}>
          <Link
            href={localizePath("/", lang)}
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-6 py-3 rounded transition-colors"
            style={{
              backgroundColor: "var(--color-navy-900)",
              color: "var(--color-white)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--color-navy-800)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--color-navy-900)";
            }}
          >
            {legalPages.back_label}
          </Link>
        </div>

      </div>
    </main>
  );
}
