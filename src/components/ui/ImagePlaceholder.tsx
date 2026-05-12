interface ImagePlaceholderProps {
  label: string;
  aspectRatio?: string;
  className?: string;
  dark?: boolean;
}

export function ImagePlaceholder({
  label,
  aspectRatio = "aspect-[4/3]",
  className = "",
  dark = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`
        relative ${aspectRatio} rounded-2xl overflow-hidden
        ${dark ? "bg-mc-dark-card" : "bg-mc-gray-100"}
        flex flex-col items-center justify-center gap-2
        ${className}
      `}
    >
      <svg
        className={`w-10 h-10 ${dark ? "text-white/20" : "text-mc-gray-400"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span
        className={`text-xs font-body font-medium ${dark ? "text-white/30" : "text-mc-gray-400"}`}
      >
        {label}
      </span>
    </div>
  );
}
