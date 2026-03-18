import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VisaQualificationForm from "@/components/forms/VisaQualificationForm";
import GeneralConsultationForm from "@/components/forms/GeneralConsultationForm";
import content from "@/content/site-content.json";

export const metadata: Metadata = {
  title: "Konsultacje — Polskie Centrum Wizowe",
  description:
    "Umów konsultację wizową lub ogólną. Wstępna kwalifikacja wizowa online — odpowiadamy w ciągu 24 godzin.",
};

export default function KonsultacjePage() {
  const { consultations } = content;
  const { hero, visa_form, general_form } = consultations;

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Page hero */}
        <section
          className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden"
          style={{ backgroundColor: "var(--color-navy-900)" }}
          aria-labelledby="consultations-heading"
        >
          {/* Red top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ backgroundColor: "var(--color-red-600)" }}
            aria-hidden="true"
          />

          {/* Subtle radial gradient */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(43,81,131,0.5) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="container-editorial relative z-10">
            <div className="max-w-2xl">
              <p
                className="section-eyebrow mb-5"
                style={{ color: "rgba(168,196,224,0.75)" }}
              >
                {hero.eyebrow}
              </p>
              <h1
                id="consultations-heading"
                className="font-serif font-medium mb-6"
                style={{
                  color: "var(--color-cream)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                {hero.headline}
              </h1>
              <p
                className="font-sans text-base md:text-lg leading-relaxed"
                style={{ color: "rgba(208,222,238,0.75)" }}
              >
                {hero.subheadline}
              </p>
            </div>
          </div>
        </section>

        {/* Forms section */}
        <section
          className="section-padding"
          style={{ backgroundColor: "var(--color-cream)" }}
        >
          <div className="container-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ backgroundColor: "var(--color-sand-300)" }}>
              {/* Form A: Visa Qualification */}
              <div
                className="p-8 md:p-12"
                style={{ backgroundColor: "var(--color-cream)" }}
              >
                {/* Form header */}
                <div className="mb-10 pb-8 border-b" style={{ borderColor: "var(--color-sand-300)" }}>
                  <span
                    className="inline-block font-sans text-xs font-medium uppercase tracking-widest mb-3"
                    style={{
                      color: "var(--color-cream)",
                      backgroundColor: "var(--color-navy-900)",
                      padding: "0.3rem 0.75rem",
                      letterSpacing: "0.12em",
                    }}
                  >
                    Formularz A
                  </span>
                  <h2
                    className="font-serif text-2xl md:text-3xl font-medium mt-4 mb-3"
                    style={{ color: "var(--color-navy-900)", letterSpacing: "-0.02em" }}
                  >
                    {visa_form.title}
                  </h2>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "var(--color-sand-600)" }}
                  >
                    {visa_form.description}
                  </p>
                </div>
                <VisaQualificationForm />
              </div>

              {/* Form B: General Consultation */}
              <div
                className="p-8 md:p-12"
                style={{ backgroundColor: "var(--color-sand-100)" }}
              >
                {/* Form header */}
                <div className="mb-10 pb-8 border-b" style={{ borderColor: "var(--color-sand-300)" }}>
                  <span
                    className="inline-block font-sans text-xs font-medium uppercase tracking-widest mb-3"
                    style={{
                      color: "var(--color-navy-900)",
                      backgroundColor: "transparent",
                      border: "1px solid var(--color-navy-900)",
                      padding: "0.3rem 0.75rem",
                      letterSpacing: "0.12em",
                    }}
                  >
                    Formularz B
                  </span>
                  <h2
                    className="font-serif text-2xl md:text-3xl font-medium mt-4 mb-3"
                    style={{ color: "var(--color-navy-900)", letterSpacing: "-0.02em" }}
                  >
                    {general_form.title}
                  </h2>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "var(--color-sand-600)" }}
                  >
                    {general_form.description}
                  </p>
                </div>
                <GeneralConsultationForm />
              </div>
            </div>

            {/* Reassurance bar */}
            <div
              className="mt-px p-8 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
              style={{ backgroundColor: "var(--color-navy-900)" }}
            >
              <Reassurance label="Bezpieczne dane" description="Ochrona zgodna z RODO" />
              <div className="hidden sm:block w-px h-8" style={{ backgroundColor: "rgba(168,196,224,0.2)" }} aria-hidden="true" />
              <Reassurance label="Odpowiedź w 24h" description="W dni robocze" />
              <div className="hidden sm:block w-px h-8" style={{ backgroundColor: "rgba(168,196,224,0.2)" }} aria-hidden="true" />
              <Reassurance label="Bez zobowiązań" description="Wstępna analiza gratis" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Reassurance({ label, description }: { label: string; description: string }) {
  return (
    <div className="text-center">
      <p className="font-sans text-sm font-medium" style={{ color: "var(--color-cream)" }}>
        {label}
      </p>
      <p className="font-sans text-xs mt-0.5" style={{ color: "rgba(168,196,224,0.55)" }}>
        {description}
      </p>
    </div>
  );
}
