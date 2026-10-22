/**
 * Cloudinary delivery helpers.
 *
 * Media lives in Cloudinary under predictable public IDs (see the handoff):
 *   rise/video/<slug>                     e.g. rise/video/final-render
 *   rise/gallery/<yyyy-mm-dd>-<album>/…   e.g. rise/gallery/2026-07-06-meal/img-8190
 *
 * Everything is delivered with f_auto,q_auto so each browser gets AVIF/WebP
 * (images) or the best codec (video) at the smallest size that looks right.
 */

export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

const BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;

export function isCloudinaryConfigured() {
  return CLOUDINARY_CLOUD_NAME.length > 0;
}

type ImageOptions = {
  width?: number;
  height?: number;
  /** c_fill crops to the box, c_limit only shrinks (default). */
  crop?: "fill" | "limit" | "thumb";
  /** Defaults to auto (Cloudinary picks the most interesting region). */
  gravity?: string;
  quality?: number | "auto" | "auto:eco" | "auto:good";
  /** Extra raw transformation, e.g. "e_blur:2000". */
  raw?: string;
};

function imageTransform({ width, height, crop = "limit", gravity, quality = "auto", raw }: ImageOptions) {
  const t = ["f_auto", `q_${quality}`];
  if (width || height) {
    t.push(`c_${crop}`);
    if (width) t.push(`w_${width}`);
    if (height) t.push(`h_${height}`);
    if (crop === "fill" || crop === "thumb") t.push(`g_${gravity ?? "auto"}`);
  }
  if (raw) t.push(raw);
  return t.join(",");
}

export function cldImageUrl(publicId: string, options: ImageOptions = {}) {
  return `${BASE}/image/upload/${imageTransform(options)}/${publicId}`;
}

type VideoOptions = {
  width?: number;
  /** Start offset in seconds, for trimmed loops. */
  start?: number;
  /** End offset in seconds, for trimmed loops. */
  end?: number;
  /** Strip the audio track: smaller files for muted autoplay loops. */
  muted?: boolean;
};

/** Adaptive video delivery: the best codec and quality for the requesting browser. */
export function cldVideoUrl(publicId: string, { width, start, end, muted }: VideoOptions = {}) {
  const t = ["f_auto:video", "q_auto"];
  if (width) t.push("c_limit", `w_${width}`);
  if (start !== undefined) t.push(`so_${start}`);
  if (end !== undefined) t.push(`eo_${end}`);
  if (muted) t.push("ac_none");
  return `${BASE}/video/upload/${t.join(",")}/${publicId}`;
}

/** A still frame from a video, used as the <video> poster (handoff: posters via so_<sec>). */
export function cldVideoPosterUrl(publicId: string, { second = 1, width = 1280 } = {}) {
  return `${BASE}/video/upload/so_${second},f_auto,q_auto,c_limit,w_${width}/${publicId}.jpg`;
}

/** Captions are uploaded as raw .vtt files next to their video. */
export function cldCaptionsUrl(publicId: string, lang: "en" | "es") {
  return `${BASE}/raw/upload/${publicId}.${lang}.vtt`;
}

/** next/image loader: Cloudinary resizes, Next only picks the srcset widths. */
export function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  return cldImageUrl(src, { width, quality: quality ?? "auto" });
}
