"use client";

import { useState } from "react";
import VisaQualificationForm from "@/components/forms/VisaQualificationForm";
import GeneralConsultationForm from "@/components/forms/GeneralConsultationForm";
import disclaimers from "@/content/disclaimers";
import { useLangContent, useLanguage } from "@/contexts/LanguageContext";

type ActiveForm = "a" | "b";

export default function KonsultacjeContent() {
  const [active, setActive] = useState<ActiveForm>("a");
  const c = useLangContent();
  const { lang } = useLanguage();
  const { consultations } = c;
  const { hero, trust_metrics, trust_bar, labels, visa_form, general_form } = consultations;

  const activeForm = active === "a" ? visa_form : general_form;
  const ActiveFormComponent = active === "a" ? VisaQualificationForm : GeneralConsultationForm;

  return (
    <main id="main-content">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-0 md:pt-44 overflow-hidden"
        style={{ backgroundColor: "var(--color-navy-900)" }}
        aria-labelledby="consultations-heading"
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ backgroundColor: "var(--color-red-600)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #e3eef4 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(43,81,131,0.5) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container-editorial relative z-10">
          <div className="max-w-2xl pb-16 md:pb-20">
            <p className="section-eyebrow mb-5" style={{ color: "rgba(168,196,224,0.75)" }}>
              {hero.eyebrow}
            </p>
            <h1
              id="consultations-heading"
              className="font-serif font-medium mb-6"
              style={{
                color: "var(--color-cream)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              {hero.headline}
            </h1>
            <p
              className="font-sans text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(208,222,238,0.7)" }}
            >
              {hero.subheadline}
            </p>
          </div>

          {/* Trust metrics strip */}
          <div className="flex border-t" style={{ borderColor: "rgba(168,196,224,0.12)" }}>
            {trust_metrics.map((m, i) => (
              <div
                key={i}
                className="flex-1 py-6 px-4 md:px-8 border-r last:border-r-0"
                style={{ borderColor: "rgba(168,196,224,0.12)" }}
              >
                <p
                  className="font-serif text-2xl md:text-3xl font-medium"
                  style={{ color: "var(--color-cream)" }}
                >
                  {m.value}
                </p>
                <p
                  className="font-sans text-xs font-medium mt-1"
                  style={{ color: "rgba(208,222,238,0.65)" }}
                >
                  {m.label}
                </p>
                <p className="font-sans text-xs mt-0.5" style={{ color: "rgba(168,196,224,0.4)" }}>
                  {m.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Forms section ─────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-editorial py-12 md:py-16">

          {/* Legal disclaimer */}
          <div
            className="flex gap-4 p-5 mb-10 border-l-4"
            style={{
              borderColor: "var(--color-navy-700)",
              backgroundColor: "var(--color-sand-100)",
            }}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="flex-shrink-0 mt-px"
              style={{ color: "var(--color-navy-700)" }}
            >
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M9 8v4.5M9 6v.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <p
              className="font-sans leading-relaxed"
              style={{ fontSize: "12px", color: "var(--color-sand-600)" }}
            >
              {disclaimers[lang].short}
            </p>
          </div>

          {/* ── Tab selector ──────────────────────────────── */}
          <div
            role="tablist"
            aria-label={labels.nav_a}
            className="grid grid-cols-1 sm:grid-cols-2 gap-px mb-0"
            style={{ backgroundColor: "var(--color-sand-300)" }}
          >
            <FormTab
              id="tab-a"
              panelId="panel-a"
              isActive={active === "a"}
              badge="A"
              title={visa_form.title}
              description={visa_form.description}
              timeEstimate={labels.time_a}
              onClick={() => setActive("a")}
            />
            <FormTab
              id="tab-b"
              panelId="panel-b"
              isActive={active === "b"}
              badge="B"
              title={general_form.title}
              description={general_form.description}
              timeEstimate={labels.time_b}
              onClick={() => setActive("b")}
            />
          </div>

          {/* ── Active form panel ────────────────────────── */}
          <div
            id={active === "a" ? "panel-a" : "panel-b"}
            role="tabpanel"
            aria-labelledby={active === "a" ? "tab-a" : "tab-b"}
            key={active}
            className="border-t-0"
            style={{
              border: "1px solid var(--color-sand-300)",
              borderTop: "none",
              animation: "fadeIn 180ms ease-out",
            }}
          >
            {/* "Dla kogo?" chips */}
            <div
              className="px-8 md:px-12 pt-8 pb-6 border-b"
              style={{ borderColor: "var(--color-sand-200)" }}
            >
              <p
                className="font-sans text-xs font-medium uppercase tracking-widest mb-4"
                style={{ color: "var(--color-navy-700)", letterSpacing: "0.1em" }}
              >
                {labels.for_whom}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeForm.ideal_for.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 font-sans text-xs px-3 py-1.5"
                    style={{
                      backgroundColor: "var(--color-sand-100)",
                      color: "var(--color-navy-800)",
                      border: "1px solid var(--color-sand-300)",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className="flex-shrink-0"
                      style={{ color: "var(--color-navy-700)" }}
                    >
                      <path
                        d="M1.5 5L4 7.5L8.5 2.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Form itself */}
            <div className="px-8 md:px-12 py-10">
              <ActiveFormComponent key={active} />
            </div>

            {/* "Co dalej?" steps */}
            <div
              className="px-8 md:px-12 pb-10 pt-2 border-t"
              style={{ borderColor: "var(--color-sand-200)" }}
            >
              <WhatHappensNext label={labels.whats_next} steps={activeForm.whats_next} />
            </div>
          </div>
        </div>

        {/* ── Trust bar ─────────────────────────────────── */}
        <div style={{ backgroundColor: "var(--color-navy-900)" }}>
          <div className="container-editorial">
            <div className="flex flex-col sm:flex-row items-stretch">
              {trust_bar.map((item, i) => (
                <TrustBarItem
                  key={i}
                  index={i}
                  label={item.label}
                  description={item.description}
                  isLast={i === trust_bar.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </main>
  );
}

// ── FormTab ────────────────────────────────────────────────────

function FormTab({
  id,
  panelId,
  isActive,
  badge,
  title,
  description,
  timeEstimate,
  onClick,
}: {
  id: string;
  panelId: string;
  isActive: boolean;
  badge: string;
  title: string;
  description: string;
  timeEstimate: string;
  onClick: () => void;
}) {
  return (
    <button
      id={id}
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      onClick={onClick}
      className="w-full text-left transition-all duration-200"
      style={{
        backgroundColor: isActive ? "var(--color-navy-900)" : "var(--color-cream)",
        borderLeft: isActive
          ? "4px solid var(--color-red-600)"
          : "4px solid transparent",
        padding: "1.5rem 2rem",
        cursor: "pointer",
        outline: "none",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            "var(--color-sand-100)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            "var(--color-cream)";
        }
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLElement).style.outline = "2px solid var(--color-navy-700)";
        (e.currentTarget as HTMLElement).style.outlineOffset = "-2px";
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLElement).style.outline = "none";
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Badge */}
          <span
            className="inline-flex items-center justify-center w-7 h-7 font-sans text-xs font-bold flex-shrink-0"
            style={
              isActive
                ? {
                    backgroundColor: "var(--color-red-600)",
                    color: "var(--color-cream)",
                  }
                : {
                    backgroundColor: "transparent",
                    color: "var(--color-navy-700)",
                    border: "1.5px solid var(--color-sand-400, #bbb)",
                  }
            }
          >
            {badge}
          </span>

          {/* Title + description */}
          <div className="min-w-0">
            <p
              className="font-serif text-base md:text-lg font-medium leading-snug"
              style={{
                color: isActive ? "var(--color-cream)" : "var(--color-navy-900)",
              }}
            >
              {title}
            </p>
            <p
              className="font-sans text-xs mt-1 leading-relaxed line-clamp-2"
              style={{
                color: isActive
                  ? "rgba(208,222,238,0.6)"
                  : "var(--color-sand-600)",
              }}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Time badge */}
        <span
          className="font-sans text-xs font-medium px-2.5 py-1 flex-shrink-0 mt-0.5"
          style={
            isActive
              ? {
                  backgroundColor: "rgba(168,196,224,0.12)",
                  color: "rgba(208,222,238,0.7)",
                }
              : {
                  backgroundColor: "var(--color-sand-200)",
                  color: "var(--color-sand-600)",
                }
          }
        >
          {timeEstimate}
        </span>
      </div>

      {/* Active indicator underline */}
      {isActive && (
        <div
          className="mt-4 h-px w-full"
          style={{ backgroundColor: "rgba(168,196,224,0.12)" }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

// ── WhatHappensNext ────────────────────────────────────────────

function WhatHappensNext({
  label,
  steps,
}: {
  label: string;
  steps: { title: string; desc: string }[];
}) {
  return (
    <div className="mt-8 pt-8">
      <p
        className="font-sans text-xs font-medium uppercase tracking-widest mb-6"
        style={{ color: "var(--color-navy-700)", letterSpacing: "0.1em" }}
      >
        {label}
      </p>
      <ol className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <div
              className="w-6 h-6 flex-shrink-0 flex items-center justify-center font-sans text-xs font-bold"
              style={{
                backgroundColor: "var(--color-navy-900)",
                color: "var(--color-cream)",
                marginTop: "1px",
              }}
            >
              {i + 1}
            </div>
            <div>
              <p
                className="font-sans text-sm font-medium"
                style={{ color: "var(--color-navy-900)" }}
              >
                {step.title}
              </p>
              <p
                className="font-sans text-xs mt-1 leading-relaxed"
                style={{ color: "var(--color-sand-600)" }}
              >
                {step.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ── TrustBarItem ───────────────────────────────────────────────

const TRUST_BAR_ICONS = [
  <svg key="shield" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 2L3.5 5V10C3.5 13.7 6.3 17.2 10 18C13.7 17.2 16.5 13.7 16.5 10V5L10 2Z"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
    />
    <path
      d="M7.5 10L9.5 12L13 8"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>,
  <svg key="clock" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.3" />
    <path
      d="M10 6.5V10.5L12.5 13"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>,
  <svg key="check" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M4 10.5L8 14.5L16 6.5"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>,
];

function TrustBarItem({
  index,
  label,
  description,
  isLast,
}: {
  index: number;
  label: string;
  description: string;
  isLast: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-3 flex-1 py-7 px-8 md:px-10">
        <div style={{ color: "rgba(168,196,224,0.55)" }}>{TRUST_BAR_ICONS[index]}</div>
        <div>
          <p className="font-sans text-sm font-medium" style={{ color: "var(--color-cream)" }}>
            {label}
          </p>
          <p className="font-sans text-xs mt-0.5" style={{ color: "rgba(168,196,224,0.4)" }}>
            {description}
          </p>
        </div>
      </div>
      {!isLast && (
        <div
          className="hidden sm:block w-px"
          style={{ backgroundColor: "rgba(168,196,224,0.12)" }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
