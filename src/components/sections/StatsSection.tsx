"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { STATS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function StatsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Section wipe reveal
    gsap.from(".stats-inner", {
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: ".stats-inner", start: "top 85%" },
    });

    // Stat columns — stagger clip from bottom
    gsap.set(".stat-col", { clipPath: "inset(0 0 100% 0)", opacity: 0 });
    ScrollTrigger.batch(".stat-col", {
      onEnter: (elements) => {
        gsap.to(elements, {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
        });
      },
      start: "top 82%",
      once: true,
    });

    // Counter
    containerRef.current?.querySelectorAll<HTMLElement>(".stat-value").forEach((el) => {
      const target = Number(el.dataset.target ?? 0);
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2.5,
        ease: "power2.out",
        snap: { val: 1 },
        onUpdate: function () {
          el.textContent = Math.round(
            (this.targets() as Array<{ val: number }>)[0].val
          ).toString();
        },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-mc-dark border-y border-white/[0.07] overflow-hidden relative">
      {/* Faint grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 25%)`,
        }}
      />

      <div className="stats-inner container-wide relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.07]">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-col px-6 md:px-10 py-16 lg:py-20 text-center group">
              {/* Mega number */}
              <div className="flex items-start justify-center gap-1 mb-3">
                <span
                  className="stat-value font-display font-bold text-white tabular-nums leading-none"
                  style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)" }}
                  data-target={stat.value}
                >
                  0
                </span>
                <span
                  className="font-display font-bold text-mc-orange leading-none"
                  style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
                >
                  {stat.suffix}
                </span>
              </div>

              {/* Divider line */}
              <div className="w-8 h-px bg-mc-orange/40 mx-auto mb-3 group-hover:w-14 transition-all duration-500" />

              <p className="font-body text-xs text-white/40 font-medium uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
