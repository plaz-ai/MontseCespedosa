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
            {word}{i < arr.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </>
  );
}

const BOTTOM_STATS = [
  { value: 27,  suffix: "+", label: "años de experiencia" },
  { value: 500, suffix: "+", label: "clientes asesorados" },
  { value: 95,  suffix: "%", label: "tasa de éxito" },
  { value: 17,  suffix: "",  label: "años dir. bancaria" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // ── ENTRANCE ────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-meta-bar",  { opacity: 0, y: -10, duration: 0.5, ease: "power3.out" })
      .from(".hero-row-1 .hero-word", { y: "115%", stagger: 0.06, duration: 1.0 }, "-=0.1")
      .from(".hero-row-2 .hero-word", { y: "115%", stagger: 0.06, duration: 1.1 }, "-=0.75")
      .from(".hero-row-3 .hero-word", { y: "115%", stagger: 0.06, duration: 1.0 }, "-=0.7")
      .from(".hero-tagline",   { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .from(".hero-cta-wrap",  { opacity: 0, y: 14, stagger: 0.12, duration: 0.5, ease: "power3.out" }, "-=0.4")
      .from(".hero-stat-bar",  { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .from(".hero-scroll-cue",{ opacity: 0, duration: 0.5 }, "-=0.2");

    // ── AMBIENT GLOWS ────────────────────────────────────────
    gsap.to(".hero-glow-1", { x: 70, y: 50, duration: 7,  ease: "sine.inOut", repeat: -1, yoyo: true });
    gsap.to(".hero-glow-2", { x: -50, y: -35, duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 3 });

    // ── BADGE FLOAT ──────────────────────────────────────────
    gsap.to(".hero-badge-float", { y: -5, duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true });

    // ── SCROLL PARALLAX — rows drift apart ───────────────────
    gsap.to(".hero-row-1", {
      x: -60, ease: "none",
      scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.to(".hero-row-3", {
      x: 50, ease: "none",
      scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 0.8 },
    });

    // ── MAGNETIC CTAs ────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".hero-cta-wrap").forEach((wrap) => {
      const xTo = gsap.quickTo(wrap, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(wrap, "y", { duration: 0.4, ease: "power3.out" });
      wrap.addEventListener("mousemove", (e: Event) => {
        const me = e as MouseEvent;
        const rect = wrap.getBoundingClientRect();
        xTo((me.clientX - rect.left - rect.width  / 2) * 0.22);
        yTo((me.clientY - rect.top  - rect.height / 2) * 0.22);
      });
      wrap.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
    });

    // ── STAT COUNTERS ────────────────────────────────────────
    containerRef.current?.querySelectorAll<HTMLElement>(".hero-stat-value").forEach((el) => {
      const target = Number(el.dataset.target ?? 0);
      gsap.to({ val: 0 }, {
        val: target, duration: 2, ease: "power2.out", snap: { val: 1 },
        onUpdate: function () {
          el.textContent = Math.round((this.targets() as Array<{ val: number }>)[0].val).toString();
        },
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen bg-mc-cream flex flex-col overflow-hidden">
      {/* Ambient glows */}
      <div className="hero-glow-1 absolute top-[25%] left-[20%] w-[600px] h-[600px] bg-mc-orange/[0.07] rounded-full blur-[180px] pointer-events-none" />
      <div className="hero-glow-2 absolute bottom-[15%] right-[15%] w-[400px] h-[400px] bg-mc-orange/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Meta bar */}
      <div className="hero-meta-bar relative z-10 flex items-center justify-between px-6 md:px-10 py-5 border-b border-mc-gray-200">
        <span className="text-[9px] font-body tracking-[0.28em] uppercase text-mc-text-muted/50 hidden sm:block">
          Broker Hipotecario · MC Group
        </span>
        <div className="hero-badge-float flex items-center gap-2 bg-mc-orange/10 border border-mc-orange/25 rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-mc-orange animate-pulse" />
          <span className="text-mc-orange text-[9px] font-body font-semibold tracking-wide">{HERO.badge}</span>
        </div>
        <span className="text-[9px] font-body tracking-[0.28em] uppercase text-mc-text-muted/50 hidden sm:block">
          Madrid · España
        </span>
      </div>

      {/* ── CENTRED EDITORIAL HEADLINE ──────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-10 py-16 gap-10">
        <h1 className="leading-none select-none w-full">
          {/* Ghost row */}
          <span className="hero-row-1 block font-body font-black uppercase tracking-[-0.025em] leading-[0.92]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7.5rem)", color: "rgba(26,24,38,0.07)" }}>
            <WordReveal text="Expertos" />
          </span>
          {/* Elegant serif anchor */}
          <span className="hero-row-2 block font-display italic leading-[0.85] text-mc-text"
            style={{ fontSize: "clamp(4rem, 14vw, 15rem)" }}>
            <WordReveal text="en" />
          </span>
          {/* Orange dominant */}
          <span className="hero-row-3 block font-body font-black uppercase tracking-[-0.03em] leading-[0.92] text-mc-orange"
            style={{ fontSize: "clamp(2.2rem, 6.5vw, 7rem)" }}>
            <WordReveal text="hipotecas" />
          </span>
        </h1>

        {/* Tagline + CTAs */}
        <div className="flex flex-col items-center gap-6 max-w-lg">
          <p className="hero-tagline font-body text-mc-text-muted text-base leading-relaxed">
            &ldquo;{HERO.tagline}&rdquo;
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="hero-cta-wrap inline-block">
              <ModalTriggerButton label={HERO.cta.primary.label} size="lg" />
            </div>
            <div className="hero-cta-wrap inline-block">
              <Button
                label={HERO.cta.secondary.label}
                href="#contacto"
                size="lg"
                variant="outline"
                className="border-mc-text/20 text-mc-text hover:bg-mc-text hover:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ───────────────────────────────────────── */}
      <div className="hero-stat-bar relative z-10 border-t border-mc-gray-200 grid grid-cols-2 lg:grid-cols-4 divide-x divide-mc-gray-200">
        {BOTTOM_STATS.map((stat) => (
          <div key={stat.label} className="text-center py-5 px-4">
            <div className="flex items-baseline justify-center gap-0.5 tabular-nums">
              <span className="hero-stat-value font-display text-3xl font-bold text-mc-text" data-target={stat.value}>
                {stat.value}
              </span>
              <span className="font-display text-xl font-bold text-mc-orange">{stat.suffix}</span>
            </div>
            <p className="text-[9px] font-body text-mc-text-muted uppercase tracking-[0.18em] mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue absolute bottom-[88px] right-8 hidden md:flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-mc-text-muted/30 text-[8px] font-body tracking-[0.3em] uppercase">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-mc-orange/50 to-transparent animate-bounce-slow" />
      </div>
    </section>
  );
}
