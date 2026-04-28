"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const NavColleges = () => {
  return (
    <header className="relative z-30 border-b border-white/5">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="/assets/images/global.png"
                alt="RFE"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <div className="absolute -inset-1 bg-brand-DEFAULT/40 blur-md -z-10" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-extrabold text-base tracking-[0.18em] text-white">
                REWARDS FOR EDUCATION
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-brand-accent/80 mt-1">
                INSTITUTIONS / v1.0
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm text-slate-300">
            <a href="#capabilities" className="hover:text-white transition-colors">
              Platform
            </a>
            <a href="#operations" className="hover:text-white transition-colors">
              NAAC Solutions
            </a>
            <a href="#expansion" className="hover:text-white transition-colors">
              Documentation
            </a>
          </nav>

          <Link
            href="/colleges/contact?mode=info"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-900 text-sm font-semibold hover:bg-brand-accent hover:text-slate-900 transition-colors"
          >
            Evaluate Partnership
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
