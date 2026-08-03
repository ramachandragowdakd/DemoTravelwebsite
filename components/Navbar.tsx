'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, Phone, DollarSign, UserCheck, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  currency: string;
  onChangeCurrency: (curr: string) => void;
}

export default function Navbar({
  onOpenBooking,
  currency,
  onChangeCurrency,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Packages', href: '#packages' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-teal-100/80 py-2 sm:py-2.5'
          : 'bg-gradient-to-b from-[#0A192F]/90 via-[#0A192F]/40 to-transparent py-2 sm:py-3 text-white'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center group shrink-0">
          <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-teal-100 shadow-xl group-hover:scale-105 group-hover:border-teal-400 transition-all duration-300 flex items-center justify-center">
            <img src="/logo.png" alt="Let's Trawell Logo" className="h-14 sm:h-18 lg:h-20 w-auto object-contain" />
          </div>
        </a>

        {/* Desktop Nav Links in Luminous Glass Container */}
        <nav
          className={`hidden lg:flex items-center gap-1.5 p-1.5 rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? 'bg-slate-100/90 border-slate-200/90 shadow-sm'
              : 'bg-white/10 backdrop-blur-xl border-white/25 shadow-xl shadow-teal-950/20'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold tracking-wide transition-all duration-200 ${
                isScrolled
                  ? 'text-slate-700 hover:text-teal-600 hover:bg-white hover:shadow-sm'
                  : 'text-slate-100 hover:text-amber-300 hover:bg-white/20 hover:shadow-sm'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Currency Selector */}
          <select
            value={currency}
            onChange={(e) => onChangeCurrency(e.target.value)}
            className={`text-xs font-bold px-3 py-2 rounded-xl border cursor-pointer outline-none transition-all ${
              isScrolled
                ? 'bg-sky-50/80 border-sky-200 text-slate-700 hover:bg-sky-100'
                : 'bg-white/15 border-white/25 text-white hover:bg-white/25'
            }`}
          >
            <option value="INR" className="text-slate-900">INR (₹)</option>
          </select>

          {/* Book Now Button */}
          <button
            onClick={onOpenBooking}
            className="bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 hover:from-teal-600 hover:to-amber-600 text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-teal-500/20 hover:shadow-amber-500/25 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
            Book Now
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={onOpenBooking}
            className="bg-gradient-to-r from-teal-500 to-sky-500 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-md"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl ${isScrolled ? 'text-slate-800 bg-slate-100' : 'text-white bg-white/10 backdrop-blur-md'}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A192F] text-white px-6 pt-4 pb-8 space-y-4 border-t border-teal-900/50 shadow-2xl animate-fadeIn">
          <div className="flex justify-between items-center pb-2 border-b border-teal-900/40">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Explore Journeys</span>
            <select
              value={currency}
              onChange={(e) => onChangeCurrency(e.target.value)}
              className="bg-slate-800 text-xs px-2.5 py-1 rounded-lg text-white border border-slate-700"
            >
              <option value="INR">INR (₹)</option>
            </select>
          </div>

          <nav className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-teal-600 text-sm font-medium flex items-center justify-between text-slate-200 transition-all"
              >
                {link.name}
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              Start Custom Booking
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
