import { NextRequest } from "next/server";

// In-memory store for rate limiting: IP -> last submission timestamp (ms)
const ipCache = new Map<string, number>();

// Periodic cleanup task to prevent memory leaks from old IP addresses
if (typeof globalThis !== "undefined") {
  // Store the interval globally so it doesn't get created multiple times during HMR in development
  const globalAny = globalThis as any;
  if (!globalAny.__rateLimitCleanupInterval) {
    globalAny.__rateLimitCleanupInterval = setInterval(() => {
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      for (const [ip, lastSubmit] of ipCache.entries()) {
        if (now - lastSubmit > fiveMinutes) {
          ipCache.delete(ip);
        }
      }
    }, 60 * 1000); // Run cleanup every minute
  }
}

/**
 * Gets the client IP address from the request headers.
 */
export function getClientIp(req: NextRequest): string {
  // x-forwarded-for header is standard for proxy routing (e.g. Vercel, Cloudflare, etc.)
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  
  // Alternative headers
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "127.0.0.1";
}

/**
 * Checks if the given IP address is rate limited.
 * Default is 1 submission per 5 minutes.
 * Returns an object with the result.
 */
export function checkRateLimit(ip: string, limitMs: number = 5 * 60 * 1000): { allowed: boolean; remainingMs: number } {
  const now = Date.now();
  const lastSubmit = ipCache.get(ip);

  if (lastSubmit !== undefined) {
    const elapsed = now - lastSubmit;
    if (elapsed < limitMs) {
      return { allowed: false, remainingMs: limitMs - elapsed };
    }
  }

  // Update/insert the submission timestamp
  ipCache.set(ip, now);
  return { allowed: true, remainingMs: 0 };
}
