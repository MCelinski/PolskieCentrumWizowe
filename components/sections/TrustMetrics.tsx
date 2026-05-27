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

interface AnimatedStatProps {
  value: string;
  label: string;
  sublabel?: string;
  triggered: boolean;
  delay: number;
}

function AnimatedStat({ value, label, sublabel, triggered, delay }: AnimatedStatProps) {
  const { num, suffix } = parseValue(value);
  const count = useCountUp(num, 1600, triggered);

  return (
    <div
      className="animate-count-in h-full border p-6 md:p-7 flex flex-col justify-between"
      style={{
        animationDelay: `${delay}ms`,
        borderColor: "rgba(225,233,243,0.08)",
        backgroundColor: "rgba(255,255,255,0.03)",
      }}
    >
      <span
        className="font-serif font-medium leading-none"
        style={{
          color: "var(--color-cream)",
          fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
          letterSpacing: "-0.03em",
        }}
      >
        {triggered ? count : 0}
        {suffix}
      </span>
      <div
        className="mt-8 border-t pt-4"
        style={{ borderColor: "rgba(225,233,243,0.1)" }}
      >
        <span
          className="font-sans text-xs font-semibold uppercase tracking-[0.16em]"
          style={{ color: "rgba(168,196,224,0.75)" }}
        >
          {label}
        </span>
        {sublabel && (
          <span
            className="block mt-2 font-sans text-sm leading-relaxed"
            style={{ color: "rgba(168,196,224,0.45)" }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

function FeaturedStat({ value, label, sublabel, triggered }: Omit<AnimatedStatProps, "delay">) {
  const { num, suffix } = parseValue(value);
  const count = useCountUp(num, 1800, triggered);

  return (
    <div
      className="animate-count-in relative overflow-hidden border p-7 md:p-9 lg:p-10"
      style={{
        borderColor: "rgba(225,233,243,0.12)",
        backgroundColor: "rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(520px 220px at 12% 18%, rgba(196,32,33,0.22), transparent 62%)",
        }}
        aria-hidden="true"
      />
      <div className="relative">
        <p
          className="font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] mb-8"
          style={{ color: "rgba(225,233,243,0.52)" }}
        >
          {label}
        </p>
        <div>
          <span
            className="font-serif font-medium leading-none"
            style={{
              color: "var(--color-white)",
              fontSize: "clamp(4rem, 10vw, 7rem)",
              letterSpacing: "-0.05em",
            }}
          >
            {triggered ? count : 0}
            {suffix}
          </span>
          {sublabel ? (
            <p
              className="mt-5 max-w-[22rem] border-t pt-4 font-sans text-sm leading-relaxed text-pretty"
              style={{
                color: "rgba(225,233,243,0.66)",
                borderColor: "rgba(225,233,243,0.14)",
              }}
            >
              {sublabel}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function TrustMetrics() {
  const content = useLangContent();
  const { trust_metrics } = content.home;
  const { ref, inView } = useInView(0.2);
  const [primaryItem, ...secondaryItems] = trust_metrics.items;

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
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)] gap-6 lg:gap-8 items-stretch">

          {/* Header card */}
          <div
            className="border p-6 md:p-8 flex flex-col justify-between"
            style={{
              borderColor: "rgba(225,233,243,0.1)",
              backgroundColor: "transparent",
            }}
          >
            <div>
              <div className="accent-rule mb-6" aria-hidden="true" />
              <h2
                id="trust-heading"
                className="font-serif max-w-[14ch]"
                style={{
                  color: "var(--color-cream)",
                  fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
                  lineHeight: 1.1,
                  textWrap: "balance",
                }}
              >
                {trust_metrics.headline}
              </h2>
            </div>

            <div
              className="hidden"
              style={{
                borderColor: "rgba(225,233,243,0.1)",
                animationDelay: "120ms",
              }}
            >
              <p
                className="font-sans text-sm leading-relaxed max-w-[28rem]"
                style={{ color: "rgba(225,233,243,0.5)" }}
              >
                Skala prowadzonych spraw, zasięg jurysdykcyjny i ciągłość praktyki pokazane przez mierzalne rezultaty.
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] gap-4 md:gap-5">
            {primaryItem ? (
              <FeaturedStat
                value={primaryItem.value}
                label={primaryItem.label}
                sublabel={primaryItem.sublabel}
                triggered={inView}
              />
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 md:gap-5">
              {secondaryItems.map((item, i) => (
                <AnimatedStat
                  key={i}
                  value={item.value}
                  label={item.label}
                  sublabel={item.sublabel}
                  triggered={inView}
                  delay={(i + 1) * 120}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
