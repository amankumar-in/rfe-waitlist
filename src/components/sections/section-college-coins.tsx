"use client";

import { motion } from "framer-motion";
import { ExternalLink, Building2, Coins } from "lucide-react";
import Link from "next/link";

export const SectionCollegeCoins = () => {
  return (
    <section className="py-16 bg-slate-900 relative overflow-hidden">
      {/* Section-wide background elements that will be visible through the glass */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-blue-500/25 rounded-full blur-2xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left: Glass Desktop Mockup */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-lg relative z-10"
            >
              {/* Frameless Glass Screen */}
              <div 
                className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-white/20 backdrop-blur-md shadow-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                }}
              >
                {/* Subtle top shine */}
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                
                {/* Realistic Dashboard Content */}
                <div className="p-5 h-full flex flex-col text-white opacity-50">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                        <Building2 className="w-3 h-3 text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase tracking-wide">Institution</div>
                        <div className="text-sm font-bold">St. Edwards</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-slate-400">Token Price</div>
                      <div className="text-sm font-mono font-bold text-emerald-400">$1.24</div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-4 gap-1.5 mb-3">
                    <div className="p-2 bg-white/5 rounded border border-white/5">
                      <div className="text-[7px] text-slate-400 uppercase mb-0.5">Miners</div>
                      <div className="text-sm font-bold">12,458</div>
                      <div className="text-[7px] text-emerald-400">+128</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded border border-white/5">
                      <div className="text-[7px] text-slate-400 uppercase mb-0.5">Staked</div>
                      <div className="text-sm font-bold">8.2M</div>
                      <div className="text-[7px] text-slate-400">65%</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded border border-white/5">
                      <div className="text-[7px] text-slate-400 uppercase mb-0.5">Rewards</div>
                      <div className="text-sm font-bold">$890K</div>
                      <div className="text-[7px] text-slate-400">YTD</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded border border-white/5">
                      <div className="text-[7px] text-slate-400 uppercase mb-0.5">Volume</div>
                      <div className="text-sm font-bold">$1.2M</div>
                      <div className="text-[7px] text-slate-400">24h</div>
                    </div>
                  </div>

                  {/* Transaction List */}
                  <div className="flex-1 space-y-1">
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Recent Transactions</div>
                    {[
                      { label: "Scholarship Grant #4092", amount: "+ 5,000 CFC", status: "success" },
                      { label: "Campus Bookstore", amount: "- 45 CFC", status: "complete" },
                      { label: "Tuition Payment Fall '24", amount: "- 12,500 CFC", status: "pending" },
                      { label: "Research Grant Allocation", amount: "+ 50,000 CFC", status: "success" },
                      { label: "Alumni Donation", amount: "+ 2,500 CFC", status: "complete" },
                      { label: "Library Fine Payment", amount: "- 15 CFC", status: "complete" },
                    ].map((tx, i) => (
                      <div key={i} className="flex justify-between items-center p-1.5 bg-white/5 rounded border border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1 h-1 rounded-full ${tx.status === 'success' ? 'bg-emerald-500' : tx.status === 'complete' ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                          <span className="text-[9px] text-slate-200">{tx.label}</span>
                        </div>
                        <span className={`text-[9px] font-mono font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>{tx.amount}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-4">
              <Coins className="w-4 h-4" />
              <span>For Institutions</span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Powered by <br />
              <span className="text-indigo-200">College Coins.</span>
            </h2>
            
            <p className="text-xl text-indigo-100 leading-relaxed mb-6">
              RFE focuses on student success. College Coins empower universities to create digital economies that fund scholarships, research, and campus operations.
            </p>

            <Link 
              href="https://coinsforcollege.org/college-coins" 
              target="_blank"
              className="inline-flex items-center gap-2 text-white font-medium hover:text-indigo-200 transition-colors group"
            >
              Learn More
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

