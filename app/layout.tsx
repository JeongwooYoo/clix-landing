import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Clix – Duolingo-grade push notifications in 5 minutes',
  description: 'Clix lets product & growth teams ship high-performing, adaptive push notifications as fast as they think of them.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    title: 'Clix',
    description: 'Build Duolingo-grade push notifications in 5 minutes.',
    url: 'https://example.com',
    siteName: 'Clix',
    images: [
      {
        url: 'https://dummyimage.com/1200x630/0a0a0a/ffffff&text=Clix',
        width: 1200,
        height: 630,
        alt: 'Clix – Push notifications platform'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clix',
    description: 'Build Duolingo-grade push notifications in 5 minutes.'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <footer className="mt-24 border-t border-white/5 py-10 text-center text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Clix. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
