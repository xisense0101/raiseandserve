"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizePath } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Mobile sticky Donate / Volunteer bar (handoff 1e). Appears once the element
 * with id `watchId` (the hero) has scrolled out of view.
 */
export default function MobileGiveBar({ watchId }: { watchId: string }) {
  const { lang, dict } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, [watchId]);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-divider bg-page/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-[10px] transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
    >
      <div className="grid grid-cols-[1.4fr_1fr] gap-2.5">
        <Link href={localizePath(lang, "/donate")} tabIndex={visible ? 0 : -1} className="btn-primary py-3 text-base">
          {dict.nav.donate}
        </Link>
        <Link href={localizePath(lang, "/get-involved?tab=volunteer")} tabIndex={visible ? 0 : -1} className="btn-secondary bg-page py-3 text-base">
          {dict.nav.volunteer}
        </Link>
      </div>
    </div>
  );
}
