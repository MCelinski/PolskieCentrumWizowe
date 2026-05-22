"use client";

import { useLangContent } from "@/contexts/LanguageContext";

export default function TrustBar() {
  const content = useLangContent();
  const { trust_bar } = content.home;
  const track = [...trust_bar.institutions, ...trust_bar.institutions];

  return (
    <div
      role="region"
      style={{
        backgroundColor: "var(--color-navy-800)",
        borderTop: "2px solid var(--color-red-500)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <ul className="sr-only" aria-label={trust_bar.label}>
        {trust_bar.institutions.map((inst, i) => (
          <li key={i}>{inst}</li>
        ))}
      </ul>

      {/* Mobile: label row above marquee */}
      <div
        className="sm:hidden flex items-center gap-3 px-4 pt-3 pb-1"
        aria-hidden="true"
      >
        <span
          className="h-px w-4 flex-shrink-0"
          style={{ backgroundColor: "var(--color-red-500)" }}
        />
        <span
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: "rgba(231,238,246,0.45)" }}
        >
          {trust_bar.label}
        </span>
      </div>

      {/* Marquee row — on desktop also contains label panel */}
      <div className="flex items-stretch" aria-hidden="true">

        {/* Label panel — desktop only */}
        <div
          className="hidden sm:flex items-center gap-3 shrink-0 border-r"
          style={{
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <span
            className="h-px w-4 flex-shrink-0"
            style={{ backgroundColor: "var(--color-red-500)" }}
          />
          <span
            className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] whitespace-nowrap"
            style={{ color: "rgba(231,238,246,0.45)" }}
          >
            {trust_bar.label}
          </span>
        </div>

        {/* Marquee */}
        <div
          className="relative flex-1 overflow-hidden trust-bar-marquee"
          style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem" }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, var(--color-navy-800) 30%, transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, var(--color-navy-800) 30%, transparent)",
            }}
          />

          <div
            className="trust-bar-track flex items-center"
            style={{ width: "max-content" }}
          >
            {track.map((institution, i) => (
              <span key={i} className="flex items-center">
                <span
                  className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.18em] whitespace-nowrap select-none"
                  style={{ color: "rgba(215,227,243,0.75)" }}
                >
                  {institution}
                </span>
                <span
                  className="mx-6 md:mx-8 flex-shrink-0 rounded-full"
                  style={{
                    width: "3px",
                    height: "3px",
                    display: "inline-block",
                    backgroundColor: "var(--color-red-500)",
                    opacity: 0.55,
                  }}
                />
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
