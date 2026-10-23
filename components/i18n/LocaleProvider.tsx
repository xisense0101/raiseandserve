"use client";

import { createContext, useContext, useEffect } from "react";
import { LOCALE_COOKIE, persistLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  // Remember the language of the page being read (e.g. someone opened a shared
  // /es link), so unprefixed links keep them in that language. English is the
  // default, so it is only written when it replaces an earlier Spanish choice.
  useEffect(() => {
    const current = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`))?.[1];
    if (current !== lang && (lang !== "en" || current)) persistLocale(lang);
  }, [lang]);

  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

/** Current language plus its UI dictionary, for client components. */
export function useLocale(): { lang: Locale; dict: Dictionary } {
  const lang = useContext(LocaleContext);
  return { lang, dict: getDictionary(lang) };
}
