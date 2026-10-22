"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizePath, stripLocale } from "@/lib/i18n/config";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Old routes that now live under a new nav item, so the item still lights up. */
const ACTIVE_ALIASES: Record<string, string[]> = {
  "/programs": ["/services"],
  "/get-involved": ["/volunteer", "/apply", "/shop", "/contact"],
};

function isActive(path: string, href: string) {
  return [href, ...(ACTIVE_ALIASES[href] ?? [])].some(
    (h) => path === h || path.startsWith(`${h}/`),
  );
}

export default function Navbar() {
  const { lang, dict } = useLocale();
  const pathname = usePathname() ?? "/";
  const path = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const links = NAV_LINKS.filter((l) => l.ready);
  const href = (h: string) => localizePath(lang, h);

  const close = () => setOpen(false);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-page/92 backdrop-blur-[10px]">
      <nav
        aria-label={dict.nav.primaryLabel}
        className="mx-auto flex max-w-site items-center gap-2 px-4 min-[400px]:gap-3 py-3 sm:px-6 lg:gap-[22px] lg:py-3.5"
      >
        <Link
          href={href("/")}
          onClick={close}
          className="mr-auto flex items-center gap-2.5 rounded-[14px] text-ink no-underline"
        >
          <Image
            src="/logo.jpeg"
            alt=""
            width={46}
            height={46}
            priority
            className="size-10 rounded-[14px] bg-white object-contain sm:size-[46px]"
          />
          <span className="hidden font-heading text-xl leading-none min-[400px]:inline">RISE</span>
          <span className="sr-only">{dict.orgName}</span>
        </Link>

        <ul className="hidden items-center gap-1 text-sm font-semibold lg:flex">
          {links.map((l) => {
            const active = isActive(path, l.href);
            return (
              <li key={l.key}>
                <Link
                  href={href(l.href)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 transition-colors hover:bg-accent-100 hover:text-accent-800",
                    active ? "bg-accent-100 text-accent-800" : "text-ink",
                  )}
                >
                  {dict.nav[l.key]}
                </Link>
              </li>
            );
          })}
        </ul>

        <LanguageSwitch />

        <Link
          href={href("/donate")}
          onClick={close}
          className="btn-primary px-4 py-2 text-sm sm:px-[22px] sm:py-2.5 sm:text-[15px]"
        >
          {dict.nav.donate}
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-1 grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-accent-100 lg:hidden"
        >
          <span className="sr-only">{open ? dict.nav.closeMenu : dict.nav.openMenu}</span>
          {open ? (
            <X aria-hidden className="size-6" strokeWidth={2.75} />
          ) : (
            <Menu aria-hidden className="size-6" strokeWidth={2.75} />
          )}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-divider bg-page px-4 pt-2 pb-6 shadow-md sm:px-6 lg:hidden"
      >
        <ul className="flex flex-col">
          {[{ key: "home" as const, href: "/" }, ...links].map((l) => {
            const active = l.href === "/" ? path === "/" : isActive(path, l.href);
            return (
              <li key={l.key}>
                <Link
                  href={href(l.href)}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-soft px-3 py-3 font-heading text-xl transition-colors hover:bg-accent-100 hover:text-accent-800",
                    active && "text-accent-700",
                  )}
                >
                  {dict.nav[l.key]}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Link href={href("/donate")} onClick={close} className="btn-primary px-4 py-3 text-base">
            {dict.nav.donate}
          </Link>
          <Link href={href("/volunteer")} onClick={close} className="btn-secondary px-4 py-3 text-base">
            {dict.nav.volunteer}
          </Link>
        </div>
      </div>
    </header>
  );
}
