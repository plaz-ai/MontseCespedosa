"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ModalTriggerButton } from "@/components/ui/ModalTriggerButton";
import { Button } from "@/components/ui/Button";
import { HERO } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { opacity: 0, y: -20, duration: 0.6 })
        .from(".hero-headline", { opacity: 0, y: 40, duration: 0.8 }, "-=0.2")
        .from(".hero-tagline", { opacity: 0, y: 30, duration: 0.7 }, "-=0.4")
        .from(".hero-desc", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, "-=0.3")
        .from(".hero-stats", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, "-=0.2")
        .from(".hero-image", { opacity: 0, x: 50, duration: 1, ease: "power2.out" }, "-=0.8");
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-mc-dark flex items-center overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Orange glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-mc-orange/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-mc-orange/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-wide w-full pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 bg-mc-orange/10 border border-mc-orange/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-mc-orange animate-pulse" />
              <span className="text-mc-orange text-xs font-body font-semibold tracking-wide">
                {HERO.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-5">
              {HERO.headline}
              <br />
              <em className="not-italic text-mc-orange">{HERO.headlineAccent}</em>
            </h1>

            {/* Tagline */}
            <p className="hero-tagline font-body text-lg md:text-xl text-white/90 font-medium leading-snug mb-4 max-w-lg">
              &ldquo;{HERO.tagline}&rdquo;
            </p>

            {/* Description */}
            <p className="hero-desc font-body text-white/50 text-base leading-relaxed max-w-md mb-8">
              {HERO.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <ModalTriggerButton
                label={HERO.cta.primary.label}
                size="lg"
                className="hero-cta"
              />
              <Button
                label={HERO.cta.secondary.label}
                href="#contacto"
                size="lg"
                variant="outline"
                className="hero-cta border-white/30 text-white hover:bg-white hover:text-mc-text"
              />
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { value: "27+", label: "años experiencia" },
                { value: "500+", label: "clientes" },
                { value: "95%", label: "tasa de éxito" },
              ].map((stat) => (
                <div key={stat.label} className="hero-stats">
                  <div className="text-2xl font-display font-semibold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs font-body text-white/40 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="hero-image relative">
            <div className="relative">
              <ImagePlaceholder
                label="Foto Montse Cespedosa — hero"
                aspectRatio="aspect-[3/4]"
                dark
                className="max-w-sm mx-auto lg:max-w-none"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-mc-orange rounded-2xl p-4 shadow-2xl shadow-mc-orange/30 hidden sm:block">
                <div className="text-white font-display text-2xl font-bold">17</div>
                <div className="text-white/80 text-xs font-body">años directora</div>
                <div className="text-white/80 text-xs font-body">de oficina bancaria</div>
              </div>
              {/* Floating card 2 */}
              <div className="absolute -top-4 -right-4 bg-mc-dark-card border border-white/10 rounded-2xl p-4 shadow-2xl hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-3 h-3 text-mc-orange fill-mc-orange" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-white text-xs font-body font-medium">+500 reseñas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-bounce-slow" />
      </div>
    </section>
  );
}
