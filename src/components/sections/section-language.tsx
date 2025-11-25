"use client";

import { PhoneMockup } from "../phone-mockup";
import { Languages } from "lucide-react";

export const SectionLanguage = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Visual */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-DEFAULT/20 to-transparent rounded-full blur-3xl -z-10" />
               <PhoneMockup variant="graph" frameStyle="minimal" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
              <Languages className="w-4 h-4" />
              <span>Global Fluency</span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Fluency in <br />
              <span className="text-purple-600 dark:text-purple-400">Target Language.</span>
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Prepare for the specific exam required by your target university. Track progress from A1 to C2 with our integrated curriculum.
            </p>

            <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">20+</div>
                    <div className="text-sm text-slate-500">Languages Supported</div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">CEFR</div>
                    <div className="text-sm text-slate-500">Aligned Curriculum</div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
