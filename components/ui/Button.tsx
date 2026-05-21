import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline-light";

interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-800 text-white border border-navy-800 hover:bg-navy-900 hover:border-navy-900",
  secondary:
    "bg-transparent text-navy-800 border border-navy-800 hover:bg-navy-800 hover:text-white",
  ghost:
    "bg-transparent text-navy-600 hover:text-navy-800 border border-transparent",
  "outline-light":
    "bg-transparent text-white border border-white/45 hover:bg-white/10 hover:border-white/70",
};

const sizeStyles: Record<string, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-base",
};

export default function Button({
  label,
  href,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-sans font-semibold tracking-[0.02em] transition-all duration-200 ease-out cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2";
  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {label}
    </button>
  );
}
