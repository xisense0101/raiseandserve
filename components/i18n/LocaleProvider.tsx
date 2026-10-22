"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

/** Current language plus its UI dictionary, for client components. */
export function useLocale(): { lang: Locale; dict: Dictionary } {
  const lang = useContext(LocaleContext);
  return { lang, dict: getDictionary(lang) };
}
