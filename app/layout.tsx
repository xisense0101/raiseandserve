import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  defaultKeywords,
  organizationName,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/seo";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | ${organizationName}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: defaultKeywords,
  applicationName: siteName,
  authors: [{ name: "RISE Team", url: siteUrl }],
  creator: "RISE Team",
  publisher: "RISE Team",
  manifest: "/site.webmanifest",
  category: "Nonprofit",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${siteName} | ${organizationName}`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: "/logo.jpeg",
        width: 1024,
        height: 791,
        alt: "RISE Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | ${organizationName}`,
    description: siteDescription,
    images: ["/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${siteUrl}/#organization`,
  name: organizationName,
  alternateName: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.jpeg`,
  image: `${siteUrl}/logo.jpeg`,
  description: siteDescription,
  telephone: "+1-972-523-3544",
  address: {
    "@type": "PostalAddress",
    streetAddress: "539 W Commerce St Suite 6954",
    addressLocality: "Dallas",
    addressRegion: "TX",
    postalCode: "75208",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Communities served by RISE",
  },
  knowsAbout: [
    "Community feeding",
    "Accessible education",
    "Career development",
    "Food support",
    "Clothing drives",
    "Community service",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-972-523-3544",
    contactType: "Community support",
    areaServed: "US",
    availableLanguage: "English",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main className="flex flex-1 min-h-0 flex-col">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
