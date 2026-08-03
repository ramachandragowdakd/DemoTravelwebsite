'use client';

import React from 'react';
import {
  Compass,
  Globe,
  Heart,
  Users,
  Mountain,
  Briefcase,
  UserCheck,
  Hotel,
  Plane,
  FileCheck,
  Anchor,
  ShieldCheck,
  Car,
  Sliders,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SERVICES } from '../data/travelData';

const ICON_MAP: Record<string, any> = {
  Compass,
  Globe,
  Heart,
  Users,
  Mountain,
  Briefcase,
  UserCheck,
  Hotel,
  Plane,
  FileCheck,
  Anchor,
  ShieldCheck,
  Car,
  Sliders,
};

const SERVICE_PROVIDES_MAP: Record<string, string[]> = {
  '1': ['Customized Pan-India Itineraries', 'Dedicated Private Vehicles', 'Class A Hotel Stays & Meals'],
  '2': ['Top International Hotspots', 'Visa & Flight Assistance', 'Private Chauffeured Airport Transfers'],
  '3': ['Private Pool Villas & Overwater Stays', 'Candlelight Dinners & Flower Decorations', 'Surprise Honeymoon Perks'],
  '4': ['Kid-Friendly & Senior-Safe Stays', 'Custom Sightseeing Timings', '24/7 On-Trip Emergency Manager'],
  '5': ['Licensed Adventure Guides', 'Equipment & Safety Briefing', 'Trekking, Diving & Safari Bookings'],
  '6': ['MICE & Corporate Retreats', 'Conference Hall Bookings', 'Team Building Activities'],
  '7': ['Fixed Departure Group Rates', 'Dedicated Tour Managers', 'Sleeper & Luxury Coach Options'],
  '8': ['Direct 4★ & 5★ Hotel Contracts', 'Free Room Upgrade Eligibility', 'Complimentary Breakfast Included'],
  '9': ['Lowest Airfare Guarantee', 'Flexible Baggage Allowances', 'Instant E-Ticket Dispatch'],
  '11': ['Ocean & River Cruise Liners', 'All-Inclusive Onboard Meals', 'Exotic Shore Excursions'],
  '13': ['Punctual Airport Pick & Drop', 'Licensed English Drivers', 'Clean AC Sedan & SUV Fleet'],
  '14': ['Flexible Day-by-Day Planning', 'Tailored to Pace & Budget', 'Direct Expert Advice'],
};

export default function Services() {
  return (
    <section id="services" className="py-20 bg-[#0A192F] text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-teal-300 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" /> Comprehensive Offerings
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Our Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 to-amber-300">Travel Services</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Here is the complete detailed breakdown of what we provide across our specialized travel services.
          </p>
        </div>

        {/* Services Glass Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Compass;
            const providesList = SERVICE_PROVIDES_MAP[service.id] || ['Full Travel Customization', '24/7 On-Trip Assistance', 'Transparent Rates'];

            return (
              <div
                key={service.id}
                className="glass-dark rounded-3xl p-6 hover:bg-slate-800/90 transition-all duration-300 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 via-sky-500 to-amber-500 text-white flex items-center justify-center shadow-lg">
                      <IconComponent className="w-6 h-6 text-amber-100" />
                    </div>
                    {service.badge && (
                      <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-white mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-normal leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* What We Provide List */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <p className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
                      What We Provide:
                    </p>
                    <ul className="space-y-1.5">
                      {providesList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
