import { MEDIA_OUTLETS } from "@/lib/content";

export function MediaBar() {
  // Duplicate for seamless ticker
  const allOutlets = [...MEDIA_OUTLETS, ...MEDIA_OUTLETS];

  return (
    <section className="bg-mc-cream border-y border-mc-gray-200 py-5 overflow-hidden">
      <div className="flex items-center gap-4 mb-3 container-wide">
        <span className="text-[10px] font-body font-semibold text-mc-gray-400 tracking-widest uppercase whitespace-nowrap">
          Apariciones en medios
        </span>
        <div className="flex-1 h-px bg-mc-gray-200" />
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-mc-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-mc-cream to-transparent z-10 pointer-events-none" />

        {/* Ticker */}
        <div className="flex items-center animate-ticker whitespace-nowrap">
          {allOutlets.map((outlet, idx) => (
            <div
              key={`${outlet}-${idx}`}
              className="inline-flex items-center mx-8"
            >
              <span className="font-display text-xl font-semibold text-mc-gray-400 hover:text-mc-text transition-colors cursor-default">
                {outlet}
              </span>
              <span className="ml-8 text-mc-orange text-sm">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
