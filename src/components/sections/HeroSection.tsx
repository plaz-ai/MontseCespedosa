"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ModalTriggerButton } from "@/components/ui/ModalTriggerButton";
import { Button } from "@/components/ui/Button";
import { HERO } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i, arr) => (
        <span key={i} className="overflow-hidden inline-block align-bottom pb-[0.06em] -mb-[0.06em]">
          <span className={`hero-word inline-block${className ? ` ${className}` : ""}`}>
            {word}{i < arr.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </>
  );
}

const MINI_STATS = [
  { value: 27, suffix: "+", label: "años exp." },
  { value: 500, suffix: "+", label: "clientes" },
  { value: 95,  suffix: "%", label: "tasa éxito" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-meta-bar", { opacity: 0, y: -10, duration: 0.5, ease: "power3.out" })
      .from(".hero-divider-v", { scaleY: 0, transformOrigin: "top center", duration: 1.2, ease: "power3.inOut" }, "-=0.2")
      .from(".hero-word", { y: "115%", stagger: 0.05, duration: 1.05 }, "-=0.85")
      .from(".hero-tagline", { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .from(".hero-cta", { opacity: 0, y: 12, stagger: 0.1, duration: 0.5, ease: "power3.out" }, "-=0.4")
      .from(".hero-photo-col", { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "power3.inOut" }, "-=1.1")
      .from(".hero-stat-item", { opacity: 0, y: 8, stagger: 0.1, duration: 0.4, ease: "power3.out" }, "-=0.3")
      .from(".hero-scroll-cue", { opacity: 0, duration: 0.5 }, "-=0.2");

    // Parallax glow
    gsap.to(".hero-glow-1", {
      y: -120,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Counter on stats
    containerRef.current?.querySelectorAll<HTMLElement>(".hero-stat-value").forEach((el) => {
      const target = Number(el.dataset.target ?? 0);
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2,
        ease: "power2.out",
        snap: { val: 1 },
        onUpdate: function () {
          el.textContent = Math.round((this.targets() as Array<{ val: number }>)[0].val).toString();
        },
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-mc-dark flex flex-col overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="hero-glow-1 absolute top-1/2 left-[30%] w-[700px] h-[700px] bg-mc-orange/[0.06] rounded-full blur-[180px] -translate-y-1/2 pointer-events-none" />

      {/* ── TOP META BAR ─────────────────────────────────── */}
      <div className="hero-meta-bar relative z-10 flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/[0.07]">
        <span className="text-[9px] font-body tracking-[0.28em] uppercase text-white/25 hidden sm:block">
          Broker Hipotecario · MC Group
        </span>
        {/* Badge centered */}
        <div className="flex items-center gap-2 bg-mc-orange/10 border border-mc-orange/20 rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-mc-orange animate-pulse" />
          <span className="text-mc-orange text-[9px] font-body font-semibold tracking-wide">
            {HERO.badge}
          </span>
        </div>
        <span className="text-[9px] font-body tracking-[0.28em] uppercase text-white/25 hidden sm:block">
          Madrid · España
        </span>
      </div>

      {/* ── MAIN EDITORIAL GRID ──────────────────────────── */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px]">

        {/* LEFT — Typography zone */}
        <div className="flex flex-col justify-between px-6 md:px-10 py-14 lg:py-16">

          {/* HEADLINE — 3 stacked words, 3 different visual weights */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="leading-none select-none">
              {/* "EXPERTOS" — ghost / barely visible */}
              <span className="block font-body font-black uppercase tracking-[-0.025em] leading-[0.92] text-[clamp(3rem,7.5vw,8rem)] text-white/[0.12]">
                <WordReveal text="Expertos" />
              </span>
              {/* "en" — elegant Cormorant italic, full white */}
              <span className="block font-display italic leading-[0.88] text-[clamp(4rem,10vw,11rem)] text-white -mt-1">
                <WordReveal text="en" />
              </span>
              {/* "HIPOTECAS" — orange, bold, dominant */}
              <span className="block font-body font-black uppercase tracking-[-0.03em] leading-[0.92] text-[clamp(2.8rem,7vw,7.5rem)] text-mc-orange -mt-1">
                <WordReveal text="hipotecas" />
              </span>
            </h1>
          </div>

          {/* BOTTOM — tagline + CTAs */}
          <div className="border-t border-white/[0.08] pt-8 space-y-6">
            <p className="hero-tagline font-body text-white/40 text-base leading-relaxed max-w-md">
              &ldquo;{HERO.tagline}&rdquo;
            </p>
            <div className="flex flex-wrap gap-3">
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
                className="hero-cta border-white/20 text-white hover:bg-white hover:text-mc-text"
              />
            </div>
          </div>
        </div>

        {/* Animated vertical divider */}
        <div className="hero-divider-v hidden lg:block absolute top-[73px] bottom-0 w-px bg-white/[0.07] origin-top"
          style={{ left: "calc(100% - 400px)" }}
        />
        <div className="hero-divider-v hidden xl:block absolute top-[73px] bottom-0 w-px bg-white/[0.07] origin-top"
          style={{ left: "calc(100% - 460px)" }}
        />

        {/* RIGHT — Photo zone */}
        <div
          className="hero-photo-col hidden lg:flex flex-col"
          style={{ clipPath: "inset(0 0 0 0)" }}
        >
          {/* Photo fills remaining height */}
          <div className="flex-1 relative overflow-hidden bg-mc-dark-card">
            {/* Placeholder visual */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <svg className="w-12 h-12 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-white/15 text-xs font-body">Foto Montse Cespedosa</span>
            </div>
            {/* Gradient fade bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-mc-dark/70 to-transparent" />
          </div>

          {/* Stats bar */}
          <div className="border-t border-white/[0.07] grid grid-cols-3 divide-x divide-white/[0.07] shrink-0">
            {MINI_STATS.map((stat) => (
              <div key={stat.label} className="hero-stat-item text-center py-5 px-2">
                <div className="flex items-baseline justify-center gap-0.5 tabular-nums">
                  <span
                    className="hero-stat-value font-display text-2xl font-bold text-white"
                    data-target={stat.value}
                  >
                    {stat.value}
                  </span>
                  <span className="font-display text-lg font-bold text-mc-orange">{stat.suffix}</span>
                </div>
                <p className="text-[9px] font-body text-white/30 uppercase tracking-[0.15em] mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue absolute bottom-6 left-8 hidden md:flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-white/20 text-[8px] font-body tracking-[0.3em] uppercase">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-mc-orange/40 to-transparent animate-bounce-slow" />
      </div>
    </section>
  );
}
