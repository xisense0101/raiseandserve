import "server-only";
import type { TurnstileAction } from "./turnstile-actions";

/**
 * Cloudflare Turnstile server-side verification.
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 *
 * Every form endpoint must call this before doing any work. The token comes
 * from the <Turnstile> widget, is single-use and expires after 5 minutes.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";


type SiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  action?: string;
  hostname?: string;
  challenge_ts?: string;
};

export type TurnstileResult = { ok: true } | { ok: false; status: number; error: string };

const FAILED: TurnstileResult = {
  ok: false,
  status: 403,
  error: "We couldn't verify you're human. Please refresh the page and try again.",
};

export async function verifyTurnstile(
  token: unknown,
  ip: string,
  expectedAction: TurnstileAction,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    // Fail closed in production; let local development work without keys.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[turnstile] TURNSTILE_SECRET_KEY is not set; skipping verification in development.");
      return { ok: true };
    }
    console.error("[turnstile] TURNSTILE_SECRET_KEY is not set; rejecting submission.");
    return { ok: false, status: 503, error: "Form verification is temporarily unavailable. Please try again later." };
  }

  if (typeof token !== "string" || token.length === 0 || token.length > 2048) {
    return FAILED;
  }

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: ip,
        idempotency_key: crypto.randomUUID(),
      }),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    const data = (await res.json()) as SiteverifyResponse;

    if (!data.success) {
      console.warn("[turnstile] verification failed", data["error-codes"]);
      return FAILED;
    }
    if (data.action && data.action !== expectedAction) {
      console.warn(`[turnstile] action mismatch: expected ${expectedAction}, got ${data.action}`);
      return FAILED;
    }
    return { ok: true };
  } catch (error) {
    console.error("[turnstile] siteverify request failed", error);
    return { ok: false, status: 503, error: "Verification service is unavailable. Please try again in a moment." };
  }
}
