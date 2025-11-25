"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, ArrowRight, Mail, Calendar, Target, Users } from "lucide-react";
import { ALL_COUNTRIES, POPULAR_DESTINATIONS } from "@/lib/countries";

interface StepRoadmapProps {
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

export const StepRoadmap = ({ formData, setFormData }: StepRoadmapProps) => {
  const getCountryName = (code: string) => {
    const country = ALL_COUNTRIES.find(c => c.code === code) || POPULAR_DESTINATIONS.find(c => c.code === code);
    return country?.name || code;
  };

  const selectedCountries = formData.dreamCountries?.map((code: string) => getCountryName(code)) || [];
  const selectedHurdles = formData.hurdles?.map((id: string) => HURDLE_LABELS[id] || id) || [];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-DEFAULT to-brand-accent mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Your Personalized Roadmap</h3>
        <p className="text-sm text-slate-600">
          {formData.firstName}, you're on the path to success!
        </p>
      </div>

      {/* Success Promise */}
      <div className="bg-gradient-to-br from-brand-DEFAULT/10 via-brand-accent/10 to-brand-orange/10 rounded-xl p-6 border border-brand-DEFAULT/20">
        <div className="flex items-start gap-3">
          <Target className="w-6 h-6 text-brand-DEFAULT flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-slate-900 mb-2">You're Almost Certain to Get In</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Based on your profile and goals, you have a <strong>high probability</strong> of securing admission to your desired colleges. When we launch, you'll be among the <strong>first to connect directly</strong> with partner institutions and get priority access to exclusive opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-slate-50 rounded-xl p-5 space-y-4">
        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Your Profile Summary</h4>
        
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-medium text-slate-700">Name:</span>{" "}
              <span className="text-slate-900">{formData.firstName} {formData.lastName}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-medium text-slate-700">Location:</span>{" "}
              <span className="text-slate-900">{getCountryName(formData.country)}</span>
            </div>
          </div>

          {formData.studentGrade && (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-medium text-slate-700">Grade Level:</span>{" "}
                <span className="text-slate-900">{formData.studentGrade}</span>
              </div>
            </div>
          )}

          {selectedCountries.length > 0 && (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-medium text-slate-700">Dream Destinations:</span>{" "}
                <span className="text-slate-900">{selectedCountries.join(", ")}</span>
              </div>
            </div>
          )}

          {selectedHurdles.length > 0 && (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-medium text-slate-700">Areas of Support:</span>{" "}
                <span className="text-slate-900">{selectedHurdles.join(", ")}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white border-2 border-brand-DEFAULT/20 rounded-xl p-5 space-y-4">
        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-brand-DEFAULT" />
          What's Next
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-brand-DEFAULT/10 flex items-center justify-center text-brand-DEFAULT text-xs font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <div className="text-sm text-slate-700">
              <strong className="text-slate-900">Email Confirmation:</strong> Check your inbox ({formData.email}) for a welcome email with your roadmap details.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-brand-DEFAULT/10 flex items-center justify-center text-brand-DEFAULT text-xs font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <div className="text-sm text-slate-700">
              <strong className="text-slate-900">Early Access:</strong> You'll receive priority notifications when we launch and exclusive access to partner colleges.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-brand-DEFAULT/10 flex items-center justify-center text-brand-DEFAULT text-xs font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <div className="text-sm text-slate-700">
              <strong className="text-slate-900">Personalized Resources:</strong> We'll send you tailored resources based on your selected destinations and challenges.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-brand-DEFAULT/10 flex items-center justify-center text-brand-DEFAULT text-xs font-bold flex-shrink-0 mt-0.5">
              4
            </div>
            <div className="text-sm text-slate-700">
              <strong className="text-slate-900">Direct Connections:</strong> Be among the first to connect with admissions officers and get personalized guidance.
            </div>
          </div>
        </div>
      </div>

      {/* Additional Inputs */}
      <div className="space-y-3">
        <label className="block text-xs font-medium text-slate-700">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          value={formData.phone || ""}
          onChange={(e) => setFormData?.({ ...formData, phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
          className="w-full px-3 py-2 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-DEFAULT/20 focus:border-brand-DEFAULT outline-none transition-all text-sm"
        />

        <label className="block text-xs font-medium text-slate-700">
          Any specific questions or concerns?
        </label>
        <textarea
          value={formData.questions || ""}
          onChange={(e) => setFormData?.({ ...formData, questions: e.target.value })}
          placeholder="Tell us more about your goals or any specific challenges..."
          rows={3}
          className="w-full px-3 py-2 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-DEFAULT/20 focus:border-brand-DEFAULT outline-none transition-all text-sm resize-none"
        />
      </div>

      <div className="pt-4 border-t border-slate-200 space-y-3">
        <button
          onClick={async () => {
            if (setFormData) {
              // Save updated form data
              try {
                const res = await fetch("/api/users", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (data.success) {
                  // Show success message
                  const button = document.activeElement as HTMLButtonElement;
                  if (button) {
                    button.textContent = "✓ Saved!";
                    button.classList.add("bg-green-500");
                    setTimeout(() => {
                      button.textContent = "Save & Complete";
                      button.classList.remove("bg-green-500");
                    }, 2000);
                  }
                } else {
                  alert("There was an error saving your information. Please try again.");
                }
              } catch (error) {
                console.error("Error saving:", error);
                alert("There was an error saving your information. Please try again.");
              }
            }
          }}
          className="w-full bg-gradient-to-r from-brand-DEFAULT to-brand-accent hover:from-brand-dark hover:to-brand-DEFAULT text-white font-medium py-3 rounded-pill shadow-lg shadow-brand-DEFAULT/30 transition-all transform hover:-translate-y-0.5"
        >
          Save & Complete
        </button>
        
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <Users className="w-4 h-4" />
          <span>You're part of an exclusive early access group</span>
        </div>
      </div>
    </motion.div>
  );
};

