import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Payment is left open on purpose: Givebutter's iframe uses Apple Pay / Google Pay.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

/**
 * Old URLs from before the redesign, kept alive for links and search results.
 * Permanent (308) now that the new pages have shipped.
 */
const legacyRedirects = [
  { from: "/services", to: "/programs" },
  { from: "/volunteer", to: "/get-involved?tab=volunteer" },
  { from: "/apply", to: "/get-involved?tab=apply" },
].flatMap(({ from, to }) => [
  { source: from, destination: to, permanent: true },
  { source: `/es${from}`, destination: `/es${to}`, permanent: true },
]);

/**
 * Language routing, done by Vercel's router instead of a proxy function, so
 * every page is served straight from the CDN with no function in front of it.
 *
 *   /about     → English, rewritten internally to the static /en/about
 *   /es/about  → Spanish (canonical, shareable, indexable)
 *   /en/about  → redirected to /about so English has one canonical URL
 *
 * Unprefixed URLs go to Spanish for visitors who picked Spanish (NEXT_LOCALE
 * cookie) or, on a first visit, whose browser lists Spanish first.
 */
// Any unprefixed page path: not /es, /en, an API or Next internal, and no file extension.
const UNPREFIXED = "/:path((?!(?:es|en|api|_next|_vercel)(?:/|$))[^.]+)";
const PREFERS_SPANISH = [
  { has: [{ type: "cookie" as const, key: "NEXT_LOCALE", value: "es" }] },
  {
    // Next anchors this pattern to the whole header, so it means "starts with es".
    has: [{ type: "header" as const, key: "accept-language", value: "[eE][sS](?:[-_,;].*)?" }],
    missing: [{ type: "cookie" as const, key: "NEXT_LOCALE" }],
  },
];

const localeRedirects = [
  { source: "/en", destination: "/", permanent: false },
  { source: "/en/:path*", destination: "/:path*", permanent: false },
  ...PREFERS_SPANISH.flatMap((when) => [
    { source: "/", destination: "/es", permanent: false, ...when },
    { source: UNPREFIXED, destination: "/es/:path", permanent: false, ...when },
  ]),
];

const localeRewrites = [
  { source: "/", destination: "/en" },
  { source: UNPREFIXED, destination: "/en/:path" },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [new URL("https://res.cloudinary.com/**")],
  },
  async redirects() {
    return [...legacyRedirects, ...localeRedirects];
  },
  async rewrites() {
    // afterFiles: public files, /api and metadata routes (sitemap, icons) are served first.
    return { beforeFiles: [], afterFiles: localeRewrites, fallback: [] };
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
