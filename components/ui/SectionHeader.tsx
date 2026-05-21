interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  headline,
  subheadline,
  align = "left",
  light = false,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : ""}>
      {eyebrow && (
        <p
          className="section-eyebrow mb-5"
          style={{ color: light ? "rgba(232, 238, 246, 0.78)" : undefined }}
        >
          {eyebrow}
        </p>
      )}
      <div
        className={`${isCenter ? "mx-auto" : ""} accent-rule mb-6`}
        aria-hidden="true"
      />
      <h2
        className="font-serif font-medium"
        style={{
          color: light ? "var(--color-white)" : "var(--color-navy-800)",
          letterSpacing: "-0.025em",
          lineHeight: 1.08,
          fontSize: "clamp(2rem, 5vw, 3.9rem)",
        }}
      >
        {headline}
      </h2>
      {subheadline && (
        <p
          className="mt-6 text-base md:text-lg leading-relaxed"
          style={{
            color: light ? "rgba(224, 233, 243, 0.82)" : "var(--color-sand-600)",
            maxWidth: "640px",
            marginLeft: isCenter ? "auto" : undefined,
            marginRight: isCenter ? "auto" : undefined,
          }}
        >
          {subheadline}
        </p>
      )}
    </div>
  );
}
