"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ModalTriggerButton } from "@/components/ui/ModalTriggerButton";

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
      // Image — clip-path reveal from left
      gsap.set(".about-image", { clipPath: "inset(0 100% 0 0 round 16px)", opacity: 0 });
      gsap.to(".about-image", {
        clipPath: "inset(0 0% 0 0 round 16px)",
        opacity: 1,
        duration: 1.1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".about-image", start: "top 80%" },
      });

      // Decorative border element — delayed reveal
      gsap.from(".about-deco-border", {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-image", start: "top 80%" },
        delay: 0.5,
      });

      // Content — stagger clip from bottom
      gsap.set(".about-content > *", { clipPath: "inset(0 0 100% 0)", opacity: 0 });
      gsap.to(".about-content > *", {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-content", start: "top 80%" },
      });

    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section-padding bg-mc-cream" id="sobre-montse">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="about-image relative">
            <ImagePlaceholder
              label="Foto Montse Cespedosa — perfil"
              aspectRatio="aspect-[4/5]"
              className="max-w-sm mx-auto lg:max-w-none"
            />
            <div className="about-deco-border absolute -bottom-4 -right-4 w-3/4 h-3/4 rounded-2xl border-2 border-mc-orange/20 -z-10" />
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
            <div className="about-creds grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {CREDENTIALS.map((cred) => (
                <div
                  key={cred.label}
                  className="about-cred flex items-start gap-3 p-3 rounded-xl bg-mc-cream border border-mc-gray-200 hover:border-mc-orange/30 hover:bg-mc-orange/[0.03] transition-all duration-200"
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

            <ModalTriggerButton size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
