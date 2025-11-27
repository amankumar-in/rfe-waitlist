"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { StickyHeader } from "@/components/ui/sticky-header";
import { SectionRoadmap } from "@/components/sections/section-roadmap";
import { SectionDestinations } from "@/components/sections/section-destinations";
import { SectionProductEngine } from "@/components/sections/section-product-engine";
import { SectionLanguage } from "@/components/sections/section-language";
import { SectionApplication } from "@/components/sections/section-application";
import { SectionScholarships } from "@/components/sections/section-scholarships";
import { SectionCollegeCoins } from "@/components/sections/section-college-coins";
import { SectionCost } from "@/components/sections/section-cost";
import { SectionPriorities } from "@/components/sections/section-priorities";
import { SectionCTA } from "@/components/sections/section-cta";

export default function Home() {
  const [roadmapData, setRoadmapData] = useState<any>(null);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden selection:bg-brand-DEFAULT/30">
      <StickyHeader />
      <Hero showForm={!roadmapData} onFormComplete={setRoadmapData} />
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
    </main>
  );
}
