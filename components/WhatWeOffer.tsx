'use client';

import React from 'react';
import { Sparkles, Check, Gift, GraduationCap, Compass, ShieldCheck, MapPin } from 'lucide-react';

interface WhatWeOfferProps {
  onPlanTrip?: () => void;
}

export default function WhatWeOffer({ onPlanTrip }: WhatWeOfferProps) {
  const mainOfferingsLeft = [
    'SCHOOL TRIPS',
    'INDUSTRIAL VISITS',
    'FAMILY TOURS',
    'CORPORATE OUTINGS',
    'RESORT BOOKINGS',
    'CAR & COACH RENTALS',
  ];

  const mainOfferingsRight = [
    'STUDY TOURS',
    'ADVENTURE TOURS',
    'TEMPLE TOURS',
    'EDUCATIONAL EVENTS',
    'HOSTEL RESERVATIONS',
    'SIGHTSEEING TOURS',
  ];

  const includedLeft = [
    'Reserved Sleeper Coaches',
    "'A'-Class Hotels (sharing)",
    'Entrance Fees',
    '1 Staff Free per 10 Students',
  ];

  const includedRight = [
    'Veg & Non-Veg Meals',
    'Expert Tour Managers',
    'Guide Charges & State Tax',
    '24/7 On-Tour Support',
  ];

  const specialBenefits = [
    'Complimentary: 1 staff member free for every 10 paid students',
    'Campfire & Entertainment where time permits during the tour',
    'Special Airfares available for selected domestic sectors',
    'Group minimum of 45 students for all tours',
    'Confirmation required 90 days before departure date',
  ];

  return (
    <section id="what-we-offer" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white text-slate-900">
      {/* Section Header */}
      <div className="mb-14 space-y-3">
        <p className="text-[#C59B27] font-bold text-xs sm:text-sm uppercase tracking-[0.25em] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C59B27]" /> WHAT WE OFFER
        </p>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
          A complete travel solution,{' '}
          <span className="italic font-serif text-[#C59B27] font-normal">tailored</span> to your needs
        </h2>
        <div className="w-20 h-1 bg-[#C59B27] rounded-full mt-2" />
      </div>

      {/* Main Grid: Left Services & Included vs Right Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: 7 Cols */}
        <div className="lg:col-span-7 space-y-10">
          {/* Main Services Offered (2-Column List) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
            {/* Left Column Services */}
            <div className="divide-y divide-slate-100">
              {mainOfferingsLeft.map((item) => (
                <div key={item} className="py-3 flex items-center gap-3 group cursor-pointer hover:pl-1 transition-all">
                  <span className="w-2 h-2 rounded-full bg-[#C59B27] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-slate-800 group-hover:text-[#0077B6] transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Column Services */}
            <div className="divide-y divide-slate-100">
              {mainOfferingsRight.map((item) => (
                <div key={item} className="py-3 flex items-center gap-3 group cursor-pointer hover:pl-1 transition-all">
                  <span className="w-2 h-2 rounded-full bg-[#C59B27] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-slate-800 group-hover:text-[#0077B6] transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Included In Every Tour Section */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <h3 className="text-[#C59B27] font-extrabold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> INCLUDED IN EVERY TOUR
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 divide-y divide-slate-100 sm:divide-y-0">
              <div className="space-y-2.5">
                {includedLeft.map((inc) => (
                  <div key={inc} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 pt-2 sm:pt-0">
                {includedRight.map((inc) => (
                  <div key={inc} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 5 Cols Stacked Quote Card & Special Benefits Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quote Card (Dark Navy Box) */}
          <div className="bg-[#0B132B] text-white p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-800">
            {/* Background Decorative Quote Mark */}
            <div className="absolute top-2 right-4 text-8xl font-serif text-white/5 pointer-events-none select-none">
              “
            </div>

            <p className="font-serif italic text-xl sm:text-2xl text-slate-100 leading-relaxed relative z-10">
              "We make your holidays an everlasting experience of a lifetime."
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs font-bold uppercase tracking-widest text-[#C59B27] flex items-center gap-2">
              <span>— LETS TRAWELL TOURS · BENGALURU</span>
            </div>
          </div>

          {/* Special Benefits Card (Warm Sand Box) */}
          <div className="bg-[#F9F6F0] p-8 sm:p-10 rounded-3xl border border-amber-200/80 shadow-lg space-y-4">
            <h4 className="text-[#C59B27] font-black text-xs sm:text-sm tracking-[0.2em] uppercase flex items-center gap-2">
              <Gift className="w-4 h-4" /> SPECIAL BENEFITS
            </h4>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-normal">
              {specialBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#C59B27] font-bold">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
