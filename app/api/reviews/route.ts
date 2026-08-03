import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendAdminReviewNotification } from '@/lib/email';

export interface SavedReview {
  id: string;
  name: string;
  location: string;
  destinationVisited: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  createdAt: string;
}

const dataDir = path.join(process.cwd(), 'data');
const filePath = path.join(dataDir, 'reviews.json');

const DEFAULT_REVIEWS: SavedReview[] = [
  {
    id: 'rev-1',
    name: 'Ananya & Rahul Sharma',
    location: 'Bengaluru, India',
    destinationVisited: 'Coorg & Mysore Special',
    rating: 5,
    comment: 'Let’s Trawell organized an unforgettable 2-day trip to Coorg for our family! The private AC coach was extremely comfortable, driver was super punctual, and hotel stays in Madikeri were top class.',
    date: '2 days ago',
    likes: 14,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
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
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
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
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
];

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(DEFAULT_REVIEWS, null, 2), 'utf-8');
  }
}

function getAllReviews(): SavedReview[] {
  ensureDataFile();
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Failed to read reviews database:', error);
    return DEFAULT_REVIEWS;
  }
}

export async function GET() {
  try {
    const reviews = getAllReviews();
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error('GET /api/reviews error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, location, destinationVisited, rating, comment } = body;

    if (!name || !comment) {
      return NextResponse.json({ success: false, message: 'Name and comment are required fields.' }, { status: 400 });
    }

    ensureDataFile();
    const reviews = getAllReviews();

    const newReview: SavedReview = {
      id: 'rev-' + Date.now().toString(36),
      name: name.trim(),
      location: location?.trim() || 'Valued Guest',
      destinationVisited: destinationVisited?.trim() || 'Custom Tour',
      rating: Number(rating) || 5,
      comment: comment.trim(),
      date: 'Just now',
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    reviews.unshift(newReview); // Newest first
    fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2), 'utf-8');

    // Email alert to letstrawell@gmail.com
    sendAdminReviewNotification({
      name: newReview.name,
      location: newReview.location,
      destinationVisited: newReview.destinationVisited,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: newReview.createdAt,
    }).catch((err) => console.error('Background review email dispatch error:', err));

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your travel review & opinion has been published and emailed to Let’s Trawell Tours.',
      review: newReview,
    });
  } catch (error) {
    console.error('POST /api/reviews error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit review' }, { status: 500 });
  }
}
