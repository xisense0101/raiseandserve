"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizePath } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { cn } from "@/lib/utils";

export const GIVE_AMOUNTS = [25, 50, 100, 250] as const;
export type Frequency = "once" | "monthly";

/**
 * Inline give box (hi-fi 1b + 1c). The choice pre-fills the Givebutter widget on /donate.
 * `glass` makes it frosted and see-through, for when it sits on the hero video.
 */
export default function GiveBox({ className, glass = false }: { className?: string; glass?: boolean }) {
  const { lang } = useLocale();
  const t = pageCopy.home(lang).give;
  const [amount, setAmount] = useState<number>(50);
  const [frequency, setFrequency] = useState<Frequency>("once");
  const href = `${localizePath(lang, "/donate")}?amount=${amount}&frequency=${frequency}`;

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-3.5 rounded-soft-lg p-[22px] text-ink md:w-[300px]",
        glass
          ? "border border-white/60 bg-surface/55 shadow-[0_12px_40px_rgba(13,34,56,0.28)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-surface shadow-lg",
        className,
      )}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-heading text-xl">{t.title}</span>
        <span className="tag-accent-2">501(c)(3)</span>
      </div>

      <div role="radiogroup" aria-label={t.amountsLabel} className="grid grid-cols-2 gap-2">
        {GIVE_AMOUNTS.map((value) => {
          const selected = value === amount;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setAmount(value)}
              className={cn(
                "rounded-full border-[1.5px] p-[11px] text-base font-bold transition-colors",
                selected
                  ? "border-accent bg-accent-100 text-accent-800"
                  : glass
                    ? "border-white/80 bg-white/45 hover:border-accent-400 hover:bg-white/70"
                    : "border-neutral-300 hover:border-accent-400 hover:bg-accent-100/60",
              )}
            >
              ${value}
            </button>
          );
        })}
      </div>

      <div role="radiogroup" aria-label={t.frequencyLabel} className={cn("flex rounded-full p-[3px]", glass ? "bg-white/45" : "bg-neutral-100")}>
        {(["once", "monthly"] as const).map((f) => {
          const selected = f === frequency;
          return (
            <button
              key={f}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setFrequency(f)}
              className={cn(
                "flex-1 rounded-full p-[7px] text-[13px] font-semibold transition-all",
                selected ? (glass ? "bg-white shadow-sm" : "bg-surface shadow-sm") : glass ? "hover:bg-white/50" : "hover:bg-neutral-200",
              )}
            >
              {f === "once" ? t.once : t.monthly}
            </button>
          );
        })}
      </div>

      <Link href={href} className="btn-primary p-[13px] text-base">
        {t.cta(amount, frequency === "monthly")}
      </Link>
      <p className={cn("text-xs", glass ? "text-neutral-900" : "text-neutral-700")}>{t.note}</p>
    </div>
  );
}
