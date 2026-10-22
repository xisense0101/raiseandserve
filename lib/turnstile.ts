import "server-only";
import type { TurnstileAction } from "./turnstile-actions";
import { TURNSTILE_TEST_SECRET_KEY } from "./turnstile-config";

/**
 * Cloudflare Turnstile server-side verification.
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 *
 * Every form endpoint must call this before doing any work. The token comes
 * from the <Turnstile> widget, is single-use and expires after 5 minutes.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Use the real secret only when both real keys are configured. A real secret
 * rejects the test widget's dummy token, so pairing a real secret with the
 * test site key would break every form.
 */
function resolveSecret(): string {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return secret;
  if (process.env.VERCEL_ENV === "production") {
    console.warn("[turnstile] Real keys are not fully configured; using Cloudflare test keys (no bot protection).");
  }
  return TURNSTILE_TEST_SECRET_KEY;
}

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
  const secret = resolveSecret();

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
