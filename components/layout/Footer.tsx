"use client";

import Link from "next/link";
import Image from "next/image";
import { useLangContent, useLanguage } from "@/contexts/LanguageContext";
import disclaimers from "@/content/disclaimers";
import { localizePath } from "@/lib/i18n";

export default function Footer() {
  const content = useLangContent();
  const { footer } = content;
  const { lang } = useLanguage();
  const disclaimer = disclaimers[lang];

  return (
    <footer className="border-t" style={{ backgroundColor: "var(--color-navy-950)", borderColor: "rgba(225, 233, 243, 0.18)" }}>
      <div className="container-editorial py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-10 border-b" style={{ borderColor: "rgba(225, 233, 243, 0.18)" }}>
          <div className="md:col-span-2">
            <div className="mb-5">
              <Image
                src="/logo-footer.svg"
                alt="Polskie Centrum Wizowe"
                width={280}
                height={44}
                style={{ height: "46px", width: "auto" }}
              />
            </div>
            <p className="font-sans text-sm leading-relaxed max-w-sm" style={{ color: "rgba(223, 232, 243, 0.78)" }}>
              {footer.tagline}
            </p>
            <div className="mt-6 space-y-2">
              <a href={`mailto:${footer.contact.email}`} className="block font-sans text-sm transition-opacity duration-150 hover:opacity-80" style={{ color: "rgba(231, 239, 248, 0.88)" }}>
                {footer.contact.email}
              </a>
              <a href={`tel:${footer.contact.phone.replace(/\s/g, "")}`} className="block font-sans text-sm transition-opacity duration-150 hover:opacity-80" style={{ color: "rgba(231, 239, 248, 0.88)" }}>
                {footer.contact.phone}
              </a>
              <address className="not-italic font-sans text-sm" style={{ color: "rgba(223, 232, 243, 0.68)" }}>
                {footer.contact.address}
              </address>
            </div>

            {footer.registration && (
              <div className="mt-6 space-y-1">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: "rgba(223, 232, 243, 0.4)" }}>
                  {footer.registration.label}
                </p>
                <p className="font-sans text-xs" style={{ color: "rgba(223, 232, 243, 0.45)" }}>
                  NIP: {footer.registration.nip}
                </p>
                <p className="font-sans text-xs" style={{ color: "rgba(223, 232, 243, 0.45)" }}>
                  KRS: {footer.registration.krs}
                </p>
                <p className="font-sans text-xs" style={{ color: "rgba(223, 232, 243, 0.45)" }}>
                  REGON: {footer.registration.regon}
                </p>
              </div>
            )}
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] mb-5" style={{ color: "rgba(223, 232, 243, 0.58)" }}>
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={localizePath(link.href, lang)} className="font-sans text-sm transition-colors duration-150 hover:text-white" style={{ color: "rgba(223, 232, 243, 0.8)" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-b" style={{ borderColor: "rgba(225, 233, 243, 0.1)" }}>
          <p
            className="font-sans leading-relaxed"
            style={{ fontSize: "12px", color: "rgba(223, 232, 243, 0.55)", maxWidth: "960px" }}
          >
            {disclaimer.full}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-7">
          <p className="font-sans text-xs" style={{ color: "rgba(223, 232, 243, 0.5)" }}>
            {footer.legal.copyright}
          </p>
          <div className="flex items-center gap-6">
            {footer.legal.links.map((link) => (
              <Link key={link.label} href={localizePath(link.href, lang)} className="font-sans text-xs transition-colors duration-150 hover:text-white" style={{ color: "rgba(223, 232, 243, 0.62)" }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
