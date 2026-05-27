"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLangContent } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";
import ResponsivePicture from "@/components/ui/ResponsivePicture";

// ─── Inline SVG chevrons (no external icon dep) ──────────────────────────────
function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Arrow button ─────────────────────────────────────────────────────────────
// 44×44 touch target (Apple HIG minimum), subtle hover fill
function ArrowBtn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center rounded-full transition-colors duration-150"
      style={{
        width: "44px",
        height: "44px",
        flexShrink: 0,
        border: "none",
        backgroundColor: "transparent",
        color: "var(--color-navy-600)",
        cursor: "pointer",
        // touch-action handled on the swipe zone, not here
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-sand-200)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
    >
      {children}
    </button>
  );
}

export default function Testimonials() {
  const content = useLangContent();
  const { testimonials } = content.home;
  const items = testimonials.items;
  const { ref, inView } = useInView(0.12);

  const [prevTestimonials, setPrevTestimonials] = useState(testimonials);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Track pointer start position for swipe detection
  const dragStartX = useRef<number | null>(null);
  // Keep interval ref so we can reset it on manual navigation
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  if (prevTestimonials !== testimonials) {
    setPrevTestimonials(testimonials);
    setIndex(0);
  }

  // ── Animate to slide i ────────────────────────────────────────────────────
  const goTo = useCallback((i: number) => {
    setVisible(false);
    setTimeout(() => {
      setIndex(i);
      setVisible(true);
    }, 280);
  }, []);

  // ── Autoplay — extracted so we can restart it on manual nav ───────────────
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % items.length);
        setVisible(true);
      }, 280);
    }, 6000);
  }, [items.length]);

  useEffect(() => {
    startAutoplay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoplay]);

  // Manual navigation — also resets the autoplay timer so it doesn't fire
  // immediately after the user has just manually switched a slide
  const navigate = useCallback((i: number) => {
    goTo(i);
    startAutoplay();
  }, [goTo, startAutoplay]);

  const goPrev = useCallback(() => navigate((index - 1 + items.length) % items.length), [index, items.length, navigate]);
  const goNext = useCallback(() => navigate((index + 1) % items.length), [index, items.length, navigate]);

  // ── Swipe / drag handlers ─────────────────────────────────────────────────
  // touch-action: pan-y on the container allows vertical page scroll while we
  // only intercept clear horizontal drags (≥40px threshold — drag-threshold rule).
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 40) return;    // ignore accidental tiny movements
    if (delta < 0) goNext(); else goPrev();
  };
  const onPointerCancel = () => { dragStartX.current = null; };

  // ── Desktop nav: dots + arrows ───────────────────────────────────────────
  // Each dot button is 44×44 (touch-target-size rule). Works fine on desktop
  // where there is enough horizontal room in the header row.
  const dotNavDesktop = (
    <div
      className="flex items-center"
      role="tablist"
      aria-label={testimonials.section_label}
      style={{ gap: "0" }}
    >
      <ArrowBtn onClick={goPrev} label="Poprzednia opinia">
        <ChevronLeft />
      </ArrowBtn>

      {items.map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          onClick={() => navigate(i)}
          aria-label={`${testimonials.section_label} ${i + 1}`}
          style={{
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              display: "block",
              width: i === index ? "22px" : "6px",
              height: "6px",
              borderRadius: "999px",
              backgroundColor: i === index ? "var(--color-navy-800)" : "var(--color-sand-400)",
              transition: "width 0.25s ease, background-color 0.25s ease",
            }}
          />
        </button>
      ))}

      <ArrowBtn onClick={goNext} label="Następna opinia">
        <ChevronRight />
      </ArrowBtn>
    </div>
  );

  // ── Mobile nav: compact counter ───────────────────────────────────────────
  // "← 4 / 11 →" fits any number of testimonials in a fixed ~160px width.
  // Arrows are 44×44 touch targets. Swipe gesture is the primary navigation.
  const dotNavMobile = (
    <div
      className="flex items-center"
      role="group"
      aria-label={testimonials.section_label}
      style={{ gap: "0" }}
    >
      <ArrowBtn onClick={goPrev} label="Poprzednia opinia">
        <ChevronLeft />
      </ArrowBtn>

      <span
        className="font-sans tabular-nums select-none"
        aria-live="polite"
        aria-atomic="true"
        style={{
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.06em",
          color: "var(--color-sand-500)",
          minWidth: "3.5rem",
          textAlign: "center",
        }}
      >
        {index + 1}
        <span style={{ margin: "0 0.25em", opacity: 0.5 }}>/</span>
        {items.length}
      </span>

      <ArrowBtn onClick={goNext} label="Następna opinia">
        <ChevronRight />
      </ArrowBtn>
    </div>
  );

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="opinie"
      className={`surface-soft in-view-group overflow-hidden${inView ? " is-visible" : ""}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">

        {/* ── LEFT: editorial quote content ── */}
        <div className="section-padding px-6 md:px-10 lg:pl-[max(3rem,calc((100vw-1240px)/2+3rem))] lg:pr-14 xl:pr-20 order-2 lg:order-1">

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

            {/* Compact counter nav — all screen sizes */}
            <div className="flex items-center pb-1 -mr-2">
              {dotNavMobile}
            </div>
          </div>

          {/* Quote panel — swipeable zone ─────────────────────────────────── */}
          {/* touch-action: pan-y allows vertical page scroll; we only capture
              horizontal drags in onPointerUp. select-none prevents text
              selection fighting with the swipe gesture. */}
          <div
            className="animate-scale-in select-none"
            style={{
              borderTop: "1px solid var(--color-sand-300)",
              animationDelay: "80ms",
              display: "grid",
              touchAction: "pan-y",
              cursor: "grab",
            }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            {items.map((t, i) => {
              const active = i === index;
              return (
                <article
                  key={i}
                  aria-hidden={!active}
                  style={{
                    gridArea: "1 / 1",
                    opacity: active && visible ? 1 : 0,
                    transform: active && visible ? "translateY(0)" : "translateY(5px)",
                    transition: "opacity 0.26s ease, transform 0.26s ease",
                    pointerEvents: active ? "auto" : "none",
                  }}
                >
                  {/* Opening mark */}
                  <div
                    className="font-serif select-none mt-7 mb-4 leading-none"
                    style={{ fontSize: "2.8rem", color: "var(--color-red-500)", opacity: 0.2 }}
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
                    {t.quote}
                  </blockquote>

                  {/* Closing mark */}
                  <div
                    className="font-serif select-none mb-4 leading-none"
                    style={{
                      fontSize: "2.8rem",
                      color: "var(--color-red-500)",
                      opacity: 0.2,
                      maxWidth: "620px",
                      width: "100%",
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
                      <p className="font-sans text-sm font-semibold" style={{ color: "var(--color-navy-800)" }}>
                        {t.author}
                      </p>
                      <p className="font-sans text-xs mt-0.5" style={{ color: "var(--color-sand-500)" }}>
                        {t.role}{t.entity ? ` · ${t.entity}` : ""}
                      </p>
                    </div>
                  </footer>
                </article>
              );
            })}
          </div>

        </div>

        {/* ── RIGHT: full-bleed cinematic image ── */}
        <div className="relative min-h-[300px] lg:min-h-0 order-1 lg:order-2">
          <ResponsivePicture
            fallbackSrc="/images/testimonials2.webp"
            srcSet="/images/testimonials2-640.webp 640w, /images/testimonials2-960.webp 960w, /images/testimonials2-1280.webp 1280w, /images/testimonials2.webp 1672w"
            sizes="(max-width: 1024px) 100vw, 40vw"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Subtle mood tint */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(7,27,58,0.28) 0%, rgba(7,27,58,0.12) 45%, transparent 80%)" }}
            aria-hidden="true"
          />

          {/* Desktop: left edge blends into sand content column */}
          <div
            className="absolute inset-y-0 left-0 hidden lg:block"
            style={{
              width: "56%",
              background: "linear-gradient(to right, #f4f7fa 0%, rgba(244,247,250,0.82) 22%, rgba(244,247,250,0.48) 50%, rgba(244,247,250,0.12) 78%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Bottom vignette */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{ height: "38%", background: "linear-gradient(to top, rgba(7,27,58,0.28) 0%, rgba(7,27,58,0.12) 45%, transparent 100%)" }}
            aria-hidden="true"
          />

          {/* Bottom-left corner blend */}
          <div
            className="absolute bottom-0 left-0 hidden lg:block"
            style={{
              width: "62%",
              height: "55%",
              background: "radial-gradient(ellipse at 0% 100%, #f4f7fa 0%, rgba(244,247,250,0.72) 22%, rgba(244,247,250,0.32) 48%, transparent 72%)",
            }}
            aria-hidden="true"
          />

          {/* Mobile: bottom edge blends */}
          <div
            className="absolute inset-x-0 bottom-0 h-28 lg:hidden"
            style={{ background: "linear-gradient(to top, #f4f7fa 0%, rgba(244,247,250,0.7) 40%, rgba(244,247,250,0.2) 75%, transparent 100%)" }}
            aria-hidden="true"
          />

          {/* Corner crop mark */}
          <div className="absolute bottom-6 right-6 z-10" style={{ width: "20px", height: "20px" }} aria-hidden="true">
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "100%", height: "1px", backgroundColor: "rgba(196,32,33,0.45)" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "100%", backgroundColor: "rgba(196,32,33,0.45)" }} />
          </div>
        </div>

      </div>
    </section>
  );
}
