'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  CalendarCheck,
  MessageSquare,
  Users,
  Plus,
  Trash2,
  Edit,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../data/travelData';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export default function AdminDashboard({ onBackToSite }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'bookings' | 'contacts'>('overview');

  // Local state for demo packages management
  const [packagesList, setPackagesList] = useState<TourPackage[]>(TOUR_PACKAGES);

  // Form for adding new package
  const [newTitle, setNewTitle] = useState('');
  const [newDest, setNewDest] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newImage, setNewImage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock Bookings State
  const [bookings, setBookings] = useState([
    { id: 'LTW-948123', guest: 'Rahul Sharma', dest: 'Goa Escape', date: '2026-08-15', status: 'Confirmed', amount: '₹14,999' },
    { id: 'LTW-847291', guest: 'Priya Patel', dest: 'Maldives Honeymoon', date: '2026-08-20', status: 'Pending', amount: '₹69,999' },
    { id: 'LTW-392019', guest: 'Vikram Kulkarni', dest: 'Dubai Explorer', date: '2026-09-02', status: 'Confirmed', amount: '₹49,999' },
    { id: 'LTW-581920', guest: 'Ananya Roy', dest: 'Swiss Alpine', date: '2026-09-10', status: 'Cancelled', amount: '₹129,999' },
  ]);

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const newPkg: TourPackage = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      destination: newDest || 'Custom Location',
      category: 'international',
      duration: newDuration || '5 Days / 4 Nights',
      nights: 4,
      days: 5,
      originalPrice: Number(newPrice) * 1.25,
      discountedPrice: Number(newPrice),
      rating: 5.0,
      image: newImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      inclusions: ['4-Star Resort', 'Daily Breakfast', 'Private Transfers'],
      itinerary: [
        { day: 1, title: 'Arrival & Welcome', desc: 'Hotel transfer and evening relaxation.' },
        { day: 2, title: 'Sightseeing Tour', desc: 'Guided tour of local landmarks.' }
      ]
    };

    setPackagesList([newPkg, ...packagesList]);
    setNewTitle('');
    setNewPrice('');
    setNewDest('');
    setNewDuration('');
    setNewImage('');
    setShowAddForm(false);
  };

  const handleDeletePackage = (id: string) => {
    setPackagesList(packagesList.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-3xl border border-slate-700 shadow-xl">
              <img src="/logo.png" alt="Let's Trawell Logo" className="h-20 sm:h-24 w-auto object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-white">Admin Control Portal</span>
                <span className="bg-[#9BC53D] text-[#0B132B] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  Live System
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage packages, view customer bookings, and track analytics.</p>
            </div>
          </div>

          <button
            onClick={onBackToSite}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2.5 rounded-2xl text-xs flex items-center gap-2 border border-white/20 transition shrink-0"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Main Website
          </button>
        </div>

        {/* Dashboard Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview Metrics', icon: LayoutDashboard },
            { id: 'packages', label: 'Manage Packages', icon: Package },
            { id: 'bookings', label: 'Customer Bookings', icon: CalendarCheck },
            { id: 'contacts', label: 'Inquiries Log', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white shadow-lg'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
                <p className="text-xs text-slate-400 font-bold uppercase">Total Revenue (Aug 2026)</p>
                <h3 className="text-3xl font-black text-white mt-2">₹14.2 Lakhs</h3>
                <p className="text-xs text-emerald-400 font-semibold mt-1">↑ +18.5% from last month</p>
              </div>

              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
                <p className="text-xs text-slate-400 font-bold uppercase">Active Packages</p>
                <h3 className="text-3xl font-black text-white mt-2">{packagesList.length}</h3>
                <p className="text-xs text-[#00B4D8] font-semibold mt-1">Domestic & International</p>
              </div>

              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
                <p className="text-xs text-slate-400 font-bold uppercase">Confirmed Bookings</p>
                <h3 className="text-3xl font-black text-white mt-2">1,240</h3>
                <p className="text-xs text-emerald-400 font-semibold mt-1">99.4% Fulfillment Rate</p>
              </div>

              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
                <p className="text-xs text-slate-400 font-bold uppercase">Average Customer Rating</p>
                <h3 className="text-3xl font-black text-white mt-2">4.92 / 5.0</h3>
                <p className="text-xs text-amber-400 font-semibold mt-1">Based on 680+ reviews</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE PACKAGES */}
        {activeTab === 'packages' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Active Tour Packages Directory</h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-[#9BC53D] text-[#0B132B] px-5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" /> {showAddForm ? 'Cancel' : 'Add New Package'}
              </button>
            </div>

            {/* Add Package Form */}
            {showAddForm && (
              <form onSubmit={handleAddPackage} className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
                <h4 className="text-sm font-bold text-[#00B4D8]">Create New Customized Package</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Package Title (e.g. Swiss Dream)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Destination (e.g. Switzerland)"
                    value={newDest}
                    onChange={(e) => setNewDest(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="number"
                    required
                    placeholder="Price in INR (e.g. 45000)"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g. 5 Days / 4 Nights)"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                  <input
                    type="url"
                    placeholder="Image URL (Unsplash)"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>
                <button type="submit" className="bg-[#0077B6] text-white px-6 py-2.5 rounded-xl font-bold text-xs">
                  Save & Publish Package
                </button>
              </form>
            )}

            {/* Packages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {packagesList.map((pkg) => (
                <div key={pkg.id} className="bg-slate-800 p-4 rounded-3xl border border-slate-700 flex flex-col justify-between space-y-3">
                  <div className="flex gap-3">
                    <img src={pkg.image} alt={pkg.title} className="w-20 h-20 rounded-2xl object-cover" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{pkg.title}</h4>
                      <p className="text-xs text-slate-400">{pkg.destination}</p>
                      <p className="text-xs font-black text-[#00B4D8] mt-1">₹{pkg.discountedPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-700">
                    <button
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-white">Recent Customer Bookings Log</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 uppercase text-slate-400 font-bold">
                  <tr>
                    <th className="p-3">Booking Ref</th>
                    <th className="p-3">Customer Name</th>
                    <th className="p-3">Package / Dest</th>
                    <th className="p-3">Travel Date</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-700/50">
                      <td className="p-3 font-mono font-bold text-white">{b.id}</td>
                      <td className="p-3 font-semibold text-slate-200">{b.guest}</td>
                      <td className="p-3">{b.dest}</td>
                      <td className="p-3">{b.date}</td>
                      <td className="p-3 font-bold text-[#00B4D8]">{b.amount}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : b.status === 'Pending'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : 'bg-red-950 text-red-400 border border-red-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: INQUIRIES LOG */}
        {activeTab === 'contacts' && (
          <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-white">Contact Form Inquiries</h3>
            <p className="text-xs text-slate-400">4 new custom itinerary requests received today.</p>
          </div>
        )}
      </div>
    </div>
  );
}
