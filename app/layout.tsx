import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Script from "next/script";
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
      <head>
        {/* Preconnect to GiveButter CDN so TCP/TLS is ready before user navigates to /donate */}
        <link rel="preconnect" href="https://widgets.givebutter.com" />
        <link rel="dns-prefetch" href="https://widgets.givebutter.com" />
        <link rel="preconnect" href="https://cdn.givebutter.com" />
        <link rel="dns-prefetch" href="https://cdn.givebutter.com" />
        {/* Preconnect to Zeffy so TCP/TLS is ready before user navigates to /shop */}
        <link rel="preconnect" href="https://www.zeffy.com" />
        <link rel="dns-prefetch" href="https://www.zeffy.com" />
        <link rel="preconnect" href="https://cdn.zeffy.com" />
        <link rel="dns-prefetch" href="https://cdn.zeffy.com" />
        {/* Prefetch the exact Zeffy iframe document so the HTML is already cached */}
        <link rel="prefetch" href="https://www.zeffy.com/embed/ticketing/resourceful-impact-in-scholastic-educations-shop" as="document" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Load GiveButter globally so the web component is fully registered and cached before navigating to /donate */}
        <Script
          id="givebutter-widget"
          src="https://widgets.givebutter.com/latest.umd.cjs?acct=vlGShfXkMTiyIoYg&p=other"
          strategy="afterInteractive"
        />
        {/* Hidden prerender for widgets to force the browser to execute their internal iframes and cache everything */}
        <div style={{ display: 'none' }} aria-hidden="true">
          {/* @ts-expect-error */}
          <givebutter-widget id="LeZ9Nv"></givebutter-widget>
          <iframe src="https://www.zeffy.com/embed/ticketing/resourceful-impact-in-scholastic-educations-shop" />
        </div>
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
