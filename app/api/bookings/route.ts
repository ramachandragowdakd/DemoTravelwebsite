import { NextResponse } from 'next/server';
import { getAllBookings, saveBooking, updateBookingStatus, deleteBooking } from '@/lib/db';
import { sendAdminBookingNotification } from '@/lib/email';

export async function GET() {
  try {
    const bookings = getAllBookings();
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('GET /api/bookings error:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, destination, travelDate, message, source, packageName, guests } = body;

    if (!name || !phone || !email || !destination) {
      return NextResponse.json(
        { success: false, message: 'Name, phone, email, and destination are required fields.' },
        { status: 400 }
      );
    }

    const newRecord = saveBooking({
      name,
      phone,
      email,
      destination,
      travelDate: travelDate || '',
      message: message || '',
      source: source || 'Contact Form',
      packageName: packageName || '',
      guests: guests ? Number(guests) : undefined,
    });

    // Send Admin Email Notification to letstrawell@gmail.com
    sendAdminBookingNotification(newRecord).catch((err) => {
      console.error('Background email dispatch error:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been successfully recorded! Our team at Let’s Trawell Tours will contact you shortly.',
        booking: newRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/bookings error:', error);
    return NextResponse.json({ success: false, message: 'Server error saving booking inquiry' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Missing booking ID or status' }, { status: 400 });
    }

    const updated = updateBookingStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error('PATCH /api/bookings error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update booking status' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Booking ID required' }, { status: 400 });
    }

    const deleted = deleteBooking(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Booking record deleted' });
  } catch (error) {
    console.error('DELETE /api/bookings error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete booking' }, { status: 500 });
  }
}
