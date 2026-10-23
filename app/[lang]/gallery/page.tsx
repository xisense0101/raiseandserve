import Link from "next/link";
import CloudinaryImage from "@/components/media/CloudinaryImage";
import PlayCard from "@/components/media/PlayCard";
import { hasLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { ALBUMS, ALBUM_ORDER, albumPhotos, albumVideos, photo, playable, video } from "@/lib/media";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Gallery",
  description: "Photos and films from RISE community events: the July 6 community meal at Catfish King and the July 20 pantry fill with CIS Greater Tarrant County.",
  path: "/gallery",
  keywords: ["RISE gallery", "community meal photos", "pantry fill", "volunteer photos"],
});

const FILMS = ["campaign", "reel", "pantry-fill-recap", "ivy-beesley", "jennifer-murphy", "shanta-lockett"];

export default async function GalleryPage({ params }: PageProps<"/[lang]/gallery">) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = pageCopy.gallery(lang);

  return (
    <div className="mx-auto flex w-full max-w-site flex-col gap-16 px-4 pt-8 pb-24 sm:px-6 md:pt-12">
      <header className="flex max-w-[640px] flex-col gap-4">
        <span className="tag-accent self-start">{t.kicker}</span>
        <h1 className="m-0 text-[clamp(38px,6vw,64px)] leading-none">{t.title}</h1>
        <p className="m-0 text-[17px] leading-relaxed text-neutral-800">{t.intro}</p>
      </header>

      <section aria-labelledby="albums" className="flex flex-col gap-6">
        <h2 id="albums" className="m-0 text-[clamp(26px,3vw,34px)]">{t.albums}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {ALBUM_ORDER.map((slug) => {
            const album = ALBUMS[slug];
            const cover = photo(album.cover);
            return (
              <Link
                key={slug}
                href={localizePath(lang, `/gallery/${slug}`)}
                className="group flex flex-col gap-4 rounded-soft-lg bg-surface p-3 text-ink transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-neutral-300">
                  <CloudinaryImage
                    publicId={cover.publicId}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 768px) 580px, 100vw"
                    className="washed object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col gap-1 px-2 pb-2">
                  <span className="font-heading text-2xl">{album.title[lang]}</span>
                  <span className="text-sm text-neutral-700">
                    {album.date[lang]} · {album.place}
                  </span>
                  <span className="text-sm font-semibold text-accent-700">
                    {t.photos(albumPhotos(slug).length)} · {t.videos(albumVideos(slug).length)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="films" className="flex flex-col gap-6">
        <h2 id="films" className="m-0 text-[clamp(26px,3vw,34px)]">{t.films}</h2>
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
          {FILMS.map((slug) => (
            <PlayCard key={slug} video={playable(video(slug), lang)} size="sm" className="w-44 flex-none snap-start sm:w-auto" />
          ))}
        </div>
      </section>
    </div>
  );
}
