import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { TRAINING } from "@/lib/content";

export function TrainingSection() {
  return (
    <section className="section-padding bg-mc-cream" id="formacion">
      <div className="container-wide">
        <div className="bg-mc-dark rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Content */}
            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <span className="block text-xs font-semibold tracking-widest uppercase mb-3 font-body text-mc-orange">
                Formación
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-3">
                {TRAINING.title}
              </h2>
              <p className="font-body text-mc-orange font-medium text-lg mb-5">
                {TRAINING.subtitle}
              </p>
              <p className="font-body text-white/60 text-sm leading-relaxed mb-7">
                {TRAINING.description}
              </p>

              <ul className="space-y-2.5 mb-8">
                {TRAINING.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-mc-orange flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="font-body text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                label={TRAINING.cta.label}
                href={TRAINING.cta.href}
                size="lg"
              />
            </div>

            {/* Image */}
            <div className="relative min-h-[300px] lg:min-h-0">
              <ImagePlaceholder
                label="Imagen curso hipotecas"
                aspectRatio="aspect-auto"
                dark
                className="absolute inset-0 w-full h-full rounded-none"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-mc-dark/40 to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
