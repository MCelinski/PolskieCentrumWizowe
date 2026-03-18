import Link from "next/link";
import content from "@/content/site-content.json";

export default function Hero() {
  const { hero } = content.home;

  return (
    <section
      className="relative min-h-dvh flex flex-col justify-end overflow-hidden"
      aria-label="Hero"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--color-navy-900)" }}
        aria-hidden="true"
      />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 60% at 60% 40%, rgba(58,63,71,0.8) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Vertical accent line (Swiss style) */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px opacity-15"
        style={{ backgroundColor: "var(--color-navy-200)" }}
        aria-hidden="true"
      />

      {/* Red accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: "var(--color-red-600)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-editorial relative z-10 pb-24 md:pb-32 pt-40 md:pt-48">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <p
            className="section-eyebrow mb-10"
            style={{ color: "rgba(197,201,208,0.75)" }}
          >
            {hero.eyebrow}
          </p>

          {/* Main headline */}
          <h1
            className="font-serif font-medium leading-none mb-10"
            style={{
              color: "var(--color-cream)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {hero.headline}
          </h1>

          {/* Subheadline */}
          <p
            className="font-sans text-base md:text-lg leading-relaxed mb-14"
            style={{ color: "rgba(197,201,208,0.72)", maxWidth: "520px" }}
          >
            {hero.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link
              href={hero.cta_primary.href}
              className="inline-flex items-center justify-center font-sans text-sm font-medium px-8 py-4 transition-opacity duration-200 hover:opacity-90"
              style={{
                backgroundColor: "var(--color-cream)",
                color: "var(--color-navy-900)",
              }}
            >
              {hero.cta_primary.label}
            </Link>
            <Link
              href={hero.cta_secondary.href}
              className="inline-flex items-center justify-center font-sans text-sm font-medium px-8 py-4 transition-all duration-200 hover:bg-white/8"
              style={{
                color: "rgba(247,246,243,0.75)",
              }}
            >
              {hero.cta_secondary.label} →
            </Link>
          </div>

          {/* Trust indicator */}
          <div
            className="flex items-center gap-3 pt-8 border-t"
            style={{ borderColor: "rgba(197,201,208,0.15)" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "var(--color-red-600)" }}
              aria-hidden="true"
            />
            <p
              className="font-sans text-sm"
              style={{ color: "rgba(197,201,208,0.65)" }}
            >
              {hero.trust_indicator}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="font-sans text-xs uppercase tracking-widest"
          style={{ color: "rgba(197,201,208,0.35)", letterSpacing: "0.15em", writingMode: "vertical-rl" }}
        >
          Przewiń
        </span>
        <div
          className="w-px h-12 mt-2"
          style={{ backgroundColor: "rgba(197,201,208,0.18)" }}
        />
      </div>
    </section>
  );
}
