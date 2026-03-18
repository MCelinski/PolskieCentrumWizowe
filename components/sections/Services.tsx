import content from "@/content/site-content.json";
import ServiceCard from "@/components/ui/ServiceCard";
import Button from "@/components/ui/Button";

export default function Services() {
  const { services } = content.home;

  return (
    <section
      id="uslugi"
      className="section-padding"
      style={{ backgroundColor: "var(--color-cream)" }}
      aria-labelledby="services-heading"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left sticky column */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <p className="section-eyebrow mb-5">{services.section_label}</p>
            <h2
              id="services-heading"
              className="font-serif text-5xl md:text-6xl font-medium mb-8"
              style={{
                color: "var(--color-navy-900)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              {services.headline}
            </h2>
            {services.subheadline && (
              <p
                className="font-sans text-sm leading-relaxed mb-10"
                style={{ color: "var(--color-sand-600)", maxWidth: "320px" }}
              >
                {services.subheadline}
              </p>
            )}
            <Button label="Umów konsultację" href="/konsultacje" variant="secondary" />
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
              />
            ))}
            {/* Closing divider */}
            <div className="border-t" style={{ borderColor: "var(--color-sand-300)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
