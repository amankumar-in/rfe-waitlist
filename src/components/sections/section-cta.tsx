"use client";

import { ArrowRight, Shield, Wallet, GraduationCap, Languages, FileText } from "lucide-react";

export const SectionCTA = () => {
  return (
    <section className="py-32 bg-white dark:bg-slate-950 text-center">
      <div className="container mx-auto px-4">
        
        <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-6">
                Start Your Journey.
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
                Everything you need to succeed, in one platform.
            </p>
        </div>

        {/* Assistance Grid Summary */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8 mb-16 max-w-5xl mx-auto opacity-70">
            {[
                { icon: Shield, label: "Visa" },
                { icon: Wallet, label: "Finance" },
                { icon: GraduationCap, label: "Academics" },
                { icon: Languages, label: "Language" },
                { icon: FileText, label: "Application" },
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400">
                        <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-slate-500">{item.label}</span>
                </div>
            ))}
        </div>

        <button 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 bg-brand-DEFAULT hover:bg-brand-dark text-white text-lg font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-brand-DEFAULT/25"
        >
            Join Waitlist
            <ArrowRight className="w-5 h-5" />
        </button>
        
        <p className="mt-6 text-sm text-slate-400">
            No credit card required. 100% Free for students.
        </p>

      </div>
    </section>
  );
};
