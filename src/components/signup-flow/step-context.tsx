"use client";

import { motion } from "framer-motion";
import { User, Users, GraduationCap } from "lucide-react";

interface StepContextProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
}

export const StepContext = ({ formData, setFormData, onNext }: StepContextProps) => {
  const handleWhoSelect = (who: string) => {
    setFormData({ ...formData, whoFor: who });
    // If 'myself' or 'other', maybe skip details? For now, we show details for all.
  };

  const handleNext = () => {
      onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900">Who are you joining for?</h3>
        <p className="text-sm text-slate-600">Help us customize the experience.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'myself', label: 'Myself', icon: User },
          { id: 'child', label: 'My Child', icon: Users },
          { id: 'student', label: 'Student', icon: GraduationCap },
          { id: 'other', label: 'Other', icon: User },
        ].map((option) => (
          <button
            key={option.id}
            onClick={() => handleWhoSelect(option.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              formData.whoFor === option.id
                ? 'border-brand-DEFAULT bg-brand-DEFAULT/5 ring-1 ring-brand-DEFAULT'
                : 'border-slate-200 hover:border-brand-DEFAULT/50 hover:bg-slate-50'
            }`}
          >
            <option.icon className={`w-6 h-6 mb-2 ${formData.whoFor === option.id ? 'text-brand-DEFAULT' : 'text-slate-400'}`} />
            <div className={`font-medium ${formData.whoFor === option.id ? 'text-brand-dark' : 'text-slate-600'}`}>
              {option.label}
            </div>
          </button>
        ))}
      </div>

      {formData.whoFor && (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-4 border-t border-slate-100"
        >
            <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Student's Current Grade</label>
                <select
                    value={formData.studentGrade}
                    onChange={(e) => setFormData({ ...formData, studentGrade: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-DEFAULT/20 focus:border-brand-DEFAULT outline-none transition-all"
                >
                    <option value="">Select Grade</option>
                    <option value="K-5">Grades K-5</option>
                    <option value="6-8">Grades 6-8</option>
                    <option value="9-12">Grades 9-12</option>
                    <option value="College">College / University</option>
                </select>
            </div>

            {formData.studentGrade && (
                <div className="p-3 bg-brand-accent/10 rounded-lg text-sm text-brand-dark">
                    {['K-5', '6-8'].includes(formData.studentGrade) 
                        ? "Perfect. You are starting at the right time to build a solid foundation."
                        : "We are opening spots for senior students soon. You have been added to the priority list."
                    }
                </div>
            )}

            <button
                onClick={handleNext}
                disabled={!formData.studentGrade}
                className="w-full bg-brand-DEFAULT disabled:opacity-50 hover:bg-brand-dark text-white font-medium py-2.5 rounded-pill shadow-lg shadow-brand-DEFAULT/30 transition-all"
            >
                Continue
            </button>
        </motion.div>
      )}
    </motion.div>
  );
};
