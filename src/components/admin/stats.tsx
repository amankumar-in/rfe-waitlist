"use client";

import { useEffect, useState } from "react";
import { Users, Eye, Target, TrendingUp } from "lucide-react";

interface StatsData {
  totalUsers: number;
  totalVisitors: number;
  hurdleStats: Record<string, number>;
}

export function AdminStats() {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    totalVisitors: 0,
    hurdleStats: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
        setLoading(false);
      });
  }, []);

  const HURDLE_LABELS: Record<string, string> = {
    academic: "Academic Help",
    finance: "Tuition Finance",
    visa: "Visa & Immigration",
    living: "Living Costs",
    application: "Application Process",
    language: "Language Proficiency",
    career: "Career Guidance",
  };

  const sortedHurdles = Object.entries(stats.hurdleStats || {})
    .map(([id, count]) => ({
      id,
      label: HURDLE_LABELS[id] || id,
      count: count as number,
    }))
    .sort((a, b) => b.count - a.count);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-600 dark:text-slate-400">Loading statistics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                Total Signups
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {stats.totalUsers.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-brand-DEFAULT/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-brand-DEFAULT" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                Total Visitors
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {stats.totalVisitors.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Hurdle Statistics */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-5 h-5 text-brand-DEFAULT" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Top Hurdles
          </h2>
        </div>

        {sortedHurdles.length > 0 ? (
          <div className="space-y-4">
            {sortedHurdles.map((hurdle) => {
              const percentage =
                stats.totalUsers > 0
                  ? Math.round((hurdle.count / stats.totalUsers) * 100)
                  : 0;

              return (
                <div key={hurdle.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {hurdle.label}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {hurdle.count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-brand-DEFAULT h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-600 dark:text-slate-400 text-center py-8">
            No hurdle data available yet
          </p>
        )}
      </div>
    </div>
  );
}
