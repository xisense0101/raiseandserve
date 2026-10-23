"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const INVOLVED_TABS = ["volunteer", "apply", "partner", "shop"] as const;
export type InvolvedTab = (typeof INVOLVED_TABS)[number];

type Props = {
  labels: Record<InvolvedTab, { label: string; hint: string }>;
  panels: Record<InvolvedTab, ReactNode>;
};

const isTab = (v: string | null): v is InvolvedTab => INVOLVED_TABS.includes(v as InvolvedTab);

/** Reads ?tab= (so other pages can deep-link a path). Render inside <Suspense>. */
export default function InvolvedTabs(props: Props) {
  const raw = useSearchParams().get("tab");
  return <TabsView {...props} active={isTab(raw) ? raw : "volunteer"} />;
}

/** Static view, also used as the Suspense fallback while the search params load. */
export function TabsView({ labels, panels, active }: Props & { active: InvolvedTab }) {
  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {INVOLVED_TABS.map((tab) => {
          const selected = tab === active;
          return (
            <Link
              key={tab}
              role="tab"
              id={`tab-${tab}`}
              aria-selected={selected}
              aria-controls="involved-panel"
              href={`?tab=${tab}`}
              replace
              scroll={false}
              className={cn(
                "flex flex-col gap-0.5 rounded-soft-lg border-[1.5px] px-4 py-3.5 no-underline transition-colors",
                selected ? "border-ink bg-ink text-page" : "border-neutral-300 bg-surface text-ink hover:border-neutral-500",
              )}
            >
              <b className="font-heading text-lg font-normal">{labels[tab].label}</b>
              <span className={cn("text-[13px]", selected ? "text-neutral-300" : "text-neutral-700")}>{labels[tab].hint}</span>
            </Link>
          );
        })}
      </div>
      <div role="tabpanel" id="involved-panel" aria-labelledby={`tab-${active}`}>
        {panels[active]}
      </div>
    </div>
  );
}
