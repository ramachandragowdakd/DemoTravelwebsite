'use client';

import React, { useState, useEffect } from 'react';
import { Compass, RefreshCw, Search, Download, Trash2, CheckCircle2, Clock, Phone, Mail, MapPin, AlertCircle, Filter, ArrowLeft, ShieldCheck, Sparkles, User } from 'lucide-react';
import { BookingRecord } from '@/lib/db';

export default function AdminPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'New' | 'Contacted' | 'Confirmed' | 'Cancelled'>('All');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, newStatus: BookingRecord['status']) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking record?')) return;
    try {
      const res = await fetch(`/api/bookings?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete booking:', err);
    }
  };

  const exportCSV = () => {
    if (bookings.length === 0) return alert('No booking data to export.');
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Destination', 'Travel Date', 'Package', 'Source', 'Status', 'Message'];
    const rows = bookings.map((b) => [
      b.id,
      new Date(b.createdAt).toLocaleString(),
      `"${b.name}"`,
      `"${b.phone}"`,
      `"${b.email}"`,
      `"${b.destination}"`,
      `"${b.travelDate || ''}"`,
      `"${b.packageName || ''}"`,
      `"${b.source}"`,
      `"${b.status}"`,
      `"${(b.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Lets_Trawell_Bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const totalCount = bookings.length;
  const newCount = bookings.filter((b) => b.status === 'New').length;
  const contactedCount = bookings.filter((b) => b.status === 'Contacted').length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition border border-slate-800"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-teal-500/20 text-teal-400 border border-teal-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Admin Portal
                </span>
                <span className="text-xs text-slate-400">Let's Trawell Tours</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                Bookings & Inquiries Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-teal-400' : ''}`} /> Refresh
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 via-sky-500 to-amber-500 hover:opacity-90 text-white font-bold text-xs shadow-lg flex items-center gap-1.5 transition"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Live Overview Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Received</p>
            <p className="text-3xl font-black text-white">{totalCount}</p>
            <p className="text-[10px] text-slate-500">All submissions</p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-950/80 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">New Inquiries</p>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            </div>
            <p className="text-3xl font-black text-amber-400">{newCount}</p>
            <p className="text-[10px] text-slate-400">Requires follow-up</p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-sky-950/80 space-y-1">
            <p className="text-xs font-bold text-sky-400 uppercase tracking-wider">In Progress</p>
            <p className="text-3xl font-black text-sky-400">{contactedCount}</p>
            <p className="text-[10px] text-slate-400">Contacted / Quoted</p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-emerald-950/80 space-y-1">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Confirmed Bookings</p>
            <p className="text-3xl font-black text-emerald-400">{confirmedCount}</p>
            <p className="text-[10px] text-slate-400">Successfully booked</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, phone, email, destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {(['All', 'New', 'Contacted', 'Confirmed', 'Cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          {loading ? (
            <div className="text-center py-20 space-y-3">
              <RefreshCw className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-400 font-bold">Loading Database Records...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">No Booking Records Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Submissions from the "Request Custom Itinerary Quote" form and booking modal will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="p-4">Customer / Contact</th>
                    <th className="p-4">Destination & Tour</th>
                    <th className="p-4">Travel Date</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Notes / Request</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/40 transition">
                      {/* Customer Info */}
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                            <User className="w-3.5 h-3.5 text-teal-400" />
                            {b.name}
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-300">
                            <Phone className="w-3 h-3 text-emerald-400" />
                            <a href={`tel:${b.phone}`} className="hover:underline font-semibold">
                              {b.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                            <Mail className="w-3 h-3 text-sky-400" />
                            <a href={`mailto:${b.email}`} className="hover:underline">
                              {b.email}
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Destination & Package */}
                      <td className="p-4">
                        <div className="space-y-1">
                          <span className="font-extrabold text-teal-300 text-xs flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-teal-400" /> {b.destination}
                          </span>
                          {b.packageName && <p className="text-[11px] text-slate-400">{b.packageName}</p>}
                          {b.guests && <p className="text-[10px] text-amber-400 font-bold">{b.guests} Guests</p>}
                        </div>
                      </td>

                      {/* Travel Date */}
                      <td className="p-4 whitespace-nowrap text-slate-300 font-semibold">
                        {b.travelDate ? b.travelDate : <span className="text-slate-600 font-normal">Flexible</span>}
                      </td>

                      {/* Source */}
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            b.source === 'Contact Form'
                              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {b.source}
                        </span>
                      </td>

                      {/* Notes / Message */}
                      <td className="p-4 max-w-xs">
                        <p className="text-slate-300 truncate" title={b.message}>
                          {b.message || <span className="text-slate-600 italic">No notes</span>}
                        </p>
                        <span className="text-[9px] text-slate-500 block mt-1">
                          Received: {new Date(b.createdAt).toLocaleString()}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-4 whitespace-nowrap">
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                          disabled={updatingId === b.id}
                          className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer transition ${
                            b.status === 'New'
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                              : b.status === 'Contacted'
                              ? 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                              : b.status === 'Confirmed'
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                              : 'bg-red-500/20 text-red-400 border-red-500/40'
                          }`}
                        >
                          <option value="New">🟡 New Inquiry</option>
                          <option value="Contacted">🔵 Contacted</option>
                          <option value="Confirmed">🟢 Confirmed</option>
                          <option value="Cancelled">🔴 Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/${b.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(
                              b.name
                            )},%20thank%20you%20for%20contacting%20Let's%20Trawell%20Tours%20regarding%20${encodeURIComponent(
                              b.destination
                            )}!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-400 border border-emerald-500/40 transition"
                            title="Chat on WhatsApp"
                          >
                            💬
                          </a>
                          <button
                            onClick={() => handleDelete(b.id)}
                            className="p-2 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 transition"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
