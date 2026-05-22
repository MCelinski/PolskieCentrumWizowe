"use client";

import { useLangContent, useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";
import ServiceCard from "@/components/ui/ServiceCard";
import Button from "@/components/ui/Button";
import { localizePath } from "@/lib/i18n";

export default function Services() {
  const content = useLangContent();
  const { lang } = useLanguage();
  const { services } = content.home;
  const { ref, inView } = useInView(0.08);

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
            {services.items.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                tags={service.tags}
                index={index}
                dark
                className="animate-fade-up"
              />
            ))}
            <div className="border-t animate-scale-in" style={{ borderColor: "rgba(214, 224, 236, 0.18)", animationDelay: "360ms" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
