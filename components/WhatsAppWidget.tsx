'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, PhoneCall } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedMsg = encodeURIComponent(
      userMsg || "Hi Let's Trawell! I am interested in planning a customized tour package."
    );
    window.open(`https://wa.me/919845905999?text=${encodedMsg}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Chat Drawer */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-3xl shadow-2xl border border-slate-200 w-80 sm:w-96 overflow-hidden animate-fadeIn text-slate-800">
          {/* Header */}
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg shrink-0">
                <img src="/logo.png" alt="Let's Trawell Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Let’s Trawell WhatsApp Concierge</h4>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" /> Online • Replies in ~5 mins
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-emerald-50/50 space-y-3 text-xs">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 max-w-[85%]">
              <p className="font-semibold text-slate-800">
                Hello there! 👋 Welcome to Let's Trawell. How can we help customize your next vacation today?
              </p>
              <span className="text-[9px] text-slate-400 mt-1 block text-right">Just now</span>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Popular Inquiries:</p>
              {[
                '✈️ Need Maldives Honeymoon quote',
                '🏔️ Kashmir 6-day family package details',
                '🇦🇪 Dubai Visa & Hotel offers',
                '💬 Talk to travel consultant',
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setUserMsg(prompt);
                  }}
                  className="w-full text-left bg-white hover:bg-emerald-100 p-2 rounded-xl border border-slate-200 text-slate-700 font-semibold transition text-[11px]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input & Action */}
          <form onSubmit={handleSendWhatsApp} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            />
            <button
              type="submit"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-2.5 rounded-xl shadow transition"
              title="Open in WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative group"
        aria-label="WhatsApp live chat"
      >
        <MessageSquare className="w-7 h-7 fill-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-bounce" />
      </button>
    </div>
  );
}
