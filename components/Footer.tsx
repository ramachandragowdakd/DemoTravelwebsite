'use client';

import React, { useState } from 'react';
import { Compass, Send, CheckCircle2, ShieldCheck, Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="bg-[#0B132B] text-slate-300 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-200 inline-block shadow-xl">
              <img src="/logo.png" alt="Let's Trawell Logo" className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Educational Tours & Tailor-Made Travel Agency based in Bengaluru, Karnataka.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>2nd floor, bus stop, 13/13, 59th Cross Rd, near Bashyam Circle, Rajajinagar 3rd Block, 5th Block, Bengaluru, 560010</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:9845905999" className="font-bold text-white hover:text-teal-300 transition">98459 05999</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:letstrawell@gmail.com" className="font-bold text-white hover:text-sky-300 transition">letstrawell@gmail.com</a>
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> Rated 4.8 ★ (71 Reviews)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-sky-400 font-bold">
                <Heart className="w-4 h-4 fill-sky-400" /> Educational Tours
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {['#hero', '#about', '#services', '#destinations', '#packages', '#gallery', '#reviews', '#faq', '#contact'].map((href) => (
                <li key={href}>
                  <a href={href} className="hover:text-[#00B4D8] transition capitalize">
                    {href.replace('#', '')} Page
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Top Destinations</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#destinations" className="hover:text-white transition">Maldives Overwater Villas</a></li>
              <li><a href="#destinations" className="hover:text-white transition">Dubai Desert & Skyline</a></li>
              <li><a href="#destinations" className="hover:text-white transition">Kashmir Valley & Houseboat</a></li>
              <li><a href="#destinations" className="hover:text-white transition">Goa Beaches & Watersports</a></li>
              <li><a href="#destinations" className="hover:text-white transition">Swiss Alps Wonderland</a></li>
              <li><a href="#destinations" className="hover:text-white transition">Bali Tropical Paradise</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights & Payment Icons */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Let’s Trawell Travel Partner Pvt. Ltd. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold text-slate-400">Supported Payments:</span>
            <div className="flex gap-2 font-mono text-[10px] bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
              <span>VISA</span> • <span>MasterCard</span> • <span>UPI</span> • <span>GPay</span> • <span>NetBanking</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
