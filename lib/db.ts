import fs from 'fs';
import path from 'path';

export interface BookingRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  destination: string;
  travelDate?: string;
  message?: string;
  source: 'Contact Form' | 'Booking Modal' | 'Quick Quote';
  packageName?: string;
  guests?: number;
  status: 'New' | 'Contacted' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}

const dataDir = path.join(process.cwd(), 'data');
const filePath = path.join(dataDir, 'bookings.json');

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function getAllBookings(): BookingRecord[] {
  ensureDataFile();
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Failed to read bookings database:', error);
    return [];
  }
}

export function saveBooking(newRecord: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>): BookingRecord {
  ensureDataFile();
  const bookings = getAllBookings();
  
  const record: BookingRecord = {
    ...newRecord,
    id: 'BK-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 5).toUpperCase(),
    status: 'New',
    createdAt: new Date().toISOString(),
  };

  bookings.unshift(record); // newest first
  fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2), 'utf-8');
  return record;
}

export function updateBookingStatus(id: string, status: BookingRecord['status']): BookingRecord | null {
  ensureDataFile();
  const bookings = getAllBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;

  bookings[index].status = status;
  fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2), 'utf-8');
  return bookings[index];
}

export function deleteBooking(id: string): boolean {
  ensureDataFile();
  let bookings = getAllBookings();
  const initialLen = bookings.length;
  bookings = bookings.filter((b) => b.id !== id);
  if (bookings.length === initialLen) return false;

  fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2), 'utf-8');
  return true;
}
