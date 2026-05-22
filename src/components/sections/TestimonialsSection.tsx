"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TESTIMONIALS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-mc-orange fill-mc-orange" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    gsap.from(".testimonials-header", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".testimonials-header", start: "top 85%" },
    });

    gsap.set(".testimonial-card", { opacity: 0, y: 40, clipPath: "inset(0 0 30% 0)" });
    ScrollTrigger.batch(".testimonial-card", {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
      },
      start: "top 85%",
      once: true,
    });
  }, { scope: containerRef });

  const prev = () => setActiveIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));
  const active = TESTIMONIALS[activeIndex];

  return (
    <section ref={containerRef} className="section-padding bg-mc-dark" id="testimonios">
      <div className="container-wide">

        {/* Editorial section header */}
        <div className="testimonials-header flex items-end justify-between mb-12 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-body tracking-[0.25em] uppercase text-mc-orange font-semibold">
              04 ——
            </span>
            <span className="text-[10px] font-body tracking-[0.25em] uppercase text-white/30">
              Testimonios
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white text-right leading-tight">
            Lo que dicen <em className="not-italic text-mc-orange">nuestros clientes</em>
          </h2>
        </div>

        {/* Desktop: masonry-style grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] overflow-hidden">
          {TESTIMONIALS.map((t, idx) => (
            <article
              key={t.id}
              className={`testimonial-card p-7 lg:p-8 transition-colors duration-300 ${
                idx === 0
                  ? "bg-mc-orange"
                  : "bg-mc-dark hover:bg-mc-dark-card"
              }`}
            >
              <StarRating count={t.rating} />

              {/* Big quote mark */}
              <div className={`font-display text-6xl leading-none mt-4 mb-2 ${idx === 0 ? "text-white/30" : "text-mc-orange/20"}`}>
                &ldquo;
              </div>

              <blockquote className={`font-body text-sm leading-relaxed mb-6 -mt-4 ${idx === 0 ? "text-white/90" : "text-white/60"}`}>
                {t.text}
              </blockquote>

              <footer className="flex items-center gap-3 border-t pt-4 mt-auto" style={{ borderColor: idx === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)" }}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-display font-bold shrink-0 ${idx === 0 ? "bg-white/20 text-white" : "bg-mc-orange text-white"}`}>
                  {t.name[0]}
                </div>
                <div>
                  <div className={`text-sm font-body font-semibold ${idx === 0 ? "text-white" : "text-white/80"}`}>
                    {t.name}
                  </div>
                  <div className={`text-xs font-body ${idx === 0 ? "text-white/50" : "text-white/30"}`}>
                    {t.location}
                  </div>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden border border-white/[0.08]">
          <article className="bg-mc-dark-card p-7">
            <StarRating count={active.rating} />
            <div className="font-display text-6xl leading-none mt-4 mb-2 text-mc-orange/20">&ldquo;</div>
            <blockquote className="font-body text-base leading-relaxed mb-6 -mt-4 text-white/70">
              {active.text}
            </blockquote>
            <footer className="flex items-center gap-3 border-t border-white/[0.08] pt-4">
              <div className="w-10 h-10 rounded-full bg-mc-orange flex items-center justify-center text-white font-display font-bold">
                {active.name[0]}
              </div>
              <div>
                <div className="text-white font-body font-semibold">{active.name}</div>
                <div className="text-white/40 text-sm font-body">{active.location}</div>
              </div>
            </footer>
          </article>

          <div className="flex items-center justify-between px-7 py-4 border-t border-white/[0.08]">
            <button onClick={prev} className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-mc-orange hover:text-mc-orange transition-all text-lg">
              ‹
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveIndex(i)}
                  className={`h-px transition-all duration-300 ${i === activeIndex ? "w-8 bg-mc-orange" : "w-3 bg-white/20"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-mc-orange hover:text-mc-orange transition-all text-lg">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
