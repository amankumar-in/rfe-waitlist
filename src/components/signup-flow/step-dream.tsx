"use client";

import { motion } from "framer-motion";

import { POPULAR_DESTINATIONS } from "@/lib/countries";

interface StepDreamProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
}

export const StepDream = ({ formData, setFormData, onNext }: StepDreamProps) => {
  const toggleCountry = (code: string) => {
    const current = formData.dreamCountries || [];
    if (current.includes(code)) {
      setFormData({ ...formData, dreamCountries: current.filter((c: string) => c !== code) });
    } else {
      if (current.length >= 5) return;
      setFormData({ ...formData, dreamCountries: [...current, code] });
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
        <h3 className="text-xl font-bold text-slate-900">Where do they want to study?</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">Select up to 5 destinations.</p>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            (formData.dreamCountries?.length || 0) >= 5
              ? 'bg-green-100 text-green-700'
              : (formData.dreamCountries?.length || 0) > 0
              ? 'bg-brand-DEFAULT/10 text-brand-DEFAULT'
              : 'bg-slate-100 text-slate-600'
          }`}>
            {formData.dreamCountries?.length || 0} / 5 selected
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
        {POPULAR_DESTINATIONS.map((country) => (
          <button
            key={country.code}
            onClick={() => toggleCountry(country.code)}
            className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
              formData.dreamCountries?.includes(country.code)
                ? 'border-brand-DEFAULT bg-brand-DEFAULT/5 ring-1 ring-brand-DEFAULT'
                : 'border-slate-200 hover:border-brand-DEFAULT/50 hover:bg-slate-50'
            }`}
          >
            <span className="text-2xl">{country.flag}</span>
            <span className={`font-medium text-sm ${formData.dreamCountries?.includes(country.code) ? 'text-brand-dark' : 'text-slate-600'}`}>
              {country.name}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!formData.dreamCountries?.length}
        className="w-full bg-brand-DEFAULT disabled:opacity-50 hover:bg-brand-dark text-white font-medium py-2.5 rounded-pill shadow-lg shadow-brand-DEFAULT/30 transition-all"
      >
        {formData.dreamCountries?.length >= 5 ? "Continue (Maximum Selected)" : "Continue"}
      </button>
    </motion.div>
  );
};
