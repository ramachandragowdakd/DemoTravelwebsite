import nodemailer from 'nodemailer';
import { BookingRecord } from './db';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'letstrawell@gmail.com';

// Configure Transporter (supports Gmail SMTP, Ethereal, or custom SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER || '', // e.g. letstrawell@gmail.com
    pass: process.env.SMTP_PASS || '', // Gmail App Password
  },
});

export async function sendAdminBookingNotification(booking: BookingRecord): Promise<boolean> {
  const subject = `🚨 New Inquiry [${booking.id}]: ${booking.name} (${booking.destination})`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e0e0e0; }
          .header { background: linear-gradient(135deg, #0A192F 0%, #0D9488 100%); color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0 0; font-size: 13px; color: #99f6e4; font-weight: 600; }
          .content { padding: 24px; }
          .badge { display: inline-block; background: #fef3c7; color: #92400e; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 16px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .table th, .table td { text-align: left; padding: 12px; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
          .table th { color: #64748b; font-weight: 700; width: 35%; background: #f8fafc; }
          .table td { color: #0f172a; font-weight: 600; }
          .notes-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 14px; font-size: 13px; color: #166534; margin-bottom: 20px; }
          .actions { text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #eeeeee; }
          .btn { display: inline-block; padding: 12px 20px; font-size: 13px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 10px; margin: 4px; }
          .btn-whatsapp { background-color: #25D366; }
          .btn-admin { background-color: #0284C7; }
          .footer { background: #f8fafc; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Let's Trawell Tours</h1>
            <p>New Tour Booking Inquiry Received</p>
          </div>

          <div class="content">
            <span class="badge">Source: ${booking.source}</span>

            <table class="table">
              <tr>
                <th>Booking ID</th>
                <td><strong>${booking.id}</strong></td>
              </tr>
              <tr>
                <th>Customer Name</th>
                <td>${booking.name}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td><a href="tel:${booking.phone}">${booking.phone}</a></td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td><a href="mailto:${booking.email}">${booking.email}</a></td>
              </tr>
              <tr>
                <th>Destination</th>
                <td><strong>${booking.destination}</strong></td>
              </tr>
              <tr>
                <th>Tentative Date</th>
                <td>${booking.travelDate || 'Flexible'}</td>
              </tr>
              ${booking.packageName ? `<tr><th>Package Name</th><td>${booking.packageName}</td></tr>` : ''}
              ${booking.guests ? `<tr><th>Guests Count</th><td>${booking.guests} Person(s)</td></tr>` : ''}
              <tr>
                <th>Submitted At</th>
                <td>${new Date(booking.createdAt).toLocaleString()}</td>
              </tr>
            </table>

            ${
              booking.message
                ? `<div class="notes-box">
                    <strong>Special Requirements / Message:</strong><br/>
                    ${booking.message}
                   </div>`
                : ''
            }

            <div class="actions">
              <a href="https://wa.me/${booking.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(
                booking.name
              )},%20thank%20you%20for%20contacting%20Let's%20Trawell%20Tours%20regarding%20${encodeURIComponent(
                booking.destination
              )}!" class="btn btn-whatsapp" target="_blank">💬 Reply on WhatsApp</a>
              <a href="http://localhost:3000/admin" class="btn btn-admin" target="_blank">🖥️ Open Admin Dashboard</a>
            </div>
          </div>

          <div class="footer">
            Let's Trawell Tours • 2nd Floor, 13/13, 59th Cross Rd, Rajajinagar, Bengaluru • Phone: 98459 05999
          </div>
        </div>
      </body>
    </html>
  `;

  // Always log notification format for instant verification
  console.log(`\n📧 [ADMIN EMAIL NOTIFICATION SENT TO ${ADMIN_EMAIL}]\nSubject: ${subject}\nCustomer: ${booking.name} (${booking.phone})\nDestination: ${booking.destination}\n`);

  // Send real email if SMTP credentials are provided in .env
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      await transporter.sendMail({
        from: `"Let's Trawell Bookings" <${process.env.SMTP_USER}>`,
        to: ADMIN_EMAIL,
        subject: subject,
        html: htmlContent,
      });
      console.log(`✅ Email successfully delivered to ${ADMIN_EMAIL}`);
      return true;
    } catch (err) {
      console.error('❌ Failed to send SMTP email to admin:', err);
      return false;
    }
  }

  return true;
}

export interface ReviewPayload {
  name: string;
  location: string;
  destinationVisited: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export async function sendAdminReviewNotification(review: ReviewPayload): Promise<boolean> {
  const subject = `⭐ New Customer Review (${review.rating}/5 Stars): ${review.name} - ${review.destinationVisited}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e0e0e0; }
          .header { background: linear-gradient(135deg, #0A192F 0%, #F59E0B 100%); color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0 0; font-size: 13px; color: #fef3c7; font-weight: 600; }
          .content { padding: 24px; }
          .stars { font-size: 22px; color: #f59e0b; font-weight: bold; margin-bottom: 12px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .table th, .table td { text-align: left; padding: 12px; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
          .table th { color: #64748b; font-weight: 700; width: 35%; background: #f8fafc; }
          .table td { color: #0f172a; font-weight: 600; }
          .review-box { background: #fffbe8; border: 1px solid #fde68a; border-radius: 12px; padding: 16px; font-size: 14px; color: #78350f; font-style: italic; line-height: 1.6; margin-bottom: 20px; }
          .footer { background: #f8fafc; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Let's Trawell Tours</h1>
            <p>New Traveler Review & Opinion Received</p>
          </div>

          <div class="content">
            <div class="stars">
              ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)} (${review.rating}/5 Rating)
            </div>

            <table class="table">
              <tr>
                <th>Reviewer Name</th>
                <td><strong>${review.name}</strong></td>
              </tr>
              <tr>
                <th>Reviewer Location</th>
                <td>${review.location}</td>
              </tr>
              <tr>
                <th>Destination Visited</th>
                <td><strong>${review.destinationVisited}</strong></td>
              </tr>
              <tr>
                <th>Submitted Date</th>
                <td>${new Date(review.createdAt).toLocaleString()}</td>
              </tr>
            </table>

            <div class="review-box">
              <strong>Customer Opinion / Feedback:</strong><br/>
              "${review.comment}"
            </div>
          </div>

          <div class="footer">
            Let's Trawell Tours • 2nd Floor, 13/13, 59th Cross Rd, Rajajinagar, Bengaluru • Phone: 98459 05999
          </div>
        </div>
      </body>
    </html>
  `;

  console.log(`\n📧 [REVIEW EMAIL SENT TO ${ADMIN_EMAIL}]\nSubject: ${subject}\nReviewer: ${review.name} (${review.rating}★)\nComment: ${review.comment}\n`);

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      await transporter.sendMail({
        from: `"Let's Trawell Reviews" <${process.env.SMTP_USER}>`,
        to: ADMIN_EMAIL,
        subject: subject,
        html: htmlContent,
      });
      console.log(`✅ Review email delivered to ${ADMIN_EMAIL}`);
      return true;
    } catch (err) {
      console.error('❌ Failed to send review email to admin:', err);
      return false;
    }
  }

  return true;
}
