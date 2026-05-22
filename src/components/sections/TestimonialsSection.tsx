"use client";

import { useRef, useState, useCallback } from "react";
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);

  useGSAP(() => {
    gsap.from(".testimonials-header", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".testimonials-header", start: "top 85%" },
    });

    // Desktop cards — stagger clip from bottom
    gsap.set(".testimonial-card", { opacity: 0, y: 30, clipPath: "inset(0 0 20% 0)" });
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

  // GSAP crossfade on carousel navigation
  const goToIndex = useCallback((newIndex: number) => {
    if (isAnimating.current || newIndex === activeIndex) return;
    isAnimating.current = true;

    const el = carouselRef.current;
    if (!el) {
      setActiveIndex(newIndex);
      isAnimating.current = false;
      return;
    }

    gsap.to(el, {
      opacity: 0,
      y: -12,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(newIndex);
        gsap.fromTo(
          el,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.32,
            ease: "power3.out",
            onComplete: () => { isAnimating.current = false; },
          }
        );
      },
    });
  }, [activeIndex]);

  const prev = () => goToIndex(activeIndex === 0 ? TESTIMONIALS.length - 1 : activeIndex - 1);
  const next = () => goToIndex(activeIndex === TESTIMONIALS.length - 1 ? 0 : activeIndex + 1);
  const active = TESTIMONIALS[activeIndex];

  return (
    <section ref={containerRef} className="section-padding bg-mc-cream" id="testimonios">
      <div className="container-wide">

        {/* Editorial header */}
        <div className="testimonials-header flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-mc-gray-200 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-body tracking-[0.25em] uppercase text-mc-orange font-semibold">
              04 ——
            </span>
            <span className="text-[10px] font-body tracking-[0.25em] uppercase text-mc-text-muted">
              Testimonios
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-mc-text text-right leading-tight">
            Lo que dicen <em className="not-italic text-mc-orange">nuestros clientes</em>
          </h2>
        </div>

        {/* Desktop: grid with 1px borders */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-px bg-mc-gray-200 border border-mc-gray-200 overflow-hidden">
          {TESTIMONIALS.map((t, idx) => (
            <article
              key={t.id}
              className={`testimonial-card p-7 lg:p-8 transition-colors duration-300 flex flex-col ${
                idx === 0
                  ? "bg-mc-dark"
                  : "bg-white hover:bg-mc-cream"
              }`}
            >
              <StarRating count={t.rating} />

              {/* Decorative quote mark */}
              <div className={`font-display text-6xl leading-none mt-4 mb-1 select-none ${
                idx === 0 ? "text-mc-orange/25" : "text-mc-orange/15"
              }`}>
                &ldquo;
              </div>

              <blockquote className={`font-body text-sm leading-relaxed mb-6 -mt-3 flex-1 ${
                idx === 0 ? "text-white/80" : "text-mc-text-muted"
              }`}>
                {t.text}
              </blockquote>

              <footer className={`flex items-center gap-3 border-t pt-4 ${
                idx === 0 ? "border-white/10" : "border-mc-gray-200"
              }`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-display font-bold shrink-0 ${
                  idx === 0 ? "bg-mc-orange text-white" : "bg-mc-text text-white"
                }`}>
                  {t.name[0]}
                </div>
                <div>
                  <div className={`text-sm font-body font-semibold ${idx === 0 ? "text-white" : "text-mc-text"}`}>
                    {t.name}
                  </div>
                  <div className={`text-xs font-body ${idx === 0 ? "text-white/40" : "text-mc-gray-400"}`}>
                    {t.location}
                  </div>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* Mobile: GSAP crossfade carousel */}
        <div className="md:hidden border border-mc-gray-200">
          <div ref={carouselRef} className="bg-white p-7">
            <StarRating count={active.rating} />
            <div className="font-display text-6xl leading-none mt-4 mb-1 text-mc-orange/15 select-none">&ldquo;</div>
            <blockquote className="font-body text-base leading-relaxed mb-6 -mt-3 text-mc-text-muted">
              {active.text}
            </blockquote>
            <footer className="flex items-center gap-3 border-t border-mc-gray-200 pt-4">
              <div className="w-10 h-10 rounded-full bg-mc-text flex items-center justify-center text-white font-display font-bold">
                {active.name[0]}
              </div>
              <div>
                <div className="text-mc-text font-body font-semibold">{active.name}</div>
                <div className="text-mc-text-muted text-sm font-body">{active.location}</div>
              </div>
            </footer>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-7 py-4 border-t border-mc-gray-200 bg-mc-cream">
            <button
              onClick={prev}
              className="w-9 h-9 border border-mc-gray-200 flex items-center justify-center text-mc-text-muted hover:border-mc-orange hover:text-mc-orange transition-all text-lg"
            >
              ‹
            </button>
            <div className="flex gap-2 items-center">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToIndex(i)}
                  className={`h-px transition-all duration-300 ${
                    i === activeIndex ? "w-8 bg-mc-orange" : "w-3 bg-mc-gray-200 hover:bg-mc-gray-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-9 h-9 border border-mc-gray-200 flex items-center justify-center text-mc-text-muted hover:border-mc-orange hover:text-mc-orange transition-all text-lg"
            >
              ›
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
