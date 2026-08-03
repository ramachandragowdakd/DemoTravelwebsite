'use client';

import React from 'react';
import { X, Clock, Calendar, CheckCircle2, Sparkles, MapPin, Star, ShieldCheck } from 'lucide-react';
import { TourPackage } from '../data/travelData';

interface PackageDetailModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBookNow: (pkg: TourPackage) => void;
  currency: string;
}

export default function PackageDetailModal({ pkg, onClose, onBookNow, currency }: PackageDetailModalProps) {
  if (!pkg) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-8">
        {/* Header Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2 rounded-full backdrop-blur-sm transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Package Badges & Title */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#9BC53D] text-[#0B132B] text-xs font-black px-3 py-1 rounded-full uppercase">
                {pkg.category}
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                {pkg.duration}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black">{pkg.title}</h2>
            <p className="text-xs text-sky-200 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {pkg.destination}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Key Inclusions Bar */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#0077B6]" /> Key Package Inclusions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pkg.inclusions.map((inc, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#9BC53D] shrink-0" />
                  <span className="text-xs font-bold text-slate-800">{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day by Day Itinerary */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0077B6]" /> Detailed Day-by-Day Itinerary
            </h3>

            <div className="space-y-4">
              {pkg.itinerary.map((dayItem) => (
                <div key={dayItem.day} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div className="w-10 h-10 rounded-2xl bg-[#0077B6] text-white flex items-center justify-center font-black text-sm shrink-0">
                    D{dayItem.day}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{dayItem.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{dayItem.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Booking Footer Bar */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 line-through">{formatPrice(pkg.originalPrice)}</span>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-extrabold px-2 py-0.5 rounded">
                  Save {Math.round(((pkg.originalPrice - pkg.discountedPrice) / pkg.originalPrice) * 100)}%
                </span>
              </div>
              <div className="text-3xl font-black text-[#0077B6]">
                {formatPrice(pkg.discountedPrice)}
                <span className="text-xs font-normal text-slate-500 ml-1">/ adult</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-3 rounded-2xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookNow(pkg);
                }}
                className="flex-1 sm:flex-none bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition"
              >
                Book This Package Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
