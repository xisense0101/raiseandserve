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
    return legacyRedirects;
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
