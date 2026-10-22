"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localizePath, persistLocale, stripLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { useLocale } from "./LocaleProvider";

/** EN/ES pill toggle. The choice is stored in a cookie that proxy.ts honours. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, dict } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const basePath = stripLocale(pathname ?? "/");

  const choose = (event: React.MouseEvent<HTMLAnchorElement>, next: Locale) => {
    event.preventDefault();
    if (next === lang) return;
    // Write the cookie before navigating so the proxy doesn't bounce us back.
    persistLocale(next);
    const { search, hash } = window.location;
    router.push(`${localizePath(next, basePath)}${search}${hash}`, { scroll: false });
  };

  return (
    <div
      role="group"
      aria-label={dict.language.label}
      className={cn(
        "flex shrink-0 gap-0.5 rounded-full border-[1.5px] border-neutral-300 p-[3px]",
        className,
      )}
    >
      {locales.map((l) => {
        const active = l === lang;
        return (
          <a
            key={l}
            href={localizePath(l, basePath)}
            hrefLang={l}
            lang={l}
            aria-label={dict.language[l]}
            aria-current={active ? "true" : undefined}
            onClick={(e) => choose(e, l)}
            className={cn(
              "rounded-full px-2.5 py-[5px] text-xs leading-none font-bold transition-colors",
              active ? "bg-ink text-page" : "text-ink hover:bg-accent-100 hover:text-accent-800",
            )}
          >
            {l.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
}
