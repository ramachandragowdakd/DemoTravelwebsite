'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Star, Award, Compass } from 'lucide-react';

interface HeroProps {
  onSearchSubmit: (params: any) => void;
  onExplorePackages: () => void;
  onContactUs: () => void;
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop', // Beach
  'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1920&auto=format&fit=crop', // Maldives Overwater
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop', // Dubai
  'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1920&auto=format&fit=crop', // Swiss Alps
  'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1920&auto=format&fit=crop', // Kashmir
];

export default function Hero({ onSearchSubmit, onExplorePackages, onContactUs }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0A192F]">
      {/* Background Slideshow with Dark Gradient Overlay */}
      {HERO_IMAGES.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-50 scale-105' : 'opacity-0 scale-100'
          } transition-transform duration-[8000ms] pointer-events-none`}
        >
          <img
            src={img}
            alt="Travel background photo"
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Deep Ocean Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-[#0A192F]/80 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 sm:pt-14 pb-8 text-center flex flex-col items-center">
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/25 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white mb-6 shadow-xl animate-float">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>India’s Premium Customized Travel Agency</span>
          <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">Verified</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight max-w-5xl leading-[1.1]">
          Travel Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 to-amber-300">Imaginations</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-200 font-medium max-w-2xl leading-relaxed">
          Crafting unforgettable bespoke travel experiences, luxury honeymoons & group tours across the globe.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExplorePackages}
            className="bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 hover:from-teal-600 hover:to-amber-600 text-white px-8 py-4 rounded-2xl font-bold text-sm sm:text-base shadow-xl shadow-teal-500/25 hover:shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Compass className="w-5 h-5 text-amber-200" />
            Explore Packages
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onContactUs}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-2xl font-bold text-sm sm:text-base transition-all hover:scale-105 shadow-lg"
          >
            Talk to Travel Specialist
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-200 font-medium">
          <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/15">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9/5 Rated by 15,000+ Guests
          </span>
          <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/15">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Tailored & Safe
          </span>
          <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/15">
            <Award className="w-4 h-4 text-sky-300" /> Best Price Guarantee
          </span>
        </div>
      </div>
    </section>
  );
}
