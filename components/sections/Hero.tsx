"use client";

import Link from "next/link";
import { useLangContent, useLanguage } from "@/contexts/LanguageContext";
import { localizePath } from "@/lib/i18n";

export default function Hero() {
  const content = useLangContent();
  const { hero } = content.home;
  const { lang } = useLanguage();

  return (
    <section
      className="surface-navy relative overflow-hidden flex-1 flex flex-col"
      aria-label="Hero"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(1200px 520px at 78% 22%, rgba(106, 132, 168, 0.26), transparent 66%)",
        }}
        aria-hidden="true"
      />

      {/* Red top stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: "var(--color-red-500)" }}
        aria-hidden="true"
      />

      <div className="container-editorial relative z-10 flex flex-1 flex-col justify-center pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="max-w-3xl">

          {/* Eyebrow — thin red dash + label */}
          <div
            className="flex items-center gap-3 animate-hero-enter mb-6"
            style={{ animationDelay: "0ms" }}
          >
            <span
              className="shrink-0 block"
              style={{
                width: "1.25rem",
                height: "1px",
                backgroundColor: "var(--color-red-500)",
              }}
              aria-hidden="true"
            />
            <p className="section-eyebrow section-eyebrow-light m-0">
              {hero.eyebrow}
            </p>
          </div>

          {/* Headline — sized so 3–4 words sit per line */}
          <h1
            className="font-serif animate-hero-enter mb-7"
            style={{
              color: "var(--color-white)",
              fontSize: "clamp(1.875rem, 3vw, 3.25rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.18,
              animationDelay: "110ms",
              textWrap: "balance",
            }}
          >
            {hero.headline}
          </h1>

          {/* Subheadline */}
          <p
            className="font-sans text-base md:text-lg leading-relaxed animate-hero-enter mb-10"
            style={{
              color: "rgba(226, 234, 244, 0.82)",
              maxWidth: "620px",
              animationDelay: "220ms",
            }}
          >
            {hero.subheadline}
          </p>

          <div
            className="accent-rule animate-hero-enter mb-10"
            style={{ animationDelay: "320ms" }}
            aria-hidden="true"
          />

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-hero-enter"
            style={{ animationDelay: "360ms" }}
          >
            <Link
              href={localizePath(hero.cta_primary.href, lang)}
              className="inline-flex items-center justify-center px-8 py-4 font-sans text-sm font-semibold tracking-[0.02em] transition-colors duration-200"
              style={{
                backgroundColor: "var(--color-white)",
                color: "var(--color-navy-800)",
              }}
            >
              {hero.cta_primary.label}
            </Link>
            <Link
              href={localizePath(hero.cta_secondary.href, lang)}
              className="inline-flex items-center justify-center px-8 py-4 font-sans text-sm font-semibold tracking-[0.02em] border transition-colors duration-200"
              style={{
                color: "var(--color-white)",
                borderColor: "rgba(226, 234, 244, 0.55)",
              }}
            >
              {hero.cta_secondary.label}
            </Link>
          </div>

          {hero.microcopy && (
            <p
              className="mt-5 animate-hero-enter font-sans text-xs"
              style={{
                color: "rgba(226, 234, 244, 0.50)",
                animationDelay: "440ms",
              }}
            >
              {hero.microcopy}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
