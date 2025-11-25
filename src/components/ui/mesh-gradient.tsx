"use client";

import { motion } from "framer-motion";

export const MeshGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 bg-background">
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-brand-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[10%] right-[0%] w-[60vw] h-[60vw] bg-brand-DEFAULT/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] bg-slate-100 rounded-full blur-3xl"
        />
      </div>
      
      {/* Stripe Strip Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};
