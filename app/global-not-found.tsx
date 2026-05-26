import Image from "next/image";
import SiteDocument from "@/app/site-document";
import { siteIcons } from "@/lib/seo";
import "./globals.css";

export const metadata = {
  title: "404 - Strona nie znaleziona | Polskie Centrum Wizowe",
  robots: {
    index: false,
    follow: false,
  },
  icons: siteIcons,
};

export default function GlobalNotFound() {
  return (
    <SiteDocument lang="pl">
      <main
        className="relative flex min-h-svh items-center overflow-hidden"
        style={{ backgroundColor: "var(--color-navy-950)", color: "var(--color-white)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ backgroundColor: "var(--color-red-500)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(7,37,55,0.92) 0%, rgba(2,16,24,0.98) 58%, rgba(159,24,24,0.18) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #e3eef4 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <section className="container-editorial relative z-10 py-28 md:py-32">
          <div className="max-w-3xl">
            <a href="/" aria-label="Polskie Centrum Wizowe - strona glowna" className="inline-flex">
              <Image
                src="/logo-footer.svg"
                alt="Polskie Centrum Wizowe"
                width={280}
                height={44}
                priority
                style={{ height: "46px", width: "auto" }}
              />
            </a>

            <p
              className="mt-14 font-sans text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: "rgba(227, 238, 244, 0.68)" }}
            >
              {"B\u0142\u0105d 404"}
            </p>

            <h1
              className="mt-5 max-w-2xl font-serif text-4xl font-medium leading-[1.08] md:text-6xl"
              style={{ color: "var(--color-white)" }}
            >
              Nie znaleziono tej strony
            </h1>

            <p
              className="mt-6 max-w-xl font-sans text-base leading-8 md:text-lg"
              style={{ color: "rgba(227, 238, 244, 0.76)" }}
            >
              {
                "Adres m\u00f3g\u0142 zosta\u0107 zmieniony albo strona nie jest ju\u017c dost\u0119pna. Wr\u00f3\u0107 do strony g\u0142\u00f3wnej lub przejd\u017a do formularza konsultacji."
              }
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="/"
                className="inline-flex min-h-12 cursor-pointer items-center justify-center px-6 font-sans text-sm font-bold transition-colors duration-200"
                style={{ backgroundColor: "var(--color-white)", color: "var(--color-navy-900)" }}
              >
                {"Strona g\u0142\u00f3wna"}
              </a>
              <a
                href="/konsultacje"
                className="inline-flex min-h-12 cursor-pointer items-center justify-center border px-6 font-sans text-sm font-bold transition-colors duration-200"
                style={{
                  borderColor: "rgba(227, 238, 244, 0.36)",
                  color: "var(--color-white)",
                }}
              >
                Inicjuj kontakt
              </a>
            </div>
          </div>
        </section>

        <p
          className="absolute bottom-6 left-6 right-6 z-10 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.16em] md:text-left"
          style={{ color: "rgba(227, 238, 244, 0.32)" }}
        >
          Polskie Centrum Wizowe
        </p>
      </main>
    </SiteDocument>
  );
}
