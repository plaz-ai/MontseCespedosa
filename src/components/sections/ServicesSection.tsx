"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".services-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-header", start: "top 85%" },
      });

      // Clip-path wipe reveal on cards
      gsap.set(".service-card", { opacity: 0, clipPath: "inset(0 100% 0 0 round 16px)" });

      ScrollTrigger.batch(".service-card", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            clipPath: "inset(0 0% 0 0 round 16px)",
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
          });
        },
        start: "top 82%",
        once: true,
      });

      // Subtle scale pulse on highlighted card
      const highlighted = containerRef.current?.querySelector(".service-card-highlight");
      if (highlighted) {
        gsap.to(highlighted, {
          boxShadow: "0 0 40px 8px rgba(212,98,27,0.25)",
          repeat: -1,
          yoyo: true,
          duration: 2.5,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section-padding bg-mc-dark" id="servicios">
      <div className="container-wide">
        <div className="services-header mb-14 lg:mb-16">
          <SectionHeader
            eyebrow="Nuestros servicios"
            title="Todo lo que"
            titleAccent="necesitás"
            description="Desde la consultoría inicial hasta la firma ante notario. Nos especializamos en cada tipología hipotecaria para que consigas las mejores condiciones."
            light
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className={`service-card group relative rounded-2xl p-6 lg:p-8 border transition-all duration-300 hover:-translate-y-1.5 ${
                service.highlight
                  ? "service-card-highlight bg-mc-orange border-mc-orange text-white"
                  : "bg-[#1E1C2A] border-white/15 hover:border-mc-orange/50 hover:bg-[#221F30]"
              }`}
            >
              {service.highlight && (
                <div className="absolute top-4 right-4 bg-white/20 rounded-full px-3 py-0.5">
                  <span className="text-white text-[10px] font-body font-semibold uppercase tracking-wide">
                    Más popular
                  </span>
                </div>
              )}

              {/* Top accent line */}
              <div className={`absolute top-0 left-6 right-6 h-px ${service.highlight ? "bg-white/30" : "bg-mc-orange/0 group-hover:bg-mc-orange/40"} transition-all duration-500`} />

              <div className="mb-4">
                <h3 className="font-display text-2xl font-semibold mb-2 text-white">
                  {service.title}
                </h3>
                {service.price && (
                  <div className="flex items-baseline gap-1 mb-3">
                    <span
                      className={`text-2xl font-display font-bold ${
                        service.highlight ? "text-white" : "text-mc-orange"
                      }`}
                    >
                      {service.price}
                    </span>
                    {service.duration && (
                      <span
                        className={`text-sm font-body ${
                          service.highlight ? "text-white/70" : "text-white/40"
                        }`}
                      >
                        / {service.duration}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <p
                className={`font-body text-sm leading-relaxed mb-6 ${
                  service.highlight ? "text-white/90" : "text-white/75"
                }`}
              >
                {service.description}
              </p>

              <Button
                label="Más información"
                href={service.href}
                variant={service.highlight ? "secondary" : "outline"}
                size="sm"
                className={
                  !service.highlight
                    ? "border-white/20 text-white hover:bg-white hover:text-mc-text"
                    : ""
                }
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
