"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  /** Load as soon as mounted (hero) instead of when scrolled near. */
  eager?: boolean;
};

/** True when the visitor asked for less motion or less data. */
export function prefersStillMedia() {
  if (typeof window === "undefined") return true;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return reduced || Boolean(saveData);
}

/**
 * Muted background loop (handoff: autoplay muted loop playsinline, pause off
 * screen, poster only for prefers-reduced-motion). The video file isn't
 * requested until the element is near the viewport, so loops below the fold
 * cost nothing on first load.
 */
export default function LoopVideo({ src, poster, className, eager = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersStillMedia()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Attach the source only now, so off-screen loops never download.
          if (!el.getAttribute("src")) el.src = src;
          el.muted = true;
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: eager ? "0px" : "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, src]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
      className={className}
    />
  );
}
