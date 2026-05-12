"use client";

import { useModal } from "@/context/ModalContext";

interface ModalTriggerButtonProps {
  label?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantClasses = {
  primary:
    "bg-mc-orange text-white hover:bg-mc-orange-dark shadow-lg shadow-mc-orange/20",
  outline:
    "border border-mc-orange text-mc-orange hover:bg-mc-orange hover:text-white",
  ghost:
    "text-mc-orange hover:text-mc-orange-dark underline-offset-4 hover:underline",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function ModalTriggerButton({
  label = "Agenda una consultoría",
  variant = "primary",
  size = "md",
  className = "",
}: ModalTriggerButtonProps) {
  const { openModal } = useModal();

  return (
    <button
      onClick={openModal}
      className={`
        inline-flex items-center justify-center font-body font-semibold
        rounded-full transition-all duration-200 cursor-pointer active:scale-[0.98]
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `.trim()}
    >
      {label}
    </button>
  );
}
