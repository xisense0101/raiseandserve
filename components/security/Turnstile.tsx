"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import type { TurnstileAction } from "@/lib/turnstile-actions";
import { TURNSTILE_SITE_KEY as SITE_KEY } from "@/lib/turnstile-config";

/**
 * Cloudflare Turnstile widget (managed, always visible). The box sits full
 * width under the fields: it shows "Verifying…" then "Success!" for most
 * visitors, and turns into a checkbox to click when Cloudflare needs one.
 *
 * The script is fetched when the form first comes near the viewport, so pages
 * pay nothing for it until a visitor is about to use a form. Tokens are
 * single-use: call `ref.current.reset()` after every submission attempt.
 */

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type RenderOptions = {
  sitekey: string;
  action?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "flexible" | "compact";
  appearance?: "always" | "execute" | "interaction-only";
  language?: string;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: (code: string) => void;
};

type TurnstileApi = {
  render: (el: HTMLElement, options: RenderOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile missing")));
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("turnstile script failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export type TurnstileHandle = { reset: () => void };

type Props = {
  action: TurnstileAction;
  onToken: (token: string | null) => void;
  ref?: Ref<TurnstileHandle>;
  className?: string;
};

export default function Turnstile({ action, onToken, ref, className }: Props) {
  const { lang, dict } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const [status, setStatus] = useState<"idle" | "ready" | "error">("idle");

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useImperativeHandle(ref, () => ({
    reset() {
      onTokenRef.current(null);
      if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current);
    },
  }));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    const mount = () => {
      loadTurnstile()
        .then((api) => {
          if (cancelled || widgetId.current) return;
          widgetId.current = api.render(el, {
            sitekey: SITE_KEY,
            action,
            theme: "light",
            size: "flexible",
            appearance: "always",
            language: lang,
            callback: (token) => {
              setStatus("ready");
              onTokenRef.current(token);
            },
            "expired-callback": () => onTokenRef.current(null),
            "error-callback": () => {
              setStatus("error");
              onTokenRef.current(null);
            },
          });
        })
        .catch(() => !cancelled && setStatus("error"));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          mount();
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [action, lang]);

  // The visible widget shows its own progress; only explain a failure, or the
  // gap before the script arrives.
  const message =
    status === "error" ? dict.verification.failed : status === "idle" ? dict.verification.checking : null;

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {/* Turnstile's flexible size fills the width; 65px is its box height, reserved to avoid a layout jump. */}
      <div ref={containerRef} className="min-h-[65px] w-full" />
      <p aria-live="polite" className={cn("text-xs", status === "error" ? "text-red-700" : "text-neutral-700")}>
        {message}
      </p>
    </div>
  );
}
