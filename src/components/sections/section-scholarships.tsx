"use client";

import { motion } from "framer-motion";
import { Award, Landmark, TrendingUp } from "lucide-react";

export const SectionScholarships = () => {
  const aidTypes = [
    {
      icon: Award,
      label: "Merit-Based Scholarships",
      description: "For academic excellence",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20"
    },
    {
      icon: TrendingUp,
      label: "Financial Aid",
      description: "Need-based assistance",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20"
    },
    {
      icon: Landmark,
      label: "University Grants",
      description: "Direct institutional support",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20"
    }
  ];

  return (
    <section className="py-24 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-medium mb-6">
                <Award className="w-3.5 h-3.5" />
                <span>Financial Opportunities</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                Secure Funding for Your Education
              </h2>
              
              <p className="text-lg lg:text-xl text-slate-300 leading-relaxed mb-8">
                Unlock financial aid opportunities from top global universities. We help you identify and apply for scholarships, grants, and financial aid packages to fund your education.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Visual Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-slate-700/50 overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/0 via-slate-800/0 to-slate-700/30 pointer-events-none" />
              
              <div className="relative z-10">
                {/* Big Number */}
                <div className="mb-10">
                    <div className="text-sm text-slate-400 uppercase tracking-wider font-bold mb-2">Maximum Award Per Student</div>
                    <div className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    $120,000
                    </div>
                </div>
                
                {/* Types of Aid */}
                <div className="space-y-3">
                    {aidTypes.map((aid, i) => (
                        <motion.div 
                          key={aid.label} 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                          className={`flex items-center gap-4 p-4 rounded-xl border ${aid.border} ${aid.bg} transition-all hover:scale-[1.02]`}
                        >
                            <div className={`flex-shrink-0 p-2.5 rounded-lg bg-slate-900/60 ${aid.color}`}>
                                <aid.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm lg:text-base">{aid.label}</div>
                                <div className="text-xs text-slate-300">{aid.description}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>



        </div>
      </div>
    </section>
  );
};

