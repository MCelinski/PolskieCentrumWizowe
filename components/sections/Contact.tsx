"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLangContent, useLanguage } from "@/contexts/LanguageContext";
import { localizePath } from "@/lib/i18n";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Contact() {
  const content = useLangContent();
  const { contact } = content.home;
  const { lang } = useLanguage();
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
            <div
              className="relative p-9 md:p-12"
              style={{
                border: "1px solid rgba(225,233,243,0.1)",
                background: "rgba(225,233,243,0.025)",
              }}
            >
              {/* Corner crop mark — top left */}
              <div className="absolute top-0 left-0" style={{ width: "20px", height: "20px" }} aria-hidden="true">
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", backgroundColor: "rgba(196,32,33,0.55)" }} />
                <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "100%", backgroundColor: "rgba(196,32,33,0.55)" }} />
              </div>
              {/* Corner crop mark — bottom right */}
              <div className="absolute bottom-0 right-0" style={{ width: "20px", height: "20px" }} aria-hidden="true">
                <div style={{ position: "absolute", bottom: 0, right: 0, width: "100%", height: "1px", backgroundColor: "rgba(196,32,33,0.55)" }} />
                <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "100%", backgroundColor: "rgba(196,32,33,0.55)" }} />
              </div>

              {/* Red accent line */}
              <div
                className="mb-9"
                style={{ width: "36px", height: "1px", backgroundColor: "var(--color-red-500)", opacity: 0.55 }}
                aria-hidden="true"
              />

              {/* Panel heading */}
              <h3
                className="font-serif mb-9"
                style={{
                  color: "var(--color-white)",
                  fontSize: "clamp(1.8rem, 2.6vw, 2.5rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.035em",
                }}
              >
                {contact.cta_panel_title}
              </h3>

              {/* Separator */}
              <div
                style={{ height: "1px", backgroundColor: "rgba(225,233,243,0.07)", marginBottom: "2.5rem" }}
                aria-hidden="true"
              />

              {/* Primary CTA button */}
              <Link
                href={localizePath(contact.cta.href, lang)}
                className="group inline-flex items-center justify-between w-full font-sans font-medium tracking-[0.12em] uppercase transition-all duration-200 mb-5"
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-navy-900)",
                  backgroundColor: "var(--color-white)",
                  padding: "1.15rem 1.75rem",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-white)";
                }}
              >
                <span>{contact.cta.label}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Assurance microcopy */}
              <p
                className="font-sans text-[11px] text-center leading-relaxed"
                style={{ color: "rgba(225,233,243,0.25)", letterSpacing: "0.03em" }}
              >
                {contact.cta_assurance}
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
