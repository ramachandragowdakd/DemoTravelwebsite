'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Clock, Sparkles, Star, Navigation, Share2, Bookmark } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Contact Form',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg('Network error. Please try calling us directly at 98459 05999.');
    } finally {
      setSubmitting(false);
    }
  };

  const googleMapsDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Let%27s+Trawell+Tours,+2nd+floor,+13/13,+59th+Cross+Rd,+near+Bashyam+Circle,+Rajajinagar+3rd+Block,+Bengaluru,+Karnataka+560010";

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/80 text-teal-700 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Start Your Journey
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Get in Touch With <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-sky-600">Let’s Trawell Tours</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-normal">
          Fill out the inquiry form or visit our official office in Rajajinagar, Bengaluru for customized educational tours and luxury travel planning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-sky-100">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Inquiry Received Successfully!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our travel specialist from Let’s Trawell Tours is preparing your custom itinerary for <span className="text-teal-700 font-bold">{formData.destination || 'your trip'}</span> and will call you at <strong className="text-slate-800">{formData.phone}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', destination: '', travelDate: '', message: '' });
                }}
                className="mt-4 bg-gradient-to-r from-teal-500 to-sky-500 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xl font-black text-slate-900">Request Custom Itinerary Quote</h3>
                <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">Instant Response</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 098459 05999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Destination *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Goa / Mysore / Kerala / Maldives"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tentative Travel Date</label>
                <input
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Special Requirements / Notes</label>
                <textarea
                  rows={4}
                  placeholder="Educational tour requirements, hotel preferences (3★/4★/5★), group size, or custom itinerary requests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {errorMsg && (
                <div className="bg-red-50 text-red-700 text-xs font-bold p-3 rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 hover:from-teal-600 hover:to-amber-600 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-teal-500/20 hover:shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-amber-200" />
                {submitting ? 'Saving Your Inquiry...' : 'Submit Custom Itinerary Request'}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Official Google Business Listing */}
        <div className="lg:col-span-5 space-y-6">
          {/* Official Google Business Listing Card */}
          <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl border border-teal-900/50">
            {/* Header Title with Star Rating */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-white">Let's Trawell Tours</h3>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-xs font-extrabold text-amber-400">
                    4.8 <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </span>
                  <span className="text-xs text-slate-400 font-medium">(71 Reviews)</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-teal-300 font-semibold">Tour Operator</span>
                </div>
              </div>
              <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Verified</span>
            </div>

            {/* Quick Action Pill Buttons (Directions / Save / Share / Call) */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-sky-600/30 hover:bg-sky-600/50 border border-sky-500/40 text-white transition text-center group"
              >
                <Navigation className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform mb-1" />
                <span className="text-[10px] font-bold">Directions</span>
              </a>

              <a
                href="tel:9845905999"
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-white transition text-center group"
              >
                <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform mb-1" />
                <span className="text-[10px] font-bold">Call</span>
              </a>

              <a
                href="https://wa.me/919845905999?text=Hi%20Let's%20Trawell%20Tours,%20I%20want%20to%20enquire%20about%20a%20tour."
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-teal-600/30 hover:bg-teal-600/50 border border-teal-500/40 text-white transition text-center group"
              >
                <MessageSquare className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform mb-1" />
                <span className="text-[10px] font-bold">WhatsApp</span>
              </a>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white transition text-center group"
              >
                <Share2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform mb-1" />
                <span className="text-[10px] font-bold">Share</span>
              </a>
            </div>

            {/* Address & Contact Info List */}
            <div className="space-y-3.5 text-xs sm:text-sm pt-2">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-teal-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Office Address</p>
                  <p className="font-semibold text-slate-100 leading-snug mt-0.5">
                    2nd floor, bus stop, 13/13, 59th Cross Rd, near Bashyam Circle, Rajajinagar 3rd Block, 5th Block, Rajajinagar, Bengaluru, Karnataka 560010
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Phone / Helpline</p>
                  <a href="tel:9845905999" className="font-extrabold text-white text-base hover:text-teal-300 transition">
                    98459 05999
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email Inquiry</p>
                  <a href="mailto:letstrawell@gmail.com" className="font-bold text-white hover:text-sky-300 transition">
                    letstrawell@gmail.com
                  </a>
                </div>
              </div>

              {/* Services Offered */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Services</p>
                  <p className="font-bold text-teal-300">Educational Tours • Customized Domestic & International Travel</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Working Hours</p>
                  <p className="font-medium text-slate-200">
                    <span className="text-emerald-400 font-bold">Open</span> • Mon - Sat: 9:00 AM – 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <a
              href="https://wa.me/919845905999?text=Hi%20Let's%20Trawell%20Tours,%20I%20am%20interested%20in%20booking%20a%20tour."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition duration-200"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              Chat Directly on WhatsApp (98459 05999)
            </a>
          </div>

          {/* Interactive Google Maps Frame */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg h-72 border border-sky-100 relative group">
            <iframe
              title="Let's Trawell Tours Office Location Map"
              src="https://maps.google.com/maps?q=Let's%20Trawell%20Tours%2013/13,%2059th%20Cross%20Rd,%20near%20Bashyam%20Circle,%20Rajajinagar%203rd%20Block,%20Bengaluru,%20Karnataka%20560010&t=&z=17&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-slate-950/80 hover:bg-slate-950 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 transition"
            >
              <Navigation className="w-3.5 h-3.5 text-sky-400" /> Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
