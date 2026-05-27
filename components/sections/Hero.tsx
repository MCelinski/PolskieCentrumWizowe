"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
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
      {/* ── Red top stripe ── */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "1px", backgroundColor: "var(--color-red-500)" }}
        aria-hidden="true"
      />

      {/* ── Atmospheric blue glow — upper right, behind pillars ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(760px 400px at 82% 16%, rgba(77,132,159,0.13), transparent 64%)",
        }}
        aria-hidden="true"
      />

      {/* ── Deep red underpulse — lower left ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(520px 240px at 3% 94%, rgba(196,32,33,0.06), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Pillars photograph (transparent PNG) ───────────────────────────────
          Wrapper has backgroundColor: navy-900 for two reasons:
            1. It fills the transparent areas of the PNG so they read as navy
               (indistinguishable from the section background).
            2. mix-blend-mode: screen on the Image blends within the wrapper's
               stacking context — it needs a solid navy target to blend against.

          screen blend formula: result = 1 − (1−img)(1−navy)
            · Transparent/black PNG pixels  →  navy (invisible, matches bg) ✓
            · Bright column pixels          →  luminous, lighter than navy   ✓
            · Semi-transparent shadows      →  soft mid-tones, no hard edge  ✓

          mask-composite: intersect fades all four edges in one pass.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-y-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: "68%",
          maskImage: [
            "linear-gradient(to right,  transparent 0%, black 26%, black 88%, transparent 100%)",
            "linear-gradient(to bottom, transparent 0%, black 10%, black 88%, transparent 100%)",
          ].join(", "),
          WebkitMaskImage: [
            "linear-gradient(to right,  transparent 0%, black 26%, black 88%, transparent 100%)",
            "linear-gradient(to bottom, transparent 0%, black 10%, black 88%, transparent 100%)",
          ].join(", "),
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <Image
          src="/images/pillars2.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          style={{
            mixBlendMode: "screen",
            opacity: 0.42,
            filter: "brightness(1.0) contrast(1.05)",
          }}
          sizes="68vw"
        />
      </div>

      {/* ── Cinematic vignette — elliptical radial, no rectangular boundary ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 120% 90% at 50% 50%, transparent 30%, rgba(4,28,45,0.52) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="container-editorial flex flex-1 flex-col justify-center pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="max-w-3xl">

          {/* Eyebrow */}
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

          {/* Headline */}
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
              className="hero-cta-primary inline-flex items-center justify-center gap-2.5 px-8 py-4 font-sans text-sm font-semibold tracking-[0.02em]"
            >
              {hero.cta_primary.label}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href={localizePath(hero.cta_secondary.href, lang)}
              className="hero-cta-secondary inline-flex items-center justify-center gap-2.5 px-8 py-4 font-sans text-sm font-semibold tracking-[0.02em]"
            >
              {hero.cta_secondary.label}
            </Link>
          </div>

          {/* Microcopy */}
          {hero.microcopy && (
            <p
              className="mt-5 animate-hero-enter font-sans text-xs inline-flex items-center gap-1.5"
              style={{
                color: "rgba(226, 234, 244, 0.45)",
                animationDelay: "440ms",
              }}
            >
              <ShieldCheck
                size={11}
                style={{ color: "rgba(196,32,33,0.60)", flexShrink: 0 }}
                aria-hidden="true"
              />
              {hero.microcopy}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
