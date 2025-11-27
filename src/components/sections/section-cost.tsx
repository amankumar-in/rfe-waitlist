"use client";

import { motion } from "framer-motion";
import { DollarSign, GraduationCap, Percent, CheckCircle2, Sparkles } from "lucide-react";
import { SparklesText } from "@/components/ui/sparkles-text";

export const SectionCost = () => {
  const stats = [
    {
      icon: DollarSign,
      value: "$0",
      label: "Platform Fees",
      description: "No subscription or access fees",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: GraduationCap,
      value: "$0",
      label: "Tutoring Costs",
      description: "AI-powered tutoring included",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Percent,
      value: "0%",
      label: "Commissions",
      description: "Zero hidden charges",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const freeFeatures = [
    "AI-Powered Tutoring (24/7)",
    "Visa Documentation Assistance",
    "Application Management Tools",
    "Finance Planning & Scholarships",
    "Language Proficiency Training",
    "University Matching & Guidance",
  ];

  return (
    <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 text-sm text-slate-300">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span>Zero Cost Service</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-7xl font-heading font-bold mb-4">
              <SparklesText 
                colors={{ first: "#10b981", second: "#06b6d4" }}
                className="text-4xl lg:text-7xl text-white"
              >
                100% Free
              </SparklesText>
            </h2>
            <p className="text-2xl lg:text-4xl text-slate-300 font-medium">
              For Everyone
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group relative flex-1 min-w-[100px] max-w-[140px]"
              >
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 text-center">
                  {/* Gradient border effect on hover */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-xl`} />
                  
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} mb-3 shadow-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  
                  <div className="text-xs lg:text-sm font-semibold text-white mb-1 leading-tight">
                    {stat.label}
                  </div>
                  
                  <div className="text-[10px] lg:text-xs text-slate-400 leading-tight">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* What's Included Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 lg:p-12 mb-8"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">
              Everything Included. No Hidden Costs.
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {freeFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm lg:text-base">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center text-slate-400 text-sm lg:text-base max-w-3xl mx-auto"
          >
            <span className="text-green-400 font-semibold">No hidden fees.</span> We are paid by our university partners for successful placements, ensuring our incentives are aligned with your success.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
