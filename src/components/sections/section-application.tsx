"use client";

import { PhoneMockup } from "../phone-mockup";
import { FileText } from "lucide-react";

export const SectionApplication = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          
          {/* Right: Visual */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            {/* Phone Mockup */}
            <div className="relative order-first lg:order-last">
               <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-3xl -z-10" />
               <PhoneMockup variant="dashboard" frameStyle="dark" />
            </div>
          </div>

          {/* Left: Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              <span>Application Manager</span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Application <br />
              <span className="text-blue-600 dark:text-blue-400">Assistance.</span>
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Draft compelling Statements of Purpose and manage Letters of Recommendation directly from the dashboard. Never miss a deadline.
            </p>

            <ul className="space-y-4 text-left mx-auto lg:mx-0 max-w-md">
                {["SOP Builder with AI Feedback", "Recommendation Letter Requests", "Deadline Tracking & Alerts", "Document Version Control"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 flex-shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        {item}
                    </li>
                ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};
