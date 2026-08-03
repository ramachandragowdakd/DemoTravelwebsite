'use client';

import React from 'react';
import {
  DollarSign,
  Sliders,
  Award,
  Headphones,
  ShieldCheck,
  Smile,
  Hotel,
  Zap,
  Sparkles,
} from 'lucide-react';
import { REASONS_TO_CHOOSE } from '../data/travelData';

const ICON_MAP: Record<string, any> = {
  DollarSign,
  Sliders,
  Award,
  Headphones,
  ShieldCheck,
  Smile,
  Hotel,
  Zap,
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0A192F] to-[#071324] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-teal-300 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" /> The Let’s Trawell Edge
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 to-amber-300">Let’s Trawell?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Here is why over 15,000 travelers trust us with their dream vacations and custom itineraries year after year.
          </p>
        </div>

        {/* 8 Feature Icon Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS_TO_CHOOSE.map((reason, idx) => {
            const IconComp = ICON_MAP[reason.icon] || ShieldCheck;
            return (
              <div
                key={idx}
                className="glass-dark rounded-3xl p-6 hover:bg-slate-800/90 border border-slate-800 hover:border-teal-400/50 transition-all duration-300 hover:-translate-y-2 group shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 via-sky-500 to-amber-500 text-white flex items-center justify-center mb-5 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                  <IconComp className="w-7 h-7 text-amber-200" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                  {reason.title}
                </h3>

                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
