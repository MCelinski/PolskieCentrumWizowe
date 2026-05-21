"use client";

import Image from "next/image";
import Link from "next/link";
import { useLangContent } from "@/contexts/LanguageContext";

export default function PrivateClient() {
  const content = useLangContent();
  const { private_client } = content.home;

  return (
    <section
      id="private-client"
      className="relative overflow-hidden surface-navy"
      aria-labelledby="private-client-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[820px]">

        {/* ── LEFT: Editorial content ── */}
        <div className="relative z-10 section-padding flex flex-col justify-center px-6 md:px-10 lg:pl-[max(3rem,calc((100vw-1240px)/2+3rem))] lg:pr-16 xl:pr-24">

          {/* Red radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(640px 480px at -8% 65%, rgba(196,32,33,0.08), transparent 65%)",
            }}
            aria-hidden="true"
          />

          <div className="relative max-w-[560px]">

            {/* Section label */}
            <div className="flex items-center gap-3 mb-7">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: "var(--color-red-500)" }}
                aria-hidden="true"
              />
              <span
                className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold"
                style={{ color: "rgba(225,233,243,0.5)" }}
              >
                {private_client.section_label}
              </span>
            </div>

            <div
              className="h-px mb-7"
              style={{ width: "2.5rem", backgroundColor: "var(--color-red-500)" }}
              aria-hidden="true"
            />

            <h2
              id="private-client-heading"
              className="font-serif mb-5"
              style={{
                color: "var(--color-white)",
                fontSize: "clamp(2.2rem, 4.8vw, 4rem)",
                lineHeight: 1.03,
                letterSpacing: "-0.03em",
              }}
            >
              {private_client.headline}
            </h2>

            <p
              className="font-serif mb-8"
              style={{
                color: "rgba(225,233,243,0.68)",
                fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                lineHeight: 1.6,
                fontStyle: "italic",
              }}
            >
              {private_client.subheadline}
            </p>

            <p
              className="font-sans text-sm leading-relaxed mb-10"
              style={{ color: "rgba(225,233,243,0.62)" }}
            >
              {private_client.description}
            </p>

            {/* Numbered scope list */}
            <div className="mb-10 space-y-4" role="list">
              {private_client.scope.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-4" role="listitem">
                  <span
                    className="font-serif flex-shrink-0 select-none tabular-nums"
                    style={{
                      color: "var(--color-red-500)",
                      fontSize: "0.6rem",
                      lineHeight: "1.75rem",
                      letterSpacing: "0.06em",
                    }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="w-px self-stretch flex-shrink-0 mt-1"
                    style={{ backgroundColor: "rgba(196,32,33,0.28)" }}
                    aria-hidden="true"
                  />
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "rgba(225,233,243,0.78)" }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              className="mb-7 h-px"
              style={{ backgroundColor: "rgba(225,233,243,0.08)" }}
              aria-hidden="true"
            />

            {/* Operating mode */}
            <p
              className="font-sans text-xs leading-relaxed mb-7"
              style={{
                color: "rgba(225,233,243,0.42)",
                letterSpacing: "0.02em",
              }}
            >
              {private_client.operating_mode}
            </p>

            {/* Engagement note — serif blockquote */}
            <p
              className="font-serif text-sm leading-relaxed mb-10"
              style={{
                color: "rgba(225,233,243,0.52)",
                fontStyle: "italic",
                borderLeft: "2px solid rgba(196,32,33,0.4)",
                paddingLeft: "1rem",
              }}
            >
              {private_client.engagement_note}
            </p>

            {/* CTA */}
            <Link
              href={private_client.cta.href}
              className="inline-flex items-center gap-3 px-8 py-4 font-sans text-sm font-semibold tracking-[0.04em] border transition-all duration-200 cursor-pointer group"
              style={{
                color: "var(--color-white)",
                borderColor: "rgba(226,234,244,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(226,234,244,0.65)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(226,234,244,0.4)";
              }}
            >
              {private_client.cta.label}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Full-bleed image ── */}
        <div className="relative min-h-[340px] lg:min-h-0">

          <Image
            src="/images/private-client.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
            unoptimized
          />

          {/* Navy colour overlay for mood */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(7,27,58,0.28)" }}
            aria-hidden="true"
          />

          {/* Blend from left (desktop only) */}
          <div
            className="absolute inset-y-0 left-0 w-40 xl:w-52 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, var(--color-navy-900) 0%, rgba(7,27,58,0.65) 50%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Mobile: top fade — blends into content section above */}
          <div
            className="absolute inset-x-0 top-0 h-40 lg:hidden"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-navy-900) 0%, rgba(7,27,58,0.75) 40%, rgba(7,27,58,0.2) 75%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Mobile: bottom — gentle darkening only */}
          <div
            className="absolute inset-x-0 bottom-0 h-20 lg:hidden"
            style={{
              background:
                "linear-gradient(to top, rgba(7,27,58,0.35) 0%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Discrete label badge */}
          <div
            className="absolute bottom-6 right-6 z-10 font-sans text-[10px] uppercase tracking-[0.22em]"
            style={{
              color: "rgba(225,233,243,0.32)",
              border: "1px solid rgba(225,233,243,0.1)",
              padding: "0.45rem 0.85rem",
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(7,27,58,0.35)",
            }}
          >
            Private Client
          </div>
        </div>
      </div>
    </section>
  );
}
