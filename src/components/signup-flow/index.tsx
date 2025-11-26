"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StepGate } from "./step-gate";
import { StepVerify } from "./step-verify";
import { StepContext } from "./step-context";
import { StepDream } from "./step-dream";
import { StepHurdles } from "./step-hurdles";
import { detectUserCountry } from "@/lib/location";

interface VerificationFormProps {
  onComplete?: (formData: any) => void;
}

export const VerificationForm = ({ onComplete }: VerificationFormProps) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    whoFor: "", // 'myself', 'child', 'student', 'other'
    studentName: "",
    studentGrade: "",
    dreamCountries: [] as string[],
    hurdles: [] as string[],
    phone: "",
    questions: "",
  });

  // Prefill country based on user's location
  useEffect(() => {
    const initCountry = async () => {
      // If country is already set, don't overwrite
      if (formData.country) return;

      const countryCode = await detectUserCountry();
      if (countryCode) {
        setFormData(prev => {
          // Only update if country is still not set
          if (prev.country) return prev;
          return { ...prev, country: countryCode };
        });
      }
    };

    initCountry();
  }, []);

  // Check if user already exists (but don't skip verification)
  // This is used to pre-fill form data, but verification is still required
  const checkExistingUser = async (email: string) => {
    try {
      const res = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.exists && data.user) {
        // Pre-fill form data with existing user data
        setFormData(prev => ({ ...prev, ...data.user }));
        return true; // User exists, but we still need verification
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
    return false;
  };

  const nextStep = () => setStep((prev) => prev + 1);

  const handleSaveAndComplete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        // Success - user is saved, update formData with saved data
        if (data.user) {
          setFormData({ ...formData, ...data.user });
        }
        console.log("User saved successfully");
      }
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-stripe relative overflow-hidden transition-all duration-300 form-container">
      <div className="p-6 sm:p-8 flex flex-col" style={{ minHeight: 'auto' }}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepGate 
              key="gate" 
              formData={formData} 
              setFormData={setFormData} 
              onNext={nextStep}
              checkExistingUser={checkExistingUser}
            />
          )}
          {step === 1 && (
            <StepVerify 
              key="verify" 
              email={formData.email} 
              onVerified={async () => {
                // After OTP verification, fetch user data and determine next step
                try {
                  const res = await fetch(`/api/users?email=${encodeURIComponent(formData.email)}`);
                  const data = await res.json();
                  if (data.exists && data.user) {
                    // Load existing user data
                    const userData = data.user;
                    setFormData(prev => ({ ...prev, ...userData }));
                    
                    // Check if user has completed the form
                    const isComplete = userData.hurdles?.length > 0 || userData.dreamCountries?.length > 0;
                    
                    if (isComplete) {
                      // User completed - show roadmap
                      if (onComplete) {
                        onComplete(userData);
                      }
                      return; // Don't proceed to next step, roadmap will be shown
                    } else {
                      // User exists but incomplete - continue from where they left off
                      // Determine which step to continue from
                      if (!userData.whoFor || !userData.studentGrade) {
                        setStep(2); // Continue from context step
                      } else if (!userData.dreamCountries?.length) {
                        setStep(3); // Continue from dream step
                      } else if (!userData.hurdles?.length) {
                        setStep(4); // Continue from hurdles step
                      } else {
                        // Shouldn't happen, but default to context step
                        setStep(2);
                      }
                      return;
                    }
                  }
                } catch (error) {
                  console.error("Error fetching user:", error);
                }
                // New user - proceed to context step
                nextStep();
              }} 
            />
          )}
          {step === 2 && (
            <StepContext 
              key="context" 
              formData={formData} 
              setFormData={setFormData} 
              onNext={nextStep} 
            />
          )}
          {step === 3 && (
            <StepDream 
              key="dream" 
              formData={formData} 
              setFormData={setFormData} 
              onNext={nextStep} 
            />
          )}
          {step === 4 && (
            <StepHurdles 
              key="hurdles" 
              formData={formData} 
              setFormData={setFormData} 
              onNext={async () => {
                await handleSaveAndComplete();
                // Form complete - trigger roadmap section
                if (onComplete) {
                  onComplete(formData);
                }
              }} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
