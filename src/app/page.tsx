"use client";

import { useState, lazy, Suspense } from "react";
import { Hero } from "@/components/hero";
import { StickyHeader } from "@/components/ui/sticky-header";

// Lazy load all sections below the fold
const SectionRoadmap = lazy(() => import("@/components/sections/section-roadmap").then(m => ({ default: m.SectionRoadmap })));
const SectionScholarships = lazy(() => import("@/components/sections/section-scholarships").then(m => ({ default: m.SectionScholarships })));
const SectionCollegeCoins = lazy(() => import("@/components/sections/section-college-coins").then(m => ({ default: m.SectionCollegeCoins })));
const SectionDestinations = lazy(() => import("@/components/sections/section-destinations").then(m => ({ default: m.SectionDestinations })));
const SectionProductEngine = lazy(() => import("@/components/sections/section-product-engine").then(m => ({ default: m.SectionProductEngine })));
const SectionLanguage = lazy(() => import("@/components/sections/section-language").then(m => ({ default: m.SectionLanguage })));
const SectionApplication = lazy(() => import("@/components/sections/section-application").then(m => ({ default: m.SectionApplication })));
const SectionCost = lazy(() => import("@/components/sections/section-cost").then(m => ({ default: m.SectionCost })));
const SectionPriorities = lazy(() => import("@/components/sections/section-priorities").then(m => ({ default: m.SectionPriorities })));
const SectionCTA = lazy(() => import("@/components/sections/section-cta").then(m => ({ default: m.SectionCTA })));

export default function Home() {
  const [roadmapData, setRoadmapData] = useState<any>(null);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden selection:bg-brand-DEFAULT/30">
      <StickyHeader />
      <Hero showForm={!roadmapData} onFormComplete={setRoadmapData} />
      <Suspense fallback={null}>
        {roadmapData && <SectionRoadmap formData={roadmapData} setFormData={setRoadmapData} />}
        <SectionScholarships />
        <SectionCollegeCoins />
        <SectionDestinations />
        <SectionProductEngine />
        <SectionLanguage />
        <SectionApplication />
        <SectionCost />
        <SectionPriorities />
        <SectionCTA />
      </Suspense>
    </main>
  );
}
