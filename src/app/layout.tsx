import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Configurable production domain via environment variable (avoids unconfirmed hardcoded domains)
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Xentro — Entrepreneurial Infrastructure',
    template: '%s | Xentro',
  },
  description:
    'Xentro helps founders navigate the startup ecosystem with relevant opportunities, meaningful connections, and clearer next steps—all through one connected ecosystem.',
  icons: {
    icon: '/assets/Metalog.png',
    apple: '/assets/Metalog.png',
  },
  openGraph: {
    title: 'Xentro — Entrepreneurial Infrastructure',
    description:
      'Know what comes next. Built for founders first—and designed to connect mentors, investors, institutions, and opportunities around the startup journey.',
    url: siteUrl,
    siteName: 'Xentro',
    images: [
      {
        url: '/assets/Metalog.png',
        width: 512,
        height: 512,
        alt: 'Xentro Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xentro — Entrepreneurial Infrastructure',
    description:
      'Know what comes next. Connect mentors, investors, institutions, and opportunities around the startup journey.',
    images: ['/assets/Metalog.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/png" href="/assets/Metalog.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
