import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-mc-orange text-white hover:bg-mc-orange-dark active:scale-[0.98] shadow-lg shadow-mc-orange/20",
  secondary:
    "bg-white text-mc-text hover:bg-mc-gray-100 active:scale-[0.98] shadow-sm",
  outline:
    "border border-mc-orange text-mc-orange hover:bg-mc-orange hover:text-white active:scale-[0.98]",
  ghost: "text-mc-orange hover:text-mc-orange-dark underline-offset-4 hover:underline",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  label,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  external = false,
}: ButtonProps) {
  const classes = `
    inline-flex items-center justify-center font-body font-semibold
    rounded-full transition-all duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {label}
    </button>
  );
}
