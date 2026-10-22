import { Info } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { cn } from "@/lib/utils";
import { ZEFFY_SHOP_URL } from "@/lib/zeffy";

/**
 * The RISE store on Zeffy (merch and tickets), with the optional-tip note above it.
 * The iframe is in the server HTML (not lazy) so it starts loading with the page;
 * until Zeffy paints, the transparent frame shows the placeholder underneath.
 */
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
      <div className="relative h-[min(1100px,85svh)] min-h-[620px] overflow-hidden rounded-soft-lg bg-white shadow-lg">
        <div aria-hidden className="absolute inset-0 flex flex-col gap-4 p-6">
          <div className="h-7 w-1/2 animate-pulse rounded-full bg-neutral-200" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="aspect-square animate-pulse rounded-soft bg-neutral-100" />
                <div className="h-4 w-3/4 animate-pulse rounded-full bg-neutral-200" />
              </div>
            ))}
          </div>
        </div>
        <p className="sr-only" role="status">
          {t.loading}
        </p>
        <iframe
          title={t.title}
          src={ZEFFY_SHOP_URL}
          allow="payment"
          className="relative size-full border-0 bg-transparent"
        />
      </div>
    </div>
  );
}
