"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe2, GraduationCap, Plane, Camera, Radio, Award } from "lucide-react";

export const ExpansionSection = () => {
  return (
    <section
      id="expansion"
      className="relative py-28 lg:py-36 bg-white text-slate-900 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-6 mb-16">
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-slate-400">
            §03 / Expansion
          </span>
          <span className="h-px flex-1 bg-slate-200" />
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-brand-DEFAULT">
            Optional Modules
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          <DefaultGlobalModule />
        </div>

        <TurnkeyDegreesModule />
      </div>
    </section>
  );
};

const DefaultGlobalModule = () => {
  return (
    <>
      <div className="lg:col-span-5 lg:sticky lg:top-32 self-start order-2 lg:order-1">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
          <Globe2 className="w-3.5 h-3.5 text-brand-DEFAULT" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-DEFAULT">
            Module / Default Global
          </span>
        </div>

        <h3 className="font-heading text-4xl lg:text-6xl tracking-tight leading-[1.04] text-slate-900 mb-6">
          Default global.
        </h3>
        <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
          Process applications from across the world through a single channel.
          Secure a dedicated placement at the virtual CFC Education Fair, and
          access international markets without funding overseas recruitment
          travel.
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-md">
          {[
            {
              icon: Plane,
              k: "Travel Cost",
              v: "₹0",
              note: "no overseas trips",
            },
            {
              icon: Radio,
              k: "Intake pipes",
              v: "1",
              note: "unified channel",
            },
            {
              icon: Award,
              k: "Reach",
              v: "47",
              note: "countries",
            },
          ].map((s) => (
            <div
              key={s.k}
              className="p-4 rounded-2xl border border-slate-200 hover:border-brand-DEFAULT/40 transition-colors"
            >
              <s.icon className="w-4 h-4 text-brand-DEFAULT mb-3" />
              <div className="font-mono text-[10px] tracking-widest text-slate-500 uppercase mb-1 leading-tight">
                {s.k}
              </div>
              <div className="text-xl font-bold text-slate-900 leading-none">
                {s.v}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right visual: world map with routing arcs */}
      <div className="lg:col-span-7 order-1 lg:order-2 relative">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/40 aspect-[5/6] lg:aspect-[4/3]">
          {/* Latitude reference lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[0.18, 0.36, 0.5, 0.64, 0.82].map((p, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-slate-300/30"
                style={{ top: `${p * 100}%` }}
              />
            ))}
            <div className="absolute top-1/2 left-6 -translate-y-1/2 font-mono text-[9px] tracking-[0.3em] uppercase text-slate-400">
              EQ · 0°
            </div>
          </div>

          {/* Continent dot map */}
          <DotMap />

          {/* Routing arcs + destination */}
          <RoutingOverlay />

          {/* Floating data ticker */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-6 left-6 lg:top-8 lg:left-8 px-4 py-3 rounded-2xl bg-white shadow-2xl border border-slate-100 z-20"
          >
            <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-slate-400 mb-1">
              Live · Fair Floor
            </div>
            <div className="text-2xl font-bold text-slate-900 tabular-nums">
              4,892
            </div>
            <div className="text-xs text-slate-500">Applicants present</div>
          </motion.div>

          {/* iPhone */}
          <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 w-40 lg:w-48 z-10">
            <div className="absolute -inset-6 bg-brand-DEFAULT/10 blur-2xl -z-10" />
            <Image
              src="/assets/images/phone2.png"
              alt="Global offer feed"
              width={400}
              height={820}
              className="w-full h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Lat/lng → grid coordinate (tuned to our 60×28 dot grid + container percentages).
// Coordinate space is normalized 0..1 across the visual.
const COORDS = {
  westbrook: { x: 0.24, y: 0.36 }, // NE USA
  lagos: { x: 0.55, y: 0.55 },
  manila: { x: 0.83, y: 0.5 },
  saopaulo: { x: 0.36, y: 0.7 },
  mumbai: { x: 0.72, y: 0.46 },
  london: { x: 0.5, y: 0.3 },
};

const ARCS: Array<{ from: keyof typeof COORDS; label: string; delay: number }> = [
  { from: "lagos", label: "Lagos", delay: 0 },
  { from: "manila", label: "Manila", delay: 0.6 },
  { from: "saopaulo", label: "São Paulo", delay: 1.2 },
  { from: "mumbai", label: "Mumbai", delay: 1.8 },
  { from: "london", label: "London", delay: 2.4 },
];

const RoutingOverlay = () => {
  const dest = COORDS.westbrook;
  // Build quadratic-bezier arcs that bow upward (lower y) for a flight-path feel.
  const buildArc = (from: { x: number; y: number }) => {
    const mx = (from.x + dest.x) / 2;
    const my = Math.min(from.y, dest.y) - 0.18;
    return `M ${from.x * 100} ${from.y * 100} Q ${mx * 100} ${my * 100} ${dest.x * 100} ${dest.y * 100}`;
  };

  return (
    <>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#635BFF" stopOpacity="0.1" />
            <stop offset="60%" stopColor="#635BFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="dest-glow">
            <stop offset="0%" stopColor="#635BFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#635BFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Static ghost arcs */}
        {ARCS.map((a, i) => (
          <path
            key={`g-${i}`}
            d={buildArc(COORDS[a.from])}
            stroke="rgba(99,91,255,0.12)"
            strokeWidth="0.3"
            fill="none"
          />
        ))}

        {/* Animated arcs */}
        {ARCS.map((a, i) => (
          <path
            key={`a-${i}`}
            d={buildArc(COORDS[a.from])}
            stroke="url(#arc-grad)"
            strokeWidth="0.45"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="3 6"
            style={{
              animation: `dashflow 3.6s linear ${a.delay}s infinite`,
            }}
          />
        ))}

        {/* Origin pulses */}
        {ARCS.map((a, i) => {
          const c = COORDS[a.from];
          return (
            <g key={`o-${i}`}>
              <circle
                cx={c.x * 100}
                cy={c.y * 100}
                r="1.6"
                fill="#635BFF"
                opacity="0.25"
              >
                <animate
                  attributeName="r"
                  values="1.2;3.2;1.2"
                  dur="2.4s"
                  begin={`${a.delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="2.4s"
                  begin={`${a.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={c.x * 100} cy={c.y * 100} r="0.9" fill="#635BFF" />
            </g>
          );
        })}

        {/* Destination glow + ring */}
        <circle cx={dest.x * 100} cy={dest.y * 100} r="6" fill="url(#dest-glow)" />
        <circle
          cx={dest.x * 100}
          cy={dest.y * 100}
          r="2"
          fill="none"
          stroke="#00D4FF"
          strokeWidth="0.5"
        >
          <animate
            attributeName="r"
            values="2;5;2"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.9;0;0.9"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx={dest.x * 100} cy={dest.y * 100} r="1.4" fill="#00D4FF" />
      </svg>

      {/* Destination label */}
      <div
        className="absolute z-10"
        style={{
          left: `${COORDS.westbrook.x * 100}%`,
          top: `${COORDS.westbrook.y * 100}%`,
          transform: "translate(-50%, -150%)",
        }}
      >
        <div className="px-2.5 py-1 rounded-md bg-slate-900 text-white shadow-lg whitespace-nowrap">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-brand-accent">
            destination
          </span>
          <div className="text-[11px] font-bold leading-tight">
            Westbrook · USA
          </div>
        </div>
      </div>

      {/* Origin labels (small chips) */}
      {ARCS.map((a) => {
        const c = COORDS[a.from];
        return (
          <div
            key={a.label}
            className="absolute z-10 pointer-events-none"
            style={{
              left: `${c.x * 100}%`,
              top: `${c.y * 100}%`,
              transform: "translate(8px, -50%)",
            }}
          >
            <span className="text-[10px] font-mono tracking-wider text-slate-700 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded border border-slate-200">
              {a.label}
            </span>
          </div>
        );
      })}

      <style jsx>{`
        @keyframes dashflow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -36;
          }
        }
      `}</style>
    </>
  );
};

const TurnkeyDegreesModule = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 relative">
        <div
          className="relative rounded-3xl overflow-hidden border border-slate-900/10 aspect-[5/6] lg:aspect-[4/3] bg-slate-900 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/images/504387_shutterstock_16d76998306_487275.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/85 via-slate-950/40 to-slate-950/10" />

          {/* Content overlay */}
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 font-mono text-[10px] uppercase tracking-[0.3em]">
                Live Cohort
              </span>
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  proctored
                </span>
              </div>
            </div>

            {/* Bottom panel */}
            <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-1">
                  Enrolled
                </div>
                <div className="text-2xl font-bold tabular-nums">12,840</div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-1">
                  Tuition
                </div>
                <div className="text-2xl font-bold tabular-nums">₹38 Cr</div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-1">
                  Capex
                </div>
                <div className="text-2xl font-bold text-emerald-400">₹0</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 self-start">
          <GraduationCap className="w-3.5 h-3.5 text-brand-orange" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-orange">
            Module / Turnkey Degrees
          </span>
        </div>

        <h3 className="font-heading text-4xl lg:text-6xl tracking-tight leading-[1.04] text-slate-900 mb-6">
          Turnkey digital degrees.
        </h3>
        <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
          You supply the curriculum and faculty. We provide the digital
          delivery platform, including course delivery, proctoring, identity
          verification, and tuition collection.
        </p>

        <ul className="space-y-3 max-w-md">
          {[
            "Faculty-led delivery, our infrastructure",
            "Identity-verified proctoring",
            "New revenue, no learning-tech capex",
          ].map((line) => (
            <li
              key={line}
              className="flex items-center gap-3 text-slate-700 border-b border-slate-100 pb-3 last:border-0"
            >
              <span className="w-1 h-6 bg-brand-orange rounded-full" />
              <span className="text-base">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const DOT_COLS = 60;
const DOT_ROWS = 28;

// Deterministic pseudo-random for stable SSR + render purity.
const seeded = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

// Continent regions on a 60×28 Mercator-ish grid.
// Each region: cx, cy, rx, ry (ellipse), optional intensity (0..1).
type Region = { cx: number; cy: number; rx: number; ry: number; w?: number };
const REGIONS: ReadonlyArray<Region> = [
  // North America
  { cx: 12, cy: 9, rx: 5, ry: 3.2 },
  { cx: 16, cy: 8, rx: 3, ry: 2 },
  { cx: 9, cy: 7, rx: 3, ry: 1.8 }, // Alaska/Canada north
  { cx: 21, cy: 6, rx: 2, ry: 1.4 }, // Greenland tip
  { cx: 14, cy: 12, rx: 2.2, ry: 1.3 }, // Mexico/central
  // South America
  { cx: 19, cy: 17, rx: 2.5, ry: 4.2 },
  { cx: 20, cy: 21, rx: 1.5, ry: 1.8 }, // tail
  // Europe
  { cx: 30, cy: 8, rx: 2.4, ry: 1.8 },
  { cx: 32, cy: 10, rx: 1.8, ry: 1.4 },
  // Africa
  { cx: 31, cy: 13, rx: 2.6, ry: 1.8 },
  { cx: 32, cy: 16, rx: 2.4, ry: 2.4 },
  { cx: 33, cy: 19, rx: 1.6, ry: 1.6 },
  // Middle East
  { cx: 35, cy: 12, rx: 1.8, ry: 1.4 },
  // South Asia / India
  { cx: 41, cy: 14, rx: 2.2, ry: 2 },
  // Asia (Russia/China/Mongolia)
  { cx: 38, cy: 8, rx: 4, ry: 2 },
  { cx: 44, cy: 8, rx: 5, ry: 2.2 },
  { cx: 49, cy: 9, rx: 3, ry: 1.8 },
  { cx: 45, cy: 11, rx: 3, ry: 1.6 },
  // SE Asia / Indonesia
  { cx: 47, cy: 14, rx: 2.4, ry: 1.4 },
  { cx: 49, cy: 16, rx: 2, ry: 1 },
  // Japan
  { cx: 52, cy: 10, rx: 1, ry: 1.4 },
  // Australia
  { cx: 50, cy: 20, rx: 2.8, ry: 1.6 },
  // NZ
  { cx: 54, cy: 22, rx: 0.9, ry: 0.9 },
];

// origin highlight cells (animate brand color on these cells)
const ORIGIN_HIGHLIGHTS: ReadonlyArray<[number, number]> = [
  [33, 16], // Lagos
  [50, 14], // Manila
  [22, 19], // São Paulo
  [42, 14], // Mumbai
  [30, 8], // London
  [14, 9], // Westbrook (destination)
];

type Cell = {
  x: number;
  y: number;
  on: boolean;
  highlight: "none" | "origin" | "dest";
};

const DOT_CELLS: Cell[] = (() => {
  const cells: Cell[] = [];
  for (let y = 0; y < DOT_ROWS; y++) {
    for (let x = 0; x < DOT_COLS; x++) {
      let on = false;
      for (const r of REGIONS) {
        const dx = (x - r.cx) / r.rx;
        const dy = (y - r.cy) / r.ry;
        const d = dx * dx + dy * dy;
        // edge softening
        const edge = 1 + (seeded(x * 13 + y * 19) - 0.5) * 0.25;
        if (d <= edge) {
          on = true;
          break;
        }
      }

      let highlight: Cell["highlight"] = "none";
      for (const [hx, hy] of ORIGIN_HIGHLIGHTS) {
        if (Math.hypot(x - hx, y - hy) < 1.5) {
          highlight = hx === 14 && hy === 9 ? "dest" : "origin";
          break;
        }
      }

      cells.push({ x, y, on, highlight });
    }
  }
  return cells;
})();

const DotMap = () => {
  return (
    <div className="absolute inset-0 px-4 py-4 lg:px-6 lg:py-6">
      <div
        className="w-full h-full grid"
        style={{
          gridTemplateColumns: `repeat(${DOT_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${DOT_ROWS}, 1fr)`,
          gap: "0px",
        }}
      >
        {DOT_CELLS.map((c, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
            style={{ gridColumn: c.x + 1, gridRow: c.y + 1 }}
          >
            <div
              className={`rounded-full ${
                c.highlight === "origin"
                  ? "bg-brand-DEFAULT"
                  : c.highlight === "dest"
                  ? "bg-brand-accent"
                  : c.on
                  ? "bg-slate-500/70"
                  : "bg-slate-300/40"
              }`}
              style={{
                width:
                  c.highlight !== "none"
                    ? "6px"
                    : c.on
                    ? "3.5px"
                    : "1.5px",
                height:
                  c.highlight !== "none"
                    ? "6px"
                    : c.on
                    ? "3.5px"
                    : "1.5px",
                boxShadow:
                  c.highlight === "origin"
                    ? "0 0 8px rgba(99,91,255,0.8)"
                    : c.highlight === "dest"
                    ? "0 0 10px rgba(0,212,255,0.9)"
                    : "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
