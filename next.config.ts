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
 * Routes from the new IA that are not built yet point at today's pages.
 * Temporary (307) so nothing is cached; swap for the real pages per build order:
 *   /programs     → step 7 (Programs page)
 *   /get-involved → step 7 (tabs: volunteer / apply / partner / shop)
 */
const interimRedirects = [
  { from: "/programs", to: "/services" },
  { from: "/get-involved", to: "/volunteer" },
].flatMap(({ from, to }) => [
  { source: from, destination: to, permanent: false },
  { source: `/es${from}`, destination: `/es${to}`, permanent: false },
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
    return interimRedirects;
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
