"use client";

import { motion } from "framer-motion";

export const StripeMeshGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 via-pink-50/40 to-blue-100/50" />
      
      {/* Animated mesh gradient orbs */}
      <div className="absolute inset-0">
        {/* Purple orb - top left */}
        <motion.div 
          className="absolute -top-20 -left-20 w-[900px] h-[900px] rounded-full blur-2xl opacity-75"
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -60, 70, 0],
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.95) 0%, rgba(139, 92, 246, 0.6) 30%, rgba(139, 92, 246, 0.2) 60%, transparent 75%)',
          }}
        />
        
        {/* Pink/Orange orb - top right */}
        <motion.div 
          className="absolute -top-10 -right-20 w-[850px] h-[850px] rounded-full blur-2xl opacity-80"
          animate={{
            x: [0, -100, 60, 0],
            y: [0, 80, -70, 0],
            scale: [1, 1.15, 0.85, 1],
            rotate: [0, -8, 8, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(251, 146, 60, 1) 0%, rgba(251, 113, 133, 0.7) 30%, rgba(251, 146, 60, 0.3) 60%, transparent 75%)',
          }}
        />
        
        {/* Blue orb - center left */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full blur-2xl opacity-70"
          animate={{
            x: [0, -80, 90, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.25, 0.8, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(99, 102, 241, 0.6) 30%, rgba(59, 130, 246, 0.2) 60%, transparent 75%)',
          }}
        />
        
        {/* Yellow/Gold orb - bottom center */}
        <motion.div 
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-2xl opacity-65"
          animate={{
            x: [0, 70, -70, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.18, 0.88, 1],
            rotate: [0, 7, -7, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.85) 0%, rgba(252, 211, 77, 0.5) 30%, rgba(251, 191, 36, 0.2) 60%, transparent 75%)',
          }}
        />
        
        {/* Cyan orb - middle right */}
        <motion.div 
          className="absolute top-1/3 -right-10 w-[750px] h-[750px] rounded-full blur-2xl opacity-70"
          animate={{
            x: [0, 75, -85, 0],
            y: [0, 100, -75, 0],
            scale: [1, 0.9, 1.22, 1],
            rotate: [0, -12, 12, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.9) 0%, rgba(34, 211, 238, 0.6) 30%, rgba(6, 182, 212, 0.2) 60%, transparent 75%)',
          }}
        />
      </div>

      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, transparent 40%, rgba(251, 146, 60, 0.15) 70%, transparent 100%)',
        }}
      />
    </div>
  );
};
