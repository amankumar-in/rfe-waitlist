"use client";

import { PhoneMockup } from "../phone-mockup";
import { Languages, Check } from "lucide-react";

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
            
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-8 leading-tight">
              Fluency in <br />
              <span className="text-purple-600 dark:text-purple-400">Any Language.</span>
            </h2>
            
            <div className="space-y-4 mb-8 text-left">
              <div className="flex gap-3">
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">CEFR-Aligned Mastery (A1–C2)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Structured progression from beginner to native-level proficiency.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Exam-Specific Prep</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Targeted training for IELTS, TOEFL, TestDaF, and DELF.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">University Compliance</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Meet strict linguistic requirements for global admissions.</p>
                </div>
              </div>
            </div>

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
