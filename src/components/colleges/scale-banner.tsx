"use client";

const ITEMS = [
  { label: "Designed for NAAC A+ progression", code: "NAAC.V.VI" },
  { label: "Zero-capex online program infrastructure", code: "OPEX·0" },
  { label: "Global applicant routing", code: "GEO.ALL" },
  { label: "Direct INR tuition settlement", code: "₹·SETTLED" },
  { label: "Dedicated digital scholarship reserve", code: "RES.AUTO" },
  { label: "Eighth grade applicant cultivation", code: "G8 → G12" },
];

export const ScaleBanner = () => {
  return (
    <section className="relative bg-brand-accent text-slate-950 overflow-hidden border-y border-slate-950/10">
      {/* Subtle scan lines */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 4px)",
        }}
      />
      <div className="relative flex items-stretch h-14 lg:h-16">
        <div className="hidden md:flex items-center gap-2 px-6 bg-slate-950 text-brand-accent font-mono text-[11px] tracking-[0.35em] uppercase whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          Live Outcomes
        </div>

        <div className="flex-1 flex items-center overflow-hidden marquee-mask">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-8">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-950/50">
                  {item.code}
                </span>
                <span className="text-base lg:text-lg font-semibold tracking-tight">
                  {item.label}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950/40" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        :global(.animate-marquee) {
          animation: marquee 40s linear infinite;
        }
        :global(.marquee-mask) {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 6%,
            black 94%,
            transparent
          );
        }
      `}</style>
    </section>
  );
};
