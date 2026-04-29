"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      
      ticking.current = true;
      requestAnimationFrame(() => {
        // Show header after scrolling past 100px
        const shouldShow = window.scrollY > 100;
        setIsVisible(prev => prev !== shouldShow ? shouldShow : prev);
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
                <span className="font-heading font-extrabold text-lg tracking-wider text-slate-900 dark:text-white hidden sm:block">
                  REWARDS FOR EDUCATION
                </span>
              </div>

              {/* Right side: Join Waitlist (secondary) + For Colleges (primary) */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={scrollToTop}
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold border border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  Join Waitlist
                </button>
                <a
                  href="/colleges"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-white transition-all duration-200 bg-brand-DEFAULT hover:bg-brand-dark rounded-full shadow-lg shadow-brand-DEFAULT/25 hover:shadow-brand-DEFAULT/40 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                >
                  <span>For Colleges</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

