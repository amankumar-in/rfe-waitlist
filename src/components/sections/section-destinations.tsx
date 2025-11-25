"use client";

import { motion } from "framer-motion";

export const SectionDestinations = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">
            Where Students Are Applying.
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Real-time insights into the most popular study destinations chosen by our community.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Student Preference Distribution</h3>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Live Data</span>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { country: "USA", percent: 45, color: "bg-blue-500", flag: "🇺🇸" },
              { country: "UK", percent: 30, color: "bg-red-500", flag: "🇬🇧" },
              { country: "Canada", percent: 12, color: "bg-red-600", flag: "🇨🇦" },
              { country: "Germany", percent: 8, color: "bg-yellow-500", flag: "🇩🇪" },
              { country: "Australia", percent: 5, color: "bg-blue-600", flag: "🇦🇺" },
            ].map((item, index) => (
              <div key={item.country} className="relative">
                <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <span className="flex items-center gap-2 text-lg">
                    <span>{item.flag}</span>
                    <span className="text-sm font-bold">{item.country}</span>
                  </span>
                  <span>{item.percent}%</span>
                </div>
                <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
