'use client';

import React, { useState } from 'react';
import { Sparkles, MapPin, Clock, ArrowRight, CheckCircle2, Search, Compass, Check } from 'lucide-react';
import { BROCHURE_PACKAGES, BROCHURE_CATEGORIES, BrochurePackage } from '../data/brochurePackages';

interface TourPackagesProps {
  onBookPackage: (pkgTitle: string) => void;
}

export default function TourPackages({ onBookPackage }: TourPackagesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPackages = BROCHURE_PACKAGES.filter((pkg) => {
    const matchesCategory = activeCategory === 'All' || pkg.category === activeCategory;
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.placesCovered.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="packages" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50/60 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/80 text-teal-700 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Official Travel Packages
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-sky-600">Tour Packages</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Tailor-made itineraries for school trips, college excursions, industrial visits, trekking adventures, family vacations, domestic circuits, and luxury international holidays.
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-lg mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-teal-500" />
            <input
              type="text"
              placeholder="Search by package name or place (e.g. Coorg, Ooty, Hampi, Dubai)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-sky-100 rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-slate-800 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Category Scrollable Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start lg:justify-center">
        {BROCHURE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shrink-0 shadow-sm ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 text-white shadow-md shadow-teal-500/20 scale-105'
                : 'bg-white text-slate-700 hover:bg-teal-50/50 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Packages Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden border border-sky-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/10 group"
            >
              <div>
                {/* Image Header */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-gradient-to-r from-teal-600 to-sky-600 text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md">
                      {pkg.category}
                    </span>
                  </div>

                  {/* Duration Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{pkg.duration}</span>
                    </div>
                    <h3 className="text-xl font-black tracking-tight leading-snug text-white">{pkg.title}</h3>
                  </div>
                </div>

                {/* Places Covered & Description */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{pkg.description}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-[10px] font-extrabold uppercase text-teal-700 tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" /> Places Covered & Highlights
                    </p>
                    <ul className="space-y-1.5">
                      {pkg.placesCovered.map((place, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{place}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto space-y-3">
          <Compass className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No matching tour packages found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search query or switching to another category tab.</p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-[#0077B6] underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}
