"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ModalTriggerButton } from "@/components/ui/ModalTriggerButton";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { TRAINING } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function TrainingSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Card rises up then content sequences inside
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ".training-card", start: "top 82%", once: true },
      defaults: { ease: "power3.out" },
    });

    tl.from(".training-card",     { y: 80, opacity: 0, duration: 0.9 })
      .from(".training-eyebrow",  { opacity: 0, y: 18, duration: 0.5 }, "-=0.5")
      .from(".training-title",    { opacity: 0, y: 28, duration: 0.65 }, "-=0.35")
      .from(".training-subtitle", { opacity: 0, y: 16, duration: 0.5 }, "-=0.35")
      .from(".training-desc",     { opacity: 0, y: 14, duration: 0.45 }, "-=0.3")
      .from(".training-feature",  { opacity: 0, x: -22, stagger: 0.07, duration: 0.4 }, "-=0.2")
      .from(".training-cta",      { opacity: 0, y: 12, duration: 0.4 }, "-=0.15");

    // Image wipes in from the right edge
    gsap.fromTo(
      ".training-image",
      { clipPath: "inset(0 0 0 100%)" },
      {
        clipPath: "inset(0 0 0 0%)",
        duration: 1.1,
        ease: "power3.inOut",
        delay: 0.45,
        scrollTrigger: { trigger: ".training-card", start: "top 82%", once: true },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-padding bg-mc-cream" id="formacion">
      <div className="container-wide">
        <div className="training-card bg-mc-dark rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Content */}
            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <span className="training-eyebrow block text-xs font-semibold tracking-widest uppercase mb-3 font-body text-mc-orange">
                Formación
              </span>
              <h2 className="training-title font-display text-4xl md:text-5xl text-white leading-tight mb-3">
                {TRAINING.title}
              </h2>
              <p className="training-subtitle font-body text-mc-orange font-medium text-lg mb-5">
                {TRAINING.subtitle}
              </p>
              <p className="training-desc font-body text-white/60 text-sm leading-relaxed mb-7">
                {TRAINING.description}
              </p>

              <ul className="space-y-2.5 mb-8">
                {TRAINING.features.map((feature) => (
                  <li key={feature} className="training-feature flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-mc-orange flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-body text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="training-cta">
                <ModalTriggerButton label={TRAINING.cta.label} size="lg" />
              </div>
            </div>

            {/* Image */}
            <div className="training-image relative min-h-[300px] lg:min-h-0">
              <ImagePlaceholder
                label="Imagen curso hipotecas"
                aspectRatio="aspect-auto"
                dark
                className="absolute inset-0 w-full h-full rounded-none"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-mc-dark/40 to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
