import type { Metadata, Viewport } from "next";
import { Caprasimo, Figtree } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { VideoModalProvider } from "@/components/media/VideoModal";
import { GIVEBUTTER_SCRIPT_ID, GIVEBUTTER_SCRIPT_SRC } from "@/lib/givebutter";
import { hasLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  defaultKeywords,
  organizationName,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/seo";

// Headings: Caprasimo (single weight). Body: Figtree variable.
// Self-hosted by next/font: no request to Google, no layout shift.
const caprasimo = Caprasimo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caprasimo",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

// Both languages are prerendered at build time; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#f5ead8",
};

const baseMetadata: Metadata = {
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


export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const es = lang === "es";
  return {
    ...baseMetadata,
    openGraph: { ...baseMetadata.openGraph, locale: es ? "es_US" : "en_US" },
  };
}

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
    availableLanguage: ["English", "Spanish"],
  },
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={`${caprasimo.variable} ${figtree.variable}`}>
      <head>
        {/* Warm up Givebutter so /donate opens instantly */}
        <link rel="preconnect" href="https://widgets.givebutter.com" />
        <link rel="preconnect" href="https://cdn.givebutter.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.zeffy.com" />
      </head>
      <body className="flex min-h-screen flex-col bg-page text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-page"
        >
          {dict.skipToContent}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Register the Givebutter web component once the browser is idle, so it is
            cached before a visitor reaches /donate without competing with page load. */}
        <Script
          id={GIVEBUTTER_SCRIPT_ID}
          src={GIVEBUTTER_SCRIPT_SRC}
          strategy="lazyOnload"
        />
        <LocaleProvider lang={lang}>
          <VideoModalProvider>
            <Navbar />
            <main id="main" className="flex min-h-0 flex-1 flex-col">
              {children}
            </main>
            <Footer lang={lang} />
            <ScrollToTop />
          </VideoModalProvider>
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
