import type { Metadata } from "next";
import { NavColleges } from "@/components/colleges/nav-colleges";
import { HeroColleges } from "@/components/colleges/hero-colleges";
import { ScaleBanner } from "@/components/colleges/scale-banner";
import { BentoCapabilities } from "@/components/colleges/bento-capabilities";
import { OperationsSection } from "@/components/colleges/operations-section";
import { ExpansionSection } from "@/components/colleges/expansion-section";
import { CtaFooter } from "@/components/colleges/cta-footer";

export const metadata: Metadata = {
  title: "For Institutions | Rewards For Education",
  description:
    "The financial and admissions infrastructure for modern universities. Scale enrollment, fund scholarships externally, and automate accreditation data.",
};

export default function CollegesPage() {
  return (
    <main className="bg-slate-950 text-white antialiased selection:bg-brand-accent/30">
      <NavColleges />
      <HeroColleges />
      <ScaleBanner />
      <BentoCapabilities />
      <OperationsSection />
      <ExpansionSection />
      <CtaFooter />
    </main>
  );
}
