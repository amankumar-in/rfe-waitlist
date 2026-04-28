"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const BentoCapabilities = () => {
  return (
    <section
      id="capabilities"
      className="relative py-28 lg:py-36 overflow-hidden bg-[#F4F2EC]"
    >
      {/* warm grain backdrop */}
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(99,91,255,0.08), transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,212,255,0.06), transparent 55%)",
        }}
      />

      <div className="container mx-auto px-6 relative">
        {/* Section heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-3">
            <div className="font-mono text-[11px] tracking-[0.35em] uppercase text-slate-500 mb-3">
              §01 / Capabilities
            </div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.04]">
              Three primitives that compose every higher-education workflow your
              institution touches.
            </h2>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Wide card */}
          <CardPipeline />
          {/* Square cards */}
          <CardScholarship />
          <CardCompliance />
        </div>
      </div>
    </section>
  );
};

const CardPipeline = () => {
  return (
    <article className="lg:col-span-12 group relative bg-slate-950 text-white rounded-3xl overflow-hidden border border-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Text */}
        <div className="p-8 lg:p-12 flex flex-col justify-between min-h-[420px]">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand-accent">
                Demand
              </span>
              <span className="h-px flex-1 bg-white/10" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-500">
                Grade 8 → Apply
              </span>
            </div>
            <h3 className="font-heading text-3xl lg:text-5xl leading-[1.05] tracking-tight text-white/90">
              Build a multi-year applicant pipeline.
            </h3>
            <p className="mt-6 text-base lg:text-lg text-slate-300 max-w-md leading-relaxed">
              Engage prospective students years before the standard application
              cycle. The Rewards for Education network connects you with
              academically aligned students starting in the eighth grade, so
              your applicant pool arrives prepared and loyal to your institution.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <Stat label="Earliest grade" value="8th" />
            <Stat label="Network size" value="1.2M" />
            <Stat label="Avg loyalty" value="4.7y" />
          </div>
        </div>

        {/* Visual: timeline + iPhone */}
        <div className="relative px-8 pb-8 lg:p-12 lg:pl-0 flex items-center justify-center min-h-[420px]">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Timeline rail */}
          <div className="absolute top-1/2 left-12 right-32 h-px bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent" />

          {/* Timeline dots */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-12 pr-32 -translate-y-1/2">
            {["G8", "G9", "G10", "G11", "G12", "Apply"].map((g, i) => (
              <div key={g} className="flex flex-col items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    i < 5 ? "bg-brand-accent" : "bg-white"
                  } ${i === 0 ? "ring-4 ring-brand-accent/20" : ""}`}
                />
                <span className="font-mono text-[9px] tracking-widest text-slate-400">
                  {g}
                </span>
              </div>
            ))}
          </div>

          {/* iPhone */}
          <div className="relative ml-auto w-44 lg:w-56 z-10 translate-y-2 group-hover:-translate-y-1 transition-transform duration-700">
            <div className="absolute -inset-4 bg-brand-DEFAULT/30 blur-2xl -z-10" />
            <Image
              src="/assets/images/phone1.png"
              alt="RFE student app"
              width={400}
              height={820}
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-1">
      {label}
    </div>
    <div className="text-2xl font-bold text-white">{value}</div>
  </div>
);

const CardScholarship = () => {
  const [val, setVal] = useState(8420000);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    let raf = 0;
    let active = false;
    const obs = new IntersectionObserver(
      (entries) => {
        active = entries[0].isIntersecting;
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    const tick = () => {
      if (active) {
        setVal((v) => v + Math.floor(Math.random() * 1800 + 200));
      }
      raf = window.setTimeout(tick, 1200) as unknown as number;
    };
    tick();
    return () => {
      obs.disconnect();
      clearTimeout(raf);
    };
  }, []);

  return (
    <article
      ref={ref}
      className="lg:col-span-7 relative pt-10 lg:pt-12 lg:pr-12 min-h-[480px] flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-2 mb-8">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-700">
            Capital
          </span>
          <span className="h-px flex-1 bg-slate-300/60" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-500">
            External Reserve
          </span>
        </div>
        <h3 className="font-heading text-3xl lg:text-4xl leading-[1.08] tracking-tight text-slate-900">
          Externalize your scholarship funding.
        </h3>
        <p className="mt-5 text-base text-slate-600 max-w-md leading-relaxed">
          Expand financial aid without drawing from internal reserves. Alumni,
          corporate partners, and external markets purchase your dedicated
          digital asset to fund the reserve automatically.
        </p>

        <FundingSpectrum />
      </div>

      <div className="relative mt-10">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
            St. Edwards · Reserve
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            funding
          </span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-slate-500 text-2xl font-semibold">₹</span>
          <span className="font-heading text-5xl lg:text-6xl font-bold text-slate-900 tabular-nums tracking-tight">
            {val.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 text-[11px] pt-4 border-t border-slate-300/50">
          <div>
            <div className="text-slate-500 font-mono uppercase tracking-widest">
              24h
            </div>
            <div className="text-emerald-700 font-mono">+₹84,210</div>
          </div>
          <div>
            <div className="text-slate-500 font-mono uppercase tracking-widest">
              Buyers
            </div>
            <div className="text-slate-900 font-mono">312</div>
          </div>
          <div>
            <div className="text-slate-500 font-mono uppercase tracking-widest">
              Asset
            </div>
            <div className="text-amber-700 font-mono">CFC·STE</div>
          </div>
        </div>
      </div>
    </article>
  );
};

const FUNDING_SOURCES = [
  { name: "Alumni network", pct: 38, color: "#635BFF", bg: "bg-[#635BFF]" },
  { name: "Corporate partners", pct: 27, color: "#00D4FF", bg: "bg-[#00D4FF]" },
  { name: "External markets", pct: 21, color: "#F59E0B", bg: "bg-amber-500" },
  { name: "Family foundations", pct: 14, color: "#10B981", bg: "bg-emerald-500" },
];

const FundingSpectrum = () => {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
          Funding mix · 30d
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
          External · 100%
        </span>
      </div>

      {/* Spectrum bar */}
      <div className="h-4 rounded-full overflow-hidden flex bg-slate-200/60 shadow-inner">
        {FUNDING_SOURCES.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ width: 0 }}
            whileInView={{ width: `${s.pct}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative h-full"
            style={{ backgroundColor: s.color }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 animate-shine" />
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-3 mt-5">
        {FUNDING_SOURCES.map((s) => (
          <div key={s.name} className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-[13px] text-slate-700 font-medium leading-tight">
              {s.name}
            </span>
            <span className="ml-auto text-[11px] text-slate-500 font-mono tabular-nums">
              {s.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CardCompliance = () => {
  return (
    <article className="lg:col-span-5 relative pt-10 lg:pt-12 lg:pl-12 lg:border-l lg:border-slate-300/60 min-h-[480px] flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-8">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand-DEFAULT">
            Audit
          </span>
          <span className="h-px flex-1 bg-slate-300/60" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-500">
            NAAC · Crit V·VI
          </span>
        </div>
        <h3 className="font-heading text-3xl lg:text-4xl leading-[1.08] tracking-tight text-slate-900">
          Automate NAAC compliance.
        </h3>
        <p className="mt-5 text-base text-slate-600 leading-relaxed">
          Every admission, fee transfer, and scholarship disbursement is
          permanently recorded. Audit-ready data flows directly into NAAC
          Criterion V and VI.
        </p>
      </div>

      <div className="relative mt-10">
        <Dial />
      </div>
    </article>
  );
};

const Dial = () => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setProgress(0.86), 300);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const radius = 88;
  const circumference = Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 220 130" className="w-full">
        <defs>
          <linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#635BFF" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
        <path
          d={`M 22 110 A ${radius} ${radius} 0 0 1 198 110`}
          stroke="#E4E4E7"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M 22 110 A ${radius} ${radius} 0 0 1 198 110`}
          stroke="url(#dialGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
        {/* tick marks */}
        {Array.from({ length: 9 }).map((_, i) => {
          const angle = (Math.PI / 8) * i + Math.PI;
          const x1 = 110 + (radius + 14) * Math.cos(angle);
          const y1 = 110 + (radius + 14) * Math.sin(angle);
          const x2 = 110 + (radius + 22) * Math.cos(angle);
          const y2 = 110 + (radius + 22) * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#CBD5E1"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-2">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1">
          Accreditation Path
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-3xl font-bold text-slate-900">
            A+
          </span>
          <span className="text-slate-400 font-mono text-sm">→</span>
          <span className="font-heading text-3xl font-bold bg-gradient-to-r from-brand-DEFAULT to-brand-accent bg-clip-text text-transparent">
            A++
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Criterion V mapped</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Criterion VI mapped</span>
        </div>
      </div>
    </div>
  );
};
