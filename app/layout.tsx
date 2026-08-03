import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Let's Trawell - Your Customized Travel Partner | Domestic & International Tours",
  description: "Book customized domestic and international tour packages, luxury honeymoon escapes, 5-star hotels, flights, and visa assistance with Let's Trawell.",
  keywords: "travel agency, customized tours, holiday packages, Goa packages, Maldives honeymoon, Dubai tours, Kashmir travel, visa assistance",
  openGraph: {
    title: "Let's Trawell - Your Customized Travel Partner",
    description: "Unforgettable customized journeys around the world with 24x7 concierge support.",
    url: "https://letstrawell.com",
    siteName: "Let's Trawell",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
