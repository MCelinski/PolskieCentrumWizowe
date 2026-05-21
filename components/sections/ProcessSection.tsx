"use client";

import { useLangContent } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";

export default function ProcessSection() {
  const content = useLangContent();
  const { process } = content.home;
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-padding surface-soft in-view-group overflow-hidden${inView ? " is-visible" : ""}`}
      aria-labelledby="process-heading"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] gap-12 lg:gap-16 xl:gap-20 items-start">
          <div className="lg:sticky lg:top-28 self-start">
            <p className="section-eyebrow animate-fade-right mb-4" style={{ animationDelay: "0ms" }}>
              {process.section_label}
            </p>
            <div className="accent-rule animate-scale-in mb-6" style={{ animationDelay: "60ms" }} aria-hidden="true" />
            <h2
              id="process-heading"
              className="font-serif animate-fade-right mb-6"
              style={{
                color: "var(--color-navy-800)",
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                animationDelay: "120ms",
                textWrap: "balance",
                maxWidth: "12ch",
              }}
            >
              {process.headline}
            </h2>
            <p
              className="font-sans text-sm md:text-base leading-relaxed animate-fade-up max-w-[30rem]"
              style={{ color: "var(--color-sand-600)", animationDelay: "200ms" }}
            >
              Każdy etap prowadzimy w jasno zdefiniowanej sekwencji: od wstępnej kwalifikacji, przez konstrukcję strategii procesowej, po finalne rozstrzygnięcie i wdrożenie dalszych działań.
            </p>
          </div>

          <div className="relative pl-0 md:pl-8 lg:pl-12">
            <div
              className="absolute left-2 md:left-0 top-0 bottom-0 w-px animate-scale-in"
              style={{
                background: "linear-gradient(to bottom, rgba(196,32,33,0.34), rgba(200,206,216,0.45) 18%, rgba(200,206,216,0.7) 82%, rgba(196,32,33,0.2))",
                animationDelay: "120ms",
                transformOrigin: "top",
              }}
              aria-hidden="true"
            />

            <div className="space-y-5 md:space-y-6 lg:space-y-8">
              {process.steps.map((step, i) => {
                const isOffset = i % 2 === 1;

                return (
                  <article
                    key={step.number}
                    className={`relative animate-fade-up ${isOffset ? "lg:ml-14 xl:ml-20" : ""}`}
                    style={{ animationDelay: `${i * 110}ms` }}
                  >
                    <div
                      className="absolute left-2 md:left-0 top-10 md:top-12 -translate-x-1/2 w-3 h-3 rounded-full animate-scale-in"
                      style={{
                        backgroundColor: "var(--color-red-500)",
                        boxShadow: "0 0 0 6px rgba(196,32,33,0.08)",
                        animationDelay: `${80 + i * 110}ms`,
                      }}
                      aria-hidden="true"
                    />

                    <div
                      className="ml-8 md:ml-0 border p-6 md:p-8 lg:p-9 bg-white"
                      style={{
                        borderColor: "var(--color-sand-300)",
                        boxShadow: isOffset ? "0 18px 50px rgba(7,27,58,0.05)" : "0 12px 36px rgba(7,27,58,0.04)",
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-8">
                        <div className="min-w-0 max-w-[42rem]">
                          <p
                            className="font-serif leading-none mb-5"
                            style={{
                              color: "rgba(196,32,33,0.22)",
                              fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
                              letterSpacing: "-0.05em",
                            }}
                            aria-hidden="true"
                          >
                            {step.number}
                          </p>
                          <h3
                            className="font-serif mb-4"
                            style={{
                              color: "var(--color-navy-800)",
                              fontSize: "clamp(1.25rem, 2.1vw, 1.7rem)",
                              lineHeight: 1.18,
                              letterSpacing: "-0.02em",
                              textWrap: "balance",
                            }}
                          >
                            {step.title}
                          </h3>
                          <p
                            className="font-sans text-sm md:text-base leading-relaxed"
                            style={{ color: "var(--color-sand-600)", maxWidth: "60ch" }}
                          >
                            {step.description}
                          </p>
                        </div>

                        <div className="flex items-center md:flex-col md:items-end gap-3 md:gap-4 flex-shrink-0">
                          <span
                            className="w-10 md:w-12 h-px"
                            style={{ backgroundColor: "var(--color-red-500)" }}
                            aria-hidden="true"
                          />
                          <span
                            className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-semibold"
                            style={{ color: "var(--color-sand-500)" }}
                          >
                            Etap {step.number}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
