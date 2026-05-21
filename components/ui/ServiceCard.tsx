interface ServiceCardProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
  dark?: boolean;
  className?: string;
}

export default function ServiceCard({ title, description, tags, index, dark, className = "" }: ServiceCardProps) {
  const indexStr = String(index + 1).padStart(2, "0");

  const borderColor = dark ? "rgba(214, 224, 236, 0.18)" : "var(--color-sand-300)";
  const indexColor = dark ? "rgba(223, 230, 242, 0.52)" : "var(--color-navy-500)";
  const titleColor = dark ? "var(--color-white)" : "var(--color-navy-800)";
  const descColor = dark ? "rgba(224, 232, 243, 0.8)" : "var(--color-sand-600)";
  const tagColor = dark ? "rgba(224, 232, 243, 0.7)" : "var(--color-navy-500)";
  const separatorColor = dark ? "rgba(196, 32, 33, 0.7)" : "var(--color-red-500)";

  return (
    <article
      className={`group border-t py-8 md:py-10 lg:py-11 ${className}`}
      style={{ borderColor }}
    >
      <div className="flex items-baseline gap-4 md:gap-6 mb-4 md:mb-5">
        <span
          className="font-sans text-xs font-semibold flex-shrink-0 w-8 tabular-nums"
          style={{ color: indexColor, letterSpacing: "0.1em" }}
        >
          {indexStr}
        </span>
        <h3
          className="font-serif font-medium leading-snug"
          style={{
            color: titleColor,
            letterSpacing: "-0.02em",
            fontSize: "clamp(1.35rem, 2.4vw, 1.95rem)",
          }}
        >
          {title}
        </h3>
      </div>
      <div className="ml-11 md:ml-[3.25rem]">
        <p
          className="font-sans text-sm md:text-base leading-relaxed mb-5"
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
