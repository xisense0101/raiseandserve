import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import PlayCard from "@/components/media/PlayCard";
import { cldImageUrl } from "@/lib/cloudinary";
import { hasLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { ALBUMS, ALBUM_ORDER, albumPhotos, albumVideos, photo, playable, video, type AlbumSlug } from "@/lib/media";
import { createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALBUM_ORDER.map((album) => ({ album }));
}

const isAlbum = (slug: string): slug is AlbumSlug => slug in ALBUMS;

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery/[album]">): Promise<Metadata> {
  const { album: slug } = await params;
  if (!isAlbum(slug)) return {};
  const album = ALBUMS[slug];
  return createMetadata({
    title: `${album.title.en} · ${album.date.en}`,
    description: `${album.summary.en} ${album.place}.`,
    path: `/gallery/${slug}`,
    image: cldImageUrl(photo(album.cover).publicId, { width: 1200, aspect: "1.91" }),
  });
}

export default async function AlbumPage({ params }: PageProps<"/[lang]/gallery/[album]">) {
  const { lang: raw, album: slug } = await params;
  if (!isAlbum(slug)) notFound();
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = pageCopy.gallery(lang);
  const album = ALBUMS[slug];
  const photos = albumPhotos(slug);
  const film = playable(video(album.film), lang);
  const clips = albumVideos(slug).filter((v) => v.slug !== album.film);

  return (
    <div className="mx-auto flex w-full max-w-site flex-col gap-12 px-4 pt-8 pb-24 sm:px-6 md:pt-12">
      <header className="grid items-end gap-8 md:grid-cols-[1fr_240px]">
        <div className="flex max-w-[640px] flex-col gap-4">
          <Link href={localizePath(lang, "/gallery")} className="text-sm font-bold text-accent-700 hover:text-accent-800">
            ← {t.back}
          </Link>
          <h1 className="m-0 text-[clamp(38px,6vw,64px)] leading-none">{album.title[lang]}</h1>
          <p className="m-0 font-semibold text-neutral-700">
            {album.date[lang]} · {album.place}
          </p>
          <p className="m-0 text-[17px] leading-relaxed text-neutral-800">{album.summary[lang]}</p>
          <p className="m-0 text-sm font-semibold text-accent-700">
            {t.photos(photos.length)} · {t.videos(clips.length + 1)}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-widest text-neutral-700 uppercase">{t.recapFilm}</span>
          <PlayCard video={film} size="md" className="max-w-[240px]" priority />
        </div>
      </header>

      {clips.length > 0 && (
        <section aria-labelledby="clips" className="flex flex-col gap-4">
          <h2 id="clips" className="m-0 text-2xl">{t.clips}</h2>
          <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            {clips.map((v) => (
              <PlayCard key={v.slug} video={playable(v, lang)} size="sm" className="w-36 flex-none snap-start sm:w-40" />
            ))}
          </div>
        </section>
      )}

      <PhotoGrid photos={photos} caption={album.title[lang]} />
    </div>
  );
}
