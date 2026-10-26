import { NextResponse, type NextRequest } from "next/server";

/**
 * Maintenance wall.
 *
 * Runs on the server before anything else, for every path (pages, prefetches,
 * /api routes, /_next assets, images), and answers with a 503 maintenance page.
 * Nothing about the request can get past it: there is no cookie, header or
 * query-string bypass. Only the logo file is let through so the page can show it.
 *
 * Off by default. To bring the wall up, set MAINTENANCE_MODE=on in Vercel
 * (Production) and redeploy; remove it (or set anything else) and redeploy to
 * take it down.
 */
const ENABLED = process.env.MAINTENANCE_MODE === "on";

// The only file served while the wall is up: the logo shown on the page itself.
const PASSTHROUGH = new Set(["/logo-mark.png"]);

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#f7fafd">
<title>Under maintenance | RISE</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Figtree:wght@400;600&display=swap" rel="stylesheet">
<style>
  :root { --page:#f7fafd; --surface:#e8f2fb; --ink:#0d2238; --accent:#0a78c4; --accent-200:#d0e7f8; --muted:#4b5b6d; }
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    display: grid; place-items: center; padding: 24px;
    background: var(--page); color: var(--ink);
    font-family: Figtree, ui-sans-serif, system-ui, sans-serif; line-height: 1.55;
  }
  main {
    width: 100%; max-width: 520px; text-align: center;
    background: var(--surface); border-radius: 28px; padding: 48px 32px;
    box-shadow: 0 12px 32px rgba(28,42,56,.12);
  }
  img { height: 56px; width: auto; }
  .spinner {
    width: 56px; height: 56px; margin: 32px auto 28px; border-radius: 50%;
    border: 5px solid var(--accent-200); border-top-color: var(--accent);
    animation: spin .9s linear infinite;
  }
  h1 { font-family: Caprasimo, ui-serif, Georgia, serif; font-weight: 400; font-size: clamp(28px, 6vw, 40px); line-height: 1.1; margin: 0 0 12px; }
  p { margin: 0; color: var(--muted); font-size: 16px; }
  p + p { margin-top: 18px; font-size: 14px; }
  .contact { margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(13,34,56,.12); }
  .contact a { color: #075589; font-weight: 600; text-decoration: none; }
  .contact a:hover { text-decoration: underline; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { .spinner { animation-duration: 2.4s; } }
</style>
</head>
<body>
<main>
  <img src="/logo-mark.png" alt="RISE" width="856" height="422">
  <div class="spinner" role="status" aria-label="Loading"></div>
  <h1>We&rsquo;re under maintenance</h1>
  <p>RISE is making improvements to this website. Please check back soon.</p>
  <p lang="es">Estamos en mantenimiento. Vuelve pronto.</p>
  <p class="contact">Contact / Contacto: <a href="mailto:support@mentrily.com">support@mentrily.com</a></p>
</main>
</body>
</html>`;

export function proxy(request: NextRequest) {
  if (!ENABLED || PASSTHROUGH.has(request.nextUrl.pathname)) return NextResponse.next();

  return new NextResponse(PAGE, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Retry-After": "3600",
      "X-Robots-Tag": "noindex",
    },
  });
}

export const config = {
  // Every path, including /api, /_next and public files.
  matcher: "/:path*",
};
