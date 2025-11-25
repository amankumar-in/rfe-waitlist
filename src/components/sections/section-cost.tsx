"use client";

export const SectionCost = () => {
  return (
    <section className="py-32 bg-slate-900 text-white text-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-sm text-slate-400">
                Zero Cost Service
            </div>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold mb-8">
                100% Free <br />
                <span className="text-slate-500">Free For Everyone</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-slate-800 pt-16">
                <div>
                    <div className="text-3xl font-bold text-white mb-2">$0</div>
                    <div className="text-slate-400">Platform Fees</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-white mb-2">$0</div>
                    <div className="text-slate-400">Tutoring Costs</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-white mb-2">0%</div>
                    <div className="text-slate-400">Commissions</div>
                </div>
            </div>
             <p className="mt-12 text-slate-500 text-sm max-w-2xl mx-auto">
                No hidden fees. We are paid by our university partners for successful placements, ensuring our incentives are aligned with your success.
            </p>
        </div>
      </div>
    </section>
  );
};
