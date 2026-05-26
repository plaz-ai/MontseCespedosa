"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const MEDIA_LOGOS = [
  {
    name: "El País",
    style: "font-display font-bold text-[#1A1A1A] text-lg tracking-tighter",
  },
  {
    name: "Cadena SER",
    style: "font-body font-black text-[#0073CF] text-xs tracking-widest uppercase",
  },
  {
    name: "Telecinco",
    style: "font-display font-bold text-[#003087] text-lg italic",
  },
  {
    name: "Antena 3",
    style: "font-body font-black text-[#E63312] text-sm tracking-tight",
  },
  {
    name: "La Sexta",
    style: "font-display font-bold text-[#1DB954] text-lg",
  },
  {
    name: "Expansión",
    style: "font-display font-bold text-[#0B2447] text-base tracking-tight",
  },
  {
    name: "El Mundo",
    style: "font-display font-bold text-[#1A3A6B] text-lg tracking-tighter",
  },
  {
    name: "ABC",
    style: "font-display font-bold text-[#C8102E] text-2xl tracking-tight",
  },
  {
    name: "20 Minutos",
    style: "font-body font-black text-[#FF6B00] text-xs tracking-widest uppercase",
  },
  {
    name: "COPE",
    style: "font-body font-black text-[#003087] text-base tracking-[0.2em]",
  },
  {
    name: "Onda Cero",
    style: "font-body font-bold text-[#0047AB] text-xs tracking-widest uppercase",
  },
  {
    name: "idealista",
    style: "font-body font-black text-[#D4621B] text-sm tracking-tight",
  },
];

// Tripled for seamless GSAP loop
const ALL_LOGOS = [...MEDIA_LOGOS, ...MEDIA_LOGOS, ...MEDIA_LOGOS];

export function MediaBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let tween: gsap.core.Tween;
    let removeListeners: (() => void) | undefined;

    const frame = requestAnimationFrame(() => {
      const totalWidth = el.scrollWidth / 3;

      tween = gsap.fromTo(
        el,
        { x: 0 },
        { x: -totalWidth, duration: 28, ease: "none", repeat: -1 }
      );

      const slowDown = () => tween?.timeScale(0.2);
      const speedUp = () => tween?.timeScale(1);

      el.addEventListener("mouseenter", slowDown);
      el.addEventListener("mouseleave", speedUp);
      removeListeners = () => {
        el.removeEventListener("mouseenter", slowDown);
        el.removeEventListener("mouseleave", speedUp);
      };
    });

    return () => {
      cancelAnimationFrame(frame);
      tween?.kill();
      removeListeners?.();
    };
  }, []);

  return (
    <section className="bg-mc-cream border-y border-mc-gray-200 py-6 overflow-hidden">
      <div className="container-wide flex items-center gap-4 mb-5">
        <span className="text-[10px] font-body font-semibold text-mc-gray-400 tracking-widest uppercase whitespace-nowrap">
          Montse en los medios
        </span>
        <div className="flex-1 h-px bg-mc-gray-200" />
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* GSAP-driven ticker */}
        <div ref={trackRef} className="flex items-center whitespace-nowrap will-change-transform">
          {ALL_LOGOS.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="inline-flex items-center mx-6 flex-shrink-0"
            >
              <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-mc-gray-100 border border-mc-gray-200 hover:border-mc-orange/30 hover:bg-mc-orange/5 transition-all duration-200 cursor-default min-w-[110px]">
                <span className={logo.style}>{logo.name}</span>
              </div>
              <span className="ml-6 text-mc-gray-200 text-sm">|</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
