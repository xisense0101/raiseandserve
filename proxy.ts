import { NextResponse, type NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  defaultLocale,
  hasLocale,
  stripLocale,
  type Locale,
} from "@/lib/i18n/config";

/**
 * Language routing.
 *
 *   /about     → English (rewritten internally to /en/about, served statically)
 *   /es/about  → Spanish (canonical, shareable, indexable)
 *   /en/about  → redirected to /about so English has one canonical URL
 *
 * A visitor who picked Spanish (cookie) or whose browser prefers Spanish on a
 * first visit is sent from /about to /es/about.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = stripLocale(pathname);
    return withLocaleCookie(NextResponse.redirect(url), "en", cookieLocale);
  }

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return withLocaleCookie(NextResponse.next(), "es", cookieLocale);
  }

  const preferred: Locale =
    cookieLocale && hasLocale(cookieLocale) ? cookieLocale : detectLocale(request);

  if (preferred !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? `/${preferred}` : `/${preferred}${pathname}`;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;
  // Highest-weighted language wins; only switch when Spanish is preferred over English.
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const top = ranked.find((l) => l.tag.startsWith("es") || l.tag.startsWith("en"));
  return top?.tag.startsWith("es") ? "es" : defaultLocale;
}

function withLocaleCookie(res: NextResponse, lang: Locale, current: string | undefined) {
  if (current !== lang) {
    res.cookies.set(LOCALE_COOKIE, lang, {
      path: "/",
      maxAge: LOCALE_COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }
  return res;
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (images, icons, sitemap.xml…).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
