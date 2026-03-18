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
          style={{ color: light ? "rgba(197,201,208,0.85)" : undefined }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-serif text-5xl md:text-6xl font-medium"
        style={{
          color: light ? "#F7F6F3" : "var(--color-navy-900)",
          letterSpacing: "-0.025em",
          lineHeight: 1.05,
        }}
      >
        {headline}
      </h2>
      {subheadline && (
        <p
          className="mt-6 text-base md:text-lg leading-relaxed"
          style={{
            color: light ? "rgba(197,201,208,0.8)" : "var(--color-sand-600)",
            maxWidth: "600px",
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
