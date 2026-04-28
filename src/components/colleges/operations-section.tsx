"use client";

import { motion } from "framer-motion";
import { ShieldCheck, RefreshCw, Banknote } from "lucide-react";

const BULLETS = [
  {
    icon: ShieldCheck,
    title: "Zero operational disruption",
    body:
      "We build and maintain the technical bridge between our network and your existing management software.",
  },
  {
    icon: RefreshCw,
    title: "Automated record synchronization",
    body:
      "Applications, offer letters, and enrollment records transfer securely back and forth.",
  },
  {
    icon: Banknote,
    title: "Direct INR tuition settlement",
    body:
      "Tuition arrives at your institution in standard local currency, including amounts paid via the college coin reserve.",
  },
];

export const OperationsSection = () => {
  return (
    <section
      id="operations"
      className="relative py-28 lg:py-36 bg-[#0A0F1F] text-white overflow-hidden"
    >
      {/* terminal-style backdrop */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "120px 100%",
        }}
      />
      <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-DEFAULT/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Header strip */}
        <div className="flex items-center gap-6 mb-16 lg:mb-20">
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-slate-500">
            §02 / Integration
          </span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-brand-accent">
            CRM · ERP · LMS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left: copy */}
          <div className="lg:col-span-6">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.04] text-white">
              Your admissions process,
              <span className="block text-brand-accent">completely intact.</span>
            </h2>

            <p className="mt-8 text-lg text-slate-300 max-w-xl leading-relaxed">
              You retain absolute authority over your admissions criteria and
              final decisions. We handle the data transfer. The CFC
              infrastructure connects directly to your existing CRM or ERP, so
              applications, verified documents, and tuition payments flow into
              your system without manual data entry.
            </p>

            <ul className="mt-12 space-y-6 max-w-xl">
              {BULLETS.map((b, i) => (
                <motion.li
                  key={b.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="flex gap-5 group"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-accent/10 group-hover:border-brand-accent/40 transition-colors">
                    <b.icon className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white mb-1">
                      {b.title}
                    </div>
                    <div className="text-sm text-slate-400 leading-relaxed">
                      {b.body}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: integration diagram */}
          <div className="lg:col-span-6">
            <IntegrationDiagram />
          </div>
        </div>
      </div>
    </section>
  );
};

const IntegrationDiagram = () => {
  return (
    <div className="relative w-full aspect-[4/5] lg:aspect-[5/6] rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950 overflow-hidden p-6 lg:p-8">
      {/* Terminal header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-500">
          cfc.bridge / runtime
        </span>
      </div>

      <div className="relative h-[calc(100%-3rem)] flex flex-col justify-between">
        {/* Source: CFC Network */}
        <Node
          label="CFC Network"
          sub="Verified applicant pool"
          metrics={[
            { k: "Applicants", v: "1,284" },
            { k: "Documents", v: "9,420" },
          ]}
          accent="brand-accent"
          align="left"
        />

        {/* Animated flow line */}
        <div className="relative flex-1 my-2">
          <svg
            viewBox="0 0 400 200"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="op-flow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="100%" stopColor="#635BFF" />
              </linearGradient>
              <linearGradient id="op-pulse" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0" />
                <stop offset="50%" stopColor="#00D4FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#635BFF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Static rails */}
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M ${60 + i * 30} 10 C ${60 + i * 30} 100, ${
                  340 - i * 30
                } 100, ${340 - i * 30} 190`}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                fill="none"
              />
            ))}

            {/* Animated flow */}
            <path
              d="M 90 10 C 90 100, 310 100, 310 190"
              stroke="url(#op-flow)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 8"
              opacity="0.6"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-140"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </path>

            {/* Packet dots */}
            {[0, 1, 2, 3].map((i) => (
              <circle
                key={i}
                r="3"
                fill="#00D4FF"
                opacity="0.95"
              >
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${i * 0.7}s`}
                  path="M 90 10 C 90 100, 310 100, 310 190"
                />
              </circle>
            ))}
          </svg>

          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="px-4 py-2 rounded-full border border-brand-accent/30 bg-slate-950/80 backdrop-blur-sm">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand-accent">
                encrypted transfer
              </span>
            </div>
          </div>
        </div>

        {/* Destination: University CRM */}
        <Node
          label="Your University · CRM"
          sub="Existing infrastructure"
          metrics={[
            { k: "Records", v: "Synced" },
            { k: "Tuition", v: "₹4.2 Cr" },
          ]}
          accent="brand-DEFAULT"
          align="right"
        />
      </div>
    </div>
  );
};

const Node = ({
  label,
  sub,
  metrics,
  accent,
  align,
}: {
  label: string;
  sub: string;
  metrics: { k: string; v: string }[];
  accent: "brand-accent" | "brand-DEFAULT";
  align: "left" | "right";
}) => {
  const accentColor =
    accent === "brand-accent" ? "text-brand-accent" : "text-white";
  return (
    <div
      className={`flex ${
        align === "right" ? "justify-end" : "justify-start"
      } w-full`}
    >
      <div
        className={`w-[78%] rounded-2xl bg-white/[0.04] border border-white/10 p-4 ${
          align === "right" ? "border-l-2 border-l-brand-DEFAULT/60" : "border-l-2 border-l-brand-accent/60"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={`font-mono text-[10px] tracking-[0.3em] uppercase ${accentColor}`}
          >
            {label}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="text-xs text-slate-400 mb-3">{sub}</div>
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
          {metrics.map((m) => (
            <div key={m.k}>
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
                {m.k}
              </div>
              <div className="text-sm font-bold text-white tabular-nums">
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
