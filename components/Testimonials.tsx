'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Plus, CheckCircle2, Sparkles, User, ThumbsUp, Send, Filter, Search, Trash2 } from 'lucide-react';

export interface UserReview {
  id: string;
  name: string;
  location: string;
  destinationVisited: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

const INITIAL_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    name: 'Ananya & Rahul Sharma',
    location: 'Bengaluru, India',
    destinationVisited: 'Coorg & Mysore Special',
    rating: 5,
    comment: 'Let’s Trawell organized an unforgettable 2-day trip to Coorg for our family! The private AC coach was extremely comfortable, driver was super punctual, and hotel stays in Madikeri were top class.',
    date: '2 days ago',
    likes: 14,
  },
  {
    id: 'rev-2',
    name: 'Karthik V.',
    location: 'Mysore, India',
    destinationVisited: 'Industrial Visit (Coca-Cola & Infosys)',
    rating: 5,
    comment: 'We booked an industrial study visit for 60 engineering students. Seamless coordination, staff permissions, and guide support provided by Let’s Trawell. Highly recommended for colleges!',
    date: '5 days ago',
    likes: 22,
  },
  {
    id: 'rev-3',
    name: 'Deepika Prasad',
    location: 'Hyderabad, India',
    destinationVisited: 'Dubai International Tour',
    rating: 5,
    comment: 'Our Dubai holiday was pure luxury! Burj Khalifa 124th floor tickets, desert safari dune bashing, and visa processing were handled 100% hassle-free. Thank you team!',
    date: '1 week ago',
    likes: 31,
  },
];

export default function Testimonials() {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [destinationVisited, setDestinationVisited] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  // Search & Filter State
  const [filterRating, setFilterRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const [submitting, setSubmitting] = useState(false);

  // Load saved reviews from backend API on mount
  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.reviews.length > 0) {
          setReviews(data.reviews);
        } else {
          setReviews(INITIAL_REVIEWS);
        }
      })
      .catch((err) => {
        console.error('Failed to load reviews:', err);
        setReviews(INITIAL_REVIEWS);
      });
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          location: location.trim() || 'India',
          destinationVisited: destinationVisited.trim() || 'Customized Tour',
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.review) {
        setReviews((prev) => [data.review, ...prev]);
        setName('');
        setLocation('');
        setDestinationVisited('');
        setRating(5);
        setComment('');
        setSubmittedSuccess(true);
        setTimeout(() => {
          setSubmittedSuccess(false);
          setIsFormOpen(false);
        }, 2500);
      }
    } catch (err) {
      console.error('Failed to post review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r)));
  };

  const handleDeleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // Filtered reviews
  const filteredReviews = reviews.filter((r) => {
    const matchesRating = filterRating === 0 || r.rating === filterRating;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.destinationVisited.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  // Calculate Average Rating
  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '5.0';

  return (
    <section id="reviews" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#0077B6]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#9BC53D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 text-[#00B4D8] border border-white/15 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-[#9BC53D]" /> Customer Reviews & Opinions
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Traveler <span className="text-[#00B4D8]">Opinions & Reviews</span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Real opinions, ratings, and experiences shared directly by travelers who explored the world with Let's Trawell.
            </p>
          </div>

          {/* Action Button to Open Review Form */}
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-gradient-to-r from-[#0077B6] to-[#00B4D8] hover:from-[#005f93] hover:to-[#009bc2] text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl flex items-center gap-2 shrink-0 transition-transform active:scale-95"
          >
            <Plus className="w-5 h-5" /> Write Your Review
          </button>
        </div>

        {/* Write A Review Expandable Drawer / Card */}
        {isFormOpen && (
          <div className="mb-14 bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-6 sm:p-8 rounded-3xl shadow-2xl animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#00B4D8]" /> Share Your Experience & Opinion
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Your feedback helps fellow travelers customize their ideal domestic or international tour package!
            </p>

            {submittedSuccess ? (
              <div className="p-6 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded-2xl flex items-center gap-3 text-sm font-bold">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span>Thank you! Your review has been submitted and published successfully.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                    />
                  </div>

                  {/* Location Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Location / City</label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru, India"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                    />
                  </div>

                  {/* Destination Visited Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Trip / Destination Visited</label>
                    <input
                      type="text"
                      placeholder="e.g. Coorg, Goa, Dubai"
                      value={destinationVisited}
                      onChange={(e) => setDestinationVisited(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                    />
                  </div>
                </div>

                {/* Clickable Star Rating Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Rate Your Experience *</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= (hoverRating || rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-3 text-xs font-bold text-[#00B4D8]">{rating}.0 Stars</span>
                  </div>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Opinion / Review Details *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the hotel stays, transport, sightseeing spots, and overall service quality..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>

                <div className="flex items-center gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg hover:opacity-90 transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Filter & Search Bar Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-800/60 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#00B4D8]" /> Filter:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[0, 5, 4, 3].map((starVal) => (
                <button
                  key={starVal}
                  onClick={() => setFilterRating(starVal)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    filterRating === starVal
                      ? 'bg-[#0077B6] text-white shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {starVal === 0 ? 'All Reviews' : `${starVal} ★`}
                </button>
              ))}
            </div>
          </div>

          {/* Search Reviews Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>
        </div>

        {/* Live Reviews Grid */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/80 shadow-xl flex flex-col justify-between hover:border-[#00B4D8]/50 transition-all group"
              >
                <div className="space-y-4">
                  {/* Top Header: Avatar & Stars */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0077B6] to-[#00B4D8] text-white flex items-center justify-center font-bold text-sm shadow">
                        {rev.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                          {rev.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          {rev.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/60 rounded-lg transition"
                        title="Remove / Delete Review"
                        aria-label="Remove review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="ml-1 text-[11px] text-slate-400 font-semibold">{rev.date}</span>
                  </div>

                  {/* Destination Tag */}
                  <div className="inline-block bg-slate-900 text-[#00B4D8] border border-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                    Trip: {rev.destinationVisited}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-slate-300 font-normal leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Helpful Button */}
                <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleLike(rev.id)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition font-semibold"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-[#00B4D8]" />
                    <span>Helpful ({rev.likes})</span>
                  </button>

                  <span className="text-[10px] text-slate-500 font-bold">Let's Trawell Verified Review</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-slate-800 p-8 max-w-md mx-auto space-y-3">
            <MessageSquare className="w-10 h-10 text-slate-500 mx-auto" />
            <h4 className="text-base font-bold text-white">No reviews found</h4>
            <p className="text-xs text-slate-400">Be the first traveler to write a review!</p>
          </div>
        )}
      </div>
    </section>
  );
}
