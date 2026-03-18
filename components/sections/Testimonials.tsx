"use client";

import { useState, useEffect } from "react";
import content from "@/content/site-content.json";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Testimonials() {
  const { testimonials } = content.home;
  const items = testimonials.items;

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % items.length);
        setVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, [items.length]);

  const item = items[index];

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

        <div className="border-t" style={{ borderColor: "var(--color-sand-300)" }}>
          <article
            className="py-14 md:py-16"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
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

          <div className="border-t pb-2 flex items-center gap-3" style={{ borderColor: "var(--color-sand-300)" }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setVisible(false);
                  setTimeout(() => {
                    setIndex(i);
                    setVisible(true);
                  }, 400);
                }}
                aria-label={`Opinia ${i + 1}`}
                style={{
                  width: i === index ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor:
                    i === index
                      ? "var(--color-navy-900)"
                      : "var(--color-sand-300)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "width 0.3s ease, background-color 0.3s ease",
                  marginTop: "24px",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
