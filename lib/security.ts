const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape untrusted text before it goes into an HTML email body. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

/** Only allow http(s) links in emails (blocks javascript:, data:, …). */
export function safeHttpUrl(value: unknown): string | null {
  try {
    const url = new URL(String(value ?? "").trim());
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}
