"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.from(".contact-header, .contact-form, .contact-info", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-header", start: "top 85%" },
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={containerRef} className="section-padding bg-white" id="contacto">
      <div className="container-wide">
        <div className="contact-header mb-12 lg:mb-16">
          <SectionHeader
            eyebrow="Contacto"
            title="Explícanos"
            titleAccent="tu caso"
            description="Sin compromiso. Cuéntanos tu situación y te diremos exactamente qué podemos hacer por vos."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Form */}
          <div className="contact-form lg:col-span-3">
            {submitted ? (
              <div className="bg-mc-orange/10 border border-mc-orange/20 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-mc-orange flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-mc-text mb-2">¡Mensaje recibido!</h3>
                <p className="font-body text-mc-text-muted text-sm">
                  Te contactamos en menos de 24 horas hábiles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-body font-semibold text-mc-text-muted uppercase tracking-wide mb-1.5">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl border border-mc-gray-200 bg-mc-cream font-body text-sm text-mc-text placeholder:text-mc-gray-400 focus:outline-none focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-semibold text-mc-text-muted uppercase tracking-wide mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-mc-gray-200 bg-mc-cream font-body text-sm text-mc-text placeholder:text-mc-gray-400 focus:outline-none focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold text-mc-text-muted uppercase tracking-wide mb-1.5">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    placeholder="+34 600 000 000"
                    className="w-full px-4 py-3 rounded-xl border border-mc-gray-200 bg-mc-cream font-body text-sm text-mc-text placeholder:text-mc-gray-400 focus:outline-none focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold text-mc-text-muted uppercase tracking-wide mb-1.5">
                    ¿En qué podemos ayudarte?
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Cuéntanos tu caso: tipo de propiedad, precio, situación laboral..."
                    className="w-full px-4 py-3 rounded-xl border border-mc-gray-200 bg-mc-cream font-body text-sm text-mc-text placeholder:text-mc-gray-400 focus:outline-none focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all resize-none"
                  />
                </div>
                <Button
                  label="Enviar mensaje"
                  type="submit"
                  size="lg"
                  className="w-full justify-center"
                />
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="contact-info lg:col-span-2 space-y-5">
            {[
              {
                icon: "📞",
                title: "Teléfono",
                value: SITE_CONFIG.phone,
                href: `tel:${SITE_CONFIG.phone}`,
              },
              {
                icon: "✉️",
                title: "Email",
                value: SITE_CONFIG.email,
                href: `mailto:${SITE_CONFIG.email}`,
              },
              {
                icon: "🕐",
                title: "Horario",
                value: SITE_CONFIG.hours,
                href: undefined,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 rounded-2xl bg-mc-cream border border-mc-gray-200"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-xs font-body font-semibold text-mc-text-muted uppercase tracking-wide mb-0.5">
                    {item.title}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-body text-sm font-medium text-mc-text hover:text-mc-orange transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-body text-sm font-medium text-mc-text">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Registry note */}
            <p className="text-xs font-body text-mc-gray-400 leading-relaxed pt-2">
              {SITE_CONFIG.registry}. Servicio regulado bajo la Ley 5/2019 de
              Crédito Inmobiliario.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
