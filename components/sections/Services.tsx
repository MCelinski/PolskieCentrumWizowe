import content from "@/content/site-content.json";
import ServiceCard from "@/components/ui/ServiceCard";
import Button from "@/components/ui/Button";

export default function Services() {
  const { services } = content.home;

  return (
    <section
      id="uslugi"
      className="section-padding relative"
      style={{ backgroundColor: "var(--color-navy-900)" }}
      aria-labelledby="services-heading"
    >
      {/* Top accent line */}
      <div
        className="absolute left-0 right-0 h-px opacity-20"
        style={{ backgroundColor: "var(--color-navy-200)" }}
        aria-hidden="true"
      />

      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left sticky column */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <p
              className="section-eyebrow mb-5"
              style={{ color: "rgba(197,201,208,0.5)" }}
            >
              {services.section_label}
            </p>
            <h2
              id="services-heading"
              className="font-serif font-medium mb-6 md:mb-8"
              style={{
                color: "var(--color-cream)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
              }}
            >
              {services.headline}
            </h2>
            {services.subheadline && (
              <p
                className="font-sans text-sm leading-relaxed mb-8 md:mb-10"
                style={{ color: "rgba(197,201,208,0.6)", maxWidth: "320px" }}
              >
                {services.subheadline}
              </p>
            )}
            <Button label="Umów konsultację" href="/konsultacje" variant="outline-light" />
          </div>

          {/* Right list column */}
          <div className="lg:col-span-8">
            {services.items.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                tags={service.tags}
                index={index}
                dark
              />
            ))}
            {/* Closing divider */}
            <div
              className="border-t"
              style={{ borderColor: "rgba(197,201,208,0.12)" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
