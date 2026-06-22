"use client";

import { useState, useEffect } from "react";

export default function DonatePageClient() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // 1. Inject the Givebutter widget script dynamically to ensure it runs correctly on SPA route changes
    const script = document.createElement("script");
    script.src = "https://widgets.givebutter.com/latest.umd.cjs?acct=vlGShfXkMTiyIoYg&p=other";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    // 2. Event listener to monitor checkout flow events programmatically (logs to browser console)
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
          eventName = event.data.event || event.data.type || event.data.action || "checkout.data";
        }

        console.log(`[Givebutter Event] ${eventName}:`, eventData);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="flex flex-col w-full items-center justify-center pt-8 pb-12 px-4 gap-6">
      
      {/* Top Column: Warning Tip Box (matching the widget's max-width for perfect alignment) */}
      <div className="w-full max-w-[420px] px-6 py-5 bg-primary/5 rounded-2xl border border-primary/10 text-xs text-slate-500 leading-relaxed font-body">
        <div className="flex gap-3">
          <span className="text-base select-none">💡</span>
          <div>
            <strong className="text-slate-800 text-[13px] block mb-1">Tip on Fees & Optional Tips:</strong>
            <p className="text-slate-600">
              You can opt out of the processing fee by clicking <span className="underline font-semibold text-slate-800"> Change </span> next to the fee line, and select &quot;Other&quot; (or &quot;0%&quot;) to adjust or remove the optional Givebutter tip.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Column: Givebutter Widget (retaining original initial sizing) */}
      <div className="w-full max-w-[420px] min-h-[500px]">
        {/* @ts-ignore */}
        <givebutter-widget id="LeZ9Nv"></givebutter-widget>
      </div>

    </div>
  );
}
