import content from "@/content/site-content.json";
import TrustStat from "@/components/ui/TrustStat";

export default function TrustMetrics() {
  const { trust_metrics } = content.home;

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--color-navy-900)" }}
      aria-labelledby="trust-heading"
    >
      <div className="container-editorial">
        <div className="flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-24">
          {/* Left label */}
          <div className="lg:w-72 flex-shrink-0">
            <p
              className="section-eyebrow mb-5"
              style={{ color: "rgba(168,196,224,0.7)" }}
            >
              {trust_metrics.section_label}
            </p>
            <h2
              id="trust-heading"
              className="font-serif text-3xl md:text-4xl font-medium leading-tight"
              style={{ color: "var(--color-cream)", letterSpacing: "-0.02em" }}
            >
              {trust_metrics.headline}
            </h2>
          </div>

          {/* Stats grid */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x" style={{ "--tw-divide-opacity": "1" } as React.CSSProperties}>
            {trust_metrics.items.map((item, i) => (
              <div
                key={i}
                className="lg:px-10 first:pl-0"
              >
                <TrustStat
                  value={item.value}
                  label={item.label}
                  sublabel={item.sublabel}
                  light
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
