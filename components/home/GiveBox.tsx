"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizePath } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { cn } from "@/lib/utils";

export const GIVE_AMOUNTS = [25, 50, 100, 250] as const;
export type Frequency = "once" | "monthly";

// Solid card (below the hero on phones) vs. clear glass (on top of the hero video).
const STYLES = {
  solid: {
    box: "bg-surface text-ink shadow-lg",
    tag: "tag-accent-2",
    amount: "font-bold",
    amountIdle: "border-neutral-300 hover:border-accent-400 hover:bg-accent-100/60",
    amountOn: "border-accent bg-accent-100 text-accent-800",
    toggle: "bg-neutral-100",
    toggleIdle: "hover:bg-neutral-200",
    toggleOn: "bg-surface shadow-sm",
    note: "text-neutral-700",
  },
  glass: {
    box: "border border-white/30 bg-ink/15 text-white shadow-[0_16px_48px_rgba(0,0,0,0.25)] backdrop-blur-[6px]",
    tag: "rounded-full border border-white/45 bg-white/10 px-2.5 py-0.5 text-[11px] tracking-[0.02em] text-white",
    amount: "font-heading [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]",
    amountIdle: "border-white/45 bg-white/10 hover:border-white/70 hover:bg-white/20",
    amountOn: "border-accent bg-accent",
    toggle: "border border-white/35 bg-white/10",
    toggleIdle: "hover:bg-white/15",
    toggleOn: "bg-white text-ink shadow-sm",
    note: "text-white/85",
  },
};

/**
 * Inline give box (hi-fi 1b + 1c). The choice pre-fills the Givebutter widget on /donate.
 * `glass` makes it a clear glass card, so the hero video shows through it.
 */
export default function GiveBox({ className, glass = false }: { className?: string; glass?: boolean }) {
  const { lang } = useLocale();
  const t = pageCopy.home(lang).give;
  const [amount, setAmount] = useState<number>(50);
  const [frequency, setFrequency] = useState<Frequency>("once");
  const href = `${localizePath(lang, "/donate")}?amount=${amount}&frequency=${frequency}`;
  const s = glass ? STYLES.glass : STYLES.solid;

  return (
    <div className={cn("flex w-full flex-col gap-3.5 rounded-soft-lg p-[22px] md:w-[300px]", s.box, className)}>
      <div className="flex items-center justify-between">
        <span className="font-heading text-xl">{t.title}</span>
        <span className={s.tag}>501(c)(3)</span>
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
                "rounded-full border-[1.5px] p-[11px] text-base transition-colors",
                s.amount,
                selected ? s.amountOn : s.amountIdle,
              )}
            >
              ${value}
            </button>
          );
        })}
      </div>

      <div role="radiogroup" aria-label={t.frequencyLabel} className={cn("flex rounded-full p-[3px]", s.toggle)}>
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
                selected ? s.toggleOn : s.toggleIdle,
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
      <p className={cn("text-xs", s.note)}>{t.note}</p>
    </div>
  );
}
