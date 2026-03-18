import content from "@/content/site-content.json";

export default function About() {
  const { about } = content.home;

  return (
    <section
      id="o-nas"
      className="section-padding"
      style={{ backgroundColor: "var(--color-cream)" }}
      aria-labelledby="about-heading"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column — label + headline */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <p className="section-eyebrow mb-5">{about.section_label}</p>
            <h2
              id="about-heading"
              className="font-serif text-4xl md:text-5xl font-medium leading-tight"
              style={{ color: "var(--color-navy-900)", letterSpacing: "-0.02em" }}
            >
              {about.headline}
            </h2>
          </div>

          {/* Right column — body + highlight */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-7" style={{ maxWidth: "650px" }}>
              {about.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="font-sans text-base md:text-lg"
                  style={{ color: "var(--color-sand-600)", lineHeight: 1.8 }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Highlight stat */}
            <div
              className="mt-10 pt-10 border-t flex items-center gap-6"
              style={{ borderColor: "var(--color-sand-300)" }}
            >
              <div
                className="w-0.5 h-12 flex-shrink-0"
                style={{ backgroundColor: "var(--color-red-600)" }}
                aria-hidden="true"
              />
              <div>
                <p
                  className="font-serif text-3xl font-medium"
                  style={{ color: "var(--color-navy-900)" }}
                >
                  {about.highlight}
                </p>
                <p
                  className="font-sans text-sm mt-1"
                  style={{ color: "var(--color-sand-500)" }}
                >
                  Najlepsza miara naszej rzetelności
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
