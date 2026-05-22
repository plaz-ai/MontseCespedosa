"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ModalTriggerButton } from "@/components/ui/ModalTriggerButton";
import { Button } from "@/components/ui/Button";
import { HERO } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i, arr) => (
        <span key={i} className="overflow-hidden inline-block align-bottom pb-[0.12em] -mb-[0.12em]">
          <span className={`hero-word inline-block${className ? ` ${className}` : ""}`}>
            {word}{i < arr.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </>
  );
}

const MINI_STATS = [
  { value: 27, suffix: "+", label: "años experiencia" },
  { value: 500, suffix: "+", label: "clientes" },
  { value: 95, suffix: "%", label: "tasa de éxito" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-badge", { opacity: 0, y: -16, duration: 0.6, ease: "power3.out" })
        .from(".hero-word", { y: "110%", stagger: 0.07, duration: 1 }, "-=0.1")
        .from(".hero-tagline", { opacity: 0, y: 24, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(".hero-desc", { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 16, stagger: 0.1, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .from(".hero-stat-item", { opacity: 0, y: 12, stagger: 0.1, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .from(".hero-image", { opacity: 0, x: 60, duration: 1, ease: "power3.out" }, "-=0.9")
        .from(".hero-float-card", { opacity: 0, scale: 0.85, stagger: 0.15, duration: 0.6, ease: "back.out(1.8)" }, "-=0.4")
        .from(".hero-scroll-indicator", { opacity: 0, duration: 0.6 }, "-=0.2");

      // Parallax on glow elements
      gsap.to(".hero-glow-1", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(".hero-glow-2", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.5,
        },
      });

      // Counter animation on mini stats
      containerRef.current
        ?.querySelectorAll<HTMLElement>(".hero-stat-value")
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
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            }
          );
        });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-mc-dark flex items-center overflow-hidden"
    >
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Orange glows — parallax */}
      <div className="hero-glow-1 absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-mc-orange/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="hero-glow-2 absolute bottom-1/4 left-1/4 w-72 h-72 bg-mc-orange/5 rounded-full blur-[90px] pointer-events-none" />
      {/* Extra subtle accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-mc-orange/[0.03] rounded-full blur-[180px] pointer-events-none" />

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

            {/* Headline — word split reveal */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-5">
              <WordReveal text={HERO.headline} />
              <br />
              <em className="not-italic text-mc-orange">
                <WordReveal text={HERO.headlineAccent} />
              </em>
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

            {/* Mini stats with counter */}
            <div className="flex flex-wrap gap-6">
              {MINI_STATS.map((stat) => (
                <div key={stat.label} className="hero-stat-item">
                  <div className="flex items-baseline gap-0.5">
                    <span
                      className="hero-stat-value font-display text-2xl font-semibold text-white"
                      data-target={stat.value}
                    >
                      {stat.value}
                    </span>
                    <span className="font-display text-xl font-semibold text-mc-orange">
                      {stat.suffix}
                    </span>
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
              {/* Floating card 1 */}
              <div className="hero-float-card absolute -bottom-6 -left-6 bg-mc-orange rounded-2xl p-4 shadow-2xl shadow-mc-orange/30 hidden sm:block">
                <div className="text-white font-display text-2xl font-bold">17</div>
                <div className="text-white/80 text-xs font-body">años directora</div>
                <div className="text-white/80 text-xs font-body">de oficina bancaria</div>
              </div>
              {/* Floating card 2 */}
              <div className="hero-float-card absolute -top-4 -right-4 bg-mc-dark-card border border-white/10 rounded-2xl p-4 shadow-2xl hidden sm:block">
                <div className="flex items-center gap-1 mb-1">
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
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-white/30 text-[9px] font-body tracking-[0.25em] uppercase">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-mc-orange/50 via-white/20 to-transparent animate-bounce-slow" />
      </div>
    </section>
  );
}
