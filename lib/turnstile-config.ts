/**
 * Turnstile keys, with Cloudflare's documented test keys as the fallback
 * (https://developers.cloudflare.com/turnstile/troubleshooting/testing/).
 *
 * Production sets the real keys in Vercel. Anywhere they aren't set (local
 * dev, preview deployments on *.vercel.app, which the real widget's hostname
 * list doesn't include) the test pair is used: the widget renders, always
 * passes, and the server check accepts its dummy token. Forms keep working,
 * but without bot protection, so the real keys must be set for production.
 */

export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

/** Public site key for the widget (inlined into the client bundle at build time). */
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TURNSTILE_TEST_SITE_KEY;

/** True when the widget is running with the test key. */
export const TURNSTILE_IS_TEST = TURNSTILE_SITE_KEY === TURNSTILE_TEST_SITE_KEY;
