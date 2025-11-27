"use client";

import { PhoneMockup } from "../phone-mockup";
import { Plane, GraduationCap, Wallet } from "lucide-react";

export const SectionProductEngine = () => {
  return (
    <section className="py-16 lg:py-32 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Mobile: compact cards without mockups */}
        {/* Desktop: full cards with mockups */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          
          {/* Card 1: Visa */}
          <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900 rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-8 border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden relative group">
            <div className="flex lg:flex-col items-start gap-4 lg:gap-0 lg:mb-8 relative z-10">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0 lg:mb-6">
                <Plane className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <h3 className="text-lg lg:text-2xl font-bold text-slate-900 dark:text-white mb-1 lg:mb-4">Visa Filing Assistance.</h3>
                <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  Compile and organize financial proofs, academic transcripts, and identity documents.
                </p>
              </div>
            </div>
            {/* Phone mockup - hidden on mobile */}
            <div className="hidden lg:block mt-auto relative left-1/2 -translate-x-1/2 translate-y-12 scale-90 group-hover:scale-95 transition-transform duration-500">
               <PhoneMockup variant="vault" frameStyle="dark" />
            </div>
          </div>

          {/* Card 2: Tutor */}
          <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900 rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-8 border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden relative group">
            <div className="flex lg:flex-col items-start gap-4 lg:gap-0 lg:mb-8 relative z-10">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 flex-shrink-0 lg:mb-6">
                <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <h3 className="text-lg lg:text-2xl font-bold text-slate-900 dark:text-white mb-1 lg:mb-4">AI-Powered Tutoring.</h3>
                <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  Access 24/7 AI tutoring for Math, Science, and English. Get instant remedial lessons.
                </p>
              </div>
            </div>
            {/* Phone mockup - hidden on mobile */}
            <div className="hidden lg:block mt-auto relative left-1/2 -translate-x-1/2 translate-y-12 scale-90 group-hover:scale-95 transition-transform duration-500">
               <PhoneMockup variant="chat" frameStyle="glass" />
            </div>
          </div>

          {/* Card 3: Finance */}
          <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900 rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-8 border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden relative group">
            <div className="flex lg:flex-col items-start gap-4 lg:gap-0 lg:mb-8 relative z-10">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 lg:mb-6">
                <Wallet className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <h3 className="text-lg lg:text-2xl font-bold text-slate-900 dark:text-white mb-1 lg:mb-4">Rewards & Scholarships.</h3>
                <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  Unlock scholarship opportunities and earn rewards for academic milestones.
                </p>
              </div>
            </div>
            {/* Phone mockup - hidden on mobile */}
            <div className="hidden lg:block mt-auto relative left-1/2 -translate-x-1/2 translate-y-12 scale-90 group-hover:scale-95 transition-transform duration-500">
               <PhoneMockup variant="wallet" frameStyle="minimal" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
