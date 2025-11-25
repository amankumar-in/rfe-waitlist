"use client";

import { motion } from "framer-motion";

export const SectionGuarantee = () => {
  return (
    <section className="py-32 bg-slate-900 text-white relative overflow-hidden flex items-center justify-center">
      <div className="max-w-[1080px] mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-7xl font-heading font-bold leading-tight tracking-tight"
        >
          Three Offers. <br />
          <span className="text-brand-accent">Guaranteed.</span>
        </motion.h2>
        
        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
            We guarantee that every student who follows our roadmap will receive at least three unconditional offer letters. We provide the guidance; you achieve the results.
        </motion.p>
      </div>
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />
    </section>
  );
};
