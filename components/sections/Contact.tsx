"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLangContent } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Contact() {
  const content = useLangContent();
  const { contact } = content.home;
  const { ref, inView } = useInView(0.12);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="kontakt" className={`section-padding surface-navy in-view-group${inView ? " is-visible" : ""}`} aria-labelledby="contact-heading">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div className="lg:col-span-5 animate-fade-right" style={{ animationDelay: "0ms" }}>
            <SectionHeader
              eyebrow={contact.section_label}
              headline={contact.headline}
              subheadline={contact.subheadline}
              align="left"
              light
            />

            <div className="mt-10 space-y-6">
              <ContactDetail icon={Mail} label="E-mail" value={contact.email} href={`mailto:${contact.email}`} delay="100ms" />
              <ContactDetail icon={Phone} label="Telefon" value={contact.phone} href={`tel:${contact.phone.replace(/\s/g, "")}`} delay="160ms" />
              <ContactDetail icon={MapPin} label="Adres" value={contact.address} delay="220ms" />
              <ContactDetail icon={Clock} label="Godziny pracy" value={contact.hours} delay="280ms" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 animate-fade-left" style={{ animationDelay: "100ms" }}>
            <div className="p-9 md:p-12 surface-white animate-scale-in" style={{ animationDelay: "180ms" }}>
              <p className="section-eyebrow mb-4" style={{ color: "var(--color-navy-600)" }}>
                {contact.section_label}
              </p>
              <div className="accent-rule mb-5" aria-hidden="true" />
              <h3
                className="font-serif text-3xl md:text-4xl mb-5"
                style={{ color: "var(--color-navy-800)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                {contact.headline}
              </h3>
              <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: "var(--color-sand-600)" }}>
                {contact.subheadline}
              </p>
              <Link
                href={contact.cta.href}
                className="inline-flex items-center justify-center w-full font-sans text-sm font-semibold px-8 py-4 border transition-colors duration-200"
                style={{ backgroundColor: "var(--color-navy-800)", color: "var(--color-white)", borderColor: "var(--color-navy-800)" }}
              >
                {contact.cta.label}
              </Link>
              <p className="font-sans text-xs mt-5 text-center" style={{ color: "var(--color-sand-500)" }}>
                {contact.cta.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactDetail({
  icon: Icon,
  label,
  value,
  href,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  delay: string;
}) {
  const detail = (
    <div className="flex items-start gap-4 animate-fade-up" style={{ animationDelay: delay }}>
      <div className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-red-500)" }}>
        <Icon size={16} strokeWidth={1.8} />
      </div>
      <div>
        <p className="font-sans text-xs uppercase tracking-[0.14em] mb-1" style={{ color: "rgba(225, 233, 243, 0.64)" }}>
          {label}
        </p>
        <p className="font-sans text-sm" style={{ color: "rgba(235, 241, 249, 0.9)" }}>
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition-opacity duration-150 hover:opacity-80">
        {detail}
      </a>
    );
  }

  return detail;
}
