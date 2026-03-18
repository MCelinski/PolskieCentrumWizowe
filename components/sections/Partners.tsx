import content from "@/content/site-content.json";

export default function Partners() {
  const { partners } = content.home;

  // Duplicate for seamless loop
  const items = [...partners.items, ...partners.items];

  return (
    <section
      className="py-14 border-y overflow-hidden"
      style={{
        backgroundColor: "var(--color-sand-100)",
        borderColor: "var(--color-sand-300)",
      }}
      aria-label={partners.section_label}
    >
      <div className="container-editorial mb-8">
        <p className="section-eyebrow">{partners.section_label}</p>
      </div>

      {/* Scrolling strip */}
      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, var(--color-sand-100), transparent)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, var(--color-sand-100), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <div
          className="flex gap-16 items-center animate-marquee"
          style={{ width: "max-content" }}
          aria-hidden="true"
        >
          {items.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex-shrink-0 px-6 py-3 border"
              style={{
                borderColor: "var(--color-sand-300)",
                backgroundColor: "var(--color-cream)",
              }}
            >
              <span
                className="font-sans text-sm font-medium whitespace-nowrap"
                style={{ color: "var(--color-sand-500)", letterSpacing: "0.02em" }}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
