"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { PlayableVideo } from "@/lib/media";

type VideoModalApi = { open: (video: PlayableVideo) => void };

const VideoModalContext = createContext<VideoModalApi | null>(null);

export function useVideoModal(): VideoModalApi {
  const ctx = useContext(VideoModalContext);
  if (!ctx) throw new Error("useVideoModal must be used inside <VideoModalProvider>");
  return ctx;
}

/**
 * One shared player for the whole site (handoff: "Video modal").
 * Opens with sound, closes on backdrop click, the close button or Esc,
 * and returns focus to whatever opened it.
 */
export function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const { dict } = useLocale();
  const [playing, setPlaying] = useState<PlayableVideo | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const open = useCallback((video: PlayableVideo) => {
    opener.current = document.activeElement as HTMLElement | null;
    setPlaying(video);
  }, []);

  const close = useCallback(() => {
    setPlaying(null);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    if (!playing) return;
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [playing, close]);

  const tall = playing ? playing.height > playing.width : false;

  return (
    <VideoModalContext.Provider value={{ open }}>
      {children}
      {playing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={playing.title}
          onClick={close}
          className="fixed inset-0 z-50 grid place-items-center bg-neutral-900/72 p-4 backdrop-blur-sm sm:p-6"
        >
          <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <video
                key={playing.src}
                src={playing.src}
                poster={playing.poster}
                controls
                autoPlay
                playsInline
                className="block max-h-[78vh] max-w-[90vw] rounded-soft-lg bg-black shadow-lg"
                style={{
                  aspectRatio: `${playing.width} / ${playing.height}`,
                  width: tall ? "min(380px, 90vw)" : "min(880px, 90vw)",
                }}
              />
              <button
                ref={closeButton}
                type="button"
                onClick={close}
                className="absolute -top-3 -right-3 grid size-10 place-items-center rounded-full bg-page text-ink shadow-md transition-colors hover:bg-accent-100"
              >
                <X aria-hidden className="size-5" strokeWidth={2.75} />
                <span className="sr-only">{dict.media.close}</span>
              </button>
            </div>
            <p className="max-w-[min(380px,90vw)] text-center text-sm font-semibold text-white">{playing.title}</p>
            <button type="button" onClick={close} className="text-xs text-neutral-300 hover:text-white">
              {dict.media.tapToClose}
            </button>
          </div>
        </div>
      )}
    </VideoModalContext.Provider>
  );
}
