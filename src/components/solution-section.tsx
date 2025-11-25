"use client";

import { motion } from "framer-motion";
import { PhoneMockup } from "@/components/phone-mockup";
import { Coins, Brain, ShieldCheck } from "lucide-react";

export const SolutionSection = () => {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-[1080px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white">
            More Than Just A Waitlist.
          </h2>
          <p className="text-lg text-slate-300">
            The RFE App is your child's companion for the next decade of growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Feature 1 */}
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-DEFAULT/20 flex items-center justify-center">
                <Coins className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold">Earn While Learning</h3>
              <p className="text-slate-400 leading-relaxed">
                Students earn points for math, science, and language tasks. Convert points into real value accepted by partner institutions.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-brand-orange" />
              </div>
              <h3 className="text-xl font-bold">AI-Driven Guidance</h3>
              <p className="text-slate-400 leading-relaxed">
                Personalized milestones ensure they never fall behind. Our AI adapts to their learning pace.
              </p>
            </div>
          </div>

          {/* Center Visual (Phone) */}
          <div className="flex justify-center py-12 lg:py-0">
             <div className="transform scale-90 lg:scale-100">
                <PhoneMockup />
             </div>
          </div>

          {/* Feature 2 */}
          <div className="space-y-12 lg:text-right">
            <div className="space-y-4 flex flex-col lg:items-end">
              <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold">Guaranteed Guidance</h3>
              <p className="text-slate-400 leading-relaxed">
                From visa applications to university selection, we provide the roadmap and the vehicle to get there.
              </p>
            </div>
             <div className="space-y-4 flex flex-col lg:items-end">
              <div className="w-12 h-12 rounded-full bg-brand-DEFAULT/20 flex items-center justify-center">
                <Coins className="w-6 h-6 text-brand-DEFAULT" />
              </div>
              <h3 className="text-xl font-bold">College Coins</h3>
              <p className="text-slate-400 leading-relaxed">
                A new asset class for education. Accumulated over years, redeemed for tuition and expenses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
