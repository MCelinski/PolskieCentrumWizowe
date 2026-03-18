import content from "@/content/site-content.json";

export default function Partners() {
  const { partners } = content.home;

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--color-sand-100)" }}
      aria-label={partners.section_label}
    >
      <div className="container-editorial">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-12 md:mb-16">
          <p
            className="font-sans text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-sand-500)", letterSpacing: "0.15em" }}
          >
            {partners.section_label}
          </p>
          <p
            className="font-sans text-sm"
            style={{ color: "var(--color-sand-500)" }}
          >
            Instytucje zaufania publicznego
          </p>
        </div>

        {/*
          Border-box grid trick:
          wrapper = border-t + border-l
          each cell = border-r + border-b
          → perfect grid lines at every column/row count
        */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 border-t border-l"
          style={{ borderColor: "var(--color-sand-300)" }}
        >
          {partners.items.map((partner, i) => (
            <div
              key={partner.id}
              className="animate-fade-up border-r border-b flex flex-col justify-between gap-6 p-6 md:p-8 lg:p-10"
              style={{
                borderColor: "var(--color-sand-300)",
                animationDelay: `${i * 90}ms`,
                minHeight: "140px",
              }}
            >
              <span
                className="font-sans text-xs tabular-nums"
                style={{ color: "var(--color-sand-400)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="font-sans text-sm md:text-base font-medium leading-snug"
                style={{ color: "var(--color-navy-900)" }}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
