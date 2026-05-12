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

      ScrollTrigger.batch(".service-card", {
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
          });
        },
        start: "top 85%",
      });
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
              className={`service-card group relative rounded-2xl p-6 lg:p-8 border transition-all duration-300 hover:-translate-y-1 ${
                service.highlight
                  ? "bg-mc-orange border-mc-orange text-white"
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

              <div className="mb-4">
                <h3
                  className={`font-display text-2xl font-semibold mb-2 ${
                    service.highlight ? "text-white" : "text-white"
                  }`}
                >
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
