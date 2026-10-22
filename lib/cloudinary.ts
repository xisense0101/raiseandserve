/**
 * Cloudinary delivery helpers.
 *
 * Every video URL here is also generated ahead of time as an eager
 * transformation (scripts/cloudinary-eager.mjs), so visitors never wait for
 * a first-time transcode. If you change a transformation string, re-run
 * that script.
 *
 * Syntax follows Cloudinary's rules: one action per component, and
 * f_auto / q_auto in their own components.
 */

export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "nc7sref5";

const BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;

/* ─── Images ─────────────────────────────────────────────────────────── */

type ImageOptions = {
  width?: number;
  /** Crop to this aspect ratio (e.g. "4:5") with automatic gravity. */
  aspect?: string;
};

export function imageTransform({ width, aspect }: ImageOptions = {}) {
  const resize = aspect
    ? `c_fill,ar_${aspect},g_auto${width ? `,w_${width}` : ""}`
    : width
      ? `c_limit,w_${width}`
      : "";
  return [resize, "f_auto", "q_auto"].filter(Boolean).join("/");
}

export function cldImageUrl(publicId: string, options: ImageOptions = {}) {
  return `${BASE}/image/upload/${imageTransform(options)}/${publicId}`;
}

/** next/image loader: Cloudinary resizes and picks AVIF/WebP, Next only builds the srcset. */
export function cloudinaryLoader({ src, width }: { src: string; width: number }) {
  return cldImageUrl(src, { width });
}

/* ─── Video ──────────────────────────────────────────────────────────── */

/** Player with sound, for the modal. 720 px wide is plenty for a 9:16 frame. */
export const FILM_TX = "c_scale,w_720/q_auto";
export const filmPosterTx = (second: number) => `so_${second}/c_scale,w_720/q_auto`;

/** Muted 4:5 loop for cards: trimmed, audio stripped, eco quality. */
export const loopTx = (seconds: number) =>
  `so_0,eo_${seconds}/ac_none/c_fill,ar_4:5,w_540/q_auto:eco`;
export const LOOP_POSTER_TX = "so_1/c_fill,ar_4:5,w_540/q_auto";

/**
 * Seamless version for clips whose first and last frames differ (handheld
 * footage): plays seconds 1 → end, and over the final second fades the clip's
 * opening second in on top, so the last frame lands on the first one (source
 * second 1, which is also the poster frame). Output is (end - 1) seconds long.
 */
export const crossfadeLoopTx = (publicId: string, end: number) =>
  `eo_${end},so_1/l_video:${publicId.replaceAll("/", ":")}/eo_1,so_0/e_fade:1000/fl_layer_apply,so_${end - 2}/ac_none/c_fill,ar_4:5,w_540/q_auto:eco`;

export function cldVideoUrl(publicId: string, tx: string, ext: "mp4" | "jpg") {
  return `${BASE}/video/upload/${tx}/${publicId}.${ext}`;
}

/* ─── Hero loop ──────────────────────────────────────────────────────── */

const HERO_BASE = "riseandserve/videos/riseandserve/videos/IMG_8004";
const HERO_SPLICE = "fl_splice,l_video:riseandserve:videos:riseandserve:videos:IMG_8005/fl_layer_apply";

/**
 * The packed Catfish King dining room on July 6: IMG_8004 and IMG_8005
 * spliced into one ~7 s muted loop, in a wide crop for desktop and the
 * native 3:4 frame for phones.
 */
export const HERO_TX = {
  wide: `${HERO_SPLICE}/ac_none/c_fill,ar_16:9,w_1280/q_auto:eco`,
  tall: `${HERO_SPLICE}/ac_none/c_scale,w_720/q_auto:eco`,
  widePoster: "so_0/c_fill,ar_16:9,w_1280/q_auto",
  tallPoster: "so_0/c_scale,w_720/q_auto",
};

export const HERO_MEDIA = {
  wide: cldVideoUrl(HERO_BASE, HERO_TX.wide, "mp4"),
  tall: cldVideoUrl(HERO_BASE, HERO_TX.tall, "mp4"),
  widePoster: cldVideoUrl(HERO_BASE, HERO_TX.widePoster, "jpg"),
  tallPoster: cldVideoUrl(HERO_BASE, HERO_TX.tallPoster, "jpg"),
  base: HERO_BASE,
};
