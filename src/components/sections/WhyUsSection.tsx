"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WHY_US_ITEMS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ICONS: Record<string, React.ReactNode> = {
  bank: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  ),
  key: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  message: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
};

export function WhyUsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".why-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-header",
          start: "top 85%",
        },
      });

      gsap.from(".why-card", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-card",
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section-padding bg-mc-cream" id="por-que-nosotros">
      <div className="container-wide">
        <div className="why-header mb-14 lg:mb-16">
          <SectionHeader
            eyebrow="¿Por qué elegirnos?"
            title="Exbanqueros de"
            titleAccent="tu lado"
            description="No somos una plataforma online. Somos asesores con 27 años dentro de la banca que saben exactamente cómo funciona el sistema y cómo trabajarlo a tu favor."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_US_ITEMS.map((item) => (
            <div
              key={item.id}
              className="why-card group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-mc-gray-200"
            >
              <div className="w-12 h-12 rounded-xl bg-mc-orange/10 flex items-center justify-center text-mc-orange mb-4 group-hover:bg-mc-orange group-hover:text-white transition-all duration-300">
                {ICONS[item.icon]}
              </div>
              <h3 className="font-display text-xl font-semibold text-mc-text mb-2">
                {item.title}
              </h3>
              <p className="font-body text-sm text-mc-text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
