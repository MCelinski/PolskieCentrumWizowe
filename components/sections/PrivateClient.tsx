"use client";

import Link from "next/link";
import { useLangContent, useLanguage } from "@/contexts/LanguageContext";
import { localizePath } from "@/lib/i18n";
import { useInView } from "@/hooks/useInView";
import ResponsivePicture from "@/components/ui/ResponsivePicture";

export default function PrivateClient() {
  const content = useLangContent();
  const { private_client } = content.home;
  const { lang } = useLanguage();
  const { ref, inView } = useInView(0.06);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="private-client"
      className={`relative overflow-hidden surface-navy in-view-group${inView ? " is-visible" : ""}`}
      aria-labelledby="private-client-heading"
    >

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[960px]">

        {/* ── LEFT: Editorial content ── */}
        <div
          className="relative z-10 flex flex-col justify-center px-6 md:px-10 lg:pl-[max(3rem,calc((100vw-1240px)/2+3rem))] lg:pr-16 xl:pr-28"
          style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
        >

          {/* Atmosphere — layered glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: [
                "radial-gradient(700px 520px at -8% 58%, rgba(196,32,33,0.11), transparent 55%)",
                "radial-gradient(300px 280px at 105% 5%, rgba(4,16,36,0.7), transparent 65%)",
              ].join(", "),
            }}
            aria-hidden="true"
          />

          <div className="relative max-w-[520px]">

            {/* Section label */}
            <div
              className="flex items-center gap-4 mb-10 animate-fade-right"
              style={{ animationDelay: "0ms" }}
            >
              <div
                className="w-6 h-px flex-shrink-0"
                style={{ backgroundColor: "var(--color-red-500)", opacity: 0.7 }}
                aria-hidden="true"
              />
              <span
                className="font-sans text-[10px] uppercase tracking-[0.28em] font-medium"
                style={{ color: "rgba(225,233,243,0.36)" }}
              >
                {private_client.section_label}
              </span>
            </div>

            {/* Headline — maximum presence */}
            <h2
              id="private-client-heading"
              className="font-serif mb-6 animate-fade-up"
              style={{
                color: "var(--color-white)",
                fontSize: "clamp(3rem, 5.5vw, 5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                animationDelay: "60ms",
              }}
            >
              {private_client.headline}
            </h2>

            {/* Subheadline */}
            <p
              className="font-serif mb-10 animate-fade-up"
              style={{
                color: "rgba(225,233,243,0.52)",
                fontSize: "clamp(1rem, 1.45vw, 1.18rem)",
                lineHeight: 1.65,
                fontStyle: "italic",
                animationDelay: "110ms",
              }}
            >
              {private_client.subheadline}
            </p>

            {/* Rule */}
            <div
              className="mb-10 animate-scale-in"
              style={{
                height: "1px",
                backgroundColor: "rgba(225,233,243,0.06)",
                animationDelay: "140ms",
              }}
              aria-hidden="true"
            />

            {/* Description */}
            <p
              className="font-sans text-sm leading-relaxed mb-12 animate-fade-up"
              style={{
                color: "rgba(225,233,243,0.46)",
                animationDelay: "170ms",
              }}
            >
              {private_client.description}
            </p>

            {/* Scope list — editorial document style */}
            <div
              className="mb-12 animate-fade-up"
              style={{ animationDelay: "210ms" }}
              role="list"
            >
              {private_client.scope.map((item: string, i: number) => (
                <div
                  key={i}
                  role="listitem"
                  className="flex items-start gap-6"
                  style={{
                    borderTop: "1px solid rgba(225,233,243,0.055)",
                    paddingTop: "1.05rem",
                    paddingBottom: "1.05rem",
                    ...(i === private_client.scope.length - 1
                      ? { borderBottom: "1px solid rgba(225,233,243,0.055)" }
                      : {}),
                  }}
                >
                  <span
                    className="font-serif flex-shrink-0 tabular-nums select-none"
                    style={{
                      color: "var(--color-red-500)",
                      fontSize: "0.9rem",
                      lineHeight: "1.55rem",
                      opacity: 0.8,
                      letterSpacing: "0.04em",
                      minWidth: "1.75rem",
                    }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "rgba(225,233,243,0.68)" }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Operating mode */}
            {private_client.operating_mode && (
              <p
                className="font-sans text-xs leading-relaxed mb-8 animate-fade-up"
                style={{
                  color: "rgba(225,233,243,0.36)",
                  letterSpacing: "0.025em",
                  animationDelay: "255ms",
                }}
              >
                {private_client.operating_mode}
              </p>
            )}

            {/* Engagement note — serif blockquote */}
            <p
              className="font-serif text-sm leading-relaxed mb-14 animate-fade-up"
              style={{
                color: "rgba(225,233,243,0.44)",
                fontStyle: "italic",
                borderLeft: "1px solid rgba(196,32,33,0.4)",
                paddingLeft: "1.25rem",
                animationDelay: "295ms",
              }}
            >
              {private_client.engagement_note}
            </p>

            {/* CTA */}
            <div className="animate-fade-up" style={{ animationDelay: "360ms" }}>
              <Link
                href={localizePath(private_client.cta.href, lang)}
                className="group inline-flex items-center gap-5"
                style={{ cursor: "pointer" }}
              >
                <span
                  className="font-sans font-medium tracking-[0.15em] uppercase border transition-all duration-200"
                  style={{
                    fontSize: "0.68rem",
                    color: "rgba(225,233,243,0.88)",
                    borderColor: "rgba(226,234,244,0.2)",
                    padding: "0.85rem 2rem",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(226,234,244,0.45)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(226,234,244,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(225,233,243,0.88)";
                  }}
                >
                  {private_client.cta.label}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1.5"
                  style={{ color: "rgba(225,233,243,0.35)", flexShrink: 0 }}
                >
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

          </div>
        </div>

        {/* ── RIGHT: Full-bleed image ── */}
        <div className="relative min-h-[420px] lg:min-h-0">

          <ResponsivePicture
            fallbackSrc="/images/private-client.webp"
            srcSet="/images/private-client-640.webp 640w, /images/private-client-960.webp 960w, /images/private-client-1280.webp 1280w, /images/private-client-1600.webp 1600w, /images/private-client.webp 2048w"
            sizes="(max-width: 1024px) 100vw, 50vw"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Subtle mood tint — all viewports */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(4,28,45,0.28) 0%, rgba(4,28,45,0.12) 45%, transparent 80%)",
            }}
            aria-hidden="true"
          />

          {/* Left blend — desktop: seamless join with content panel */}
          <div
            className="absolute inset-y-0 left-0 hidden lg:block"
            style={{
              width: "58%",
              background:
                "linear-gradient(to right, #041c2d 0%, rgba(4,28,45,0.88) 18%, rgba(4,28,45,0.55) 42%, rgba(4,28,45,0.15) 72%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Right edge vignette — full height */}
          <div
            className="absolute inset-y-0 right-0 hidden lg:block"
            style={{
              width: "30%",
              background:
                "linear-gradient(to left, rgba(4,28,45,0.55) 0%, rgba(4,28,45,0.18) 42%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Top-right corner fade — desktop */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "radial-gradient(ellipse at 100% 0%, rgba(4,28,45,0.58) 0%, rgba(4,28,45,0.22) 30%, transparent 62%)",
            }}
            aria-hidden="true"
          />

          {/* Bottom vignette — grounds the image */}
          <div
            className="absolute inset-x-0 bottom-0 hidden lg:block"
            style={{
              height: "45%",
              background:
                "linear-gradient(to top, rgba(4,28,45,0.6) 0%, rgba(4,28,45,0.18) 55%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Mobile: top fade */}
          <div
            className="absolute inset-x-0 top-0 h-52 lg:hidden"
            style={{
              background:
                "linear-gradient(to bottom, #041c2d 0%, rgba(4,28,45,0.82) 28%, rgba(4,28,45,0.12) 70%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Mobile: bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-28 lg:hidden"
            style={{
              background:
                "linear-gradient(to top, rgba(4,28,45,0.42) 0%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Corner crop mark */}
          <div
            className="absolute bottom-7 right-7 z-10"
            style={{ width: "20px", height: "20px" }}
            aria-hidden="true"
          >
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "100%", height: "1px", backgroundColor: "rgba(196,32,33,0.45)" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "100%", backgroundColor: "rgba(196,32,33,0.45)" }} />
          </div>

        </div>
      </div>
    </section>
  );
}
