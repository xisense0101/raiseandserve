import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.warn("WARNING: RESEND_API_KEY is not defined in the environment variables. Emails will fail to send until this is configured.");
}

// Initialize the Resend client
// A dummy key is supplied as a fallback to prevent Next.js build-time errors if variables are not yet present.
export const resend = new Resend(apiKey || "re_123456789_placeholder");
