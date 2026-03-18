import content from "@/content/site-content.json";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Testimonials() {
  const { testimonials } = content.home;

  return (
    <section
      id="opinie"
      className="section-padding"
      style={{ backgroundColor: "var(--color-sand-100)" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-editorial">
        <div className="mb-16 md:mb-20">
          <SectionHeader
            eyebrow={testimonials.section_label}
            headline={testimonials.headline}
            align="left"
          />
        </div>

        <div>
          {testimonials.items.map((item) => (
            <article
              key={item.id}
              className="border-t py-14 md:py-18"
              style={{ borderColor: "var(--color-sand-300)" }}
            >
              <blockquote
                className="font-serif font-light leading-relaxed mb-10 md:mb-12"
                style={{
                  color: "var(--color-navy-900)",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.4,
                  maxWidth: "820px",
                }}
              >
                {item.quote}
              </blockquote>

              <footer className="flex items-center gap-5">
                <div
                  className="w-0.5 h-10 flex-shrink-0"
                  style={{ backgroundColor: "var(--color-red-600)" }}
                  aria-hidden="true"
                />
                <div>
                  <p
                    className="font-sans text-sm font-medium"
                    style={{ color: "var(--color-navy-900)" }}
                  >
                    {item.author}
                  </p>
                  <p
                    className="font-sans text-xs mt-1"
                    style={{ color: "var(--color-sand-500)" }}
                  >
                    {item.role} — {item.company}
                  </p>
                </div>
              </footer>
            </article>
          ))}
          <div className="border-t" style={{ borderColor: "var(--color-sand-300)" }} />
        </div>
      </div>
    </section>
  );
}
