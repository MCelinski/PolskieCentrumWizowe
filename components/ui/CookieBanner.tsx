"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLangContent, useLanguage } from "@/contexts/LanguageContext";
import { grantAnalyticsConsent } from "@/components/analytics/GoogleAnalytics";
import { localizePath } from "@/lib/i18n";

const STORAGE_KEY = "pcw_cookie_consent";

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  });
  const content = useLangContent();
  const { lang } = useLanguage();
  const t = content.cookies;

  useEffect(() => {
    document.body.style.paddingBottom = visible ? "120px" : "";
    return () => { document.body.style.paddingBottom = ""; };
  }, [visible]);

  function save(consent: ConsentState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // ignore
    }
    if (consent.analytics) grantAnalyticsConsent();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t.title}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      style={{ backgroundColor: "var(--color-navy-900)" }}
    >
      <div className="container-editorial">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <p
              className="font-serif text-lg font-semibold mb-1"
              style={{ color: "var(--color-white)" }}
            >
              {t.title}
            </p>
            <p
              className="font-sans text-sm leading-relaxed"
              style={{ color: "var(--color-sand-300)" }}
            >
              {t.description}{" "}
              <Link
                href={localizePath("/polityka-prywatnosci", lang)}
                className="underline underline-offset-2 hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-sand-300)" }}
              >
                {t.policy_link}
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={() => save({ necessary: true, analytics: false })}
              className="pcw-cookie-secondary px-5 py-2.5 rounded font-sans text-sm font-semibold border transition-colors cursor-pointer"
              style={{
                borderColor: "var(--color-sand-400)",
                color: "var(--color-sand-300)",
              }}
            >
              {t.accept_necessary}
            </button>
            <button
              onClick={() => save({ necessary: true, analytics: true })}
              className="pcw-cookie-primary px-5 py-2.5 rounded font-sans text-sm font-semibold transition-colors cursor-pointer"
              style={{
                color: "var(--color-navy-900)",
              }}
            >
              {t.accept_all}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
