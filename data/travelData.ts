export interface Destination {
  id: string;
  name: string;
  location: string;
  category: 'domestic' | 'international';
  image: string;
  price: number;
  duration: string;
  rating: number;
  reviewsCount: number;
  tag?: string;
  description: string;
  highlights: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  category: 'domestic' | 'international' | 'honeymoon' | 'family' | 'luxury' | 'adventure';
  duration: string;
  nights: number;
  days: number;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  image: string;
  featured?: boolean;
  inclusions: string[];
  itinerary: { day: number; title: string; desc: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  category: 'core' | 'booking' | 'support';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  destinationVisited: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  packageType: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Beaches' | 'Mountains' | 'Culture' | 'Luxury' | 'Adventure';
  location: string;
  image: string;
  region: 'India' | 'International';
}

// ----------------------------------------------------
// DESTINATIONS
// ----------------------------------------------------
export const DESTINATIONS: Destination[] = [
  // Domestic
  {
    id: 'goa',
    name: 'Goa',
    location: 'India',
    category: 'domestic',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
    price: 14999,
    duration: '4 Days / 3 Nights',
    rating: 4.8,
    reviewsCount: 340,
    tag: 'Best Seller',
    description: 'Golden beaches, vibrant nightlife, Portuguese heritage, and sun-kissed coastal adventures.',
    highlights: ['Baga & Calangute Beach', 'Water Sports Package', 'Mandovi River Cruise', 'Old Goa Cathedrals']
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    location: 'India',
    category: 'domestic',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop',
    price: 24999,
    duration: '6 Days / 5 Nights',
    rating: 4.9,
    reviewsCount: 512,
    tag: 'Paradise on Earth',
    description: 'Snow-capped Himalayas, serene Dal Lake houseboats, colorful Tulip Gardens, and Gulmarg slopes.',
    highlights: ['Shikara Ride in Dal Lake', 'Gulmarg Gondola Ride', 'Pahalgam Valley Walk', 'Sonamarg Glacier']
  },
  {
    id: 'manali',
    name: 'Manali',
    location: 'Himachal Pradesh, India',
    category: 'domestic',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
    price: 18499,
    duration: '5 Days / 4 Nights',
    rating: 4.7,
    reviewsCount: 290,
    tag: 'Popular',
    description: 'Charming mountain town, Solang Valley sports, Atal Tunnel excursion, and pine forest trails.',
    highlights: ['Solang Valley Paragliding', 'Atal Tunnel Excursion', 'Hadimba Temple', 'Rohtang Pass Tour']
  },
  {
    id: 'kerala',
    name: 'Kerala',
    location: 'India',
    category: 'domestic',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
    price: 21999,
    duration: '5 Days / 4 Nights',
    rating: 4.9,
    reviewsCount: 420,
    tag: 'God’s Own Country',
    description: 'Tranquil Alleppey backwaters, lush tea gardens of Munnar, wildlife in Thekkady, and Kovalam beaches.',
    highlights: ['Private Houseboat Stay', 'Munnar Tea Plantation Safari', 'Kathakali Cultural Show', 'Ayurvedic Spa Session']
  },
  {
    id: 'ooty',
    name: 'Ooty',
    location: 'Tamil Nadu, India',
    category: 'domestic',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop',
    price: 12999,
    duration: '3 Days / 2 Nights',
    rating: 4.6,
    reviewsCount: 180,
    description: 'Queen of Hill Stations with eucalyptus-scented forests, botanical gardens, and heritage toy train.',
    highlights: ['Nilgiri Toy Train Ride', 'Ooty Lake Boating', 'Doddabetta Peak View', 'Rose Garden Walk']
  },
  {
    id: 'coorg',
    name: 'Coorg',
    location: 'Karnataka, India',
    category: 'domestic',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop',
    price: 13999,
    duration: '3 Days / 2 Nights',
    rating: 4.7,
    reviewsCount: 210,
    tag: 'Scotland of India',
    description: 'Aromatic coffee plantations, misty waterfalls, Tibetan monastery, and spice estate tours.',
    highlights: ['Coffee Estate Homestay', 'Abbey Falls', 'Namdroling Monastery', 'Raja Seat Sunset']
  },
  {
    id: 'andaman',
    name: 'Andaman Islands',
    location: 'India',
    category: 'domestic',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200&auto=format&fit=crop',
    price: 32999,
    duration: '6 Days / 5 Nights',
    rating: 4.9,
    reviewsCount: 395,
    tag: 'Island Bliss',
    description: 'Pristine turquoise waters, Radhanagar Beach, coral reef snorkeling, and historic Cellular Jail.',
    highlights: ['Radhanagar Beach Sunset', 'Scuba Diving at Havelock', 'Light & Sound Show', 'Glass Bottom Boat Ride']
  },

  // International
  {
    id: 'dubai',
    name: 'Dubai',
    location: 'UAE',
    category: 'international',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    price: 49999,
    duration: '5 Days / 4 Nights',
    rating: 4.9,
    reviewsCount: 680,
    tag: 'Trending International',
    description: 'Futuristic skyscrapers, luxury shopping, thrilling desert safaris, and World-class theme parks.',
    highlights: ['Burj Khalifa 124th Floor Access', 'Desert Safari with BBQ Dinner', 'Dhow Cruise Marina', 'Dubai Mall Fountain Show']
  },
  {
    id: 'singapore',
    name: 'Singapore',
    location: 'Singapore',
    category: 'international',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop',
    price: 54999,
    duration: '5 Days / 4 Nights',
    rating: 4.8,
    reviewsCount: 450,
    tag: 'Family Favorite',
    description: 'Garden city with iconic Marina Bay Sands, Gardens by the Bay, Universal Studios, and Night Safari.',
    highlights: ['Universal Studios Singapore', 'Gardens by the Bay Supertrees', 'Night Safari Explorer', 'Sentosa Island Cable Car']
  },
  {
    id: 'thailand',
    name: 'Thailand',
    location: 'Bangkok & Phuket',
    category: 'international',
    image: 'https://images.unsplash.com/photo-1506665531195-3566af294710?q=80&w=1200&auto=format&fit=crop',
    price: 36999,
    duration: '6 Days / 5 Nights',
    rating: 4.8,
    reviewsCount: 720,
    tag: 'Top Value',
    description: 'Exotic beaches in Phuket, vibrant night markets in Bangkok, Phi Phi island hopping, and ancient temples.',
    highlights: ['Phi Phi Island Speedboat Tour', 'Grand Palace Bangkok', 'Coral Island Water Sports', 'Floating Market Tour']
  },
  {
    id: 'bali',
    name: 'Bali',
    location: 'Indonesia',
    category: 'international',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
    price: 42999,
    duration: '6 Days / 5 Nights',
    rating: 4.9,
    reviewsCount: 890,
    tag: 'Honeymoon Favorite',
    description: 'Tropical paradise of luxury cliffside villas, Ubud rice terraces, sacred temples, and sunset beach clubs.',
    highlights: ['Private Pool Villa Stay', 'Ubud Jungle Swing & Rice Terraces', 'Tanah Lot Sunset Temple', 'Nusa Penida Island Tour']
  },
  {
    id: 'maldives',
    name: 'Maldives',
    location: 'Maldives',
    category: 'international',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop',
    price: 69999,
    duration: '5 Days / 4 Nights',
    rating: 5.0,
    reviewsCount: 640,
    tag: 'Luxury Haven',
    description: 'Overwater bungalows, crystal clear lagoons, private dining on sandbanks, and swim with sea turtles.',
    highlights: ['Overwater Villa Stay', 'All-Inclusive Gourmet Dining', 'Speedboat Airport Transfers', 'Sunset Dolphin Cruise']
  },
  {
    id: 'europe',
    name: 'Europe Multi-City',
    location: 'France, Italy, Netherlands',
    category: 'international',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop',
    price: 149999,
    duration: '10 Days / 9 Nights',
    rating: 4.9,
    reviewsCount: 310,
    tag: 'Grand Tour',
    description: 'Iconic European voyage visiting Paris, Amsterdam canals, Swiss Alps, and Venetian gondolas.',
    highlights: ['Eiffel Tower Summit Access', 'Amsterdam Canal Cruise', 'Mount Titlis Cable Car', 'Venice Gondola Ride']
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    location: 'Switzerland',
    category: 'international',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop',
    price: 129999,
    duration: '7 Days / 6 Nights',
    rating: 5.0,
    reviewsCount: 410,
    tag: 'Alpine Luxury',
    description: 'Breathtaking Swiss Alps, panoramic Glacier Express trains, scenic Lucerne lake, and Interlaken adventures.',
    highlights: ['Jungfraujoch - Top of Europe', 'Glacier Express Scenic Train', 'Lucerne Lake Cruise', 'Interlaken Paragliding Option']
  }
];

// ----------------------------------------------------
// TOUR PACKAGES
// ----------------------------------------------------
export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'goa-escape',
    title: 'Goa Escape',
    destination: 'Goa, India',
    category: 'domestic',
    duration: '4 Days / 3 Nights',
    nights: 3,
    days: 4,
    originalPrice: 19999,
    discountedPrice: 14999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    inclusions: ['4-Star Resort Stay', 'Daily Breakfast & Dinner', 'Airport Pick & Drop', 'North & South Goa Sightseeing'],
    itinerary: [
      { day: 1, title: 'Arrival & Beach Chill', desc: 'Pick up from Dabolim airport / Mopa airport, transfer to North Goa resort. Evening free at Calangute beach.' },
      { day: 2, title: 'North Goa Sightseeing & Water Sports', desc: 'Visit Fort Aguada, Anjuna beach, Baga beach, and enjoy thrilling banana boat and parasailing.' },
      { day: 3, title: 'South Goa Heritage & River Cruise', desc: 'Explore Old Goa Basilica, Mangueshi Temple, Dona Paula viewpoint, followed by a sunset cruise on Mandovi River.' },
      { day: 4, title: 'Departure', desc: 'Check-out after breakfast with memorable beach memories and transfer back to airport.' }
    ]
  },
  {
    id: 'maldives-honeymoon',
    title: 'Maldives Honeymoon Bliss',
    destination: 'Maldives',
    category: 'honeymoon',
    duration: '5 Days / 4 Nights',
    nights: 4,
    days: 5,
    originalPrice: 89999,
    discountedPrice: 69999,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    inclusions: ['2 Nights Beach Villa + 2 Nights Water Villa', 'All Inclusive Meals & Drinks', 'Speedboat Transfers', 'Honeymoon Cake & Candlelight Dinner'],
    itinerary: [
      { day: 1, title: 'Welcome to Maldives Paradise', desc: 'Speedboat transfer to luxury island resort. Welcome sparkling wine and check-in to private beach villa.' },
      { day: 2, title: 'Lagoon Snorkeling & Spa', desc: 'Guided snorkeling session in house reef. Afternoon couples relaxation spa.' },
      { day: 3, title: 'Move to Overwater Villa & Dolphin Cruise', desc: 'Check into your iconic overwater bungalow with direct ocean stairs. Sunset dolphin sighting cruise.' },
      { day: 4, title: 'Romantic Sandbank Picnic', desc: 'Private speedboat trip to secluded sandbank for gourmet lunch and photos.' },
      { day: 5, title: 'Farewell Maldives', desc: 'Enjoy breakfast over turquoise waters before speedboat transfer back to Velana International Airport.' }
    ]
  },
  {
    id: 'dubai-explorer',
    title: 'Dubai Explorer Deluxe',
    destination: 'Dubai, UAE',
    category: 'international',
    duration: '6 Days / 5 Nights',
    nights: 5,
    days: 6,
    originalPrice: 64999,
    discountedPrice: 49999,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    inclusions: ['5-Star City Hotel Stay', 'Burj Khalifa 124th Floor Ticket', 'Desert Safari 4x4 & BBQ', 'Dubai Frame & Marina Dhow Cruise'],
    itinerary: [
      { day: 1, title: 'Arrival in Dubai', desc: 'Private luxury transfer to hotel. Rest and evening walk at Dubai Marina.' },
      { day: 2, title: 'City Sightseeing & Burj Khalifa', desc: 'Half-day city tour covering Jumeirah Beach, Atlantis photo stop, and Burj Khalifa observation deck.' },
      { day: 3, title: 'Thrilling Desert Safari', desc: 'Afternoon dune bashing in 4x4 Land Cruiser, camel riding, belly dance performance, and lavish BBQ dinner.' },
      { day: 4, title: 'Abu Dhabi Day Trip', desc: 'Visit Grand Sheikh Zayed Mosque and Ferrari World Abu Dhabi theme park.' },
      { day: 5, title: 'Dubai Frame & Shopping', desc: 'Visit iconic Dubai Frame and spend afternoon shopping at Dubai Mall with fountain show.' },
      { day: 6, title: 'Departure', desc: 'Check out and transfer to Dubai International Airport.' }
    ]
  },
  {
    id: 'kerala-nature',
    title: 'Kerala Nature & Houseboat Tour',
    destination: 'Kerala, India',
    category: 'domestic',
    duration: '5 Days / 4 Nights',
    nights: 4,
    days: 5,
    originalPrice: 28999,
    discountedPrice: 21999,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    inclusions: ['Munnar Hill Resort Stay', 'Alleppey Private Houseboat Night', 'Elephant Safari in Thekkady', 'Daily Meals & AC Private Sedan'],
    itinerary: [
      { day: 1, title: 'Cochin to Munnar Drive', desc: 'Pick up from Cochin Airport, scenic 4-hour drive past Cheeyappara Waterfalls to Munnar.' },
      { day: 2, title: 'Munnar Tea Plantations', desc: 'Visit Eravikulam National Park (Nilgiri Tahr), Tea Museum, Mattupetty Dam, and Echo Point.' },
      { day: 3, title: 'Munnar to Thekkady Spice Garden', desc: 'Drive to Thekkady. Spice plantation tour, boat ride on Periyar Lake, and Kathakali show.' },
      { day: 4, title: 'Alleppey Backwater Houseboat Cruise', desc: 'Board traditional deluxe AC houseboat in Alleppey. Cruise through palm-fringed canals with fresh Kerala meals.' },
      { day: 5, title: 'Departure from Cochin', desc: 'Disembark houseboat after breakfast and drive back to Cochin for airport flight.' }
    ]
  },
  {
    id: 'swiss-alpine',
    title: 'Swiss Alpine Wonderland',
    destination: 'Switzerland',
    category: 'luxury',
    duration: '7 Days / 6 Nights',
    nights: 6,
    days: 7,
    originalPrice: 159999,
    discountedPrice: 129999,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    inclusions: ['Swiss Travel Pass 1st Class', 'Jungfraujoch Excursion', 'Lucerne & Interlaken Hotels', 'Mount Titlis Rotair Cable Car'],
    itinerary: [
      { day: 1, title: 'Zurich Arrival & Lucerne Rail', desc: 'Arrive Zurich airport, validate 1st Class Swiss Rail pass, train ride to scenic Lucerne.' },
      { day: 2, title: 'Mount Titlis & Ice Flyer', desc: 'Take world’s first revolving cable car to Mount Titlis summit, walk Glacier Cave and Cliff Walk bridge.' },
      { day: 3, title: 'Interlaken & Lake Thun', desc: 'Panoramic train to Interlaken tucked between Lake Thun and Lake Brienz. Evening stroll.' },
      { day: 4, title: 'Jungfraujoch - Top of Europe', desc: 'Cogwheel train ride up to highest railway station in Europe at 3,454m. Visit Ice Palace.' },
      { day: 5, title: 'Scenic Zermatt & Matterhorn', desc: 'Day trip to car-free Zermatt with iconic Matterhorn mountain views.' },
      { day: 6, title: 'Zurich City & Lake Cruise', desc: 'Train back to Zurich for Bahnhofstrasse shopping and evening lake boat ride.' },
      { day: 7, title: 'Departure', desc: 'Transfer to Zurich airport for homeward flight.' }
    ]
  },
  {
    id: 'bali-tropical',
    title: 'Bali Tropical Haven',
    destination: 'Bali, Indonesia',
    category: 'honeymoon',
    duration: '6 Days / 5 Nights',
    nights: 5,
    days: 6,
    originalPrice: 55999,
    discountedPrice: 42999,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    inclusions: ['2 Nights Ubud Jungle Resort + 3 Nights Seminyak Villa', 'Floating Breakfast Experience', 'Nusa Penida Island Tour', 'Sunset Dinner Beach Club'],
    itinerary: [
      { day: 1, title: 'Welcome to Bali', desc: 'Meet & greet at Denpasar Airport with flower garland. Transfer to lush Ubud resort.' },
      { day: 2, title: 'Ubud Swing & Tegalalang Terraces', desc: 'Iconic jungle swing photos, visit Tegalalang Rice Terraces, Monkey Forest, and Ubud Market.' },
      { day: 3, title: 'Kintamani Volcano & Transfer to Seminyak', desc: 'Mount Batur view lunch, Tirta Empul Holy Water Temple, check-in to private pool villa in Seminyak.' },
      { day: 4, title: 'Nusa Penida Speedboat Island Tour', desc: 'Full day trip to Kelingking T-Rex Beach, Broken Beach, Angel Billabong, and snorkeling.' },
      { day: 5, title: 'Tanah Lot Temple & Sunset Club', desc: 'Visit famous Tanah Lot temple built on rock formation and enjoy sunset at Finns Beach Club.' },
      { day: 6, title: 'Departure', desc: 'Balinese massage session followed by airport transfer.' }
    ]
  }
];

// ----------------------------------------------------
// SERVICES
// ----------------------------------------------------
export const SERVICES: ServiceItem[] = [
  { id: '1', title: 'Domestic Tours', description: 'Curated vacations across India from Kashmir to Kerala, Rajasthan, and Goa.', iconName: 'Compass', category: 'core', badge: 'Popular' },
  { id: '2', title: 'International Tours', description: 'Handcrafted international holidays in Dubai, Bali, Thailand, Europe, & Maldives.', iconName: 'Globe', category: 'core', badge: 'Global' },
  { id: '3', title: 'Honeymoon Packages', description: 'Romantic private pool villas, beach escapes, and candlelight dinners for newlyweds.', iconName: 'Heart', category: 'core', badge: 'Romantic' },
  { id: '4', title: 'Family Vacations', description: 'Stress-free, kid-friendly itineraries with luxury resorts and guided sightseeing.', iconName: 'Users', category: 'core' },
  { id: '5', title: 'Adventure Trips', description: 'Trekking, scuba diving, paragliding, white water rafting, and wilderness safaris.', iconName: 'Mountain', category: 'core' },
  { id: '6', title: 'Corporate Tours', description: 'MICE events, team retreats, incentive travel, and conference planning worldwide.', iconName: 'Briefcase', category: 'core' },
  { id: '7', title: 'Group Tours', description: 'Fun fixed-departure group trips with dedicated tour managers and shared memories.', iconName: 'UserCheck', category: 'core' },
  { id: '8', title: 'Hotel Booking', description: 'Exclusive deals at 5-star luxury resorts, heritage palaces, and boutique hotels.', iconName: 'Hotel', category: 'booking' },
  { id: '9', title: 'Flight Booking', description: 'Best airfare rates for domestic and international flights with flexible baggage policies.', iconName: 'Plane', category: 'booking' },
  { id: '11', title: 'Cruise Holidays', description: 'Luxury ocean cruises across Mediterranean, Caribbean, Singapore, and Arabian Gulf.', iconName: 'Anchor', category: 'booking' },
  { id: '13', title: 'Airport Pickup', description: 'Punctual luxury private airport transfers with professional chauffeured cars.', iconName: 'Car', category: 'booking' },
  { id: '14', title: 'Custom Tour Planning', description: '100% tailor-made travel plans designed around your budget, pace, and interests.', iconName: 'Sliders', category: 'support', badge: 'Customized' }
];

// ----------------------------------------------------
// WHY CHOOSE US REASONS
// ----------------------------------------------------
export const REASONS_TO_CHOOSE = [
  { icon: 'DollarSign', title: 'Best Price Guarantee', desc: 'Direct hotel & airline partnerships ensure you get unmatched competitive pricing without hidden fees.' },
  { icon: 'Sliders', title: '100% Customized Packages', desc: 'Tailor every detail of your trip—from flight timings to hotel room upgrades and specific sightseeing preferences.' },
  { icon: 'Award', title: 'Experienced Travel Experts', desc: 'Over 12+ years of travel industry leadership with dedicated destination specialists for every continent.' },
  { icon: 'Headphones', title: '24x7 On-Trip Support', desc: 'A dedicated travel manager stays connected with you via WhatsApp & call throughout your journey.' },
  { icon: 'ShieldCheck', title: '100% Safe & Verified Travel', desc: 'Vetted hotels, licensed English-speaking drivers, and strict safety guidelines for total peace of mind.' },
  { icon: 'Smile', title: 'Trusted by 15,000+ Travelers', desc: 'Consistently rated 4.9/5 stars on Google Reviews, TripAdvisor, and social platforms.' },
  { icon: 'Hotel', title: 'Luxury Hotel Partnerships', desc: 'Enjoy VIP perks like free room upgrades, early check-in, and complimentary spa credits.' },
  { icon: 'Zap', title: 'Easy & Fast Booking Flow', desc: 'Book online in under 3 minutes with flexible payment options and instant confirmation.' }
];

// ----------------------------------------------------
// TESTIMONIALS
// ----------------------------------------------------
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rahul & Priya Sharma',
    location: 'Bangalore, India',
    destinationVisited: 'Maldives Overwater Villa',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    comment: 'Let’s Trawell planned our dream honeymoon to Maldives flawlessly! The overwater villa upgrade and private candlelit dinner were unforgettable. Their 24/7 WhatsApp assistance gave us complete confidence.',
    date: '2 weeks ago',
    packageType: 'Honeymoon Package'
  },
  {
    id: '2',
    name: 'Ananya & Vikram Kulkarni',
    location: 'Mumbai, India',
    destinationVisited: 'Switzerland & Paris Tour',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    comment: 'We booked a 10-day Europe trip with Let’s Trawell. Visa assistance was incredibly fast, 1st class Swiss Train passes were pre-delivered, and all hotel locations were prime. Highly recommended!',
    date: '1 month ago',
    packageType: 'International Luxury'
  },
  {
    id: '3',
    name: 'Dr. Suresh Reddy & Family',
    location: 'Hyderabad, India',
    destinationVisited: 'Kashmir Paradise Tour',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    comment: 'From Dal Lake houseboat stay to Gulmarg Gondola tickets, everything was arranged seamlessly for our family of 6. The private vehicle driver was extremely courteous and knowledgeable!',
    date: '3 weeks ago',
    packageType: 'Family Vacation'
  },
  {
    id: '4',
    name: 'Meera Nair & Friends',
    location: 'Chennai, India',
    destinationVisited: 'Bali Tropical Adventure',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    comment: 'Our girls trip to Bali was hands down the best holiday ever! The Nusa Penida speedboat tour and Seminyak villa with floating breakfast were surreal. Thanks Let’s Trawell!',
    date: '1 month ago',
    packageType: 'Group Tour'
  }
];

// ----------------------------------------------------
// FAQS
// ----------------------------------------------------
export const FAQS: FAQItem[] = [
  {
    id: '1',
    question: 'How do I book a tour package with Let’s Trawell?',
    answer: 'You can easily search destinations on our website, select your preferred dates and travelers count, and click "Book Now". You can also send a customized inquiry via our contact form or WhatsApp us directly at +91 98765 43210 for an instant travel consultation.',
    category: 'Booking'
  },
  {
    id: '2',
    question: 'Can tour packages be 100% customized according to my budget?',
    answer: 'Yes, absolutely! At Let’s Trawell, customization is our core expertise. We can adjust hotel tiers (3★, 4★, or 5★ luxury), add or remove sightseeing activities, change flight preferences, and modify the number of nights to match your exact preferences.',
    category: 'Customization'
  },
  {
    id: '3',
    question: 'Do you arrange tourist visas for international destinations?',
    answer: 'Yes! We provide end-to-end visa assistance for all major international travel destinations including Dubai (UAE), Singapore, Thailand, Bali (Indonesia), Maldives, Schengen Europe, UK, USA, and Vietnam. Our visa team guides you through document verification and appointment scheduling.',
    category: 'Visas'
  },
  {
    id: '4',
    question: 'What is your cancellation and refund policy?',
    answer: 'We offer flexible cancellation policies. Cancellations made 30 days prior to departure qualify for up to 90% refund. Cancellations between 15-29 days qualify for a 50% refund or free credit reschedule. Standard airline & hotel non-refundable terms apply where explicit.',
    category: 'Policy'
  },
  {
    id: '5',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment options including Credit Cards, Debit Cards, Net Banking, UPI (GPay, PhonePe, Paytm), and Bank Wire Transfers. All transactions are 100% secure with SSL encryption.',
    category: 'Payment'
  },
  {
    id: '6',
    question: 'Do you offer 24x7 support during our trip?',
    answer: 'Yes! A dedicated Travel Concierge manager will be assigned to your booking. You will have a direct 24x7 emergency phone line and dedicated WhatsApp group support throughout your entire vacation.',
    category: 'Support'
  }
];

// ----------------------------------------------------
// GALLERY PHOTOS (India & International Hotspots)
// ----------------------------------------------------
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 'g1', title: 'Grand Mysore Palace', category: 'Culture', location: 'Mysore', region: 'India', image: '/images/mysore-heritage.jpg' },
  { id: 'g19', title: 'Historic Srirangapatna Temple', category: 'Culture', location: 'Srirangapatna', region: 'India', image: '/images/srirangapatna.jpg' },
  { id: 'g20', title: 'Ancient Belur Chennakeshava Temple', category: 'Culture', location: 'Belur', region: 'India', image: '/images/belur.jpg' },
  { id: 'g21', title: 'Namdroling Golden Temple', category: 'Culture', location: 'Kushalnagar', region: 'India', image: '/images/kushalnagar.jpg' },
  { id: 'g22', title: 'Chitradurga Stone Fort Caves', category: 'Adventure', location: 'Chitradurga', region: 'India', image: '/images/chitradurga.jpg' },
  { id: 'g23', title: 'Shivanasamudra Waterfall', category: 'Adventure', location: 'Talakad', region: 'India', image: '/images/talakad.jpg' },
  { id: 'g24', title: 'Kotilingeshwara Giant Shivalinga', category: 'Culture', location: 'Kotilingeshwara', region: 'India', image: '/images/kotilingeshwara.jpg' },
  { id: 'g25', title: 'Bannerghatta Tiger Safari', category: 'Adventure', location: 'Bannerghatta', region: 'India', image: '/images/bannerghatta.jpg' },
  { id: 'g26', title: 'Interactive Science Globe Exhibit', category: 'Culture', location: 'Visvesvaraya Museum', region: 'India', image: '/images/planetarium-museum.jpg' },
  { id: 'g27', title: 'Lush Green Aerial Canopy', category: 'Mountains', location: 'Cubbon Park', region: 'India', image: '/images/cubbon-park.jpg' },
  { id: 'g28', title: 'Historic Glasshouse Promenade', category: 'Culture', location: 'Lalbagh Botanical Garden', region: 'India', image: '/images/lalbagh.jpg' },
  { id: 'g29', title: 'Planetarium Sky Theatre Dome', category: 'Culture', location: 'Bangalore Planetarium', region: 'India', image: '/images/visvesvaraya-planetarium.jpg' },
  { id: 'g30', title: 'Nagavara Lake Boating', category: 'Adventure', location: 'Lumbini Garden', region: 'India', image: '/images/lumbini.jpg' },
  { id: 'g31', title: 'Innovative Film City Palace Entrance', category: 'Culture', location: 'Innovative Film City', region: 'India', image: '/images/film-city.jpg' },
  { id: 'g32', title: 'Wonderla High-Thrill Equinox Ride', category: 'Adventure', location: 'Wonderla', region: 'India', image: '/images/wonderla.jpg' },
  { id: 'g33', title: 'GRS Fantasy Water Slides & Pool', category: 'Adventure', location: 'GRS Fantasy Park Mysore', region: 'India', image: '/images/grs-fantasy.jpg' },
  { id: 'g34', title: 'Infosys Mysore Campus GEC', category: 'Culture', location: 'Mysore', region: 'India', image: '/images/infosys-mysore.jpg' },
  { id: 'g35', title: 'Govt Soap Factory Bangalore', category: 'Culture', location: 'Bangalore', region: 'India', image: '/images/mysore-sandal-soap.jpg' },
  { id: 'g36', title: 'L&T Heavy Machinery Plant', category: 'Adventure', location: 'Bangalore', region: 'India', image: '/images/lnt-equipments.jpg' },
  { id: 'g37', title: 'Antharagange Granite Cave Crawl', category: 'Adventure', location: 'Kolar', region: 'India', image: '/images/antharagange.jpg' },
  { id: 'g38', title: 'Siddharabetta Rocky Cave Trail', category: 'Adventure', location: 'Tumkur', region: 'India', image: '/images/siddharabetta.jpg' },
  { id: 'g39', title: 'Shivagange Betta Rock Summit Stairs', category: 'Adventure', location: 'Dharmasthala / Tumkur', region: 'India', image: '/images/shivagange.jpg' },
  { id: 'g40', title: 'Ramanagara Sholay Rock Formations', category: 'Adventure', location: 'Ramanagara', region: 'India', image: '/images/ramanagara-sholay.jpg' },
  { id: 'g41', title: 'Mekedaatu Cauvery River Gorge', category: 'Adventure', location: 'Mekedaatu', region: 'India', image: '/images/mekedaatu-sangama.jpg' },
  { id: 'g42', title: 'Manchinabele Reservoir Dam', category: 'Adventure', location: 'Savandurga / Manchinabele', region: 'India', image: '/images/manchinabele-dam.jpg' },
  { id: 'g43', title: 'Kaivara Betta Misty Peak', category: 'Mountains', location: 'Chintamani', region: 'India', image: '/images/kaivara-betta.jpg' },
  { id: 'g44', title: 'Kaup Lighthouse & Malpe Beach', category: 'Beaches', location: 'Udupi / Mangalore', region: 'India', image: '/images/mangalore-udupi.jpg' },
  { id: 'g45', title: 'Mysore Palace Grand Facade', category: 'Culture', location: 'Mysore', region: 'India', image: '/images/mysore-srirangapatna.jpg' },
  { id: 'g46', title: 'Abbey Falls Misty Forest Bridge', category: 'Mountains', location: 'Coorg', region: 'India', image: '/images/madikeri-coorg.jpg' },
  { id: 'g47', title: 'Hampi Vijaya Vittala Stone Chariot', category: 'Culture', location: 'Hampi', region: 'India', image: '/images/hampi-stone-chariot.jpg' },
  { id: 'g48', title: 'Ooty Lake & Tea Estate Hills', category: 'Mountains', location: 'Ooty', region: 'India', image: '/images/ooty-coonoor.jpg' },
  { id: 'g49', title: 'Shravanabelagola Gommateshwara Statue', category: 'Culture', location: 'Shravanabelagola', region: 'India', image: '/images/shravanabelagola-gommateshwara.jpg' },
  { id: 'g50', title: 'Jog Falls Monsoonal Cascade', category: 'Mountains', location: 'Shimoga', region: 'India', image: '/images/jog-falls.jpg' },
  { id: 'g51', title: 'Mullayanagiri & Kemmannugundi Green Ridge', category: 'Mountains', location: 'Chikkamagaluru', region: 'India', image: '/images/chikkamagaluru-kemmannugundi.jpg' },
  { id: 'g52', title: 'Mahabalipuram Historic Shore Temple', category: 'Culture', location: 'Mahabalipuram', region: 'India', image: '/images/mahabalipuram-shore-temple.jpg' },
  { id: 'g53', title: 'Dandeli Kali River White Water Rafting', category: 'Adventure', location: 'Dandeli', region: 'India', image: '/images/dandeli-rafting.jpg' },
  { id: 'g54', title: 'GRS Fantasy Park Bear Arch Entrance', category: 'Adventure', location: 'Mysore', region: 'India', image: '/images/mysore-grs-fun.jpg' },
  { id: 'g55', title: 'Murudeshwara Sea-Facing Shiva Statue', category: 'Culture', location: 'Murudeshwara', region: 'India', image: '/images/murudeshwara-shiva.jpg' },
  { id: 'g56', title: 'Pattadakal Chalukyan Temple Complex', category: 'Culture', location: 'Pattadakal', region: 'India', image: '/images/pattadakal-temples.jpg' },
  { id: 'g57', title: 'Badami Rock-cut Cave Pillars', category: 'Culture', location: 'Badami', region: 'India', image: '/images/badami-caves.jpg' },
  { id: 'g58', title: 'Historic Charminar Monument', category: 'Culture', location: 'Hyderabad', region: 'India', image: '/images/hyderabad-charminar.jpg' },
  { id: 'g59', title: 'Black Thunder Theme Water Park', category: 'Adventure', location: 'Ooty / Coonoor', region: 'India', image: '/images/black-thunder-ooty.jpg' },
  { id: 'g60', title: 'Kodaikanal Silver Cascade Falls', category: 'Mountains', location: 'Kodaikanal', region: 'India', image: '/images/kodaikanal-waterfalls.jpg' },
  { id: 'g61', title: 'Coorg Abbey Scenic Waterfalls', category: 'Mountains', location: 'Coorg', region: 'India', image: '/images/mysore-coorg-tour.jpg' },
  { id: 'g62', title: 'Haridwar River Ganga Sunset Aarti', category: 'Culture', location: 'Haridwar / Rishikesh', region: 'India', image: '/images/uttarakhand-ganga-aarti.jpg' },
  { id: 'g63', title: 'Pangong Tso Crystal Blue Lake', category: 'Mountains', location: 'Ladakh', region: 'India', image: '/images/ladakh-pangong-lake.jpg' },
  { id: 'g64', title: 'Havelock Island Aerial View & Reef', category: 'Beaches', location: 'Andaman', region: 'India', image: '/images/andaman-island-aerial.jpg' },
  { id: 'g65', title: 'Sacred Badrinath Temple Shrine', category: 'Culture', location: 'Uttarakhand', region: 'India', image: '/images/badrinath-char-dham.jpg' },
  { id: 'g66', title: 'Kathmandu Durbar Square Pagodas', category: 'Culture', location: 'Kathmandu', region: 'International', image: '/images/nepal-kathmandu-temple.jpg' },
  { id: 'g67', title: 'Singapore Merlion Statue & Skyline', category: 'Luxury', location: 'Singapore', region: 'International', image: '/images/singapore-merlion-skyline.jpg' },
  { id: 'g68', title: 'Da Nang Golden Giant Hands Bridge', category: 'Mountains', location: 'Vietnam', region: 'International', image: '/images/vietnam-golden-hands-bridge.jpg' },
  { id: 'g69', title: 'Wat Paknam Giant Golden Buddha', category: 'Culture', location: 'Bangkok', region: 'International', image: '/images/thailand-golden-buddha.jpg' },
  { id: 'g70', title: 'Grand Bassin Sacred Crater Lake', category: 'Mountains', location: 'Mauritius', region: 'International', image: '/images/mauritius-ganga-talao.jpg' },
  { id: 'g71', title: 'Hagia Sophia Grand Mosque', category: 'Culture', location: 'Istanbul', region: 'International', image: '/images/turkey-hagia-sophia.jpg' },
  { id: 'g72', title: 'Illuminated Flame Towers Baku', category: 'Luxury', location: 'Baku', region: 'International', image: '/images/baku-flame-towers.jpg' },
  { id: 'g73', title: 'Eiffel Tower Gardens & Fountains', category: 'Luxury', location: 'Paris', region: 'International', image: '/images/europe-eiffel-tower.jpg' },
  { id: 'g74', title: 'Sphinx Observatory Jungfraujoch', category: 'Mountains', location: 'Switzerland', region: 'International', image: '/images/swiss-jungfraujoch.jpg' },
  { id: 'g75', title: 'Buddha Dordenma Golden Statue', category: 'Culture', location: 'Thimphu', region: 'International', image: '/images/bhutan-buddha-dordenma.jpg' },
  { id: 'g2', title: 'Overwater Villa Water Bungalow', category: 'Luxury', location: 'Maldives', region: 'International', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop' },
  { id: 'g3', title: 'Munnar Tea Plantations', category: 'Mountains', location: 'Kerala', region: 'India', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop' },
  { id: 'g4', title: 'Burj Khalifa Skyline at Night', category: 'Luxury', location: 'Dubai', region: 'International', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop' },
  { id: 'g5', title: 'Shimla Snow Covered Hills', category: 'Mountains', location: 'Shimla', region: 'India', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop' },
  { id: 'g6', title: 'Ubud Rice Terrace Jungle Swing', category: 'Adventure', location: 'Bali', region: 'International', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop' },
  { id: 'g7', title: 'Taj Mahal Sunrise Wonder', category: 'Culture', location: 'Agra', region: 'India', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop' },
  { id: 'g8', title: 'Swiss Alps Cable Car Adventure', category: 'Mountains', location: 'Switzerland', region: 'International', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop' },
  { id: 'g9', title: 'Pink City Hawa Mahal', category: 'Culture', location: 'Jaipur', region: 'India', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop' },
  { id: 'g10', title: 'Eiffel Tower Sunset Vista', category: 'Luxury', location: 'Paris', region: 'International', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop' },
  { id: 'g11', title: 'Gulmarg Snow Slopes', category: 'Mountains', location: 'Kashmir', region: 'India', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop' },
  { id: 'g12', title: 'Gardens by the Bay Light Show', category: 'Luxury', location: 'Singapore', region: 'International', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop' },
  { id: 'g13', title: 'Alleppey Backwaters Houseboat', category: 'Luxury', location: 'Kerala', region: 'India', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop' },
  { id: 'g14', title: 'Phi Phi Island Emerald Waters', category: 'Beaches', location: 'Thailand', region: 'International', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop' },
  { id: 'g15', title: 'Baga Golden Beach Sunset', category: 'Beaches', location: 'Goa', region: 'India', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop' },
  { id: 'g16', title: 'Pangong Tso Crystal Blue Lake', category: 'Adventure', location: 'Ladakh', region: 'India', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop' },
  { id: 'g17', title: 'Historic Colosseum Amphitheatre', category: 'Culture', location: 'Rome', region: 'International', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop' },
  { id: 'g18', title: 'Mount Fuji & Cherry Blossoms', category: 'Culture', location: 'Tokyo', region: 'International', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' }
];

// ----------------------------------------------------
// TRAVEL BLOG POSTS
// ----------------------------------------------------
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Top 10 Hidden Gems in Kashmir You Must Visit in 2026',
    excerpt: 'Beyond Gulmarg and Pahalgam, discover untouched alpine lakes, saffron fields, and secret valleys in Kashmir.',
    category: 'Travel Guide',
    readTime: '5 min read',
    date: 'July 15, 2026',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop',
    author: 'Elena Vance'
  },
  {
    id: 'b2',
    title: 'How to Plan the Ultimate Maldives Honeymoon on Any Budget',
    excerpt: 'Insider tricks to pick between local island guesthouses vs 5-star private overwater resorts with all-inclusive deals.',
    category: 'Honeymoon Tips',
    readTime: '7 min read',
    date: 'June 28, 2026',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop',
    author: 'Rajiv Malhotra'
  },
  {
    id: 'b3',
    title: 'Dubai Visa Guide for Indian Travelers: Everything You Need to Know',
    excerpt: 'Step-by-step documentation, express 24-hour visa approval processing, and visa-on-arrival rules.',
    category: 'Visa Advice',
    readTime: '4 min read',
    date: 'May 10, 2026',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
    author: 'Ayesha Khan'
  }
];
