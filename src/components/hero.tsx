"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { StripeMeshGradient } from "@/components/ui/stripe-mesh-gradient";
import { VerificationForm } from "@/components/signup-flow";
import { PhoneMockup } from "@/components/phone-mockup";
import { DynamicContrastText } from "@/components/ui/dynamic-contrast-text";

interface HeroProps {
  showForm?: boolean;
  onFormComplete?: (formData: any) => void;
}

export const Hero = ({ showForm = true, onFormComplete }: HeroProps) => {
  const [totalFamilies, setTotalFamilies] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);

  // Track visitor on component mount
  useEffect(() => {
    // Track this page visit
    fetch("/api/track-visitor", {
      method: "POST",
    }).catch(error => {
      console.error("Error tracking visitor:", error);
    });
  }, []);

  // Fetch stats
  useEffect(() => {
    fetch("/api/stats")
      .then(res => res.json())
      .then(data => {
        setTotalFamilies(data.totalUsers || 0);
        setTotalVisitors(data.totalVisitors || 0);
      })
      .catch(error => {
        console.error("Error fetching stats:", error);
      });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Diagonal Gradient Background */}
      <div className="absolute inset-0 z-0 [clip-path:polygon(0_0,100%_0,100%_42.5%,0_17.5%)]">
        {/* OG Image Background with Blending */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero2.webp"
            alt="Background"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-white/60 mix-blend-lighten" />
        </div>
        
        <div className="relative z-10 h-full">
          <StripeMeshGradient />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full z-20 pt-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Image 
              src="/assets/images/global.png" 
              alt="Globe Icon" 
              width={24} 
              height={24} 
              className="w-6 h-6"
            />
            <span className="font-heading font-extrabold text-xl tracking-wider animate-shine bg-[linear-gradient(110deg,#0A2540,45%,#635BFF,55%,#0A2540)] bg-[length:200%_100%] bg-clip-text text-transparent">
              REWARDS FOR EDUCATION
            </span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-20 lg:pt-32 pb-20">
        
        {/* Left Column: Content */}
        <div className="text-center lg:text-left">
          <div className="flex flex-wrap items-center gap-3 mb-8 justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-sm text-slate-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Total Interested Families: <span className="font-mono font-bold text-slate-900">
                {totalVisitors < 500 ? "500+" : totalVisitors.toLocaleString()}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold shadow-lg shadow-green-500/30">
              <span>✨</span>
              <span>100% Free</span>
            </div>
          </div>

          <h1 className="text-5xl lg:text-7xl font-heading font-bold text-slate-900 leading-[1.1] tracking-tight mb-6" style={{ position: 'relative' }}>
            3 Guaranteed Offers <br />
            <DynamicContrastText />
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Get the <strong className="text-slate-900">tools and support</strong> you need to secure your seat. From <strong className="text-slate-900">AI tutoring</strong> and <strong className="text-slate-900">finance planning</strong> to <strong className="text-slate-900">visa documentation</strong> assistance—helping you navigate every step of your journey.
          </p>
        </div>

        {/* Right Column: Interactive Form or View Roadmap Button */}
        {showForm ? (
          <div className="w-full max-w-md mx-auto lg:mr-0 relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-brand-DEFAULT rounded-2xl blur opacity-20 animate-pulse"></div>
             <VerificationForm onComplete={onFormComplete} />
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto lg:mr-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-brand-DEFAULT/10 to-brand-accent/10 rounded-2xl p-8 border border-brand-DEFAULT/20">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Your Roadmap is Ready!</h3>
                <p className="text-slate-600 mb-6">
                  View your personalized roadmap and next steps below.
                </p>
                <button
                  onClick={() => {
                    const roadmapSection = document.getElementById('roadmap');
                    if (roadmapSection) {
                      roadmapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="w-full bg-gradient-to-r from-brand-DEFAULT to-brand-accent hover:from-brand-dark hover:to-brand-DEFAULT text-white font-medium py-3 px-6 rounded-pill shadow-lg shadow-brand-DEFAULT/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  View My Roadmap
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
};
