interface ServiceCardProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
}

export default function ServiceCard({ title, description, tags, index }: ServiceCardProps) {
  const indexStr = String(index + 1).padStart(2, "0");

  return (
    <article
      className="group border-t py-10 md:py-12"
      style={{ borderColor: "var(--color-sand-300)" }}
    >
      <div className="flex items-baseline gap-6 mb-5">
        <span
          className="font-sans text-xs font-medium flex-shrink-0 w-7"
          style={{ color: "var(--color-sand-400)", letterSpacing: "0.1em" }}
        >
          {indexStr}
        </span>
        <h3
          className="font-serif text-2xl md:text-3xl font-medium leading-snug"
          style={{ color: "var(--color-navy-900)", letterSpacing: "-0.02em" }}
        >
          <span
            className="transition-all duration-200"
            style={{
              textDecoration: "none",
              borderBottom: "1px solid transparent",
            }}
          >
            {title}
          </span>
        </h3>
      </div>
      <div className="ml-[3.25rem]">
        <p
          className="font-sans text-sm leading-relaxed mb-5"
          style={{ color: "var(--color-sand-600)", maxWidth: "560px" }}
        >
          {description}
        </p>
        {tags.length > 0 && (
          <p
            className="font-sans text-xs"
            style={{ color: "var(--color-navy-400)", letterSpacing: "0.02em" }}
          >
            {tags.map((tag, i) => (
              <span key={tag}>
                {i > 0 && <span style={{ color: "var(--color-sand-400)" }}> — </span>}
                {tag}
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}
