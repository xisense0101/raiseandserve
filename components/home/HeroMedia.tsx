"use client";

import { useEffect, useRef, useState } from "react";
import { prefersStillMedia } from "@/components/media/LoopVideo";
import { HERO_MEDIA } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

/**
 * Hero background: the packed Catfish King dining room on July 6.
 * The poster frame is the LCP image (server-rendered, high priority); the
 * ~1.5 MB muted loop only starts after the page has finished loading and
 * fades in once it's actually playing. Phones get the native 3:4 frame,
 * wider screens a 16:9 crop.
 */
export default function HeroMedia() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersStillMedia()) return;
    const start = () => {
      el.src = window.matchMedia("(min-width: 768px)").matches ? HERO_MEDIA.wide : HERO_MEDIA.tall;
      el.muted = true;
      el.play().catch(() => {});
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <>
      <picture>
        <source media="(min-width: 768px)" srcSet={HERO_MEDIA.widePoster} />
        <img
          src={HERO_MEDIA.tallPoster}
          alt=""
          // LCP image: found by the browser's preload scanner straight from the HTML.
          // (No preload() hint: it leaks into link prefetches and loads on every page.)
          fetchPriority="high"
          className="washed absolute inset-0 size-full object-cover"
        />
      </picture>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
        className={cn(
          "washed absolute inset-0 size-full object-cover transition-opacity duration-1000",
          playing ? "opacity-100" : "opacity-0",
        )}
      />
    </>
  );
}
