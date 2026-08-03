'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, Users, MapPin, Send, Sparkles, Phone, Mail, User, ShieldCheck, UserCheck } from 'lucide-react';
import { TourPackage } from '../data/travelData';

interface TravelerInfo {
  fullName: string;
  age: string;
  gender: string;
  phone?: string;
  email?: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
  initialPackage?: TourPackage | null;
  currency?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialDestination = '',
  initialPackage = null,
}: BookingModalProps) {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [adultsStr, setAdultsStr] = useState<string>('1');
  const [childrenStr, setChildrenStr] = useState<string>('0');

  // Array of traveler details matching total count
  const [travelers, setTravelers] = useState<TravelerInfo[]>([
    { fullName: '', age: '', gender: 'Male', phone: '', email: '' },
  ]);

  const [specialNotes, setSpecialNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const adultsNum = parseInt(adultsStr, 10) || 0;
  const childrenNum = parseInt(childrenStr, 10) || 0;
  const totalCount = Math.max(1, adultsNum + childrenNum);

  // Sync travelers array length with totalCount
  useEffect(() => {
    setTravelers((prev) => {
      const next = [...prev];
      if (next.length < totalCount) {
        for (let i = next.length; i < totalCount; i++) {
          next.push({ fullName: '', age: '', gender: 'Male' });
        }
      } else if (next.length > totalCount) {
        next.splice(totalCount);
      }
      return next;
    });
  }, [totalCount]);

  useEffect(() => {
    if (initialPackage) {
      setDestination(initialPackage.destination || initialPackage.title);
    } else if (initialDestination) {
      setDestination(initialDestination);
    } else {
      setDestination('');
    }
  }, [initialPackage, initialDestination, isOpen]);

  if (!isOpen) return null;

  const updateTraveler = (index: number, field: keyof TravelerInfo, value: string) => {
    setTravelers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const leadTraveler = travelers[0] || { fullName: '', phone: '', email: '' };

    // Format all travelers info into a clean structured list
    const travelerDetailsSummary = travelers
      .map(
        (t, i) =>
          `Traveler ${i + 1} (${i === 0 ? 'Lead' : 'Guest'}): ${t.fullName || 'N/A'} | Age: ${t.age || 'N/A'} | Gender: ${t.gender || 'N/A'}${
            t.phone ? ` | Phone: ${t.phone}` : ''
          }${t.email ? ` | Email: ${t.email}` : ''}`
      )
      .join('\n');

    const fullMessagePayload = `--- TRAVELER BREAKDOWN (${adultsNum} Adults, ${childrenNum} Children) ---\n${travelerDetailsSummary}\n\n--- SPECIAL NOTES / REQUIREMENTS ---\n${
      specialNotes || 'None'
    }`;

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadTraveler.fullName || 'Lead Traveler',
          phone: leadTraveler.phone || 'N/A',
          email: leadTraveler.email || 'N/A',
          destination: destination,
          travelDate: startDate || 'Flexible',
          message: fullMessagePayload,
          source: 'Booking Modal',
          packageName: initialPackage?.title || '',
          guests: totalCount,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || 'Failed to submit booking request.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setErrorMsg('Network error. Please call us directly at 98459 05999 or email letstrawell@gmail.com.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setDestination('');
    setStartDate('');
    setAdultsStr('1');
    setChildrenStr('0');
    setTravelers([{ fullName: '', age: '', gender: 'Male', phone: '', email: '' }]);
    setSpecialNotes('');
    onClose();
  };

  const leadInfo = travelers[0] || { fullName: '', phone: '', email: '' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-sky-100 relative my-8 text-slate-800">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#0A192F] via-[#0D9488] to-[#0A192F] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <div>
              <h2 className="text-xl font-black tracking-tight">Customized Booking Portal</h2>
              <p className="text-xs text-teal-100">Let’s Trawell Tours • Direct Email Quote Request</p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-10 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase">
                  Booking Request Recorded
                </span>
                <h3 className="text-2xl font-black text-slate-900">Thank You, {leadInfo.fullName}!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your custom tour booking request for <strong className="text-teal-700 font-bold">{destination}</strong> ({totalCount} Traveler{totalCount > 1 ? 's' : ''}) has been submitted to Let’s Trawell Tours.
                </p>
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 max-w-md mx-auto text-xs text-slate-700 text-left space-y-1.5 mt-3">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Confirmation & quote will be sent to: <strong>{leadInfo.email}</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Contact number: <strong>{leadInfo.phone}</strong></span>
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="mt-4 bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 text-white px-8 py-3 rounded-2xl font-bold text-xs shadow-lg hover:shadow-xl transition"
              >
                Done / Back to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900">Enter Tour & All Traveler Details</h3>
                <p className="text-xs text-slate-500">Provide details for all travelers below. Our specialists will email your custom itinerary quote to letstrawell@gmail.com and your contact email.</p>
              </div>

              {/* 1. Destination & Start Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Destination Name *</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-teal-600 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mysore, Kerala, Shimla, Maldives..."
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Start Date *</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-sky-600 absolute left-3 top-3.5" />
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Direct Enterable Number of Travelers */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <label className="text-xs font-bold text-slate-800 block flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-500" /> Enter Number of Travelers
                  </span>
                  <span className="text-[11px] font-black text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full">
                    Total: {totalCount} Traveler{totalCount > 1 ? 's' : ''}
                  </span>
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Adults (12+ yrs)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      placeholder="e.g. 2"
                      value={adultsStr}
                      onChange={(e) => setAdultsStr(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Children (2-11 yrs)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="e.g. 0"
                      value={childrenStr}
                      onChange={(e) => setChildrenStr(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* 3. DYNAMIC TRAVELERS INFORMATION DEPENDING ON NUMBER OF TRAVELERS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <label className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                    <UserCheck className="w-4 h-4 text-teal-600" /> All Travelers Information ({totalCount})
                  </label>
                  <span className="text-[10px] text-slate-500">Fill details for each passenger</span>
                </div>

                <div className="space-y-4">
                  {travelers.map((t, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all ${
                        idx === 0
                          ? 'bg-teal-50/50 border-teal-200/90 shadow-sm'
                          : 'bg-slate-50/70 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-bold ${
                              idx === 0 ? 'bg-teal-600' : 'bg-slate-600'
                            }`}
                          >
                            {idx + 1}
                          </span>
                          Traveler {idx + 1} {idx === 0 ? '(Primary Contact)' : ''}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <input
                            type="text"
                            required
                            placeholder={`Traveler ${idx + 1} Full Name (as per Passport / ID) *`}
                            value={t.fullName}
                            onChange={(e) => updateTraveler(idx, 'fullName', e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs sm:text-sm font-semibold"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="tel"
                            required={idx === 0}
                            placeholder={`Phone / WhatsApp Number ${idx === 0 ? '*' : '(Optional)'}`}
                            value={t.phone || ''}
                            onChange={(e) => updateTraveler(idx, 'phone', e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs sm:text-sm font-semibold"
                          />
                          <input
                            type="email"
                            required={idx === 0}
                            placeholder={`Email Address ${idx === 0 ? '(Quote sent here) *' : '(Optional)'}`}
                            value={t.email || ''}
                            onChange={(e) => updateTraveler(idx, 'email', e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs sm:text-sm font-semibold"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Age (e.g. 32)"
                            value={t.age}
                            onChange={(e) => updateTraveler(idx, 'age', e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-semibold"
                          />
                          <select
                            value={t.gender}
                            onChange={(e) => updateTraveler(idx, 'gender', e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-semibold"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Notes / Requirements */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Special Notes / Preferences</label>
                <textarea
                  rows={3}
                  placeholder="Hotel category preferences (3★/4★/5★), Flight sector requirements, meal choices, or specific places to cover..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {errorMsg && (
                <div className="bg-red-50 text-red-700 text-xs font-bold p-3 rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 hover:from-teal-600 hover:to-amber-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-teal-500/20 hover:shadow-2xl transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-amber-200" />
                {submitting ? 'Submitting Booking Request...' : `Submit Booking Request for ${totalCount} Traveler${totalCount > 1 ? 's' : ''}`}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Details for all {totalCount} traveler{totalCount > 1 ? 's' : ''} will be emailed to <strong>letstrawell@gmail.com</strong></span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
