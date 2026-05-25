"use client";

import { useLangContent, useLanguage } from "@/contexts/LanguageContext";
import disclaimers from "@/content/disclaimers";
import { useInView } from "@/hooks/useInView";
import ResponsivePicture from "@/components/ui/ResponsivePicture";

export default function About() {
  const content = useLangContent();
  const { about } = content.home;
  const { lang } = useLanguage();
  const disclaimer = disclaimers[lang];
  const { ref, inView } = useInView(0.1);

  const [leadParagraph, ...remainingParagraphs] = about.paragraphs;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="o-nas"
      className={`surface-white in-view-group overflow-hidden${inView ? " is-visible" : ""}`}
      aria-labelledby="about-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

        {/* ── LEFT col: full-bleed photo ── */}
        <div
          className="relative min-h-[460px] lg:min-h-0 order-2 lg:order-1 animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          <ResponsivePicture
            fallbackSrc="/images/about.webp"
            srcSet="/images/about-480.webp 480w, /images/about-720.webp 720w, /images/about-960.webp 960w, /images/about.webp 1086w"
            sizes="(max-width: 1024px) 100vw, 50vw"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Subtle mood tint — all viewports */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(7,27,58,0.28) 0%, rgba(7,27,58,0.12) 45%, transparent 80%)",
            }}
            aria-hidden="true"
          />

          {/* Desktop: right edge blends into white content column */}
          <div
            className="absolute inset-y-0 right-0 hidden lg:block"
            style={{
              width: "56%",
              background:
                "linear-gradient(to left, var(--color-white) 0%, rgba(255,255,255,0.82) 22%, rgba(255,255,255,0.48) 50%, rgba(255,255,255,0.12) 78%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Mobile: top edge blends into white content above */}
          <div
            className="absolute inset-x-0 top-0 h-28 lg:hidden"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.2) 75%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Mobile: bottom edge — gentle darkening, no hard navy wall */}
          <div
            className="absolute inset-x-0 bottom-0 h-20 lg:hidden"
            style={{
              background:
                "linear-gradient(to top, rgba(7,27,58,0.18) 0%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Corner crop mark */}
          <div
            className="absolute top-5 left-5 md:top-8 md:left-8 z-10"
            style={{ width: "20px", height: "20px" }}
            aria-hidden="true"
          >
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", backgroundColor: "rgba(196,32,33,0.55)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "100%", backgroundColor: "rgba(196,32,33,0.55)" }} />
          </div>
        </div>

        {/* ── RIGHT col: editorial content ── */}
        <div className="relative order-1 lg:order-2 section-padding px-6 md:px-10 lg:pl-16 lg:pr-[max(3rem,calc((100vw-1240px)/2+3rem))] xl:pl-24 flex items-center">
          <div className="relative max-w-[640px] w-full">

            {/* Eyebrow */}
            <p
              className="section-eyebrow animate-fade-up mb-4"
              style={{ animationDelay: "0ms" }}
            >
              {about.section_label}
            </p>

            {/* Accent rule */}
            <div
              className="accent-rule animate-fade-up mb-7"
              style={{ animationDelay: "70ms" }}
              aria-hidden="true"
            />

            {/* Headline */}
            <h2
              id="about-heading"
              className="font-serif animate-fade-up mb-7"
              style={{
                fontSize: "clamp(1.9rem, 3.8vw, 3.15rem)",
                color: "var(--color-navy-800)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                animationDelay: "140ms",
                textWrap: "balance",
              }}
            >
              {about.headline}
            </h2>

            {/* Legal disclaimer — first info under heading, per regulatory requirement */}
            <p
              className="font-sans leading-relaxed animate-fade-up mb-5"
              style={{
                fontSize: "12px",
                color: "var(--color-sand-500)",
                animationDelay: "155ms",
              }}
            >
              {disclaimer.short}
            </p>

            {/* Lead paragraph — serif, slightly larger */}
            {leadParagraph ? (
              <p
                className="font-serif animate-fade-up mb-8"
                style={{
                  color: "var(--color-navy-700)",
                  fontSize: "clamp(1rem, 1.4vw, 1.18rem)",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  animationDelay: "220ms",
                  maxWidth: "52rem",
                }}
              >
                {leadParagraph}
              </p>
            ) : null}

            {/* Body paragraphs */}
            <div
              className="border-t border-b py-7 md:py-8 animate-fade-up"
              style={{ borderColor: "var(--color-sand-300)", animationDelay: "300ms" }}
            >
              <div className="grid grid-cols-1 gap-5 md:gap-6">
                {remainingParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-sans text-[0.9375rem] md:text-[1rem] leading-[1.75]"
                    style={{
                      color: "var(--color-sand-600)",
                      maxWidth: "60ch",
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Highlight block */}
            <div className="mt-8 md:mt-10">
              <div
                className="border-l-2 pl-5 animate-fade-up"
                style={{
                  borderColor: "var(--color-red-500)",
                  animationDelay: "420ms",
                }}
              >
                <p
                  className="font-serif mb-1.5"
                  style={{
                    color: "var(--color-navy-800)",
                    fontSize: "clamp(1.25rem, 2.1vw, 1.75rem)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {about.highlight}
                </p>
                <p
                  className="font-sans text-xs md:text-sm"
                  style={{ color: "var(--color-sand-500)" }}
                >
                  {about.highlight_sublabel}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
