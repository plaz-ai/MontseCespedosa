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

const MINI_STATS = [
  { value: 27, suffix: "+", label: "años exp." },
  { value: 500, suffix: "+", label: "clientes" },
  { value: 95,  suffix: "%", label: "tasa éxito" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // ── ENTRANCE TIMELINE ──────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-meta-bar", { opacity: 0, y: -10, duration: 0.5, ease: "power3.out" })
      .from(".hero-divider-v", { scaleY: 0, transformOrigin: "top center", duration: 1.2, ease: "power3.inOut" }, "-=0.2")
      .from(".hero-word", { y: "115%", stagger: 0.05, duration: 1.05 }, "-=0.85")
      .from(".hero-tagline", { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .from(".hero-cta-wrap", { opacity: 0, y: 12, stagger: 0.12, duration: 0.5, ease: "power3.out" }, "-=0.4")
      .from(".hero-photo-col", { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "power3.inOut" }, "-=1.0")
      .from(".hero-stat-item", { opacity: 0, y: 8, stagger: 0.1, duration: 0.4, ease: "power3.out" }, "-=0.3")
      .from(".hero-scroll-cue", { opacity: 0, duration: 0.5 }, "-=0.2");

    // ── AMBIENT GLOW MOTION — page breathes ────────────────
    gsap.to(".hero-glow-1", {
      x: 70, y: 50,
      duration: 7,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(".hero-glow-2", {
      x: -50, y: -35,
      duration: 9,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 3,
    });

    // ── BADGE FLOAT — gentle continuous bob ─────────────────
    gsap.to(".hero-badge-float", {
      y: -5,
      duration: 2.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // ── SCROLL PARALLAX — headline rows drift apart ─────────
    gsap.to(".hero-row-1", {
      x: -55,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.to(".hero-row-3", {
      x: 45,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    // ── MAGNETIC CTAs ───────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".hero-cta-wrap").forEach((wrap) => {
      const xTo = gsap.quickTo(wrap, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(wrap, "y", { duration: 0.4, ease: "power3.out" });

      wrap.addEventListener("mousemove", (e: Event) => {
        const me = e as MouseEvent;
        const rect = wrap.getBoundingClientRect();
        xTo((me.clientX - rect.left - rect.width / 2) * 0.22);
        yTo((me.clientY - rect.top - rect.height / 2) * 0.22);
      });
      wrap.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
    });

    // ── STAT COUNTERS ───────────────────────────────────────
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
      className="relative min-h-screen bg-mc-cream flex flex-col overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="hero-glow-1 absolute top-[30%] left-[25%] w-[600px] h-[600px] bg-mc-orange/[0.07] rounded-full blur-[180px] pointer-events-none" />
      <div className="hero-glow-2 absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-mc-orange/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* ── TOP META BAR ──────────────────────────────────── */}
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

      {/* ── EDITORIAL GRID ────────────────────────────────── */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px]">

        {/* LEFT — Typography zone */}
        <div className="flex flex-col justify-between px-6 md:px-10 py-14 lg:py-16">

          {/* Headline stack — 3 visual weights */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="leading-none select-none">
              {/* Ghost row — barely there */}
              <span className="hero-row-1 block font-body font-black uppercase tracking-[-0.025em] leading-[0.92] text-[clamp(3rem,7.5vw,8rem)] text-mc-text/[0.08]">
                <WordReveal text="Expertos" />
              </span>
              {/* Anchor row — elegant serif, full weight */}
              <span className="hero-row-2 block font-display italic leading-[0.88] text-[clamp(4rem,10vw,11rem)] text-mc-text -mt-1">
                <WordReveal text="en" />
              </span>
              {/* Dominant row — orange bold */}
              <span className="hero-row-3 block font-body font-black uppercase tracking-[-0.03em] leading-[0.92] text-[clamp(2.8rem,7vw,7.5rem)] text-mc-orange -mt-1">
                <WordReveal text="hipotecas" />
              </span>
            </h1>
          </div>

          {/* Bottom — tagline + CTAs */}
          <div className="border-t border-mc-gray-200 pt-8 space-y-6">
            <p className="hero-tagline font-body text-mc-text-muted text-base leading-relaxed max-w-md">
              &ldquo;{HERO.tagline}&rdquo;
            </p>
            <div className="flex flex-wrap gap-3">
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

        {/* Animated vertical divider */}
        <div
          className="hero-divider-v hidden lg:block absolute top-[73px] bottom-0 w-px bg-mc-gray-200 origin-top"
          style={{ left: "calc(100% - 400px)" }}
        />
        <div
          className="hero-divider-v hidden xl:block absolute top-[73px] bottom-0 w-px bg-mc-gray-200 origin-top"
          style={{ left: "calc(100% - 460px)" }}
        />

        {/* RIGHT — Photo zone */}
        <div
          className="hero-photo-col hidden lg:flex flex-col bg-[#16151F]"
          style={{ clipPath: "inset(0 0 0 0)" }}
        >
          {/* Photo fills column */}
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <svg className="w-12 h-12 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-white/15 text-xs font-body">Foto Montse Cespedosa</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#16151F]/80 to-transparent" />
          </div>

          {/* Stats bar */}
          <div className="border-t border-white/[0.07] grid grid-cols-3 divide-x divide-white/[0.07] shrink-0">
            {MINI_STATS.map((stat) => (
              <div key={stat.label} className="hero-stat-item text-center py-5 px-2">
                <div className="flex items-baseline justify-center gap-0.5 tabular-nums">
                  <span className="hero-stat-value font-display text-2xl font-bold text-white" data-target={stat.value}>
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
        <span className="text-mc-text-muted/40 text-[8px] font-body tracking-[0.3em] uppercase">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-mc-orange/50 to-transparent animate-bounce-slow" />
      </div>
    </section>
  );
}
