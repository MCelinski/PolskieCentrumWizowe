import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import content from "@/content/site-content.json";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Contact() {
  const { contact } = content.home;

  return (
    <section
      id="kontakt"
      className="section-padding"
      style={{ backgroundColor: "var(--color-cream)" }}
      aria-labelledby="contact-heading"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left — header and contact details */}
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow={contact.section_label}
              headline={contact.headline}
              subheadline={contact.subheadline}
              align="left"
            />

            <div className="mt-10 space-y-5">
              <ContactDetail icon={Mail} label="E-mail" value={contact.email} href={`mailto:${contact.email}`} />
              <ContactDetail icon={Phone} label="Telefon" value={contact.phone} href={`tel:${contact.phone.replace(/\s/g, "")}`} />
              <ContactDetail icon={MapPin} label="Adres" value={contact.address} />
              <ContactDetail icon={Clock} label="Godziny pracy" value={contact.hours} />
            </div>
          </div>

          {/* Right — CTA card */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div
              className="p-10 md:p-12"
              style={{
                backgroundColor: "var(--color-navy-900)",
              }}
            >
              <p
                className="section-eyebrow mb-4"
                style={{ color: "rgba(168,196,224,0.7)" }}
              >
                Gotowy na kolejny krok?
              </p>
              <h3
                className="font-serif text-3xl md:text-4xl font-medium mb-5"
                style={{ color: "var(--color-cream)", letterSpacing: "-0.02em" }}
              >
                Umów konsultację online
              </h3>
              <p
                className="font-sans text-sm leading-relaxed mb-8"
                style={{ color: "rgba(208,222,238,0.7)" }}
              >
                Wypełnij krótki formularz, a nasz doradca skontaktuje się z Tobą w ciągu 24 godzin, aby omówić Twoją sytuację.
              </p>
              <Link
                href={contact.cta.href}
                className="inline-flex items-center justify-center w-full font-sans text-sm font-medium px-8 py-4 transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: "var(--color-cream)",
                  color: "var(--color-navy-900)",
                }}
              >
                {contact.cta.label}
              </Link>
              <p
                className="font-sans text-xs mt-5 text-center"
                style={{ color: "rgba(168,196,224,0.45)" }}
              >
                Bezpłatna wstępna analiza sytuacji
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
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div
        className="mt-0.5 flex-shrink-0"
        style={{ color: "var(--color-navy-600)" }}
      >
        <Icon size={16} strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: "var(--color-sand-400)", letterSpacing: "0.12em" }}>
          {label}
        </p>
        <p className="font-sans text-sm" style={{ color: "var(--color-navy-800)" }}>
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block group transition-opacity duration-150 hover:opacity-70">
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}
