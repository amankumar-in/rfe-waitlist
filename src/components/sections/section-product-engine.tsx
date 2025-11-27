"use client";

import { PhoneMockup } from "../phone-mockup";
import { Shield, GraduationCap, Wallet } from "lucide-react";

export const SectionProductEngine = () => {
  return (
    <section className="py-32 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Visa */}
          <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden relative group">
            <div className="mb-8 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Visa Filing Assistance.</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Compile and organize financial proofs, academic transcripts, and identity documents. Ensure every file is audit-ready.
              </p>
            </div>
            <div className="mt-auto relative left-1/2 -translate-x-1/2 translate-y-12 scale-90 group-hover:scale-95 transition-transform duration-500">
               <PhoneMockup variant="vault" frameStyle="dark" />
            </div>
          </div>

          {/* Card 2: Tutor */}
          <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden relative group">
            <div className="mb-8 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">AI-Powered Tutoring.</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Access 24/7 AI tutoring for Math, Science, and English. Identify weak areas and get instant remedial lessons.
              </p>
            </div>
            <div className="mt-auto relative left-1/2 -translate-x-1/2 translate-y-12 scale-90 group-hover:scale-95 transition-transform duration-500">
               <PhoneMockup variant="chat" frameStyle="glass" />
            </div>
          </div>

          {/* Card 3: Finance */}
          <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden relative group">
            <div className="mb-8 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Rewards & Scholarships.</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Unlock scholarship opportunities and earn rewards for academic milestones. Reduce the total cost of education.
              </p>
            </div>
            <div className="mt-auto relative left-1/2 -translate-x-1/2 translate-y-12 scale-90 group-hover:scale-95 transition-transform duration-500">
               <PhoneMockup variant="wallet" frameStyle="minimal" />
            </div>
          </div>

        </div>

        {/* Scholarship Ticker - Hidden for now
        <div className="mt-24 pt-12 border-t border-slate-100 dark:border-slate-800">
            <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-8">
                Scholarships & Financial Partners
            </p>
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <span className="text-2xl font-bold text-slate-400">Rhodes Trust</span>
                            <span className="text-2xl font-bold text-slate-400">Fulbright</span>
                            <span className="text-2xl font-bold text-slate-400">Chevening</span>
                            <span className="text-2xl font-bold text-slate-400">Erasmus+</span>
                            <span className="text-2xl font-bold text-slate-400">Commonwealth</span>
                            <span className="text-2xl font-bold text-slate-400">DAAD</span>
                            <span className="text-2xl font-bold text-slate-400">Gates Cambridge</span>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16">
                     {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <span className="text-2xl font-bold text-slate-400">Rhodes Trust</span>
                            <span className="text-2xl font-bold text-slate-400">Fulbright</span>
                            <span className="text-2xl font-bold text-slate-400">Chevening</span>
                            <span className="text-2xl font-bold text-slate-400">Erasmus+</span>
                            <span className="text-2xl font-bold text-slate-400">Commonwealth</span>
                            <span className="text-2xl font-bold text-slate-400">DAAD</span>
                            <span className="text-2xl font-bold text-slate-400">Gates Cambridge</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        */}

      </div>
    </section>
  );
};
