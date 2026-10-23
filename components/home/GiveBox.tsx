"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizePath } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { cn } from "@/lib/utils";

export const GIVE_AMOUNTS = [25, 50, 100, 250] as const;
export type Frequency = "once" | "monthly";

/** Inline give box (hi-fi 1b + 1c). The choice pre-fills the Givebutter widget on /donate. */
export default function GiveBox({ className }: { className?: string }) {
  const { lang } = useLocale();
  const t = pageCopy.home(lang).give;
  const [amount, setAmount] = useState<number>(50);
  const [frequency, setFrequency] = useState<Frequency>("once");
  const href = `${localizePath(lang, "/donate")}?amount=${amount}&frequency=${frequency}`;

  return (
    <div className={cn("flex w-full flex-col gap-3.5 rounded-soft-lg bg-surface p-[22px] text-ink shadow-lg md:w-[300px]", className)}>
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
                  : "border-neutral-300 hover:border-accent-400 hover:bg-accent-100/60",
              )}
            >
              ${value}
            </button>
          );
        })}
      </div>

      <div role="radiogroup" aria-label={t.frequencyLabel} className="flex rounded-full bg-neutral-100 p-[3px]">
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
                selected ? "bg-surface shadow-sm" : "hover:bg-neutral-200",
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
      <p className="text-xs text-neutral-700">{t.note}</p>
    </div>
  );
}
