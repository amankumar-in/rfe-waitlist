"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface StepVerifyProps {
  email: string;
  onVerified: () => void;
}

export const StepVerify = ({ email, onVerified }: StepVerifyProps) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [devOtp, setDevOtp] = useState<string | null>(null);

  // Check if we have a dev OTP from the previous step
  useEffect(() => {
    // Check sessionStorage for dev OTP
    const storedOtp = sessionStorage.getItem(`dev_otp_${email}`);
    if (storedOtp) {
      setDevOtp(storedOtp);
      sessionStorage.removeItem(`dev_otp_${email}`);
    }
  }, [email]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
    
    // Auto-submit if full
    if (newOtp.every(v => v !== "") && index === 5) {
        handleVerify(newOtp.join(""));
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "" }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.otp && !data.emailSent) {
          // Dev mode - show OTP
          setDevOtp(data.otp);
          alert(`Email sending failed. Your OTP is: ${data.otp}`);
        } else {
          alert("Verification code sent! Please check your email.");
        }
        setOtp(["", "", "", "", "", ""]); // Reset
      } else {
        alert(data.error || "Failed to resend code. Please try again.");
      }
    } catch (err) {
      alert("Failed to resend code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const handleVerify = async (code: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/verify-email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await res.json();
      if (data.success) {
        // Account is created/verified, now continue
        onVerified();
      } else {
        alert("Invalid code. Please try again.");
        setOtp(["", "", "", "", "", ""]); // Reset
      }
    } catch (err) {
      alert("Verification failed.");
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
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-bold text-slate-900">Check your email</h3>
        <p className="text-sm text-slate-600">We sent a code to <span className="font-medium text-slate-900">{email}</span></p>
      </div>

      <div className="flex justify-center gap-2">
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            className="w-10 h-12 text-center text-xl font-bold bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-DEFAULT/20 focus:border-brand-DEFAULT outline-none transition-all"
          />
        ))}
      </div>

      {devOtp && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
          <p className="text-xs text-yellow-800 mb-1">Development Mode: Email sending failed</p>
          <p className="text-sm font-mono font-bold text-yellow-900">Your OTP: {devOtp}</p>
        </div>
      )}

      <div className="text-center space-y-2">
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-brand-DEFAULT">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">Verifying...</span>
          </div>
        ) : (
          <>
            <button 
              onClick={() => handleVerify(otp.join(""))}
              disabled={otp.some(d => !d)}
              className="w-full bg-brand-DEFAULT disabled:opacity-50 hover:bg-brand-dark text-white font-medium py-2.5 rounded-pill shadow-lg shadow-brand-DEFAULT/30 transition-all"
            >
              Verify Code
            </button>
            <button 
              onClick={handleResend}
              disabled={resending}
              className="text-sm text-brand-DEFAULT hover:text-brand-dark font-medium disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend Code"}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};
