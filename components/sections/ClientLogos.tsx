"use client";

import { useLangContent } from "@/contexts/LanguageContext";

export default function ClientLogos() {
  const content = useLangContent();
  const { client_logos } = content.home;

  type LogoItem = { src: string; name: string };
  const items = client_logos.items as unknown as LogoItem[];

  if (!items || items.length === 0) {
    return null;
  }

  const doubled = [...items, ...items];

  return (
    <div
      className="py-10 border-t border-b overflow-hidden"
      style={{
        backgroundColor: "var(--color-sand-100)",
        borderColor: "var(--color-sand-300)",
      }}
      aria-label={client_logos.section_label}
    >
      <div className="container-editorial mb-6">
        <p
          className="font-sans text-xs font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--color-sand-500)" }}
        >
          {client_logos.section_label}
        </p>
      </div>

      <div className="relative">
        <div
          className="flex gap-16 items-center"
          style={{
            animation: "logos-scroll 32s linear infinite",
            width: "max-content",
          }}
          aria-hidden="true"
        >
          {doubled.map((item: LogoItem, i: number) => (
            <div
              key={i}
              className="flex-shrink-0 h-10 flex items-center"
              style={{ filter: "grayscale(1)", opacity: 0.55 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.name} className="max-h-10 w-auto" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes logos-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="logos-scroll"] { animation: none; }
        }
      `}</style>
    </div>
  );
}
