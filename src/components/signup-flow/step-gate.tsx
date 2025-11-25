"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ALL_COUNTRIES } from "@/lib/countries";

interface StepGateProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  checkExistingUser?: (email: string) => Promise<boolean>;
}

export const StepGate = ({ formData, setFormData, onNext, checkExistingUser }: StepGateProps) => {
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // First check if user already exists
      if (checkExistingUser) {
        const exists = await checkExistingUser(formData.email);
        if (exists) {
          setLoading(false);
          return; // User exists, roadmap will be shown
        }
      }

      // User doesn't exist, proceed with verification
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email, 
          name: formData.firstName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          country: formData.country
        }),
      });
      const data = await res.json();
      
      if (data.success) {
        // If email failed but we're in dev mode, store OTP for next step
        if (data.otp && !data.emailSent) {
          console.log(`Email sending failed. Your OTP is: ${data.otp}`);
          // Store in sessionStorage so StepVerify can access it
          sessionStorage.setItem(`dev_otp_${formData.email}`, data.otp);
        }
        onNext();
      } else {
        const errorMsg = data.error || "Failed to send code. Please try again.";
        console.error("Email error:", data);
        alert(errorMsg);
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900">Join the waitlist</h3>
        <p className="text-sm text-slate-600">Unlock your personalized roadmap to a global university.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">First Name</label>
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-DEFAULT/20 focus:border-brand-DEFAULT outline-none transition-all"
              placeholder="Jane"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">Last Name</label>
            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-DEFAULT/20 focus:border-brand-DEFAULT outline-none transition-all"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600">Country</label>
          <select
            required
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-DEFAULT/20 focus:border-brand-DEFAULT outline-none transition-all"
          >
            <option value="">Select Country</option>
            {ALL_COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600">Email</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-DEFAULT/20 focus:border-brand-DEFAULT outline-none transition-all"
            placeholder="jane@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-brand-DEFAULT hover:bg-brand-dark disabled:opacity-70 text-white font-medium py-2.5 rounded-pill shadow-lg shadow-brand-DEFAULT/30 hover:shadow-brand-DEFAULT/50 transition-all transform hover:-translate-y-0.5"
        >
          {loading ? "Sending..." : <>Verify Email <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
    </motion.div>
  );
};
