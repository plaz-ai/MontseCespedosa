"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-mc-orange fill-mc-orange" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      gsap.from(".testimonials-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".testimonials-header", start: "top 85%" },
      });
      gsap.from(".testimonials-body", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".testimonials-body", start: "top 85%" },
      });
    },
    { scope: containerRef }
  );

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));

  const active = TESTIMONIALS[activeIndex];

  return (
    <section ref={containerRef} className="section-padding bg-white" id="testimonios">
      <div className="container-wide">
        <div className="testimonials-header mb-14 lg:mb-16">
          <SectionHeader
            eyebrow="Testimonios"
            title="Lo que dicen"
            titleAccent="nuestros clientes"
          />
        </div>

        {/* All testimonials grid (desktop) + featured (mobile) */}
        <div className="testimonials-body">
          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, idx) => (
              <article
                key={t.id}
                className={`rounded-2xl p-6 border transition-all duration-300 ${
                  idx === 0
                    ? "bg-mc-dark text-white border-mc-dark"
                    : "bg-mc-cream border-mc-gray-200 hover:border-mc-orange/30 hover:shadow-md"
                }`}
              >
                <StarRating count={t.rating} />
                <blockquote className={`font-body text-sm leading-relaxed mt-3 mb-4 ${idx === 0 ? "text-white/80" : "text-mc-text-muted"}`}>
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <footer className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-display font-bold ${idx === 0 ? "bg-mc-orange text-white" : "bg-mc-gray-200 text-mc-text"}`}>
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

          {/* Mobile: carousel */}
          <div className="md:hidden">
            <article className="bg-mc-dark rounded-2xl p-7">
              <StarRating count={active.rating} />
              <blockquote className="font-body text-base leading-relaxed mt-4 mb-5 text-white/80">
                &ldquo;{active.text}&rdquo;
              </blockquote>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-mc-orange flex items-center justify-center text-white font-display font-bold">
                  {active.name[0]}
                </div>
                <div>
                  <div className="text-white font-body font-semibold">{active.name}</div>
                  <div className="text-white/40 text-sm font-body">{active.location}</div>
                </div>
              </footer>
            </article>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-mc-gray-200 flex items-center justify-center text-mc-text-muted hover:border-mc-orange hover:text-mc-orange transition-all"
              >
                ‹
              </button>
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeIndex ? "bg-mc-orange w-5" : "bg-mc-gray-200"}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-mc-gray-200 flex items-center justify-center text-mc-text-muted hover:border-mc-orange hover:text-mc-orange transition-all"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
