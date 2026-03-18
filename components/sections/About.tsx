"use client";

import content from "@/content/site-content.json";
import { useInView } from "@/hooks/useInView";

export default function About() {
  const { about } = content.home;
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="o-nas"
      className={`section-padding in-view-group${inView ? " is-visible" : ""}`}
      style={{ backgroundColor: "var(--color-cream)" }}
      aria-labelledby="about-heading"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left column */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <p
              className="section-eyebrow animate-fade-up mb-4 md:mb-5"
              style={{ animationDelay: "0ms" }}
            >
              {about.section_label}
            </p>
            <h2
              id="about-heading"
              className="font-serif font-medium leading-tight animate-fade-up"
              style={{
                color: "var(--color-navy-900)",
                letterSpacing: "-0.02em",
                fontSize: "clamp(1.875rem, 4vw, 3rem)",
                animationDelay: "80ms",
              }}
            >
              {about.headline}
            </h2>
          </div>

          {/* Right column */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-5 md:space-y-7">
              {about.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="font-sans text-base md:text-lg animate-fade-up"
                  style={{
                    color: "var(--color-sand-600)",
                    lineHeight: 1.8,
                    maxWidth: "600px",
                    animationDelay: `${160 + i * 80}ms`,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            <div
              className="mt-8 md:mt-10 pt-8 md:pt-10 border-t flex items-center gap-5 md:gap-6 animate-fade-up"
              style={{
                borderColor: "var(--color-sand-300)",
                animationDelay: "400ms",
              }}
            >
              <div
                className="w-0.5 h-10 md:h-12 flex-shrink-0"
                style={{ backgroundColor: "var(--color-red-600)" }}
                aria-hidden="true"
              />
              <div>
                <p
                  className="font-serif font-medium"
                  style={{
                    color: "var(--color-navy-900)",
                    fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                  }}
                >
                  {about.highlight}
                </p>
                <p
                  className="font-sans text-xs md:text-sm mt-1"
                  style={{ color: "var(--color-sand-500)" }}
                >
                  Najlepsza miara naszej rzetelności
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
