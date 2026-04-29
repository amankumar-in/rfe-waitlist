"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const NavColleges = () => {
  return (
    <header className="relative z-30 border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 py-5">
        <div className="flex items-center justify-between gap-4 sm:gap-10">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <Image
                src="/assets/images/global.png"
                alt="RFE"
                width={28}
                height={28}
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
              <div className="absolute -inset-1 bg-brand-DEFAULT/40 blur-md -z-10" />
            </div>
            <div className="flex flex-col leading-none min-w-0">
              <span className="font-heading font-extrabold text-[11px] sm:text-base tracking-[0.14em] sm:tracking-[0.18em] text-white whitespace-nowrap">
                REWARDS FOR EDUCATION
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-brand-accent/80 mt-1 whitespace-nowrap">
                INSTITUTIONS / v1.0
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm text-slate-300">
            <a href="#capabilities" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <a href="#operations" className="hover:text-white transition-colors">
              Integration
            </a>
            <a href="#expansion" className="hover:text-white transition-colors">
              Expansion
            </a>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
            <Link
              href="/"
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            >
              For Students
            </Link>
            <Link
              href="/colleges/contact?mode=info"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-white text-slate-900 text-xs sm:text-sm font-semibold hover:bg-brand-accent hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">Evaluate Partnership</span>
              <span className="sm:hidden">Evaluate</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
