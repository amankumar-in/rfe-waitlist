"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, ArrowRight, Target } from "lucide-react";
import { ALL_COUNTRIES, POPULAR_DESTINATIONS } from "@/lib/countries";
import { BorderBeam } from "@/components/ui/border-beam";
import { SparklesText } from "@/components/ui/sparkles-text";

interface SectionRoadmapProps {
  formData: any;
  setFormData?: (data: any) => void;
}

const HURDLE_LABELS: Record<string, string> = {
  academic: 'Academic Help',
  finance: 'Tuition Finance',
  visa: 'Visa & Immigration',
  living: 'Living Costs',
  application: 'Application Process',
  language: 'Language Proficiency',
  career: 'Career Guidance',
};

export const SectionRoadmap = ({ formData, setFormData }: SectionRoadmapProps) => {
  const roadmapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll to roadmap section when it appears
    if (roadmapRef.current) {
      setTimeout(() => {
        roadmapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  const getCountryName = (code: string) => {
    const country = ALL_COUNTRIES.find(c => c.code === code) || POPULAR_DESTINATIONS.find(c => c.code === code);
    return country?.name || code;
  };

  const selectedCountries = formData.dreamCountries?.map((code: string) => getCountryName(code)) || [];
  const selectedHurdles = formData.hurdles?.map((id: string) => HURDLE_LABELS[id] || id) || [];

  // Determine who this is for
  const getWhoFor = () => {
    if (formData.whoFor === 'child') return "your child's";
    if (formData.whoFor === 'student') return "your student's";
    if (formData.whoFor === 'myself') return "your";
    return "the";
  };

  const getSubject = (capitalize = false) => {
    const subject = formData.whoFor === 'myself' ? 'you' : 
                   formData.whoFor === 'child' ? 'your child' :
                   formData.whoFor === 'student' ? 'your student' : 'the student';
    return capitalize ? subject.charAt(0).toUpperCase() + subject.slice(1) : subject;
  };

  const getTargetPronoun = () => {
     return formData.whoFor === 'myself' ? 'you' : 'they';
  };

  return (
    <section ref={roadmapRef} id="roadmap" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-brand-DEFAULT to-brand-accent mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-4">
              Personalized Roadmap
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {formData.firstName}, {getWhoFor()} path to success is ready!
            </p>
          </div>

          {/* Main Content - Horizontal Layout on Desktop */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Left: Success Promise */}
            <div className="bg-gradient-to-br from-brand-DEFAULT/10 via-brand-accent/10 to-brand-orange/10 rounded-2xl p-8 border border-brand-DEFAULT/20">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-brand-DEFAULT flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {formData.whoFor === 'myself' ? "You're" : `${getSubject(true)} is`} Almost Certain to Get In
                  </h3>
                  <p className="text-base text-slate-700 leading-relaxed">
                    Based on {getWhoFor()} profile and goals, there's a <strong>high probability</strong> of securing admission to {getWhoFor()} desired colleges. When we launch, {getTargetPronoun()} will be among the <strong>first to connect directly</strong> with partner institutions and get priority access to exclusive opportunities.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Profile Summary */}
            <div className="bg-slate-50 rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Profile Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-slate-700">Account Name:</span>{" "}
                    <span className="text-base text-slate-900 font-medium">{formData.firstName} {formData.lastName}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-slate-700">Role:</span>{" "}
                    <span className="text-base text-slate-900 font-medium capitalize">{formData.whoFor === 'myself' ? 'Student' : formData.whoFor === 'child' ? 'Parent' : formData.whoFor}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-slate-700">Location:</span>{" "}
                    <span className="text-base text-slate-900 font-medium">{getCountryName(formData.country)}</span>
                  </div>
                </div>

                {formData.studentGrade && (
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-slate-700">Grade Level:</span>{" "}
                      <span className="text-base text-slate-900 font-medium">{formData.studentGrade}</span>
                    </div>
                  </div>
                )}

                {selectedCountries.length > 0 && (
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-slate-700">Dream Destinations:</span>{" "}
                      <span className="text-base text-slate-900 font-medium">{selectedCountries.join(", ")}</span>
                    </div>
                  </div>
                )}

                {selectedHurdles.length > 0 && (
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-slate-700">Areas of Support:</span>{" "}
                      <span className="text-base text-slate-900 font-medium">{selectedHurdles.join(", ")}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Exclusive Early Access - Prominent */}
          <div className="mb-12">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-DEFAULT/10 via-brand-accent/10 to-brand-orange/10 border-2 border-brand-DEFAULT/30 p-8 lg:p-12">
              <BorderBeam 
                size={150}
                duration={8}
                colorFrom="#635BFF"
                colorTo="#00D4FF"
                borderWidth={2}
              />
              <div className="relative z-10 text-center">
                <div className="mb-4">
                  <SparklesText
                    className="text-2xl lg:text-3xl font-bold"
                    colors={{ first: "#635BFF", second: "#00D4FF" }}
                    sparklesCount={15}
                  >
                    Exclusive Early Access
                  </SparklesText>
                </div>
                <p className="text-lg text-slate-700 max-w-2xl mx-auto">
                  You're part of an <strong className="text-slate-900">exclusive early access group</strong>. Be among the first to connect with partner institutions and get priority access to exclusive opportunities when we launch.
                </p>
              </div>
            </div>
          </div>

          {/* What's Next - Full Width */}
          <div className="bg-white border-2 border-brand-DEFAULT/20 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <ArrowRight className="w-6 h-6 text-brand-DEFAULT" />
              What's Next
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-brand-DEFAULT/10 flex items-center justify-center text-brand-DEFAULT text-lg font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Email Confirmation</h4>
                  <p className="text-sm text-slate-600">Check your inbox ({formData.email}) for a welcome email with your roadmap details.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-brand-DEFAULT/10 flex items-center justify-center text-brand-DEFAULT text-lg font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Early Access</h4>
                  <p className="text-sm text-slate-600">You'll receive priority notifications when we launch and exclusive access to partner colleges.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-brand-DEFAULT/10 flex items-center justify-center text-brand-DEFAULT text-lg font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Personalized Resources</h4>
                  <p className="text-sm text-slate-600">We'll send you tailored resources based on your selected destinations and challenges.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-brand-DEFAULT/10 flex items-center justify-center text-brand-DEFAULT text-lg font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Direct Connections</h4>
                  <p className="text-sm text-slate-600">Be among the first to connect with admissions officers and get personalized guidance.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

