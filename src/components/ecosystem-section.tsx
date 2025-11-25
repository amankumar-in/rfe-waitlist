"use client";

import { motion } from "framer-motion";

export const EcosystemSection = () => {
  return (
    <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="max-w-[1080px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-6">
            An Integrated <span className="text-brand-accent">Ecosystem.</span>
          </h2>
          <p className="text-lg text-slate-400">
            What starts as a solution for international students expands into the infrastructure layer for global education finance.
          </p>
        </div>

        {/* Abstract Network Visual */}
        <div className="relative h-[400px] w-full border border-slate-800 rounded-3xl bg-slate-900/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
            {/* Central Node */}
            <div className="relative z-20 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-brand-DEFAULT shadow-[0_0_50px_rgba(99,91,255,0.5)] flex items-center justify-center text-3xl font-bold">
                    RFE
                </div>
                <div className="mt-4 font-bold text-brand-accent">The App</div>
            </div>

            {/* Orbiting Nodes */}
            {[
                { label: "Colleges", color: "bg-white", delay: 0, x: 150, y: -50 },
                { label: "Students", color: "bg-brand-orange", delay: 1, x: -150, y: 50 },
                { label: "Finance", color: "bg-green-500", delay: 2, x: 100, y: 100 },
                { label: "Visa", color: "bg-purple-500", delay: 3, x: -100, y: -100 },
            ].map((node, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="absolute flex flex-col items-center"
                    style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
                >
                    <div className={`w-16 h-16 rounded-full ${node.color} flex items-center justify-center text-slate-900 font-bold shadow-lg`}>
                        {node.label[0]}
                    </div>
                    <div className="mt-2 text-sm font-medium text-slate-300">{node.label}</div>
                    
                    {/* Connecting Line (CSS) */}
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[300px] h-[300px] pointer-events-none">
                        <line x1="150" y1="150" x2={150 - node.x} y2={150 - node.y} stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    </svg>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
