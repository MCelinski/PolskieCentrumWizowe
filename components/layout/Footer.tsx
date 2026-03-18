import Link from "next/link";
import Image from "next/image";
import content from "@/content/site-content.json";

export default function Footer() {
  const { footer, nav } = content;

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--color-navy-950)",
        borderColor: "var(--color-navy-800)",
      }}
    >
      <div className="container-editorial py-16 md:py-20">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12 border-b" style={{ borderColor: "var(--color-navy-800)" }}>
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <Image
                src="/logo.svg"
                alt="Polskie Centrum Wizowe"
                width={160}
                height={38}
                style={{
                  height: "38px",
                  width: "auto",
                  filter: "brightness(0) invert(1)",
                  opacity: 0.9,
                }}
              />
            </div>
            <p className="font-sans text-sm leading-relaxed max-w-xs" style={{ color: "rgba(168,196,224,0.7)" }}>
              {footer.tagline}
            </p>
            <div className="mt-6 space-y-2">
              <a
                href={`mailto:${footer.contact.email}`}
                className="block font-sans text-sm transition-colors duration-150 hover:opacity-80"
                style={{ color: "rgba(168,196,224,0.8)" }}
              >
                {footer.contact.email}
              </a>
              <a
                href={`tel:${footer.contact.phone.replace(/\s/g, "")}`}
                className="block font-sans text-sm transition-colors duration-150 hover:opacity-80"
                style={{ color: "rgba(168,196,224,0.8)" }}
              >
                {footer.contact.phone}
              </a>
              <address className="not-italic font-sans text-sm" style={{ color: "rgba(168,196,224,0.6)" }}>
                {footer.contact.address}
              </address>
            </div>
          </div>

          {/* Link columns */}
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3
                className="font-sans text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "rgba(168,196,224,0.5)", letterSpacing: "0.15em" }}
              >
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm transition-colors duration-150 hover:opacity-80"
                      style={{ color: "rgba(168,196,224,0.7)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8">
          <p className="font-sans text-xs" style={{ color: "rgba(168,196,224,0.4)" }}>
            {footer.legal.copyright}
          </p>
          <div className="flex items-center gap-6">
            {footer.legal.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-sans text-xs transition-colors duration-150 hover:opacity-80"
                style={{ color: "rgba(168,196,224,0.5)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
