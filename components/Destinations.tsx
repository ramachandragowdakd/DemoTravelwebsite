'use client';

import React, { useState } from 'react';
import { Star, Clock, MapPin, Sparkles, ArrowRight, Check } from 'lucide-react';
import { DESTINATIONS, Destination } from '../data/travelData';

interface DestinationsProps {
  onBookDestination: (destination: Destination) => void;
  currency: string;
}

export default function Destinations({ onBookDestination, currency }: DestinationsProps) {
  const [filter, setFilter] = useState<'all' | 'domestic' | 'international'>('all');

  const filteredDestinations = DESTINATIONS.filter((d) => {
    if (filter === 'domestic') return d.category === 'domestic';
    if (filter === 'international') return d.category === 'international';
    return true;
  });

  const formatPrice = (priceInINR: number) => {
    switch (currency) {
      case 'USD':
        return `$${Math.round(priceInINR / 83).toLocaleString()}`;
      case 'EUR':
        return `€${Math.round(priceInINR / 90).toLocaleString()}`;
      case 'AED':
        return `AED ${Math.round(priceInINR / 22.5).toLocaleString()}`;
      default:
        return `₹${priceInINR.toLocaleString()}`;
    }
  };

  return (
    <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/80 text-teal-700 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Handpicked Hotspots
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-sky-600">Travel Destinations</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal max-w-xl">
            Explore our most sought-after domestic and international holiday destinations crafted for ultimate comfort and memory-making.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 bg-white/90 p-1.5 rounded-2xl border border-sky-100 shadow-sm shrink-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 text-white shadow-md shadow-teal-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            All Spots ({DESTINATIONS.length})
          </button>
          <button
            onClick={() => setFilter('domestic')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'domestic'
                ? 'bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 text-white shadow-md shadow-teal-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Domestic (7)
          </button>
          <button
            onClick={() => setFilter('international')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'international'
                ? 'bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 text-white shadow-md shadow-teal-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            International (7)
          </button>
        </div>
      </div>

      {/* Destinations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            className="glass-card rounded-3xl overflow-hidden flex flex-col group border border-sky-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/10"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

              {/* Tag & Category Badge */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                  {dest.category === 'domestic' ? '🇮🇳 Domestic' : '✈️ International'}
                </span>
                {dest.tag && (
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    {dest.tag}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-black text-slate-900 shadow-md">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{dest.rating}</span>
                <span className="text-[10px] text-slate-500 font-medium">({dest.reviewsCount})</span>
              </div>

              {/* Title & Location Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1 text-xs text-teal-300 font-bold mb-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{dest.location}</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-sm">
                  {dest.name}
                </h3>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {dest.description}
              </p>

              {/* Inclusions / Highlights */}
              <div className="space-y-1.5 pt-1">
                {dest.highlights.slice(0, 3).map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>

              {/* Footer Price & Booking CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{dest.duration}</span>
                  </div>
                  <div className="text-xl font-black text-teal-700 mt-0.5">
                    {formatPrice(dest.price)}
                    <span className="text-[10px] font-medium text-slate-400 ml-1">/ person</span>
                  </div>
                </div>

                <button
                  onClick={() => onBookDestination(dest)}
                  className="bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 hover:from-teal-600 hover:to-amber-600 text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-md shadow-teal-500/20 hover:shadow-lg transition-all flex items-center gap-1.5 group-hover:scale-105"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-200" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
