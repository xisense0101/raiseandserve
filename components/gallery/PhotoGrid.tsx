"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import CloudinaryImage from "@/components/media/CloudinaryImage";
import { cldImageUrl } from "@/lib/cloudinary";
import { pageCopy } from "@/lib/i18n/pages";
import type { Photo } from "@/lib/media";

type Props = { photos: Photo[]; caption: string };

const HASH_PREFIX = "#photo=";

/**
 * Masonry photo wall + lightbox (handoff 2b / 2e): arrow keys, swipe, Esc,
 * and a shareable deep link per photo (#photo=<id>).
 */
export default function PhotoGrid({ photos, caption }: Props) {
  const { lang } = useLocale();
  const t = pageCopy.gallery(lang).lightbox;
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const show = useCallback(
    (i: number | null) => {
      setIndex(i);
      const url = i === null ? window.location.pathname + window.location.search : HASH_PREFIX + photos[i].id;
      window.history.replaceState(null, "", url);
    },
    [photos],
  );

  const step = useCallback(
    (delta: number) => setIndex((i) => {
      if (i === null) return i;
      const next = (i + delta + photos.length) % photos.length;
      window.history.replaceState(null, "", HASH_PREFIX + photos[next].id);
      return next;
    }),
    [photos],
  );

  const close = useCallback(() => {
    show(null);
    opener.current?.focus();
  }, [show]);

  // Open from a deep link.
  useEffect(() => {
    if (!window.location.hash.startsWith(HASH_PREFIX)) return;
    const id = decodeURIComponent(window.location.hash.slice(HASH_PREFIX.length));
    const i = photos.findIndex((p) => p.id === id);
    if (i < 0) return;
    const frame = requestAnimationFrame(() => setIndex(i));
    return () => cancelAnimationFrame(frame);
  }, [photos]);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    // Warm the neighbours so swiping feels instant.
    [index - 1, index + 1].forEach((n) => {
      const p = photos[(n + photos.length) % photos.length];
      new Image().src = cldImageUrl(p.publicId, { width: 1600 });
    });
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, photos, close, step]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="m-0 list-none columns-2 gap-3 p-0 md:columns-3 md:gap-3.5">
        {photos.map((p, i) => (
          <li key={p.id} className="mb-3 break-inside-avoid md:mb-3.5">
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                show(i);
              }}
              className="group block w-full overflow-hidden rounded-soft bg-neutral-200"
            >
              <CloudinaryImage
                publicId={p.publicId}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1200px) 380px, (min-width: 768px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      {current && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.label}
          className="fixed inset-0 z-50 flex flex-col bg-neutral-900/95 text-white"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <span className="text-sm font-semibold" aria-live="polite">
              {caption} · {t.of(index + 1, photos.length)}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X aria-hidden className="size-5" strokeWidth={2.75} />
              <span className="sr-only">{t.close}</span>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" onClick={close}>
            {/* eslint-disable-next-line @next/next/no-img-element -- full-size Cloudinary rendition */}
            <img
              key={current.id}
              src={cldImageUrl(current.publicId, { width: 1600 })}
              alt={current.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-soft object-contain"
              style={{ aspectRatio: `${current.width} / ${current.height}` }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 hidden size-12 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:left-4 sm:grid"
            >
              <ChevronLeft aria-hidden className="size-6" strokeWidth={2.75} />
              <span className="sr-only">{t.prev}</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-2 hidden size-12 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:right-4 sm:grid"
            >
              <ChevronRight aria-hidden className="size-6" strokeWidth={2.75} />
              <span className="sr-only">{t.next}</span>
            </button>
          </div>

          <p className="m-0 px-4 py-4 text-center text-sm text-neutral-200 sm:px-6">{current.alt}</p>
        </div>
      )}
    </>
  );
}
