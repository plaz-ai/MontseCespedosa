"use client";

import { useState, useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQ_ITEMS } from "@/lib/content";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section-padding bg-mc-cream" id="faq">
      <div className="container-wide">
        <div className="mb-12">
          <SectionHeader
            eyebrow="Preguntas frecuentes"
            title="Todo lo que"
            titleAccent="querés saber"
            description="Las dudas más comunes antes de contratar nuestros servicios. Si no está acá, escribinos."
          />
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === i
                  ? "border-mc-orange bg-white shadow-md"
                  : "border-mc-gray-200 bg-white"
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-body font-semibold text-sm text-mc-text">
                  {item.question}
                </span>
                <span
                  className={`text-mc-orange text-xl font-light flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-48" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-5 font-body text-sm text-mc-text-muted leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
