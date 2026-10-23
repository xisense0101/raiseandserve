import type { Metadata } from "next";

export const siteUrl = "https://riseandserve.org";
export const siteName = "RISE";
export const organizationName = "Resourceful Impact in Scholastic Education";
export const siteDescription =
  "RISE empowers communities through community feeding, accessible education, career development, food support, clothing drives, and essential assistance.";

export const defaultKeywords = [
  "RISE",
  "Resourceful Impact in Scholastic Education",
  "community nonprofit",
  "community charity",
  "community feeding",
  "food support",
  "accessible education",
  "career development",
  "clothing drives",
  "volunteer opportunities",
  "donate to community programs",
];

export const publicRoutes = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/programs", priority: 0.9 },
  { path: "/events", priority: 0.8 },
  { path: "/get-involved", priority: 0.8 },
  { path: "/shop", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/donate", priority: 0.9 },
  { path: "/gallery", priority: 0.7 },
  { path: "/gallery/2026-07-06-community-meal", priority: 0.6 },
  { path: "/gallery/2026-07-20-pantry-fill", priority: 0.6 },
] as const;

type SeoConfig = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = "/logo.jpeg",
}: SeoConfig): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        image === "/logo.jpeg"
          ? { url: image, width: 1024, height: 791, alt: `${siteName} logo` }
          : { url: image, width: 1200, height: 628, alt: title },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
