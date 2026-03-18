interface TrustStatProps {
  value: string;
  label: string;
  sublabel?: string;
  light?: boolean;
}

export default function TrustStat({ value, label, sublabel, light = false }: TrustStatProps) {
  return (
    <div className="flex flex-col">
      <span
        className="font-serif text-5xl md:text-6xl font-light leading-none tracking-tight"
        style={{ color: light ? "#F8F7F4" : "var(--color-navy-900)" }}
      >
        {value}
      </span>
      <span
        className="mt-3 font-sans text-sm font-medium uppercase tracking-widest"
        style={{ color: light ? "rgba(168,196,224,0.9)" : "var(--color-navy-700)", letterSpacing: "0.12em" }}
      >
        {label}
      </span>
      {sublabel && (
        <span
          className="mt-1 font-sans text-xs"
          style={{ color: light ? "rgba(208,220,235,0.6)" : "var(--color-sand-500)" }}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
}
