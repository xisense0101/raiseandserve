import type { Locale } from "@/lib/i18n/config";
import {
  FILM_TX,
  LOOP_POSTER_TX,
  cldVideoUrl,
  filmPosterTx,
  crossfadeLoopTx,
  loopTx,
} from "@/lib/cloudinary";

/**
 * Media catalog for riseandserve.org, built from the Cloudinary upload
 * (cloud "nc7sref5", folders riseandserve/photos and riseandserve/videos).
 *
 * Every photo below was reviewed by eye and every video was placed using its
 * camera timestamp, so albums match what actually happened:
 *   - IMG_7891–IMG_8005 and the UUID-named JPGs: July 6 community meal at
 *     Catfish King, Mount Pleasant (camera clips shared July 7).
 *   - IMG_8155–IMG_8237: July 20 pantry fill at Communities In Schools of
 *     Greater Tarrant County, Fort Worth (EXIF / encode dates July 20).
 *
 * Left out on purpose: near-duplicates (222be36e, 6f649b47, a6d56c01,
 * e31b44c2, fe39cef1, b9c43023_2, IMG_8177), close-ups of the CIS donor wall
 * (IMG_8182–IMG_8186), the DJ business-card graphic (IMG_8002), outtakes
 * (IMG_7906, IMG_7912, IMG_8157), the channel outro card (IMG_7956), the
 * unrelated spoken-word clip (IMG_8079), IMG_8209 (poor audio) and low-rated b-roll
 * (IMG_7891, IMG_7907, IMG_7911, IMG_7919, IMG_8003, IMG_8155, IMG_8163).
 *
 * Clips titled "Moments from July 20" were placed by timestamp but not
 * reviewed frame by frame; rename them once someone has watched them.
 */

const PHOTO_PREFIX = "riseandserve/photos/riseandserve/photos/";
const VIDEO_PREFIX = "riseandserve/videos/riseandserve/videos/";

/* ─── Albums ─────────────────────────────────────────────────────────── */

export type AlbumSlug = "2026-07-06-community-meal" | "2026-07-20-pantry-fill";

type Localized = Record<Locale, string>;

export type Album = {
  slug: AlbumSlug;
  title: Localized;
  date: Localized;
  place: string;
  summary: Localized;
  cover: string;
  /** Recap film shown at the top of the album. */
  film: string;
};

export const ALBUMS: Record<AlbumSlug, Album> = {
  "2026-07-06-community-meal": {
    slug: "2026-07-06-community-meal",
    title: { en: "Community meal", es: "Comida comunitaria" },
    date: { en: "July 6, 2026", es: "6 de julio de 2026" },
    place: "Catfish King · Mount Pleasant, TX",
    summary: {
      en: "A free hot meal for anyone who walked in. The dining room stayed full from 4 to 7 PM.",
      es: "Una comida caliente y gratuita para todos. El comedor estuvo lleno de 4 a 7 PM.",
    },
    cover: "e2866917-2a36-48e2-a42a-9f5ec2608c76",
    film: "final-draft-en",
  },
  "2026-07-20-pantry-fill": {
    slug: "2026-07-20-pantry-fill",
    title: { en: "Pantry fill", es: "Llenado de despensa" },
    date: { en: "July 20, 2026", es: "20 de julio de 2026" },
    place: "CIS Greater Tarrant County · Fort Worth, TX",
    summary: {
      en: "Food, clothing, shoes, hygiene kits and school supplies for the CIS resource rooms before the school year.",
      es: "Comida, ropa, zapatos, artículos de higiene y útiles escolares para las salas de recursos de CIS antes del año escolar.",
    },
    cover: "IMG_8176",
    film: "pantry-fill-recap",
  },
};

export const ALBUM_ORDER: AlbumSlug[] = ["2026-07-06-community-meal", "2026-07-20-pantry-fill"];

/* ─── Photos ─────────────────────────────────────────────────────────── */

export type Photo = {
  id: string;
  publicId: string;
  width: number;
  height: number;
  alt: string;
  album: AlbumSlug;
};

const MEAL: AlbumSlug = "2026-07-06-community-meal";
const PANTRY: AlbumSlug = "2026-07-20-pantry-fill";

// [id, width, height, alt] in the order the album should read.
const PHOTO_ROWS: [AlbumSlug, [string, number, number, string][]][] = [
  [
    MEAL,
    [
      ["e2866917-2a36-48e2-a42a-9f5ec2608c76", 3024, 4032, "Two kids grinning over plates of fried catfish and fries"],
      ["3e87f51d-81c0-43a0-98bd-15b365764f63", 5120, 3840, "Catfish King's dining room filled with families sharing dinner"],
      ["IMG_7998", 1448, 1086, "Catfish King restaurant in Mount Pleasant under a blue sky"],
      ["IMG_7999", 1086, 1448, "The RISE community meal poster on an easel inside Catfish King"],
      ["1fd6a3c1-274b-4cf5-ad16-29e72fa993ee", 3024, 4032, "Guests at checkered tables with plates of catfish"],
      ["6087bf8f-23f8-4403-a028-ee495a026cec", 4032, 3024, "A RISE volunteer taking a selfie with young guests"],
      ["302f9c79-e094-42a1-92bf-17921d909c22", 3024, 4032, "Friends sharing catfish and salad at dinner"],
      ["d1c2fc82-65b2-4edc-bce8-e8c10bc51380", 4032, 3024, "Families eating together in the busy dining hall"],
      ["dd835421-6473-4308-880d-6542653a0417", 3840, 5120, "A grandmother and grandson waving over their dinner"],
      ["97c0a3f7-aee3-4122-892d-40f381018279", 5120, 3840, "Three RISE volunteers in aprons ready to serve"],
      ["42e348ab-d972-4ffa-a8c3-0fcd81ebe1c4", 3840, 5120, "A family table with a boy in an orange shirt"],
      ["4fb994ec-e8b6-413b-be22-692e3e124961", 5120, 3840, "Guests filling every table at Catfish King"],
      ["927afe79-989d-4ba1-8f99-00d5c5c7a128", 3840, 5120, "A guest holding up the event flyer"],
      ["27e8dc5b-05bb-406c-a289-1ee193d9919e", 4032, 3024, "Guests giving a thumbs up over their plates"],
      ["481a8692-b321-4d79-9c4b-1846560e7aed", 3024, 4032, "A guest enjoying a full plate next to a young friend"],
      ["c9ed5804-abdf-4ee9-9066-96dc42517ad0", 5120, 3840, "Neighbors talking across tables during dinner"],
      ["5cd38d03-0a8d-44fd-832c-d20e4474eb77", 3024, 4032, "Two women sharing dinner by the window"],
      ["bb6e9f64-6f79-4872-a60e-e49e6bada01e", 4032, 3024, "RISE volunteers taking a group selfie"],
      ["2d526c32-4fd4-489f-a69a-469c34cc1a00", 3024, 4032, "Women laughing together at a long table"],
      ["799c11ad-5118-40dc-8177-04d5a68e9124", 5120, 3840, "Volunteers moving through the packed dining room"],
      ["541670b7-5df7-4361-9c93-cc6c42621946", 3024, 4032, "A young family with their baby at the meal"],
      ["a39d1c8b-0969-40b2-a544-3eaf8a9bbd95", 4032, 3024, "Guests talking over dinner by the window"],
      ["b40838b9-2cd3-4be1-bca7-1cc2792b8c6a", 3840, 5120, "A couple enjoying their meal in a booth"],
      ["667ee50a-4a54-4af5-95bd-8e8d1c0c8f89", 4032, 3024, "A table of friends and family at dinner"],
      ["bc7b777a-7b7b-4c86-92f5-7d134369ccc9", 3024, 4032, "A full dining room with guests digging in"],
      ["6d622d15-5d9b-46b0-bbd6-f5c01d74f5b2", 4032, 3024, "The long dining hall during the meal"],
      ["e60bf40a-c141-4b2e-ba85-2256af65cfd1", 3840, 5120, "A couple smiling at their table"],
      ["d80b706e-9655-4c50-9645-a5e3c8546d39", 4032, 3024, "A table of guests with plates and to-go bags"],
      ["8bdf7126-5702-499a-b046-6d914c857c1b", 3024, 4032, "A RISE volunteer with two guests"],
      ["fe5fbe29-6e9f-4cf6-8cc2-a2c7af04bb32", 3024, 4032, "Guests gathered around a table"],
      ["9e41a869-c497-4c8d-b0d0-176a7000d9ea", 4032, 3024, "RISE volunteers with guests in the dining room"],
      ["1f9d7582-c15f-428b-9709-9c1c815fbb7c", 3024, 4032, "Guests at a checkered table with the buffet behind them"],
      ["90042d51-d0fa-49da-bb60-19dfc43fd5c1", 1023, 1537, "The buffet line with salad and sides"],
      ["724e9e18-e981-4ca2-87fd-2ee824f17746", 1023, 1537, "Two Catfish King team members in red shirts and aprons"],
      ["7281ad2d-8a03-4933-a5ab-fe1b9ae7349b", 3840, 5120, "Guests with the event flyer by the entrance"],
      ["4e29981d-7741-4d3a-882b-db6edcb13020", 3024, 4032, "Two guests holding the Catfish King event poster"],
      ["fbed4045-eb05-4415-a055-40e04fa59284", 4032, 3024, "Three people beside the event poster"],
      ["IMG_8001", 1402, 1122, "DJ Slim's booth outside Catfish King"],
      ["4ce5dadf-a27a-48fb-a785-0aa983feb911", 3840, 5120, "A RISE volunteer and a guest outside the restaurant"],
      ["b9c43023-ab2a-43f5-a658-792c06f529d5", 3840, 5120, "A RISE volunteer with a guest outside"],
      ["a885ce74-0654-4a2e-aba0-da52d4d4da80", 3840, 5120, "Two guests on the restaurant porch"],
      ["f2083262-a32b-4194-9c19-27bffd16b89f", 4032, 3024, "Volunteers taking a selfie with a guest outside"],
      ["b88e24d2-9931-4b77-9bdb-fb749e08d9c8", 4032, 3024, "Two RISE volunteers smiling under the tent"],
      ["c9e33a81-9f93-43a0-af4f-46c749a711a4", 1023, 1537, "Three RISE volunteers in aprons"],
      ["82ed8d7c-da28-4160-9d2f-4cbf4d3b5e5d", 3840, 5120, "Families and kids gathered outside under storm clouds"],
      ["c5e72c79-2aa2-4716-8225-a9bd069ca90e", 3840, 5120, "Kids and volunteers posing outside after the meal"],
      ["a4a862d9-c313-44ef-a7a0-1ecc25a22028", 4032, 3024, "Guests outside the restaurant under a stormy sky"],
      ["d8772996-e39c-4615-abc9-0845a0288233", 3024, 4032, "Two volunteers outside at the end of the day"],
      ["7f5c4be0-9cb0-4a77-89ca-450ac914271e", 1023, 1537, "Guests in a booth and the full dining room"],
      ["cd592e98-06d8-4546-98c5-cff84c888466", 1023, 1537, "Two views of the full dining room"],
      ["f23c4bc9-5645-42ff-a98c-0f3f036387e0", 1023, 1537, "Guests at tables across the restaurant"],
    ],
  ],
  [
    PANTRY,
    [
      ["IMG_8176", 5712, 4284, "The RISE team with CIS staff in the Center for Student Support"],
      ["IMG_8193", 4032, 3024, "RISE volunteers sorting hygiene products on long tables"],
      ["IMG_8156", 3024, 4032, "The CIS Greater Tarrant County Center for Student Support in Fort Worth"],
      ["IMG_8188", 5712, 4284, "Tables of donated food lined up to sort"],
      ["IMG_8161", 4284, 5712, "A volunteer lining up supplies on a table"],
      ["IMG_8172", 4032, 3024, "Touring the CIS food pantry"],
      ["IMG_8174", 4032, 3024, "The CIS clothing closet"],
      ["IMG_8194", 4032, 3024, "Volunteers organizing hygiene donations"],
      ["IMG_8189", 5712, 4284, "Snacks, canned food and supplies ready for the pantry"],
      ["IMG_8191", 5712, 4284, "Shoes and clothing laid out on tables"],
      ["IMG_8192", 5712, 4284, "Boxes of new shoes being unpacked"],
      ["IMG_8195", 4032, 3024, "Volunteers at the supply tables"],
      ["IMG_8190", 5712, 4284, "Supply tables by the windows"],
      ["IMG_8181", 5712, 4284, "The RISE team and CIS staff in the lobby"],
      ["IMG_8187", 3024, 4032, "The CIS donor wall thanking community partners"],
      ["IMG_8231", 1448, 1086, "Three RISE volunteers smiling outside"],
    ],
  ],
];

export const PHOTOS: Photo[] = PHOTO_ROWS.flatMap(([album, rows]) =>
  rows.map(([id, width, height, alt]) => ({
    id,
    publicId: PHOTO_PREFIX + id,
    width,
    height,
    alt,
    album,
  })),
);

const PHOTO_BY_ID = new Map(PHOTOS.map((p) => [p.id, p]));

export function photo(id: string): Photo {
  const p = PHOTO_BY_ID.get(id);
  if (!p) throw new Error(`Unknown photo: ${id}`);
  return p;
}

export function albumPhotos(slug: AlbumSlug): Photo[] {
  return PHOTOS.filter((p) => p.album === slug);
}

/* ─── Videos ─────────────────────────────────────────────────────────── */

export type VideoKind = "film" | "clip";

export type Video = {
  slug: string;
  file: string;
  width: number;
  height: number;
  duration: number;
  kind: VideoKind;
  /** Story films aren't tied to one event. */
  album: AlbumSlug | "story";
  title: Localized;
  /** Seconds into the clip used for the poster frame. */
  posterAt: number;
  /** Spoken language, when the video has dialogue. */
  lang?: Locale;
  /** The Spanish cut of the same film. */
  spanish?: string;
};

const VIDEO_LIST: Video[] = [
  // Story films
  { slug: "campaign", file: "FINAL_RENDER", width: 1080, height: 1920, duration: 92, kind: "film", album: "story", posterAt: 3, lang: "en", spanish: "final-draft-es",
    title: { en: "Two events, one community", es: "Dos eventos, una comunidad" } },
  { slug: "reel", file: "Reel", width: 1080, height: 1920, duration: 97, kind: "film", album: "story", posterAt: 3, lang: "en",
    title: { en: "Why we rise", es: "Por qué nos levantamos" } },
  { slug: "story-take-1", file: "IMG_4260", width: 1080, height: 1920, duration: 107, kind: "film", album: "story", posterAt: 3, lang: "en",
    title: { en: "Every journey begins with a single act of support", es: "Cada camino empieza con un acto de apoyo" } },
  { slug: "jennifer-thanks", file: "IMG_2553", width: 1080, height: 1920, duration: 37, kind: "film", album: "story", posterAt: 3, lang: "en",
    title: { en: "A thank-you from CIS Greater Tarrant County", es: "Un agradecimiento de CIS Greater Tarrant County" } },
  { slug: "shanta-lockett", file: "AfterChanges", width: 1080, height: 1920, duration: 57, kind: "film", album: "story", posterAt: 2, lang: "en",
    title: { en: "Shanta Lockett, RISE board member", es: "Shanta Lockett, miembro de la junta de RISE" } },

  // July 6 community meal
  { slug: "final-draft-en", file: "Final_Draft_-_English", width: 1080, height: 1920, duration: 21, kind: "film", album: MEAL, posterAt: 2, lang: "en", spanish: "final-draft-es",
    title: { en: "You're invited: July 6 community meal", es: "Invitación: comida comunitaria del 6 de julio" } },
  { slug: "final-draft-es", file: "Final_Draft_-_Spanish", width: 1080, height: 1920, duration: 27, kind: "film", album: MEAL, posterAt: 2, lang: "es",
    title: { en: "Invitation in Spanish", es: "Invitación en español" } },
  { slug: "host-reminder", file: "IMG_1260", width: 1080, height: 1920, duration: 30, kind: "film", album: MEAL, posterAt: 2, lang: "en",
    title: { en: "Gearing up for Catfish King", es: "Preparándonos para Catfish King" } },
  { slug: "dining-room", file: "IMG_8005", width: 1440, height: 1920, duration: 4, kind: "clip", album: MEAL, posterAt: 1,
    title: { en: "A full dining room", es: "Un comedor lleno" } },
  { slug: "dining-room-2", file: "IMG_8004", width: 1440, height: 1920, duration: 4, kind: "clip", album: MEAL, posterAt: 1,
    title: { en: "Dinner is served", es: "La cena está servida" } },
  { slug: "doors-open", file: "VIDEO-2026-07-08-00-54-59", width: 720, height: 1280, duration: 8, kind: "clip", album: MEAL, posterAt: 4,
    title: { en: "Guests arriving", es: "Llegan los invitados" } },

  // July 20 pantry fill
  { slug: "pantry-fill-recap", file: "IMG_8326", width: 1080, height: 1920, duration: 148, kind: "film", album: PANTRY, posterAt: 4, lang: "en",
    title: { en: "One student at a time: the July 20 pantry fill", es: "Un estudiante a la vez: la despensa del 20 de julio" } },
  { slug: "ivy-beesley", file: "IMG_8215", width: 1080, height: 1920, duration: 55, kind: "film", album: PANTRY, posterAt: 3, lang: "en",
    title: { en: "Ivy Beesley, CIS Greater Tarrant County", es: "Ivy Beesley, CIS Greater Tarrant County" } },
  { slug: "jennifer-murphy", file: "IMG_8200", width: 1080, height: 1920, duration: 33, kind: "film", album: PANTRY, posterAt: 3, lang: "en",
    title: { en: "Jennifer Murphy, CIS Greater Tarrant County", es: "Jennifer Murphy, CIS Greater Tarrant County" } },
  { slug: "thank-you", file: "IMG_8213", width: 2160, height: 3840, duration: 5, kind: "clip", album: PANTRY, posterAt: 1, lang: "en",
    title: { en: "“This is what we were able to do today”", es: "“Esto es lo que logramos hoy”" } },
  { slug: "filling-shelves", file: "IMG_8212", width: 2160, height: 3840, duration: 7, kind: "clip", album: PANTRY, posterAt: 2, lang: "en",
    title: { en: "Filling the shelves", es: "Llenando los estantes" } },
  { slug: "closet", file: "IMG_8214", width: 2160, height: 3840, duration: 5, kind: "clip", album: PANTRY, posterAt: 1, lang: "en",
    title: { en: "Clothing and hygiene, restocked", es: "Ropa e higiene, reabastecidas" } },
  { slug: "pantry-shelves", file: "IMG_8236", width: 720, height: 1280, duration: 16, kind: "clip", album: PANTRY, posterAt: 1,
    title: { en: "Stocking the pantry", es: "Abasteciendo la despensa" } },
  { slug: "hygiene-table", file: "IMG_8237", width: 720, height: 1280, duration: 15, kind: "clip", album: PANTRY, posterAt: 1,
    title: { en: "Hygiene kits for students", es: "Kits de higiene para estudiantes" } },
  { slug: "pantry-day-1", file: "IMG_8159", width: 2160, height: 3840, duration: 6, kind: "clip", album: PANTRY, posterAt: 2,
    title: { en: "Moments from July 20", es: "Momentos del 20 de julio" } },
  { slug: "pantry-day-2", file: "IMG_8160", width: 2160, height: 3840, duration: 7, kind: "clip", album: PANTRY, posterAt: 2,
    title: { en: "Moments from July 20 (2)", es: "Momentos del 20 de julio (2)" } },
  { slug: "pantry-day-3", file: "IMG_8164", width: 2160, height: 3840, duration: 11, kind: "clip", album: PANTRY, posterAt: 2,
    title: { en: "Moments from July 20 (3)", es: "Momentos del 20 de julio (3)" } },
  { slug: "pantry-day-4", file: "IMG_8196", width: 1080, height: 1920, duration: 26, kind: "clip", album: PANTRY, posterAt: 3,
    title: { en: "Moments from July 20 (4)", es: "Momentos del 20 de julio (4)" } },
  { slug: "pantry-day-5", file: "IMG_8197", width: 2160, height: 3840, duration: 13, kind: "clip", album: PANTRY, posterAt: 2,
    title: { en: "Moments from July 20 (5)", es: "Momentos del 20 de julio (5)" } },
];

const VIDEO_BY_SLUG = new Map(VIDEO_LIST.map((v) => [v.slug, v]));

export const VIDEOS = VIDEO_LIST;

export function video(slug: string): Video {
  const v = VIDEO_BY_SLUG.get(slug);
  if (!v) throw new Error(`Unknown video: ${slug}`);
  return v;
}

/** The cut to show for the current language (e.g. the Spanish campaign film on /es). */
export function videoFor(slug: string, lang: Locale): Video {
  const v = video(slug);
  return lang === "es" && v.spanish ? video(v.spanish) : v;
}

export function albumVideos(slug: AlbumSlug): Video[] {
  return VIDEO_LIST.filter((v) => v.album === slug);
}

export const videoPublicId = (v: Video) => VIDEO_PREFIX + v.file;

/** Everything a player needs: src, poster and frame ratio. Plain data, safe to pass to client components. */
export type PlayableVideo = {
  slug: string;
  title: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  duration: number;
};

export function playable(v: Video, lang: Locale): PlayableVideo {
  const id = videoPublicId(v);
  return {
    slug: v.slug,
    title: v.title[lang],
    src: cldVideoUrl(id, FILM_TX, "mp4"),
    poster: cldVideoUrl(id, filmPosterTx(v.posterAt), "jpg"),
    width: v.width,
    height: v.height,
    duration: v.duration,
  };
}

/** Muted 4:5 card loops. */
/** seconds: trim length. crossfade: clip end (s) for a seamless crossfade loop instead of a hard cut. */
export type LoopSpec = { slug: string; seconds: number; crossfade?: number };

export const LOOPS: Record<string, LoopSpec> = {
  "pantry-shelves": { slug: "pantry-shelves", seconds: 8 },
  "hygiene-table": { slug: "hygiene-table", seconds: 8 },
  "thank-you": { slug: "thank-you", seconds: 4 },
  "filling-shelves": { slug: "filling-shelves", seconds: 7 },
  // Handheld pan: a straight 4 s cut jumps back visibly, so it crossfades into its own start.
  "closet": { slug: "closet", seconds: 3.5, crossfade: 4.5 },
  "doors-open": { slug: "doors-open", seconds: 8 },
};

export function loopTransform(spec: LoopSpec) {
  return spec.crossfade
    ? crossfadeLoopTx(videoPublicId(video(spec.slug)), spec.crossfade)
    : loopTx(spec.seconds);
}

export function loopSources(slug: keyof typeof LOOPS) {
  const spec = LOOPS[slug];
  const id = videoPublicId(video(spec.slug));
  return {
    src: cldVideoUrl(id, loopTransform(spec), "mp4"),
    poster: cldVideoUrl(id, LOOP_POSTER_TX, "jpg"),
  };
}

export function formatDuration(seconds: number) {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
