"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Coins, Plane, Home, FileText, Languages, Compass, Users } from "lucide-react";

interface StepHurdlesProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
}

const HURDLES = [
  { id: 'academic', label: 'Academic Help', icon: BookOpen, stat: '25%' },
  { id: 'finance', label: 'Tuition Finance', icon: Coins, stat: '40%' },
  { id: 'visa', label: 'Visa & Immigration', icon: Plane, stat: '35%' },
  { id: 'living', label: 'Living Costs', icon: Home, stat: '30%' },
  { id: 'application', label: 'Application Process', icon: FileText, stat: '45%' },
  { id: 'language', label: 'Language Proficiency', icon: Languages, stat: '20%' },
  { id: 'career', label: 'Career Guidance', icon: Compass, stat: '50%' },
];

export const StepHurdles = ({ formData, setFormData, onNext }: StepHurdlesProps) => {
  const [socialProof, setSocialProof] = useState<string | null>(null);
  const [hurdleStats, setHurdleStats] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch stats on mount
    fetch("/api/stats")
      .then(res => res.json())
      .then(data => {
        setHurdleStats(data.hurdleStats || {});
      })
      .catch(error => {
        console.error("Error fetching stats:", error);
      });
  }, []);

  useEffect(() => {
    // Update social proof when hurdles change
    if (!formData.hurdles?.length) {
      setSocialProof(null);
      return;
    }

    const lastSelected = HURDLES.find(h => h.id === formData.hurdles[formData.hurdles.length - 1]);
    if (!lastSelected) {
      setSocialProof(null);
      return;
    }

    const count = hurdleStats[lastSelected.id] || 0;
    if (count > 0) {
      setSocialProof(`${count} ${count === 1 ? 'family has' : 'families have'} also requested help with ${lastSelected.label}.`);
    } else {
      setSocialProof(`You are not alone. Many families also requested help with ${lastSelected.label}.`);
    }
  }, [formData.hurdles, hurdleStats]);

  const toggleHurdle = (id: string) => {
    const current = formData.hurdles || [];
    if (current.includes(id)) {
      setFormData({ ...formData, hurdles: current.filter((h: string) => h !== id) });
    } else {
      setFormData({ ...formData, hurdles: [...current, id] });
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
        <h3 className="text-xl font-bold text-slate-900">What stands in your way?</h3>
        <p className="text-sm text-slate-600">Select all that apply. We customize your support.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {HURDLES.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleHurdle(item.id)}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-2 ${
              formData.hurdles?.includes(item.id)
                ? 'border-brand-DEFAULT bg-brand-DEFAULT/5 ring-1 ring-brand-DEFAULT'
                : 'border-slate-200 hover:border-brand-DEFAULT/50 hover:bg-slate-50'
            }`}
          >
            <item.icon className={`w-5 h-5 ${formData.hurdles?.includes(item.id) ? 'text-brand-DEFAULT' : 'text-slate-400'}`} />
            <span className={`text-sm font-medium leading-tight ${formData.hurdles?.includes(item.id) ? 'text-brand-dark' : 'text-slate-600'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {socialProof && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg"
        >
          <Users className="w-3 h-3" />
          {socialProof}
        </motion.div>
      )}

      <button
        onClick={onNext}
        className="w-full bg-brand-orange hover:bg-orange-600 text-white font-medium py-2.5 rounded-pill shadow-lg shadow-brand-orange/30 transition-all"
      >
        Get My Roadmap
      </button>
    </motion.div>
  );
};
