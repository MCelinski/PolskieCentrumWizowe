"use client";

import { useEffect, useState } from "react";
import { useLangContent } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";

function parseValue(v: string): { num: number; suffix: string } {
  const match = v.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: v };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, target, duration]);

  return value;
}

/* ─── Featured card — 500+, anchors the grid visually ─────────────────────── */
interface FeaturedProps {
  value: string;
  label: string;
  sublabel?: string;
  triggered: boolean;
}

function FeaturedCard({ value, label, sublabel, triggered }: FeaturedProps) {
  const { num, suffix } = parseValue(value);
  const count = useCountUp(num, 1800, triggered);

  return (
    <div
      className="animate-count-in relative overflow-hidden p-5 md:p-6 lg:p-7 flex flex-col col-span-2 sm:col-span-1"
      style={{
        animationDelay: "0ms",
        borderTop: "2px solid var(--color-red-500)",
        borderRight: "1px solid rgba(225,233,243,0.09)",
        borderBottom: "1px solid rgba(225,233,243,0.09)",
        borderLeft: "1px solid rgba(225,233,243,0.09)",
        backgroundColor: "rgba(196,32,33,0.06)",
      }}
    >
      {/* Red radial atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(340px 220px at 2% 4%, rgba(196,32,33,0.22), transparent 62%)",
        }}
      />

      <div className="relative">
        {/* Eyebrow label */}
        <p
          className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] mb-5"
          style={{ color: "rgba(196,32,33,0.80)" }}
        >
          {label}
        </p>

        {/* Number */}
        <span
          className="font-serif font-medium leading-none block"
          style={{
            color: "var(--color-white)",
            fontSize: "clamp(3.2rem, 7vw, 5.4rem)",
            letterSpacing: "-0.05em",
          }}
        >
          {triggered ? count : 0}
          {suffix}
        </span>

        {/* Red separator */}
        {sublabel && (
          <div
            className="mt-5 pt-4"
            style={{ borderTop: "1px solid rgba(196,32,33,0.28)" }}
          >
            <span
              className="font-sans text-[11px] leading-relaxed"
              style={{ color: "rgba(225,233,243,0.48)" }}
            >
              {sublabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Secondary card — 93 %, 10+, 85 % ────────────────────────────────────── */
interface SecondaryProps {
  value: string;
  label: string;
  sublabel?: string;
  triggered: boolean;
  delay: number;
}

function SecondaryCard({ value, label, sublabel, triggered, delay }: SecondaryProps) {
  const { num, suffix } = parseValue(value);
  const count = useCountUp(num, 1500, triggered);

  return (
    <div
      className="animate-count-in relative overflow-hidden p-5 md:p-6 flex flex-col"
      style={{
        animationDelay: `${delay}ms`,
        borderTop: "2px solid rgba(196,32,33,0.32)",
        borderRight: "1px solid rgba(225,233,243,0.08)",
        borderBottom: "1px solid rgba(225,233,243,0.08)",
        borderLeft: "1px solid rgba(225,233,243,0.08)",
        backgroundColor: "rgba(255,255,255,0.025)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div className="relative">
        {/* Number */}
        <span
          className="font-serif font-medium leading-none block"
          style={{
            color: "var(--color-cream)",
            fontSize: "clamp(2.2rem, 4.2vw, 3.4rem)",
            letterSpacing: "-0.045em",
          }}
        >
          {triggered ? count : 0}
          {suffix}
        </span>

        {/* Gradient rule */}
        <div
          className="mt-4 mb-3"
          aria-hidden="true"
          style={{
            height: "1px",
            width: "1.75rem",
            background:
              "linear-gradient(to right, rgba(225,233,243,0.22), transparent)",
          }}
        />

        {/* Label */}
        <span
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] block"
          style={{ color: "rgba(168,196,224,0.65)" }}
        >
          {label}
        </span>

        {sublabel && (
          <span
            className="font-sans block mt-1.5 text-[11px] leading-snug"
            style={{ color: "rgba(168,196,224,0.36)" }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────────────────────── */
export default function TrustMetrics() {
  const content = useLangContent();
  const { trust_metrics } = content.home;
  const { ref, inView } = useInView(0.2);
  const [primary, ...secondary] = trust_metrics.items;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative section-padding in-view-group${inView ? " is-visible" : ""}`}
      style={{ backgroundColor: "var(--color-navy-950)" }}
      aria-labelledby="trust-heading"
    >
      {/* Red top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ backgroundColor: "var(--color-red-500)", opacity: 0.5 }}
        aria-hidden="true"
      />
      {/* Red bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: "var(--color-red-500)", opacity: 0.18 }}
        aria-hidden="true"
      />

      <div className="container-editorial">
        {/* ── Two-column editorial: headline left | stats right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">

          {/* Left — headline only, no card */}
          <div className="lg:pt-1 lg:max-w-[13rem]">
            <div className="accent-rule mb-5" aria-hidden="true" />
            <h2
              id="trust-heading"
              className="font-serif"
              style={{
                color: "var(--color-cream)",
                fontSize: "clamp(1.45rem, 2.4vw, 2rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                textWrap: "balance",
              }}
            >
              {trust_metrics.headline}
            </h2>
          </div>

          {/* Right — compact stat grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {primary && (
              <FeaturedCard
                value={primary.value}
                label={primary.label}
                sublabel={primary.sublabel}
                triggered={inView}
              />
            )}
            {secondary.map((item, i) => (
              <SecondaryCard
                key={i}
                value={item.value}
                label={item.label}
                sublabel={item.sublabel}
                triggered={inView}
                delay={(i + 1) * 110}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
