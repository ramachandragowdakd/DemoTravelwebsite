'use me';
'use client';

import React, { useState } from 'react';
import { Tag, Sparkles, X, ArrowRight } from 'lucide-react';

interface SpecialOffersBannerProps {
  onExploreOffer: (code: string) => void;
}

export default function SpecialOffersBanner({ onExploreOffer }: SpecialOffersBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#0B132B] via-[#0077B6] to-[#00B4D8] text-white py-2.5 px-4 relative z-50 text-xs sm:text-sm font-medium shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-[#9BC53D] text-[#0B132B] px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 animate-pulse">
            <Sparkles className="w-3 h-3" /> Summer Sale
          </span>
          <p className="truncate">
            <span className="hidden sm:inline font-semibold">Special Customized Offer:</span> Save up to <span className="font-bold text-[#9BC53D]">35% Off</span> on International Holidays! Code: <span className="font-mono bg-white/20 px-2 py-0.5 rounded font-bold">TRAWELL35</span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onExploreOffer('TRAWELL35')}
            className="bg-white/20 hover:bg-white hover:text-[#0077B6] text-white px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1"
          >
            Claim Offer <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
