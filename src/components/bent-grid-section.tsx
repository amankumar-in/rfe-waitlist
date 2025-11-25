"use client";

import { motion } from "framer-motion";
import { Coins, Brain, ShieldCheck, TrendingUp } from "lucide-react";

export const BentGridSection = () => {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 mb-4">
            The Infrastructure for <br />
            <span className="text-brand-DEFAULT">Student Success.</span>
          </h2>
          <p className="text-lg text-slate-600">
            We don't just track progress. We incentivize it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Large Card (Span 2) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-stripe border border-slate-100 relative overflow-hidden group"
          >
            <div className="relative z-10 max-w-sm">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-6">
                    <Brain className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Earn While Learning</h3>
                <p className="text-slate-600">Students earn points for math, science, and language tasks. Every quiz completed builds their tuition fund.</p>
            </div>
            
            {/* Visual: Abstract Learning Task */}
            <div className="absolute top-10 right-[-50px] w-[300px] h-[400px] bg-slate-50 rounded-xl border border-slate-200 shadow-sm p-4 rotate-6 group-hover:rotate-3 transition-all duration-500">
                <div className="w-full h-32 bg-brand-orange/5 rounded-lg mb-4" />
                <div className="space-y-3">
                    <div className="h-4 w-3/4 bg-slate-200 rounded-full" />
                    <div className="h-4 w-1/2 bg-slate-200 rounded-full" />
                </div>
            </div>
          </motion.div>

          {/* Tall Card (Span 1, Row 2) - AI Guidance */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="lg:row-span-2 bg-slate-900 rounded-3xl p-8 shadow-stripe relative overflow-hidden text-white"
          >
             <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center mb-6">
                    <ShieldCheck className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-2">AI Guidance</h3>
                <p className="text-slate-400">Personalized milestones ensure they never fall behind.</p>
            </div>
            
            {/* Visual: Timeline */}
            <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-slate-900 to-transparent z-20" />
            <div className="absolute bottom-[-20px] left-8 right-8 space-y-4 opacity-50">
                {[1,2,3,4].map(i => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="w-2 h-full bg-slate-700 mx-auto" />
                        <div className="flex-1 bg-slate-800 p-3 rounded-lg border border-slate-700">
                            <div className="h-2 w-12 bg-slate-600 rounded-full mb-2" />
                            <div className="h-2 w-24 bg-slate-700 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
          </motion.div>

          {/* Small Card 1 - Coins */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl p-8 shadow-stripe border border-slate-100"
          >
            <div className="w-12 h-12 rounded-full bg-brand-DEFAULT/10 flex items-center justify-center mb-6">
                <Coins className="w-6 h-6 text-brand-DEFAULT" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">College Coins</h3>
            <p className="text-sm text-slate-600">A new asset class for education finance.</p>
          </motion.div>

          {/* Small Card 2 - Growth */}
           <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl p-8 shadow-stripe border border-slate-100"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Guaranteed</h3>
            <p className="text-sm text-slate-600">Admissions support for top universities.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
