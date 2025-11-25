"use client";

import { useEffect, useRef } from "react";

export const AnimatedGradientBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let t = 0;

    const animate = () => {
      t += 0.01; // Much Faster Speed for visibility
      
      // We animate the positions of 3 radial gradients
      // P1: Top Left-ish
      const x1 = 50 + 40 * Math.sin(t);
      const y1 = 50 + 40 * Math.cos(t);
      
      // P2: Top Right-ish
      const x2 = 50 + 40 * Math.sin(t + 2);
      const y2 = 50 + 40 * Math.cos(t + 2);

      // P3: Bottom Center-ish
      const x3 = 50 + 40 * Math.sin(t + 4);
      const y3 = 50 + 40 * Math.cos(t + 4);

      container.style.background = `
        radial-gradient(circle at ${x1}% ${y1}%, rgba(255, 0, 255, 0.8) 0%, transparent 50%),
        radial-gradient(circle at ${x2}% ${y2}%, rgba(0, 255, 255, 0.8) 0%, transparent 50%),
        radial-gradient(circle at ${x3}% ${y3}%, rgba(124, 58, 237, 0.8) 0%, transparent 50%),
        rgb(15, 23, 42)
      `;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10 transition-all duration-1000 ease-in-out"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 50% 80%, rgba(79, 70, 229, 0.4) 0%, transparent 50%),
          rgb(15, 23, 42)
        `
      }}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
    </div>
  );
};
