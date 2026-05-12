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

      gsap.from(".process-step", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-step", start: "top 80%" },
      });

      gsap.from(".process-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".process-line", start: "top 80%" },
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
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px">
            <div className="process-line w-full h-full bg-gradient-to-r from-mc-orange via-mc-orange-light to-mc-orange" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.number} className="process-step relative flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Step number circle */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-mc-orange flex items-center justify-center shadow-lg shadow-mc-orange/10">
                    <span className="font-display text-3xl font-bold text-mc-orange">
                      {step.number}
                    </span>
                  </div>
                  {/* Connector arrow for mobile */}
                  {idx < PROCESS_STEPS.length - 1 && (
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 lg:hidden text-mc-orange">
                      <svg className="w-5 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 32">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 0v24m0 0l-6-6m6 6l6-6" />
                      </svg>
                    </div>
                  )}
                </div>

                <h3 className="font-display text-2xl font-semibold text-mc-text mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-mc-text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
