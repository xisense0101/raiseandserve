"use client";

import { useEffect, useRef, useState } from "react";
import { GIVEBUTTER_BOOT_SCRIPT, GIVEBUTTER_FRAME_ID } from "@/lib/givebutter";
import { cn } from "@/lib/utils";

const ORIGIN = "https://givebutter.com";
const SIZER = "[iFrameSizer]";
// iframe-resizer v4 handshake, same settings the official widget uses (see Givebutter's widget script).
const INIT = `${SIZER}${GIVEBUTTER_FRAME_ID}:8:false:false:32:true:true:null:bodyOffset:null:null:0:false:parent:scroll:true`;
const NOT_SIZE = new Set(["message", "scrollTo", "scrollToOffset", "pageInfo", "pageInfoStop", "inPageLink", "close", "reset", "mouseenter", "mouseleave"]);

/**
 * The Givebutter form iframe. The server HTML carries a tiny inline script that
 * creates the iframe while the page is still parsing; after hydration this
 * component only resizes it to fit and fades out the placeholder.
 */
export default function GivebutterForm({ loadingLabel }: { loadingLabel: string }) {
  const slot = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = slot.current;
    if (!host) return;

    // Client-side navigation: React inserts the HTML without running the inline
    // script, so run it now (a created <script> does execute).
    if (!host.querySelector("iframe")) {
      const boot = document.createElement("script");
      boot.textContent = GIVEBUTTER_BOOT_SCRIPT;
      host.appendChild(boot);
    }
    const frame = host.querySelector("iframe");
    if (!frame) return;

    let fallback: ReturnType<typeof setTimeout> | undefined;
    const sendInit = () => frame.contentWindow?.postMessage(INIT, ORIGIN);
    const onLoad = () => {
      sendInit();
      // If the form never reports its size, still reveal it shortly after load.
      fallback = setTimeout(() => setReady(true), 1200);
    };

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN || e.source !== frame.contentWindow) return;
      const data = e.data;
      if (data === "[iFrameResizerChild]Ready") return sendInit();
      if (data === "givebutter-form-loaded" || data?.event === "givebutter-form-loaded") return setReady(true);
      if (typeof data !== "string" || !data.startsWith(SIZER)) return;
      const [id, height, , type] = data.slice(SIZER.length).split(":");
      if (id !== GIVEBUTTER_FRAME_ID || NOT_SIZE.has(type)) return;
      const px = parseInt(height, 10);
      if (px > 0) {
        frame.style.height = `${px}px`;
        setReady(true);
      }
    };

    window.addEventListener("message", onMessage);
    frame.addEventListener("load", onLoad);
    // The iframe may have finished loading before React hydrated.
    if (frame.hasAttribute("data-loaded")) onLoad();

    return () => {
      clearTimeout(fallback);
      window.removeEventListener("message", onMessage);
      frame.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className="relative min-h-[560px]">
      <div
        ref={slot}
        // Server HTML runs this script while parsing; React leaves the subtree alone.
        dangerouslySetInnerHTML={{ __html: `<script>${GIVEBUTTER_BOOT_SCRIPT}</script>` }}
        suppressHydrationWarning
      />
      <FormSkeleton label={loadingLabel} hidden={ready} />
    </div>
  );
}

/** Looks like the first step of the Givebutter form, so the box never sits empty. */
function FormSkeleton({ label, hidden }: { label: string; hidden: boolean }) {
  return (
    <div
      aria-hidden={hidden}
      className={cn(
        "absolute inset-0 flex flex-col gap-4 rounded-soft bg-white p-5 transition-opacity duration-300",
        hidden ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <span className="sr-only" role="status">
        {hidden ? "" : label}
      </span>
      <div className="h-6 w-2/3 animate-pulse rounded-full bg-neutral-200" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-11 animate-pulse rounded-soft-sm bg-neutral-200" />
        <div className="h-11 animate-pulse rounded-soft-sm bg-neutral-100" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-soft-sm bg-neutral-100" />
        ))}
      </div>
      <div className="h-12 animate-pulse rounded-soft-sm bg-neutral-100" />
      <div className="h-24 animate-pulse rounded-soft-sm bg-neutral-100" />
      <div className="mt-auto h-12 animate-pulse rounded-full bg-accent-200" />
    </div>
  );
}
