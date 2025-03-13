import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LightWatch - Open Source Lightweight Infrastructure Monitoring",
  description: "Monitor your servers, applications, and infrastructure with minimal resource overhead and maximum security. Self-hosted, open-source monitoring solution.",
  metadataBase: new URL('https://lightwatch.archiix.dev'),
  openGraph: {
    title: "LightWatch - Open Source Lightweight Infrastructure Monitoring",
    description: "Monitor your servers, applications, and infrastructure with minimal resource overhead and maximum security. Self-hosted, open-source monitoring solution.",
    url: "https://lightwatch.archiix.dev",
    siteName: "LightWatch",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LightWatch - Open Source Infrastructure Monitoring Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LightWatch - Open Source Lightweight Infrastructure Monitoring",
    description: "Monitor your servers, applications, and infrastructure with minimal resource overhead and maximum security.",
    images: ["/og-image.png"],
    creator: "@archiix",
  },
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
  verification: {
    google: 'your-google-site-verification',
  },
  alternates: {
    canonical: "https://lightwatch.archiix.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
