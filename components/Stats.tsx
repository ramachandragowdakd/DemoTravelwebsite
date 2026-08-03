'use client';

import React from 'react';
import { Users, Compass, Globe, Star, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: '15,000+',
      label: 'Happy Travelers',
      desc: 'Domestic & International vacations delivered with joy',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: Compass,
      value: '500+',
      label: 'Customized Tours',
      desc: '100% tailor-made itineraries designed per client request',
      color: 'from-emerald-500 to-teal-400',
    },
    {
      icon: Globe,
      value: '50+',
      label: 'Global Destinations',
      desc: 'Coverage across Europe, Asia, Middle East & Islands',
      color: 'from-sky-500 to-indigo-400',
    },
    {
      icon: Star,
      value: '4.9 ★',
      label: 'Customer Rating',
      desc: 'Consistently rated 5 stars for transparent service',
      color: 'from-amber-400 to-yellow-500',
    },
  ];

  return (
    <section className="relative z-30 -mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-white/70"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-md shrink-0`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-bold text-[#0077B6]">{stat.label}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500 font-medium leading-relaxed">
                {stat.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
