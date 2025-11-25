"use client";

import { motion } from "framer-motion";

export const GlobalContextSection = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              The Global <br />
              <span className="text-brand-DEFAULT">Education Crisis.</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                More than <strong className="text-slate-900">100 million students</strong> seek international higher-education opportunities every year.
              </p>
              <p>
                Yet the pathways for academic preparation, financial planning, and visa logistics remain fragmented and inaccessible.
              </p>
              <p>
                We are building the infrastructure to bridge this gap.
              </p>
            </div>
            
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-slate-900">100M+</div>
                <div className="text-sm text-slate-500 font-medium">Students</div>
              </div>
               <div>
                <div className="text-3xl font-bold text-slate-900">$3T</div>
                <div className="text-sm text-slate-500 font-medium">Market Size</div>
              </div>
            </div>
          </div>

          {/* Right: Visual Placeholder (Globe) */}
          <div className="relative h-[500px] w-full bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex items-center justify-center">
             {/* Abstract Globe CSS */}
             <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full border-2 border-brand-DEFAULT/20 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border-2 border-brand-accent/20 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-DEFAULT/5 to-transparent blur-xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-DEFAULT font-bold tracking-widest uppercase text-xs">
                    Global Network
                </div>
             </div>
             
             {/* Floating Cards */}
             <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-10 bg-white p-4 rounded-xl shadow-stripe border border-slate-100"
             >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">US</div>
                    <div className="text-sm font-bold text-slate-900">Visa Approved</div>
                </div>
             </motion.div>
             
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-10 bg-white p-4 rounded-xl shadow-stripe border border-slate-100"
             >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-DEFAULT/10 flex items-center justify-center text-brand-DEFAULT text-xs font-bold">$</div>
                    <div className="text-sm font-bold text-slate-900">Tuition Paid</div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
