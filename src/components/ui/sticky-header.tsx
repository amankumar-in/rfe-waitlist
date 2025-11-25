"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling past 100px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
        >
          <div className="container mx-auto">
            <div className="flex items-center justify-between p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg ring-1 ring-black/5">
              
              {/* Logo Section */}
              <div className="flex items-center gap-3 pl-2">
                <Image 
                  src="/assets/images/global.png" 
                  alt="Globe Icon" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6"
                />
                <span className="font-heading font-extrabold text-lg tracking-wider animate-shine bg-[linear-gradient(110deg,#0A2540,45%,#635BFF,55%,#0A2540)] bg-[length:200%_100%] bg-clip-text text-transparent hidden sm:block">
                  REWARDS FOR EDUCATION
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={scrollToTop}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-white transition-all duration-200 bg-brand-DEFAULT hover:bg-brand-dark rounded-full shadow-lg shadow-brand-DEFAULT/25 hover:shadow-brand-DEFAULT/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Join Waitlist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

