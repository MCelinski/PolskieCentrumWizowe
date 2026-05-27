"use client";

import Image from "next/image";
import { useLangContent } from "@/contexts/LanguageContext";

type LogoItem = { src: string; name: string };

export default function ClientLogos() {
  const content = useLangContent();
  const { client_logos } = content.home;
  const items = client_logos.items as unknown as LogoItem[];

  if (!items || items.length === 0) return null;

  // Duplicate the list so the seamless infinite scroll works
  const doubled = [...items, ...items];

  return (
    <section
      className="py-12 bg-white border-t border-b"
      style={{ borderColor: "var(--color-sand-200)" }}
      aria-label={client_logos.section_label}
    >
      {/* ── Section eyebrow ─────────────────────────────────────────────── */}
      <div className="container-editorial mb-8 flex items-center gap-4">
        <span
          className="flex-1 h-px"
          style={{ backgroundColor: "var(--color-sand-300)" }}
          aria-hidden="true"
        />
        <p
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap"
          style={{ color: "var(--color-sand-500)" }}
        >
          {client_logos.section_label}
        </p>
        <span
          className="flex-1 h-px"
          style={{ backgroundColor: "var(--color-sand-300)" }}
          aria-hidden="true"
        />
      </div>

      {/* ── Scrolling track ─────────────────────────────────────────────── */}
      <div className="logos-marquee-wrap" aria-hidden="true">
        {/* Gradient edge fades — overlay divs instead of mask-image for GPU perf */}
        <div className="logos-fade-left" />
        <div className="logos-marquee-track">
          {doubled.map((item, i) => (
            <div key={i} className="logos-logo-item">
              <Image
                src={item.src}
                alt={item.name}
                width={160}
                height={44}
                className="h-11 object-contain"
                style={{ width: "auto" }}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
        <div className="logos-fade-right" />
      </div>
    </section>
  );
}
