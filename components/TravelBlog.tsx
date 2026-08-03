'use client';

import React from 'react';
import { Sparkles, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/travelData';

export default function TravelBlog() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-sky-100 text-[#0077B6] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-[#9BC53D]" /> Insider Guides
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Latest Travel <span className="text-[#0077B6]">Stories & Tips</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal max-w-xl">
            Get expert advice on visa policies, honeymoon budgeting, and top secret destination spots before you pack.
          </p>
        </div>

        <button className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold px-5 py-2.5 rounded-2xl text-xs flex items-center gap-2 transition shrink-0">
          <BookOpen className="w-4 h-4 text-[#0077B6]" />
          View All Articles
        </button>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 flex flex-col justify-between group transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#0077B6]" /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0077B6] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">By {post.author}</span>
              <button className="text-xs font-extrabold text-[#0077B6] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
