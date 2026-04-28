"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ROTATING_PHRASES: ReadonlyArray<ReadonlyArray<string>> = [
  ["Scale your", "enrollment."],
  ["Fund scholarships externally."],
  ["Automate accreditation data."],
];

export const HeroColleges = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % ROTATING_PHRASES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      {/* Heritage architecture background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/image-654.jpg"
          alt="University campus"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Horizontal gradient: solid dark on the left for text legibility, fully transparent on the right so the image is uncovered */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0) 100%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl pt-24 pb-32 lg:pt-32 lg:pb-44">
          <p className="text-base lg:text-lg text-slate-200/90 max-w-2xl leading-relaxed mb-10 font-light">
            The financial and admissions infrastructure for modern universities.
          </p>

          <h1 className="font-heading font-bold text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.02] tracking-[-0.02em] text-white">
            <span className="relative block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIndex}
                  initial={{ y: "40%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-40%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 text-white"
                >
                  {ROTATING_PHRASES[phraseIndex].map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </motion.span>
              </AnimatePresence>
              {/* Tallest possible spacer locks height (2 lines) */}
              <span className="invisible block" aria-hidden>
                <span className="block">Scale your</span>
                <span className="block">enrollment.</span>
              </span>
            </span>
          </h1>

          <p className="mt-12 text-lg lg:text-xl text-slate-200/85 max-w-2xl leading-relaxed">
            A complete digital layer that integrates directly into your
            existing systems.
          </p>

          <div className="mt-14 flex flex-wrap gap-4">
            <Link
              href="/colleges/contact?mode=info"
              className="group inline-flex items-center gap-2 bg-white text-slate-950 font-semibold px-7 py-4 rounded-full hover:bg-slate-100 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Request more information
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/colleges/contact?mode=offer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/25 text-white font-semibold hover:border-white/60 hover:bg-white/5 transition-colors"
            >
              <Download className="w-4 h-4" />
              Read partnership offer
            </Link>
          </div>

          {/* Institutional credentials, not techy stats */}
          <div className="mt-20 max-w-2xl">
            <div className="font-heading italic text-sm text-slate-300/70 mb-5">
              Trusted by the network behind
            </div>
            <div className="grid grid-cols-3 gap-x-8 gap-y-4 border-t border-white/15 pt-6">
              <div>
                <div className="font-heading text-2xl lg:text-3xl text-white font-bold tabular-nums leading-none">
                  1.2M+
                </div>
                <div className="text-[13px] text-slate-300/75 mt-2 leading-snug">
                  Students in the network from grade 8 onward
                </div>
              </div>
              <div>
                <div className="font-heading text-2xl lg:text-3xl text-white font-bold tabular-nums leading-none">
                  47
                </div>
                <div className="text-[13px] text-slate-300/75 mt-2 leading-snug">
                  Countries of origin for routed applications
                </div>
              </div>
              <div>
                <div className="font-heading text-2xl lg:text-3xl text-white font-bold tabular-nums leading-none">
                  ₹0
                </div>
                <div className="text-[13px] text-slate-300/75 mt-2 leading-snug">
                  Capital outlay required from the institution
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom photo credit / location strip */}
      <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-10 hidden lg:flex items-center gap-3 text-white/70 z-10">
        <span className="h-px w-10 bg-white/40" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          Heritage campus, India
        </span>
      </div>
    </section>
  );
};
