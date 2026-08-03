'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import WhatWeOffer from '../components/WhatWeOffer';
import WhyChooseUs from '../components/WhyChooseUs';
import TourPackages from '../components/TourPackages';
import GalleryLightbox from '../components/GalleryLightbox';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import TravelBlog from '../components/TravelBlog';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import WhatsAppWidget from '../components/WhatsAppWidget';
import ScrollToTop from '../components/ScrollToTop';
import { TourPackage, Destination } from '../data/travelData';

export default function Home() {
  const [currency, setCurrency] = useState('INR');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('Goa');
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);

  // Handlers
  const handleOpenBooking = (destName?: string, pkg?: TourPackage | null) => {
    if (pkg) {
      setSelectedPackage(pkg);
      setSelectedDestination(pkg.destination);
    } else if (destName) {
      setSelectedPackage(null);
      setSelectedDestination(destName);
    } else {
      setSelectedPackage(null);
      setSelectedDestination('Goa');
    }
    setIsBookingOpen(true);
  };

  const handleSearchSubmit = (searchParams: any) => {
    setSelectedDestination(searchParams.destination);
    setIsBookingOpen(true);
  };

  const handleExploreOffer = (code: string) => {
    setSelectedDestination('Dubai');
    setIsBookingOpen(true);
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedDestination('Custom Trip');
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F0F9FF] via-white to-[#F0FDFA] text-slate-900 font-sans antialiased">
      {/* Sticky Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        currency={currency}
        onChangeCurrency={(curr) => setCurrency(curr)}
      />

      {/* 3. Hero Section with Background Slideshow & Booking Search Card */}
      <main className="flex-1">
        <Hero
          onSearchSubmit={handleSearchSubmit}
          onExplorePackages={() => {
            const el = document.getElementById('packages');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactUs={() => {
            const el = document.getElementById('contact');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Key Animated Statistics Counter */}
        <Stats />

        {/* 5. About Us Section */}
        <AboutUs onPlanTrip={() => handleOpenBooking('Custom Itinerary')} />

        {/* 6. 14 Services Grid */}
        <Services />

        {/* 6b. What We Offer Tailored Solution Section */}
        <WhatWeOffer onPlanTrip={() => handleOpenBooking('Custom Itinerary')} />

        {/* 8. Why Choose Us 8 Value Prop Cards */}
        <WhyChooseUs />

        {/* 9. Official Brochure Tour Packages */}
        <TourPackages
          onBookPackage={(pkgTitle: string) => handleOpenBooking(pkgTitle)}
        />

        {/* 10. Pinterest Masonry Photo Gallery with Lightbox */}
        <GalleryLightbox />

        {/* 11. Customer Testimonials Glass Slider */}
        <Testimonials />

        {/* 12. FAQ Accordion with Live Search */}
        <FAQ />

        {/* 13. Travel Blog Preview */}
        <TravelBlog />

        {/* 14. Interactive Contact Form & Office Map */}
        <ContactSection />
      </main>

      {/* 15. Premium Footer */}
      <Footer />

      {/* 16. Multi-Step Interactive Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialDestination={selectedDestination}
        initialPackage={selectedPackage}
        currency={currency}
      />

      {/* 17. Floating WhatsApp Drawer Widget */}
      <WhatsAppWidget />

      {/* 18. Floating Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
}
