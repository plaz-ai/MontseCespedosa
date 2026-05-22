"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { WHY_US_ITEMS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ICONS: Record<string, React.ReactNode> = {
  bank: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  ),
  key: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  ),
  shield: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  message: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
};

export function WhyUsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".why-section-header", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".why-section-header", start: "top 85%" },
    });

    // Rows slide in from left with stagger
    gsap.set(".why-item", { opacity: 0, x: -32 });
    ScrollTrigger.batch(".why-item", {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.75,
          ease: "power3.out",
        });
      },
      start: "top 85%",
      once: true,
    });

    // Icon hover float per item
    gsap.utils.toArray<HTMLElement>(".why-item").forEach((item) => {
      const icon = item.querySelector(".why-icon");
      if (!icon) return;
      item.addEventListener("mouseenter", () => {
        gsap.to(icon, { y: -4, rotate: 5, duration: 0.25, ease: "power2.out" });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(icon, { y: 0, rotate: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-padding bg-mc-dark" id="por-que-nosotros">
      <div className="container-wide">

        {/* Editorial header */}
        <div className="why-section-header flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-white/[0.08] gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-body tracking-[0.25em] uppercase text-mc-orange font-semibold">
              01 ——
            </span>
            <span className="text-[10px] font-body tracking-[0.25em] uppercase text-white/30">
              ¿Por qué elegirnos?
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white text-right leading-tight">
            Exbanqueros de <em className="not-italic text-mc-orange">tu lado</em>
          </h2>
        </div>

        {/* Numbered list */}
        <div className="why-list">
          {WHY_US_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className="why-item group border-b border-white/[0.07] last:border-b-0 cursor-default"
            >
              <div className="grid grid-cols-[48px_1fr] lg:grid-cols-[48px_280px_1fr] gap-x-6 lg:gap-x-10 py-7 items-start">
                {/* Number */}
                <span className="font-body text-mc-orange/30 text-sm font-medium pt-1 group-hover:text-mc-orange transition-colors duration-300 tabular-nums">
                  0{i + 1}
                </span>

                {/* Title + icon */}
                <div className="flex items-start gap-3 lg:border-r lg:border-white/[0.07] lg:pr-10">
                  <span className="why-icon text-mc-orange/40 mt-0.5 flex-shrink-0 group-hover:text-mc-orange transition-colors duration-300">
                    {ICONS[item.icon]}
                  </span>
                  <h3 className="font-display text-xl lg:text-2xl text-white/80 group-hover:text-white transition-colors duration-300 leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Description — desktop */}
                <p className="hidden lg:block font-body text-sm text-white/35 leading-relaxed pt-0.5 group-hover:text-white/55 transition-colors duration-300">
                  {item.description}
                </p>

                {/* Description — mobile */}
                <p className="lg:hidden col-span-2 col-start-2 font-body text-sm text-white/40 leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              {/* Bottom reveal line on hover (CSS transition) */}
              <div className="h-px bg-mc-orange/25 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
