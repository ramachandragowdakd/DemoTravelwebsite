'use client';

import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Sliders, ChevronDown } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';

interface SearchWidgetProps {
  onSearchSubmit: (params: { destination: string; checkIn: string; checkOut: string; travelers: number }) => void;
}

export default function SearchWidget({ onSearchSubmit }: SearchWidgetProps) {
  const [activeTab, setActiveTab] = useState<'packages' | 'flights' | 'hotels' | 'custom'>('packages');
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [travelers, setTravelers] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({
      destination: destination || 'Goa',
      checkIn: checkIn || new Date().toISOString().split('T')[0],
      checkOut: checkOut || new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      travelers,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto glass-panel rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/80 text-slate-800">
      {/* Search Category Tabs */}
      <div className="flex items-center space-x-2 pb-4 border-b border-sky-100/80 overflow-x-auto no-scrollbar">
        {[
          { id: 'packages', label: '🌴 Tour Packages' },
          { id: 'custom', label: '✨ Custom Itinerary' },
          { id: 'hotels', label: '🏨 Luxury Resorts' },
          { id: 'flights', label: '✈️ Flights & Visas' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 text-white shadow-md shadow-teal-500/20 scale-105'
                : 'bg-white/60 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Inputs Form */}
      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
        {/* Destination Field */}
        <div className="lg:col-span-4 bg-white/95 rounded-2xl p-3 border border-sky-100 shadow-sm focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition">
          <label className="text-[11px] font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-teal-600" /> Destination
          </label>
          <div className="relative mt-1">
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer appearance-none pr-6"
            >
              <option value="">Choose Destination (e.g. Goa, Dubai)</option>
              <optgroup label="Domestic Hotspots">
                {DESTINATIONS.filter((d) => d.category === 'domestic').map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.location})
                  </option>
                ))}
              </optgroup>
              <optgroup label="International Escapes">
                {DESTINATIONS.filter((d) => d.category === 'international').map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.location})
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Check-In Date */}
        <div className="lg:col-span-3 bg-white/95 rounded-2xl p-3 border border-sky-100 shadow-sm focus-within:ring-2 focus-within:ring-teal-500 transition">
          <label className="text-[11px] font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-teal-600" /> Travel Date
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none mt-1 cursor-pointer"
          />
        </div>

        {/* Check-Out Date */}
        <div className="lg:col-span-2 bg-white/95 rounded-2xl p-3 border border-sky-100 shadow-sm focus-within:ring-2 focus-within:ring-teal-500 transition">
          <label className="text-[11px] font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-teal-600" /> Return Date
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none mt-1 cursor-pointer"
          />
        </div>

        {/* Travelers Count */}
        <div className="lg:col-span-3 sm:col-span-2 flex items-center gap-2">
          <div className="flex-1 bg-white/95 rounded-2xl p-3 border border-sky-100 shadow-sm focus-within:ring-2 focus-within:ring-teal-500 transition">
            <label className="text-[11px] font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-teal-600" /> Guests
            </label>
            <select
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer mt-1"
            >
              <option value={1}>1 Solo Traveler</option>
              <option value={2}>2 Couple / Duo</option>
              <option value={4}>4 Family / Friends</option>
              <option value={6}>6+ Group Tour</option>
            </select>
          </div>

          {/* Submit Search Button */}
          <button
            type="submit"
            className="h-[62px] bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 hover:from-teal-600 hover:to-amber-600 text-white font-bold px-6 rounded-2xl shadow-lg shadow-teal-500/20 hover:shadow-amber-500/25 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 group shrink-0"
            title="Search Packages"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-100" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </form>
    </div>
  );
}
