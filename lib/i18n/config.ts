export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie that remembers the visitor's language choice (read by the locale redirects in next.config.ts). */
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * English lives at the bare path (/about), Spanish under /es (/es/about).
 * Internally every page is rendered from app/[lang]; next.config.ts rewrites
 * unprefixed English URLs to /en/… so both languages stay statically generated.
 */
export function localizePath(lang: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (lang === defaultLocale) return href;
  return href === "/" ? `/${lang}` : `/${lang}${href}`;
}

/** Strip a leading /es or /en so a path can be re-localized. */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(en|es)(?=\/|$)/);
  if (!match) return pathname || "/";
  const rest = pathname.slice(match[0].length);
  return rest === "" ? "/" : rest;
}

/** Remember the visitor's language (client side; read by next.config.ts redirects on the next request). */
export function persistLocale(lang: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}
