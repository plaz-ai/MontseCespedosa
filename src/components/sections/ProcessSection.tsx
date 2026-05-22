"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PROCESS_STEPS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".process-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-header", start: "top 85%" },
      });

      // Step circles — scale from center
      gsap.from(".process-circle", {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".process-steps", start: "top 80%" },
      });

      // Step content — fade up after circles
      gsap.from(".process-content", {
        opacity: 0,
        y: 24,
        stagger: 0.2,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-steps", start: "top 80%" },
        delay: 0.3,
      });

      // SVG path draw — stroke-dashoffset
      gsap.fromTo(
        ".process-path",
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".process-steps", start: "top 75%", end: "top 40%", scrub: 1 },
        }
      );

      // Mobile arrow connectors
      gsap.from(".process-arrow", {
        opacity: 0,
        scaleY: 0,
        transformOrigin: "top center",
        stagger: 0.2,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".process-steps", start: "top 80%" },
        delay: 0.5,
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section-padding bg-mc-cream" id="proceso">
      <div className="container-wide">
        <div className="process-header mb-14 lg:mb-20">
          <SectionHeader
            eyebrow="Cómo trabajamos"
            title="El proceso"
            titleAccent="paso a paso"
            description="Sin sorpresas, sin tecnicismos. Te guiamos en cada etapa para que la gestión de tu hipoteca sea simple y transparente."
          />
        </div>

        {/* Steps */}
        <div className="process-steps relative">
          {/* SVG connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[calc(16.67%+3rem)] right-[calc(16.67%+3rem)] h-0 overflow-visible pointer-events-none">
            <svg
              width="100%"
              height="2"
              style={{ overflow: "visible" }}
              preserveAspectRatio="none"
            >
              <path
                className="process-path"
                d="M 0 1 L 1000 1"
                stroke="#D4621B"
                strokeWidth="1.5"
                strokeDasharray="6 5"
                strokeLinecap="round"
                fill="none"
                pathLength="100"
                strokeDashoffset="100"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.number} className="relative flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Step number circle */}
                <div className="process-circle relative mb-6 z-10">
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-mc-orange flex items-center justify-center shadow-lg shadow-mc-orange/10 relative">
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-mc-orange/20 scale-110" />
                    <span className="font-display text-3xl font-bold text-mc-orange relative z-10">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Mobile connector arrow */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="process-arrow absolute -bottom-10 left-1/2 -translate-x-1/2 lg:hidden text-mc-orange/60">
                    <svg className="w-5 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 32">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 0v24m0 0l-6-6m6 6l6-6" />
                    </svg>
                  </div>
                )}

                <div className="process-content">
                  <h3 className="font-display text-2xl font-semibold text-mc-text mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-mc-text-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
