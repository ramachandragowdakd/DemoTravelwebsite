'use client';

import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, MapPin, Layers, RotateCw } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/travelData';
import CircularGallery from './CircularGallery';

export default function GalleryLightbox() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'circular' | 'grid'>('circular');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'India 🇮🇳', 'International ✈️', 'Beaches', 'Mountains', 'Culture', 'Luxury', 'Adventure'];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'India 🇮🇳') return photo.region === 'India';
    if (activeCategory === 'International ✈️') return photo.region === 'International';
    return photo.category === activeCategory;
  });

  const galleryItems = filteredPhotos.map((photo) => ({
    image: photo.image,
    text: `${photo.title} (${photo.location})`,
  }));

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/80 text-teal-700 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> 3D Interactive Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Captured <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-sky-600">Travel Memories</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal max-w-xl">
            Drag, scroll, or swipe to explore our 3D circular photo gallery of happy travelers around the globe.
          </p>
        </div>

        {/* Header Right Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-white/90 p-1.5 rounded-2xl border border-sky-100 shadow-sm">
            <button
              onClick={() => setViewMode('circular')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'circular'
                  ? 'bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" /> 3D Circular
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Photo Grid
            </button>
          </div>
        </div>
      </div>

      {/* 3D Circular Gallery View Mode */}
      {viewMode === 'circular' ? (
        <div className="relative w-full h-[550px] sm:h-[650px] bg-[#0A192F] rounded-3xl overflow-hidden shadow-2xl border border-teal-900/40 group">
          <div className="absolute top-4 left-6 z-10 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-slate-200">
            <span>💡 Drag horizontally or scroll mouse wheel to spin</span>
          </div>

          <CircularGallery
            key={activeCategory}
            items={galleryItems}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.06}
            scrollEase={0.03}
            scrollSpeed={2.5}
            fontUrl="https://fonts.googleapis.com/css2?family=Figtree:wght@700&display=swap"
            font="bold 20px Figtree"
          />
        </div>
      ) : (
        /* Masonry Grid View Mode */
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="relative group rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 break-inside-avoid border border-sky-100 bg-white"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <span className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <p className="text-xs text-amber-300 font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {photo.location}
                  </p>
                  <h4 className="text-sm font-bold text-white mt-0.5">{photo.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image & Caption */}
          <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center">
            <img
              src={filteredPhotos[lightboxIndex].image}
              alt={filteredPhotos[lightboxIndex].title}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white space-y-1">
              <h3 className="text-xl font-bold">{filteredPhotos[lightboxIndex].title}</h3>
              <p className="text-xs text-amber-300 flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {filteredPhotos[lightboxIndex].location} • Category: {filteredPhotos[lightboxIndex].category}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
