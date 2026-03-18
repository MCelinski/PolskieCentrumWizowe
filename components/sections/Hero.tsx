import Link from "next/link";
import content from "@/content/site-content.json";

const FLAGS = [
  { emoji: "🇺🇦", label: "Ukraina" },
  { emoji: "🇮🇳", label: "Indie" },
  { emoji: "🇯🇵", label: "Japonia" },
  { emoji: "🇨🇳", label: "Chiny" },
  { emoji: "🇺🇸", label: "USA" },
  { emoji: "🇬🇧", label: "Wielka Brytania" },
  { emoji: "🇩🇪", label: "Niemcy" },
  { emoji: "🇻🇳", label: "Wietnam" },
  { emoji: "🇰🇷", label: "Korea" },
  { emoji: "🇹🇷", label: "Turcja" },
];

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

      {/* Subtle radial overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 60% at 60% 40%, rgba(58,63,71,0.8) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Swiss vertical accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px opacity-15"
        style={{ backgroundColor: "var(--color-navy-200)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-editorial relative z-10 pb-20 md:pb-28 pt-40 md:pt-48">
        <div className="max-w-4xl">

          {/* Eyebrow */}
          <p
            className="section-eyebrow animate-hero-enter mb-8 md:mb-10"
            style={{
              color: "rgba(197,201,208,0.75)",
              animationDelay: "0ms",
            }}
          >
            {hero.eyebrow}
          </p>

          {/* Headline */}
          <h1
            className="font-serif font-medium leading-none animate-hero-enter mb-8 md:mb-10"
            style={{
              color: "var(--color-cream)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              letterSpacing: "-0.03em",
              animationDelay: "120ms",
            }}
          >
            {hero.headline}
          </h1>

          {/* Subheadline */}
          <p
            className="font-sans text-base md:text-lg leading-relaxed animate-hero-enter mb-12 md:mb-14"
            style={{
              color: "rgba(197,201,208,0.72)",
              maxWidth: "520px",
              animationDelay: "240ms",
            }}
          >
            {hero.subheadline}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-hero-enter mb-16 md:mb-20"
            style={{ animationDelay: "360ms" }}
          >
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
              style={{ color: "rgba(247,246,243,0.75)" }}
            >
              {hero.cta_secondary.label} →
            </Link>
          </div>

          {/* ── Flag strip ── */}
          <div
            className="animate-hero-enter border-t pt-8"
            style={{
              borderColor: "rgba(197,201,208,0.12)",
              animationDelay: "480ms",
            }}
          >
            <p
              className="font-sans text-xs mb-5 uppercase tracking-widest"
              style={{ color: "rgba(197,201,208,0.4)", letterSpacing: "0.14em" }}
            >
              Obsługujemy obywateli z&nbsp;40+ krajów
            </p>
            <div className="flex items-center gap-3 flex-wrap" role="list" aria-label="Obsługiwane kraje">
              {FLAGS.map((flag, i) => (
                <span
                  key={flag.label}
                  className="animate-flag-float"
                  role="listitem"
                  aria-label={flag.label}
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    lineHeight: 1,
                    animationDelay: `${i * 180}ms`,
                    cursor: "default",
                  }}
                  title={flag.label}
                >
                  {flag.emoji}
                </span>
              ))}
              <span
                className="font-sans text-xs ml-1"
                style={{ color: "rgba(197,201,208,0.35)" }}
                aria-hidden="true"
              >
                +30 więcej
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="font-sans text-xs uppercase tracking-widest"
          style={{
            color: "rgba(197,201,208,0.35)",
            letterSpacing: "0.15em",
            writingMode: "vertical-rl",
          }}
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
