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
        backgroundColor: "var(--color-navy-900)",
        borderTop: "1px solid rgba(196,32,33,0.45)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Accessible list for screen readers */}
      <ul className="sr-only">
        {trust_bar.institutions.map((inst, i) => (
          <li key={i}>{inst}</li>
        ))}
      </ul>

      {/* Mobile label row */}
      <div
        className="lg:hidden flex items-center gap-3 px-6 pt-3.5 pb-1"
        aria-hidden="true"
      >
        <span
          className="h-px w-5 flex-shrink-0"
          style={{ backgroundColor: "var(--color-red-500)" }}
        />
        <span
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: "rgba(231,238,246,0.4)" }}
        >
          {trust_bar.label}
        </span>
      </div>

      {/* Desktop: label panel + marquee side by side */}
      <div className="flex items-stretch" aria-hidden="true">

        {/* Label panel — desktop only */}
        <div
          className="hidden lg:flex items-center gap-3 shrink-0 border-r"
          style={{
            paddingLeft: "2.5rem",
            paddingRight: "2.25rem",
            paddingTop: "1.125rem",
            paddingBottom: "1.125rem",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <span
            className="h-px w-5 flex-shrink-0"
            style={{ backgroundColor: "var(--color-red-500)" }}
          />
          <span
            className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] whitespace-nowrap"
            style={{ color: "rgba(231,238,246,0.4)" }}
          >
            {trust_bar.label}
          </span>
        </div>

        {/* Marquee area */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{ paddingTop: "0.75rem", paddingBottom: "0.875rem" }}
        >
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 lg:w-14 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, var(--color-navy-900) 30%, transparent)",
            }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-8 lg:w-14 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, var(--color-navy-900) 30%, transparent)",
            }}
          />

          {/* Scrolling track */}
          <div
            className="trust-bar-track flex items-center"
            style={{ width: "max-content" }}
          >
            {track.map((institution, i) => (
              <span key={i} className="flex items-center">
                <span
                  className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.18em] whitespace-nowrap select-none"
                  style={{ color: "rgba(215,227,243,0.62)" }}
                >
                  {institution}
                </span>
                <span
                  className="mx-7 md:mx-9 h-px w-5 flex-shrink-0 inline-block"
                  style={{ backgroundColor: "rgba(196,32,33,0.48)" }}
                />
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
