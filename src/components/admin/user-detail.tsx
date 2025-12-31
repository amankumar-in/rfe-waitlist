"use client";

import { ArrowLeft, Mail, Phone, MapPin, Calendar, Target, Globe, User, GraduationCap, MessageSquare } from "lucide-react";
import { ALL_COUNTRIES, POPULAR_DESTINATIONS } from "@/lib/countries";
import { cn } from "@/lib/utils";

interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  country?: string;
  whoFor?: string;
  studentName?: string;
  studentGrade?: string;
  dreamCountries?: string[];
  hurdles?: string[];
  questions?: string;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AdminUserDetailProps {
  user: User;
  onBack: () => void;
}

const HURDLE_LABELS: Record<string, string> = {
  academic: "Academic Help",
  finance: "Tuition Finance",
  visa: "Visa & Immigration",
  living: "Living Costs",
  application: "Application Process",
  language: "Language Proficiency",
  career: "Career Guidance",
};

const HURDLE_COLORS: Record<string, string> = {
  academic: "bg-brand-DEFAULT",
  finance: "bg-blue-500",
  visa: "bg-purple-500",
  living: "bg-orange-500",
  application: "bg-pink-500",
  language: "bg-green-500",
  career: "bg-indigo-500",
};

export function AdminUserDetail({ user, onBack }: AdminUserDetailProps) {
  const getCountryName = (code: string) => {
    const country =
      ALL_COUNTRIES.find((c) => c.code === code) ||
      POPULAR_DESTINATIONS.find((c) => c.code === code);
    return country?.name || code;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getWhoForLabel = () => {
    switch (user.whoFor) {
      case "myself":
        return "Self";
      case "child":
        return "My Child";
      case "student":
        return "My Student";
      case "other":
        return "Other";
      default:
        return user.whoFor || "N/A";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            User Details
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Complete profile and roadmap information
          </p>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Full Name
            </label>
            <p className="mt-1 text-slate-900 dark:text-white">
              {user.firstName || user.lastName
                ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                : "N/A"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <p className="mt-1 text-slate-900 dark:text-white">{user.email}</p>
          </div>
          {user.phone && (
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </label>
              <p className="mt-1 text-slate-900 dark:text-white">{user.phone}</p>
            </div>
          )}
          {user.country && (
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Country
              </label>
              <p className="mt-1 text-slate-900 dark:text-white">{user.country}</p>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              For Whom
            </label>
            <p className="mt-1 text-slate-900 dark:text-white">{getWhoForLabel()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Signup Date
            </label>
            <p className="mt-1 text-slate-900 dark:text-white">
              {formatDate(user.createdAt)}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Status
            </label>
            <p className="mt-1">
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  user.verified
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                )}
              >
                {user.verified ? "Verified" : "Pending Verification"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Student Information */}
      {(user.whoFor === "child" || user.whoFor === "student") && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Student Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.studentName && (
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Student Name
                </label>
                <p className="mt-1 text-slate-900 dark:text-white">
                  {user.studentName}
                </p>
              </div>
            )}
            {user.studentGrade && (
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Grade/Level
                </label>
                <p className="mt-1 text-slate-900 dark:text-white">
                  {user.studentGrade}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dream Countries */}
      {user.dreamCountries && user.dreamCountries.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Dream Destinations
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.dreamCountries.map((code) => (
              <span
                key={code}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium"
              >
                {getCountryName(code)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hurdles */}
      {user.hurdles && user.hurdles.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Challenges & Hurdles
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.hurdles.map((hurdleId) => (
              <span
                key={hurdleId}
                className={cn(
                  "inline-flex items-center px-3 py-1.5 rounded-lg text-white text-sm font-medium",
                  HURDLE_COLORS[hurdleId] || "bg-slate-500"
                )}
              >
                {HURDLE_LABELS[hurdleId] || hurdleId}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Additional Questions */}
      {user.questions && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Additional Questions / Notes
          </h3>
          <p className="text-slate-900 dark:text-white whitespace-pre-wrap">
            {user.questions}
          </p>
        </div>
      )}
    </div>
  );
}
