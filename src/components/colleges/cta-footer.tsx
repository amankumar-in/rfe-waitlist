"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MessageSquare } from "lucide-react";

export const CtaFooter = () => {
  return (
    <>
      <section
        id="evaluate"
        className="relative bg-slate-950 text-white overflow-hidden"
      >
        {/* huge type bg */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 30%, rgba(99,91,255,0.25), transparent 55%), radial-gradient(circle at 50% 70%, rgba(0,212,255,0.18), transparent 60%)",
          }}
        />
        {/* hairline cross grid */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="container mx-auto px-6 py-32 lg:py-44 relative">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-12">
              <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-brand-accent">
                / Begin Evaluation
              </span>
            </div>

            <h2 className="font-heading font-bold text-5xl sm:text-7xl lg:text-[7.5rem] xl:text-[9rem] leading-[0.95] tracking-[-0.03em] text-white">
              <span className="block bg-gradient-to-br from-white via-white to-brand-accent/70 bg-clip-text text-transparent">
                Expand your
              </span>
              <span className="block">
                institutional <span className="italic font-light text-brand-accent">capacity.</span>
              </span>
            </h2>

            <p className="mt-12 text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Deploy the infrastructure built to support the next generation of
              higher education finance and enrollment.
            </p>

            <div className="mt-16 flex flex-wrap justify-center gap-4">
              <Link
                href="/colleges/contact?mode=info"
                className="group inline-flex items-center gap-2 bg-white text-slate-950 font-semibold px-8 py-4 rounded-full hover:bg-brand-accent transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                Request more information
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/colleges/contact?mode=offer"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-semibold hover:border-white/60 hover:bg-white/5 transition-colors"
              >
                <Download className="w-5 h-5" />
                Read partnership offer
              </Link>
            </div>

            {/* meta strip */}
            <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 max-w-3xl mx-auto pt-10 border-t border-white/10">
              {[
                { k: "Onboarding", v: "6 weeks" },
                { k: "Stack", v: "API · Webhook" },
                { k: "Region", v: "India · Global" },
                { k: "Support", v: "24×7 SLA" },
              ].map((m) => (
                <div key={m.k} className="text-left lg:text-center">
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-500 mb-1">
                    {m.k}
                  </div>
                  <div className="text-sm font-bold text-white">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 border-t border-white/5">
        <div className="container mx-auto px-6 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
            <div className="col-span-2 lg:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/assets/images/global.png"
                  alt="RFE"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span className="font-heading font-extrabold text-sm tracking-[0.18em] text-white">
                  REWARDS FOR EDUCATION
                </span>
              </div>
              <p className="text-sm max-w-sm leading-relaxed">
                The financial and admissions infrastructure for modern
                universities. Built on the Coins for College network.
              </p>
            </div>

            <FooterCol
              title="Platform"
              links={["Capabilities", "Operations", "Expansion", "Annexure"]}
            />
            <FooterCol
              title="Compliance"
              links={["NAAC Mapping", "Criterion V", "Criterion VI", "Audit Trail"]}
            />
            <FooterCol
              title="Legal"
              links={["Terms", "Privacy", "Security", "Contact"]}
            />
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
            <span>© {new Date().getFullYear()} CFC · All Rights Reserved</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              system operational
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

const FooterCol = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}) => (
  <div className="lg:col-span-2">
    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-500 mb-4">
      {title}
    </div>
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l}>
          <a href="#" className="text-sm hover:text-white transition-colors">
            {l}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
