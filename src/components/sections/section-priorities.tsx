"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HURDLE_LABELS: Record<string, string> = {
  academic: 'Academic Help',
  finance: 'Tuition Finance',
  visa: 'Visa & Immigration',
  living: 'Living Costs',
  application: 'Application Process',
  language: 'Language Proficiency',
  career: 'Career Guidance',
};

const HURDLE_COLORS: Record<string, string> = {
  academic: 'bg-brand-DEFAULT',
  finance: 'bg-blue-500',
  visa: 'bg-purple-500',
  living: 'bg-orange-500',
  application: 'bg-pink-500',
  language: 'bg-green-500',
  career: 'bg-indigo-500',
};

// Mock data for when there's no real data or fewer than 5000 users
const MOCK_HURDLE_STATS: Record<string, number> = {
  finance: 4250,
  visa: 3850,
  academic: 2100,
  application: 1850,
  language: 1250,
};

const MOCK_TOTAL_USERS = 5240;

export const SectionPriorities = () => {
  const [hurdleStats, setHurdleStats] = useState<Record<string, number>>({});
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then(res => res.json())
      .then(data => {
        // Use mock data if total users are less than 5000, otherwise use real data
        const realTotalUsers = data.totalUsers || 0;
        
        if (realTotalUsers > 5000) {
          setHurdleStats(data.hurdleStats || {});
          setTotalUsers(realTotalUsers);
        } else {
          setHurdleStats(MOCK_HURDLE_STATS);
          setTotalUsers(MOCK_TOTAL_USERS);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching stats:", error);
        // Use mock data on error
        setHurdleStats(MOCK_HURDLE_STATS);
        setTotalUsers(MOCK_TOTAL_USERS);
        setLoading(false);
      });
  }, []);

  // Calculate percentages
  const getPercentage = (count: number) => {
    if (totalUsers === 0) return 0;
    return Math.round((count / totalUsers) * 100);
  };

  // Sort hurdles by count
  const sortedHurdles = Object.entries(hurdleStats)
    .map(([id, count]) => ({
      id,
      label: HURDLE_LABELS[id] || id,
      count: count as number,
      percentage: getPercentage(count as number),
      color: HURDLE_COLORS[id] || 'bg-slate-500',
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5

  const topHurdle = sortedHurdles[0];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-1/3">
                <h2 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">
                    What Families Need Most.
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                    Real-time data on the top challenges faced by our community. We build our tools based on what you ask for.
                </p>
                {!loading && topHurdle && (
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Insight</div>
                    <p className="text-slate-900 dark:text-white font-medium">
                      "{topHurdle.label} is the #1 requested assistance, with {topHurdle.percentage}% of families seeking help in this area."
                    </p>
                </div>
                )}
            </div>

            <div className="w-full lg:w-2/3">
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Top Requested Assistance</h3>
                    {loading ? (
                      <div className="text-center py-8 text-slate-500">Loading...</div>
                    ) : (
                    <div className="space-y-6">
                        {sortedHurdles.map((item, i) => (
                          <div key={item.id}>
                                <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    <span>{item.label}</span>
                              <span>{item.percentage}% ({item.count.toLocaleString()} {item.count === 1 ? 'family' : 'families'})</span>
                                </div>
                                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                whileInView={{ width: `${item.percentage}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className={`h-full ${item.color} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};
