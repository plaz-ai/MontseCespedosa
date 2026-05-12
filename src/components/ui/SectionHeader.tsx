interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const textColor = light ? "text-white" : "text-mc-text";
  const mutedColor = light ? "text-white/60" : "text-mc-text-muted";
  const eyebrowColor = light ? "text-mc-orange-light" : "text-mc-orange";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span
          className={`block text-xs font-semibold tracking-widest uppercase mb-3 font-body ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-4xl md:text-5xl leading-tight mb-4 ${textColor}`}
      >
        {title}{" "}
        {titleAccent && (
          <em className="not-italic text-mc-orange">{titleAccent}</em>
        )}
      </h2>
      {description && (
        <p className={`text-base md:text-lg leading-relaxed font-body ${mutedColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
