"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLangContent } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";

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
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, [items.length]);

  const item = items[index] ?? items[0];

  const goTo = (i: number) => {
    setVisible(false);
    setTimeout(() => { setIndex(i); setVisible(true); }, 300);
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="opinie"
      className={`surface-soft in-view-group overflow-hidden${inView ? " is-visible" : ""}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">

        {/* ── LEFT: editorial quote content ── */}
        <div
          className="section-padding px-6 md:px-10 lg:pl-[max(3rem,calc((100vw-1240px)/2+3rem))] lg:pr-14 xl:pr-20 order-2 lg:order-1"
        >

          {/* Header row */}
          <div
            className="flex items-end justify-between mb-10 md:mb-14 animate-fade-right"
            style={{ animationDelay: "0ms" }}
          >
            <div>
              <p
                className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold mb-3"
                style={{ color: "var(--color-red-500)" }}
              >
                {testimonials.section_label}
              </p>
              <h2
                id="testimonials-heading"
                className="font-serif"
                style={{
                  color: "var(--color-navy-800)",
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                {testimonials.headline}
              </h2>
            </div>

            {/* Dot nav — desktop */}
            <div
              className="hidden md:flex items-center gap-2 pb-1"
              role="tablist"
              aria-label={testimonials.section_label}
            >
              {items.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => goTo(i)}
                  aria-label={`${testimonials.section_label} ${i + 1}`}
                  style={{
                    width: i === index ? "22px" : "6px",
                    height: "6px",
                    borderRadius: "999px",
                    backgroundColor:
                      i === index
                        ? "var(--color-navy-800)"
                        : "var(--color-sand-400)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "width 0.25s ease, background-color 0.25s ease",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Quote panel */}
          <div
            className="animate-scale-in"
            style={{
              borderTop: "1px solid var(--color-sand-300)",
              animationDelay: "80ms",
            }}
          >
            <article
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(5px)",
                transition: "opacity 0.26s ease, transform 0.26s ease",
              }}
            >
              {/* Opening mark */}
              <div
                className="font-serif select-none mt-7 mb-4 leading-none"
                style={{
                  fontSize: "2.8rem",
                  color: "var(--color-red-500)",
                  opacity: 0.2,
                }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <blockquote
                className="font-serif"
                style={{
                  color: "var(--color-navy-800)",
                  fontSize: "clamp(0.97rem, 1.35vw, 1.15rem)",
                  lineHeight: 1.7,
                  letterSpacing: "-0.01em",
                  fontStyle: "italic",
                  maxWidth: "620px",
                  marginBottom: "1.5rem",
                }}
              >
                {item.quote}
              </blockquote>

              {/* Closing mark */}
              <div
                className="font-serif select-none mb-4 leading-none"
                style={{
                  fontSize: "2.8rem",
                  color: "var(--color-red-500)",
                  opacity: 0.2,
                  maxWidth: "620px",
                  textAlign: "right",
                }}
                aria-hidden="true"
              >
                &rdquo;
              </div>

              <footer className="flex items-center gap-3">
                <div
                  className="w-5 h-px flex-shrink-0"
                  style={{ backgroundColor: "var(--color-red-500)" }}
                  aria-hidden="true"
                />
                <div>
                  <p
                    className="font-sans text-sm font-semibold"
                    style={{ color: "var(--color-navy-800)" }}
                  >
                    {item.author}
                  </p>
                  <p
                    className="font-sans text-xs mt-0.5"
                    style={{ color: "var(--color-sand-500)" }}
                  >
                    {item.role}
                    {item.entity ? ` · ${item.entity}` : ""}
                  </p>
                </div>
              </footer>
            </article>
          </div>

          {/* Dot nav — mobile */}
          <div
            className="flex md:hidden items-center gap-2 mt-7"
            role="tablist"
            aria-label={testimonials.section_label}
          >
            {items.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                onClick={() => goTo(i)}
                aria-label={`${testimonials.section_label} ${i + 1}`}
                style={{
                  width: i === index ? "22px" : "6px",
                  height: "6px",
                  borderRadius: "999px",
                  backgroundColor:
                    i === index
                      ? "var(--color-navy-800)"
                      : "var(--color-sand-400)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "width 0.25s ease, background-color 0.25s ease",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT: full-bleed cinematic image ── */}
        <div className="relative min-h-[300px] lg:min-h-0 order-1 lg:order-2">
          <Image
            src="/images/testimonials.png"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
            unoptimized
          />

          {/* Base mood tint */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(7,27,58,0.18)" }}
            aria-hidden="true"
          />

          {/* Desktop: left edge blends into sand content column */}
          <div
            className="absolute inset-y-0 left-0 hidden lg:block"
            style={{
              width: "48%",
              background:
                "linear-gradient(to right, #f7f8fa 0%, rgba(247,248,250,0.72) 30%, rgba(247,248,250,0.22) 62%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Top-right corner vignette — depth */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 90% 6%, rgba(4,14,32,0.52) 0%, transparent 44%)",
            }}
            aria-hidden="true"
          />

          {/* Bottom vignette — grounds the image */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: "38%",
              background:
                "linear-gradient(to top, rgba(7,27,58,0.42) 0%, rgba(7,27,58,0.12) 55%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Mobile: top fade into sand */}
          <div
            className="absolute inset-x-0 top-0 h-28 lg:hidden"
            style={{
              background:
                "linear-gradient(to bottom, #f7f8fa 0%, rgba(247,248,250,0.65) 42%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Discrete identity badge */}
          <div
            className="absolute bottom-6 right-6 z-10 font-sans"
            style={{
              fontSize: "0.55rem",
              color: "rgba(225,233,243,0.22)",
              border: "1px solid rgba(225,233,243,0.08)",
              padding: "0.45rem 0.95rem",
              backdropFilter: "blur(16px)",
              backgroundColor: "rgba(4,14,32,0.28)",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            PCW — Klienci
          </div>
        </div>

      </div>
    </section>
  );
}
