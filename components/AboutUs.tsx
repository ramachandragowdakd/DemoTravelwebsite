'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, Award, HeartHandshake, PhoneCall, Sparkles, MapPin } from 'lucide-react';

interface AboutUsProps {
  onPlanTrip: () => void;
}

export default function AboutUs({ onPlanTrip }: AboutUsProps) {
  const highlights = [
    'Personalized Packages',
    'Affordable Pricing',
    'Trusted Travel Experts',
    '24/7 Customer Support',
    'Visa Assistance',
    'Flight Booking',
    'Hotel Booking',
    'Transport Services',
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Visual Composite Grid */}
        <div className="lg:col-span-6 relative">
          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop"
                  alt="Bali Tropical Beach"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#0B132B] text-xs font-bold px-3 py-1 rounded-full shadow">
                  Tropical Villas
                </span>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=600&auto=format&fit=crop"
                  alt="Kashmir Mountains"
                  className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop"
                  alt="Dubai Luxury"
                  className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop"
                  alt="Kerala Backwaters"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-[#9BC53D] text-[#0B132B] text-xs font-bold px-3 py-1 rounded-full shadow">
                  Houseboat Escapes
                </span>
              </div>
            </div>
          </div>

          {/* Floating Experience Badge */}
          <div className="absolute -bottom-6 -right-2 sm:right-6 z-20 glass-panel rounded-3xl p-5 shadow-2xl border border-white/80 max-w-[220px] animate-float">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0077B6] to-[#00B4D8] text-white flex items-center justify-center font-black text-xl shadow">
                12+
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Years Experience</p>
                <p className="text-[10px] text-slate-500 font-medium">Crafting Custom Tours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Highlights */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-[#0077B6] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> About Let’s Trawell
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Your Customized Travel Partner for <span className="text-[#0077B6]">Unforgettable Journeys</span>
          </h2>

          <p className="text-base text-slate-600 font-normal leading-relaxed">
            At <strong className="text-slate-800">Let’s Trawell</strong>, we believe every traveler is unique. We specialize in handcrafted customized domestic and international tours, romantic honeymoon packages, family vacations, corporate retreats, adventure expeditions, educational tours, and high-end luxury holidays.
          </p>

          <p className="text-sm text-slate-500 leading-relaxed">
            Whether you dream of waking up in an overwater bungalow in the Maldives, gliding through Kashmir’s Dal Lake on a Shikara, or ascending Switzerland’s Mount Titlis, our expert team designs itineraries tailored to your pace, preferences, and budget.
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#0077B6] transition">
                <CheckCircle2 className="w-5 h-5 text-[#9BC53D] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800">{item}</span>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={onPlanTrip}
              className="bg-gradient-to-r from-[#0077B6] to-[#00B4D8] hover:from-[#005f93] hover:to-[#009bc2] text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl transition"
            >
              Plan Your Custom Trip
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Call Concierge</p>
                <a href="tel:9845905999" className="text-xs font-extrabold text-slate-800 hover:text-teal-600 transition">
                  98459 05999
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
