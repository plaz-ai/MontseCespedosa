"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    // Header choreography
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ".contact-header", start: "top 85%", once: true },
      defaults: { ease: "power3.out" },
    });
    tl.from(".contact-eyebrow",  { opacity: 0, y: 16, duration: 0.5 })
      .from(".contact-title",    { opacity: 0, y: 28, duration: 0.65 }, "-=0.3")
      .from(".contact-desc",     { opacity: 0, y: 16, duration: 0.5 },  "-=0.35");

    // Form fields stagger — each label+input group slides up
    gsap.set(".contact-field", { opacity: 0, y: 28 });
    ScrollTrigger.batch(".contact-field", {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.09,
          duration: 0.6,
          ease: "power3.out",
        });
      },
      start: "top 88%",
      once: true,
    });

    // Submit button fades after fields
    gsap.from(".contact-submit", {
      opacity: 0,
      y: 16,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: { trigger: ".contact-submit", start: "top 92%", once: true },
    });

    // Info cards stagger in from the right
    gsap.set(".contact-info-card", { opacity: 0, x: 28 });
    ScrollTrigger.batch(".contact-info-card", {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
        });
      },
      start: "top 88%",
      once: true,
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={containerRef} className="section-padding bg-mc-cream" id="contacto">
      <div className="container-wide">

        {/* Editorial header */}
        <div className="contact-header flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-mc-gray-200 gap-4">
          <div className="flex items-center gap-4">
            <span className="contact-eyebrow text-[10px] font-body tracking-[0.25em] uppercase text-mc-orange font-semibold">
              05 ——
            </span>
            <span className="text-[10px] font-body tracking-[0.25em] uppercase text-mc-text-muted">
              Contacto
            </span>
          </div>
          <div className="text-right">
            <h2 className="contact-title font-display text-3xl md:text-4xl text-mc-text leading-tight">
              Explícanos <em className="not-italic text-mc-orange">tu caso</em>
            </h2>
            <p className="contact-desc font-body text-sm text-mc-text-muted mt-2 max-w-sm ml-auto">
              Sin compromiso. Cuéntanos tu situación y te diremos exactamente qué podemos hacer por vos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Form */}
          <div className="lg:col-span-3">
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
                  <div className="contact-field">
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
                  <div className="contact-field">
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
                <div className="contact-field">
                  <label className="block text-xs font-body font-semibold text-mc-text-muted uppercase tracking-wide mb-1.5">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    placeholder="+34 600 000 000"
                    className="w-full px-4 py-3 rounded-xl border border-mc-gray-200 bg-mc-cream font-body text-sm text-mc-text placeholder:text-mc-gray-400 focus:outline-none focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all"
                  />
                </div>
                <div className="contact-field">
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
                <div className="contact-submit">
                  <Button
                    label="Enviar mensaje"
                    type="submit"
                    size="lg"
                    className="w-full justify-center"
                  />
                </div>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="contact-info lg:col-span-2 space-y-5">
            {[
              {
                title: "Teléfono",
                value: SITE_CONFIG.phone,
                href: `tel:${SITE_CONFIG.phone}`,
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
              },
              {
                title: "Email",
                value: SITE_CONFIG.email,
                href: `mailto:${SITE_CONFIG.email}`,
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Horario",
                value: SITE_CONFIG.hours,
                href: undefined,
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="contact-info-card flex items-start gap-4 p-4 rounded-2xl bg-mc-cream border border-mc-gray-200"
              >
                <span className="text-mc-orange mt-0.5 flex-shrink-0">{item.icon}</span>
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
