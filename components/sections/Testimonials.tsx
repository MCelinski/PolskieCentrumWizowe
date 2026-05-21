"use client";

import { useEffect, useState } from "react";
import { useLangContent } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Testimonials() {
  const content = useLangContent();
  const { testimonials } = content.home;
  const items = testimonials.items.slice(0, 4);
  const { ref, inView } = useInView(0.12);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setIndex(0);
  }, [testimonials]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % items.length);
        setVisible(true);
      }, 360);
    }, 6200);

    return () => clearInterval(interval);
  }, [items.length]);

  const item = items[index] ?? items[0];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="opinie" className={`section-padding surface-soft in-view-group${inView ? " is-visible" : ""}`} aria-labelledby="testimonials-heading">
      <div className="container-editorial">
        <div className="mb-14 md:mb-20 animate-fade-right" style={{ animationDelay: "0ms" }}>
          <SectionHeader eyebrow={testimonials.section_label} headline={testimonials.headline} align="left" />
        </div>

        <div className="border-t animate-scale-in" style={{ borderColor: "var(--color-sand-300)", animationDelay: "120ms" }}>
          <article
            className="py-12 md:py-14"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            <blockquote
              className="font-serif leading-relaxed mb-10 animate-fade-up"
              style={{
                color: "var(--color-navy-800)",
                fontSize: "clamp(1.45rem, 3vw, 2.4rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.35,
                maxWidth: "920px",
                animationDelay: "180ms",
                fontStyle: "italic",
              }}
            >
              {item.quote}
            </blockquote>

            <footer className="flex items-center gap-4 animate-fade-left" style={{ animationDelay: "260ms" }}>
              <div className="w-8 h-0.5" style={{ backgroundColor: "var(--color-red-500)" }} aria-hidden="true" />
              <div>
                <p className="font-sans text-sm font-semibold" style={{ color: "var(--color-navy-800)" }}>
                  {item.author}
                </p>
                <p className="font-sans text-xs mt-1" style={{ color: "var(--color-sand-500)" }}>
                  {item.role} - {item.entity}
                </p>
              </div>
            </footer>
          </article>

          <div className="border-t pt-6 flex items-center gap-3 animate-fade-up" style={{ borderColor: "var(--color-sand-300)", animationDelay: "320ms" }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setVisible(false);
                  setTimeout(() => {
                    setIndex(i);
                    setVisible(true);
                  }, 360);
                }}
                aria-label={`${testimonials.section_label} ${i + 1}`}
                style={{
                  width: i === index ? "26px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  backgroundColor: i === index ? "var(--color-navy-800)" : "var(--color-sand-400)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "width 0.25s ease, background-color 0.25s ease, transform 0.25s ease",
                  transform: i === index ? "scaleX(1)" : "scaleX(0.95)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
