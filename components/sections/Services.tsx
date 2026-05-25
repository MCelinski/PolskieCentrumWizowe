"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLangContent, useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";
import Button from "@/components/ui/Button";
import { localizePath } from "@/lib/i18n";

export default function Services() {
  const content = useLangContent();
  const { lang } = useLanguage();
  const { services } = content.home;
  const { ref, inView } = useInView(0.08);
  const [openId, setOpenId] = useState(services.items[0]?.id ?? "");

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="uslugi"
      className={`section-padding surface-navy relative in-view-group${inView ? " is-visible" : ""}`}
      aria-labelledby="services-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: "rgba(222, 231, 242, 0.22)" }} aria-hidden="true" />

      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4 lg:sticky lg:top-[7.5rem] self-start animate-fade-right" style={{ animationDelay: "0ms" }}>
            <p className="section-eyebrow section-eyebrow-light mb-5 animate-fade-up" style={{ animationDelay: "20ms" }}>{services.section_label}</p>
            <div className="accent-rule mb-6 animate-scale-in" style={{ animationDelay: "80ms" }} aria-hidden="true" />
            <h2
              id="services-heading"
              className="font-serif mb-6 animate-fade-up"
              style={{
                color: "var(--color-white)",
                fontSize: "clamp(2rem, 4.7vw, 3.9rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                animationDelay: "120ms",
              }}
            >
              {services.headline}
            </h2>
            {services.subheadline && (
              <p className="font-sans text-base leading-relaxed mb-9 animate-fade-up" style={{ color: "rgba(225, 233, 243, 0.84)", maxWidth: "360px", animationDelay: "180ms" }}>
                {services.subheadline}
              </p>
            )}
            <div className="animate-fade-up" style={{ animationDelay: "240ms" }}>
              <Button label={content.nav.cta} href={localizePath("/konsultacje", lang)} variant="outline-light" />
            </div>
          </div>

          <div className="lg:col-span-8 animate-fade-left" style={{ animationDelay: "80ms" }}>
            <div className="border-t" style={{ borderColor: "rgba(214, 224, 236, 0.18)" }}>
              {services.items.map((service, index) => {
                const isOpen = openId === service.id;
                const panelId = `service-panel-${service.id}`;
                const buttonId = `service-button-${service.id}`;

                return (
                  <article
                    key={service.id}
                    className="border-b animate-fade-up"
                    style={{
                      borderColor: "rgba(214, 224, 236, 0.18)",
                      animationDelay: `${120 + index * 45}ms`,
                    }}
                  >
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? "" : service.id)}
                      className="group grid w-full cursor-pointer grid-cols-[2.25rem_minmax(0,1fr)_2rem] items-center gap-4 py-5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-red-600 md:grid-cols-[3.25rem_minmax(0,1fr)_auto_2.5rem] md:gap-6 md:py-6"
                      style={{
                        color: "var(--color-white)",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.025)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <span
                        className="font-sans text-xs font-semibold tabular-nums"
                        style={{
                          color: isOpen ? "var(--color-red-500)" : "rgba(223, 230, 242, 0.48)",
                          letterSpacing: "0.1em",
                        }}
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0">
                        <span
                          className="block font-serif font-medium leading-snug"
                          style={{
                            color: "var(--color-white)",
                            fontSize: "clamp(1.25rem, 2.1vw, 1.85rem)",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {service.title}
                        </span>
                      </span>

                      <span
                        className="hidden max-w-[18rem] truncate font-sans text-xs md:block"
                        style={{ color: "rgba(224, 232, 243, 0.55)", letterSpacing: "0.02em" }}
                      >
                        {service.tags.slice(0, 2).join(" / ")}
                      </span>

                      <span
                        className="flex h-8 w-8 items-center justify-center justify-self-end border transition-colors duration-200"
                        style={{
                          borderColor: isOpen ? "rgba(196, 32, 33, 0.72)" : "rgba(214, 224, 236, 0.22)",
                          color: isOpen ? "var(--color-red-500)" : "rgba(224, 232, 243, 0.68)",
                        }}
                        aria-hidden="true"
                      >
                        <ChevronDown
                          size={16}
                          strokeWidth={1.8}
                          className="transition-transform duration-200"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                    >
                      <div className="pb-7 pl-[3.25rem] pr-0 md:pb-8 md:pl-[4.75rem] md:pr-[4.5rem]">
                        <div
                          className="border-l pl-5 md:pl-6"
                          style={{ borderColor: "rgba(196, 32, 33, 0.55)" }}
                        >
                          <p
                            className="font-sans text-sm leading-relaxed md:text-base"
                            style={{ color: "rgba(224, 232, 243, 0.8)", maxWidth: "680px" }}
                          >
                            {service.description}
                          </p>

                          {service.tags.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-2">
                              {service.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="border px-3 py-1.5 font-sans text-[11px] font-medium"
                                  style={{
                                    borderColor: "rgba(214, 224, 236, 0.16)",
                                    color: "rgba(224, 232, 243, 0.68)",
                                    backgroundColor: "rgba(255,255,255,0.025)",
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="mt-6">
                            <Button
                              label={content.nav.cta}
                              href={localizePath("/konsultacje", lang)}
                              variant="outline-light"
                              size="sm"
                            />
                          </div>
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
