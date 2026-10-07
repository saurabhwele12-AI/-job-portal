import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'JobAlertHub | Latest Government & Private Job Notifications 2026 - Eligibility, Dates & Apply Online',
  description: 'Free Job Alerts 2026: Discover latest Government jobs (SSC, Banking, UPSC, Railways, Defense) and Private Tech openings. View complete eligibility, age limits, application fees, syllabus PDF, and direct official apply links.',
  keywords: [
    'Job Notifications 2026',
    'Sarkari Result 2026',
    'Free Job Alert 2026',
    'Government Jobs 2026',
    'SSC CGL Notification 2026',
    'SBI PO Apply Online',
    'Railway RRB NTPC Recruitment',
    'Bank Jobs 2026',
    'Tech Jobs for Freshers',
    'Software Engineer Openings',
    '10th 12th Pass Govt Jobs',
    'Graduate Jobs India',
    'Admit Card and Exam Dates'
  ],
  authors: [{ name: 'JobAlertHub Editorial Team' }],
  creator: 'JobAlertHub',
  publisher: 'JobAlertHub Inc.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'JobAlertHub | Latest Government & Tech Job Notifications 2026',
    description: 'Instant job alerts for Government competitive exams and top Private tech careers. Check exact eligibility, dates, and apply directly.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'JobAlertHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JobAlertHub - Verified Job Notifications & Sarkari Alerts',
    description: 'Instant eligibility, fee matrix, exam syllabus, and direct apply links for all government and corporate openings.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD schema for Google WebSite indexing
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'JobAlertHub',
    url: 'https://jobalerthub.com',
    description: 'Comprehensive portal for Government examination notifications and verified Private/Tech job opportunities.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://jobalerthub.com/?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
