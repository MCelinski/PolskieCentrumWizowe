interface ServiceCardProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
  dark?: boolean;
}

export default function ServiceCard({ title, description, tags, index, dark }: ServiceCardProps) {
  const indexStr = String(index + 1).padStart(2, "0");

  const borderColor = dark ? "rgba(197,201,208,0.12)" : "var(--color-sand-300)";
  const indexColor = dark ? "rgba(197,201,208,0.3)" : "var(--color-sand-400)";
  const titleColor = dark ? "var(--color-cream)" : "var(--color-navy-900)";
  const descColor = dark ? "rgba(197,201,208,0.65)" : "var(--color-sand-600)";
  const tagColor = dark ? "rgba(197,201,208,0.4)" : "var(--color-navy-400)";
  const separatorColor = dark ? "rgba(197,201,208,0.2)" : "var(--color-sand-400)";

  return (
    <article
      className="group border-t py-8 md:py-10 lg:py-12"
      style={{ borderColor }}
    >
      <div className="flex items-baseline gap-4 md:gap-6 mb-4 md:mb-5">
        <span
          className="font-sans text-xs font-medium flex-shrink-0 w-7 tabular-nums"
          style={{ color: indexColor, letterSpacing: "0.1em" }}
        >
          {indexStr}
        </span>
        <h3
          className="font-serif font-medium leading-snug"
          style={{
            color: titleColor,
            letterSpacing: "-0.02em",
            fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
          }}
        >
          {title}
        </h3>
      </div>
      <div className="ml-11 md:ml-[3.25rem]">
        <p
          className="font-sans text-sm md:text-base leading-relaxed mb-4 md:mb-5"
          style={{ color: descColor, maxWidth: "560px" }}
        >
          {description}
        </p>
        {tags.length > 0 && (
          <p
            className="font-sans text-xs"
            style={{ color: tagColor, letterSpacing: "0.02em" }}
          >
            {tags.map((tag, i) => (
              <span key={tag}>
                {i > 0 && <span style={{ color: separatorColor }}> — </span>}
                {tag}
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}
