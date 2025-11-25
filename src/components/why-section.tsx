"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, Languages } from "lucide-react";

export const WhySection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
              Why we focus on <span className="text-brand-DEFAULT">K-8 right now.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Global admission isn't just about grades. It's about financial planning, language fluency, and cultural readiness. These take years to build.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              RFE rewards your child for every step they take on this journey, starting now.
            </p>
          </div>
          
          <div className="grid gap-6">
            {[
              { icon: TrendingUp, title: "Financial Planning", desc: "Build a tuition fund over 10+ years." },
              { icon: Languages, title: "Language Fluency", desc: "Master host country languages early." },
              { icon: Globe, title: "Cultural Readiness", desc: "Understand the world before they fly." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-stripe transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-brand-DEFAULT/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-brand-DEFAULT" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
