"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { STATS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function StatsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Reveal section
      gsap.from(".stats-inner", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats-inner", start: "top 85%" },
      });

      // Counter animation scoped to this section
      containerRef.current
        ?.querySelectorAll<HTMLElement>(".stat-value")
        .forEach((el) => {
          const target = Number(el.dataset.target ?? 0);
          gsap.to(
            { val: 0 },
            {
              val: target,
              duration: 2,
              ease: "power2.out",
              snap: { val: 1 },
              onUpdate: function () {
                el.textContent = Math.round(
                  (this.targets() as Array<{ val: number }>)[0].val
                ).toString();
              },
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            }
          );
        });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-mc-orange relative overflow-hidden">
      {/* Diagonal texture pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            white 0px,
            white 1px,
            transparent 1px,
            transparent 24px
          )`,
        }}
      />
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-mc-orange-dark/40 via-transparent to-mc-orange-dark/40 pointer-events-none" />

      <div className="container-wide stats-inner py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="flex items-baseline justify-center gap-0.5 mb-1">
                <span
                  className="stat-value font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tabular-nums"
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="font-display text-2xl md:text-3xl font-bold text-white/70">
                  {stat.suffix}
                </span>
              </div>
              <p className="font-body text-sm text-white/70 font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
