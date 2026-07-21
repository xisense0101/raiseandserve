"use client";

import { useEffect } from "react";

export default function DonatePageClient() {
  // Monitor GiveButter checkout events via postMessage (for analytics/logging)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin.includes("givebutter.com") ||
        event.origin.includes("simplyk")
      ) {
        let eventName = "checkout.message";
        let eventData = event.data;

        if (typeof event.data === "string") {
          try {
            const parsed = JSON.parse(event.data);
            eventName = parsed.event || parsed.type || "checkout.message";
            eventData = parsed;
          } catch {
            eventName = "raw.message";
          }
        } else if (event.data && typeof event.data === "object") {
          eventName =
            event.data.event ||
            event.data.type ||
            event.data.action ||
            "checkout.data";
        }

        console.log(`[Givebutter Event] ${eventName}:`, eventData);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center pt-8 pb-12 px-4 gap-6">
        {/* Tip box */}
        <div className="w-full max-w-[420px] px-6 py-5 bg-primary/5 rounded-2xl border border-primary/10 text-xs text-slate-500 leading-relaxed font-body">
          <div className="flex gap-3">
            <span className="text-base select-none">💡</span>
            <div>
              <strong className="text-slate-800 text-[13px] block mb-1">
                Tip on Fees &amp; Optional Tips:
              </strong>
              <p className="text-slate-600">
                You can opt out of the processing fee by clicking{" "}
                <span className="underline font-semibold text-slate-800">
                  Change
                </span>{" "}
                next to the fee line, and select &quot;Other&quot; (or
                &quot;0%&quot;) to adjust or remove the optional Givebutter tip.
              </p>
            </div>
          </div>
        </div>

        {/* Widget area */}
        <div className="w-full max-w-[420px] relative min-h-[500px]">
          {/* @ts-expect-error */}
          <givebutter-widget id="LeZ9Nv"></givebutter-widget>
        </div>
      </div>
    </>
  );
}
