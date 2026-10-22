"use client";

import { useEffect } from "react";
import { warmDonation, warmShop } from "@/lib/warmup";

const DONATE = /^(\/es)?\/donate\/?$/;
const SHOP = /^(\/es)?\/shop\/?$/;
const INVOLVED = /^(\/es)?\/get-involved\/?$/;

/** Starts loading the donation form or the shop when a visitor is about to open it. */
export default function IntentWarmup() {
  useEffect(() => {
    const onIntent = (e: Event) => {
      if (e instanceof PointerEvent && e.pointerType !== "mouse") return; // touch is handled by touchstart
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      // The Get involved tabs link to their own page (?tab=shop), so that check comes first.
      if (SHOP.test(url.pathname) || (INVOLVED.test(url.pathname) && url.searchParams.get("tab") === "shop")) warmShop();
      else if (DONATE.test(url.pathname) && !DONATE.test(location.pathname)) {
        warmDonation(url.searchParams.get("amount"), url.searchParams.get("frequency"));
      }
    };
    const opts = { capture: true, passive: true } as const;
    document.addEventListener("pointerover", onIntent, opts);
    document.addEventListener("touchstart", onIntent, opts);
    document.addEventListener("focusin", onIntent, opts);
    return () => {
      document.removeEventListener("pointerover", onIntent, opts);
      document.removeEventListener("touchstart", onIntent, opts);
      document.removeEventListener("focusin", onIntent, opts);
    };
  }, []);
  return null;
}
