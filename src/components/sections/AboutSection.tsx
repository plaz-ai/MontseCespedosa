"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CREDENTIALS = [
  { label: "Directora de oficina bancaria", years: "17 años" },
  { label: "Experiencia en el sector bancario", years: "27 años" },
  { label: "Top Voice en Finanzas", years: "LinkedIn" },
  { label: "Intermediario de Crédito Inmobiliario", years: "Nº D786" },
];

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-image", {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-image", start: "top 80%" },
      });
      gsap.from(".about-content > *", {
        opacity: 0,
        x: 40,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-content", start: "top 80%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section-padding bg-white" id="sobre-montse">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="about-image relative">
            <ImagePlaceholder
              label="Foto Montse Cespedosa — perfil"
              aspectRatio="aspect-[4/5]"
              className="max-w-sm mx-auto lg:max-w-none"
            />
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 rounded-2xl border-2 border-mc-orange/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-mc-orange/5 -z-10" />
          </div>

          {/* Content */}
          <div className="about-content">
            <span className="block text-xs font-semibold tracking-widest uppercase mb-3 font-body text-mc-orange">
              Quién es Montse
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-mc-text leading-tight mb-5">
              27 años dentro de <em className="not-italic text-mc-orange">la banca</em>
            </h2>
            <p className="font-body text-mc-text-muted text-base leading-relaxed mb-4">
              Montse Cespedosa dedicó 27 años a la banca española, de los cuales
              17 como <strong className="text-mc-text font-semibold">directora de oficina bancaria</strong>.
              Desde dentro, aprendió cada mecanismo del sistema: cómo los bancos
              evalúan el riesgo, dónde esconden los márgenes y qué palancas de
              negociación funcionan realmente.
            </p>
            <p className="font-body text-mc-text-muted text-base leading-relaxed mb-8">
              Hoy, con MC Group, pone ese conocimiento al servicio de los clientes.
              No como intermediaria de plataformas, sino como asesora directa con
              acceso privilegiado a los bancos y con la capacidad de negociar donde
              otros no llegan.
            </p>

            {/* Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {CREDENTIALS.map((cred) => (
                <div
                  key={cred.label}
                  className="flex items-start gap-3 p-3 rounded-xl bg-mc-cream border border-mc-gray-200"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-mc-orange mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-body font-semibold text-mc-text">
                      {cred.years}
                    </div>
                    <div className="text-xs font-body text-mc-text-muted">
                      {cred.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              label="Agenda una consultoría"
              href="#consultoria"
              size="lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
