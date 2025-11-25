"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StepGate } from "./step-gate";
import { StepVerify } from "./step-verify";
import { StepContext } from "./step-context";
import { StepDream } from "./step-dream";
import { StepHurdles } from "./step-hurdles";

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

  // Check if user already exists and has completed form
  const checkExistingUser = async (email: string) => {
    try {
      const res = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.exists && data.user) {
        // Check if user has completed the form (has hurdles or dreamCountries)
        const isComplete = data.user.hurdles?.length > 0 || data.user.dreamCountries?.length > 0;
        
        if (isComplete) {
          // User completed - show roadmap
          setFormData({ ...formData, ...data.user });
          if (onComplete) {
            onComplete(data.user);
          }
          return true;
        } else {
          // User exists but incomplete - continue from where they left off
          setFormData({ ...formData, ...data.user });
          // Determine which step to continue from
          if (!data.user.whoFor || !data.user.studentGrade) {
            setStep(2); // Continue from context step
          } else if (!data.user.dreamCountries?.length) {
            setStep(3); // Continue from dream step
          } else if (!data.user.hurdles?.length) {
            setStep(4); // Continue from hurdles step
          }
          return true;
        }
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
                // After OTP verification, fetch user data (account was created)
                try {
                  const res = await fetch(`/api/users?email=${encodeURIComponent(formData.email)}`);
                  const data = await res.json();
                  if (data.exists && data.user) {
                    setFormData({ ...formData, ...data.user });
                  }
                } catch (error) {
                  console.error("Error fetching user:", error);
                }
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
