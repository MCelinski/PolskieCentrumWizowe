"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/content/site-content.json";
import { useInView } from "@/hooks/useInView";

function parseValue(v: string): { num: number; suffix: string } {
  const match = v.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: v };
  return { num: parseInt(match[1]), suffix: match[2] };
}

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let start: number | null = null;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
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
      className="animate-count-in flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        className="font-serif text-5xl md:text-6xl font-light leading-none tracking-tight"
        style={{ color: "#F8F7F4" }}
      >
        {triggered ? count : 0}
        {suffix}
      </span>
      <span
        className="mt-3 font-sans text-sm font-medium uppercase tracking-widest"
        style={{ color: "rgba(168,196,224,0.9)", letterSpacing: "0.12em" }}
      >
        {label}
      </span>
      {sublabel && (
        <span
          className="mt-1 font-sans text-xs"
          style={{ color: "rgba(208,220,235,0.6)" }}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
}

export default function TrustMetrics() {
  const { trust_metrics } = content.home;
  const { ref, inView } = useInView(0.2);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-padding in-view-group${inView ? " is-visible" : ""}`}
      style={{ backgroundColor: "var(--color-navy-900)" }}
      aria-labelledby="trust-heading"
    >
      <div className="container-editorial">
        <div className="flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-24">

          {/* Left label */}
          <div className="lg:w-72 flex-shrink-0">
            <p
              className="section-eyebrow mb-5"
              style={{ color: "rgba(168,196,224,0.7)" }}
            >
              {trust_metrics.section_label}
            </p>
            <h2
              id="trust-heading"
              className="font-serif text-3xl md:text-4xl font-medium leading-tight"
              style={{ color: "var(--color-cream)", letterSpacing: "-0.02em" }}
            >
              {trust_metrics.headline}
            </h2>
          </div>

          {/* Animated stats grid */}
          <div
            className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x"
            style={{ "--tw-divide-opacity": "1" } as React.CSSProperties}
          >
            {trust_metrics.items.map((item, i) => (
              <div key={i} className="lg:px-10 first:pl-0">
                <AnimatedStat
                  value={item.value}
                  label={item.label}
                  sublabel={item.sublabel}
                  triggered={inView}
                  delay={i * 100}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
