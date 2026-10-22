import { Info } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { cn } from "@/lib/utils";

export const ZEFFY_SHOP_URL = "https://www.zeffy.com/embed/ticketing/resourceful-impact-in-scholastic-educations-shop";

/** The RISE store on Zeffy (merch and tickets), with the optional-tip note above it. */
export default function ZeffyShop({ lang, className }: { lang: Locale; className?: string }) {
  const t = pageCopy.shop(lang);
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <details className="rounded-soft-lg bg-neutral-100 px-5 py-4 text-sm">
        <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold text-ink [&::-webkit-details-marker]:hidden">
          <Info aria-hidden className="size-4 flex-none text-accent-700" strokeWidth={2.75} />
          {t.tipTitle}
        </summary>
        <p className="m-0 mt-3 leading-relaxed text-neutral-800">{t.tipBody}</p>
      </details>
      <div className="relative h-[min(1100px,85svh)] min-h-[620px] overflow-hidden rounded-soft-lg bg-page shadow-lg">
        <p className="absolute inset-0 grid place-items-center text-sm text-neutral-700">{t.loading}</p>
        <iframe
          title={t.title}
          src={ZEFFY_SHOP_URL}
          loading="lazy"
          allow="payment"
          className="relative size-full border-0"
        />
      </div>
    </div>
  );
}
