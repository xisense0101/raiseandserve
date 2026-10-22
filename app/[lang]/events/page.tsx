import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import CloudinaryImage from "@/components/media/CloudinaryImage";
import PlayCard from "@/components/media/PlayCard";
import { splitEvents, zeffyTicketUrl, type RiseEvent } from "@/lib/events";
import { hasLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { albumPhotos, photo, playable, videoFor } from "@/lib/media";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Events and Community Service Initiatives",
  description:
    "Free RISE community meals and pantry fills: what's next, how to sign up, and photos and films from past events.",
  path: "/events",
  keywords: ["RISE events", "community service events", "volunteer events", "outreach programs"],
});

// Upcoming vs. past is decided at render time: re-render daily so an event moves to "past" on its own.
export const revalidate = 86400;

export default async function EventsPage({ params }: PageProps<"/[lang]/events">) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = pageCopy.events(lang);
  const href = (h: string) => localizePath(lang, h);
  const { upcoming, past } = splitEvents();

  return (
    <div className="flex flex-col gap-16 pb-24 md:gap-20">
      <section className="mx-auto flex w-full max-w-site flex-col gap-5 px-4 pt-8 sm:px-6 md:pt-14">
        <span className="tag-accent self-start">{t.kicker}</span>
        <h1 className="m-0 text-[clamp(40px,6.4vw,76px)] leading-[0.98]">{t.title}</h1>
        <p className="m-0 max-w-[560px] text-lg leading-relaxed text-neutral-800">{t.intro}</p>
      </section>

      {/* ─── Up next ─── */}
      <section className="mx-auto flex w-full max-w-site flex-col gap-6 px-4 sm:px-6">
        <h2 className="m-0 text-[clamp(26px,3.2vw,36px)]">{t.upcomingTitle}</h2>
        {upcoming.length > 0 ? (
          upcoming.map((e) => <UpcomingCard key={e.slug} event={e} lang={lang} />)
        ) : (
          <div className="flex flex-col gap-5 rounded-soft-lg border-2 border-dashed border-neutral-400 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex max-w-[560px] flex-col gap-2">
              <b className="font-heading text-2xl font-normal">{t.noneTitle}</b>
              <p className="m-0 text-[15px] leading-relaxed text-neutral-800">{t.noneBody}</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link href={href("/contact?topic=events")} className="btn-primary px-6 py-3">
                {t.notify}
              </Link>
              <Link href={href("/get-involved?tab=volunteer")} className="btn-secondary px-6 py-3">
                {t.volunteer}
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ─── Past events: one recap per event, film + photos ─── */}
      <section className="mx-auto flex w-full max-w-site flex-col gap-10 px-4 sm:px-6">
        <h2 className="m-0 text-[clamp(26px,3.2vw,36px)]">{t.pastTitle}</h2>
        {past.map((e, i) => (
          <PastEvent key={e.slug} event={e} lang={lang} tone={i % 2 === 0 ? "accent" : "sage"} />
        ))}
      </section>
    </div>
  );
}

function Meta({ event, lang }: { event: RiseEvent; lang: Locale }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[15px] font-semibold">
      <li className="flex items-center gap-2">
        <CalendarDays aria-hidden className="size-4 flex-none" strokeWidth={2.5} />
        {event.when[lang]}
      </li>
      <li className="flex items-center gap-2">
        <MapPin aria-hidden className="size-4 flex-none" strokeWidth={2.5} />
        {event.where[lang]}
      </li>
    </ul>
  );
}

function UpcomingCard({ event, lang }: { event: RiseEvent; lang: Locale }) {
  const t = pageCopy.events(lang);
  return (
    <article className="flex flex-col gap-5 rounded-soft-lg bg-accent-100 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex max-w-[620px] flex-col gap-3">
        <h3 className="m-0 text-[clamp(24px,3vw,32px)]">{event.title[lang]}</h3>
        <Meta event={event} lang={lang} />
        <p className="m-0 text-[15px] leading-relaxed text-neutral-800">{event.summary[lang]}</p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {event.zeffy && (
          <a href={zeffyTicketUrl(event.zeffy)} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-3">
            {t.signUp}
          </a>
        )}
        {event.flyer && (
          <a href={event.flyer} target="_blank" rel="noopener" className="btn-secondary px-6 py-3">
            {t.flyer}
          </a>
        )}
      </div>
    </article>
  );
}

function PastEvent({ event, lang, tone }: { event: RiseEvent; lang: Locale; tone: "accent" | "sage" }) {
  const t = pageCopy.events(lang);
  const film = event.film ? playable(videoFor(event.film, lang), lang) : null;
  const total = event.album ? albumPhotos(event.album).length : 0;
  const day = new Date(`${event.date}T12:00:00`);

  return (
    <article
      className={cn(
        "grid gap-8 rounded-soft-lg p-5 sm:p-8 lg:grid-cols-[260px_1fr] lg:gap-10",
        tone === "accent" ? "bg-surface" : "bg-accent-2-100",
      )}
    >
      {film && <PlayCard video={film} tone={tone} size="md" label={film.title} className="mx-auto max-w-[260px]" />}
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex size-[64px] flex-none flex-col items-center justify-center rounded-full font-heading leading-none text-white",
              tone === "accent" ? "bg-accent" : "bg-accent-2",
            )}
          >
            <span className="text-xs uppercase">{day.toLocaleDateString(lang, { month: "short" })}</span>
            <span className="text-[22px]">{day.getDate()}</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="m-0 text-[clamp(22px,2.8vw,30px)]">{event.title[lang]}</h3>
            <Meta event={event} lang={lang} />
          </div>
        </div>
        <p className="m-0 max-w-[640px] text-[15px] leading-relaxed text-neutral-800">{event.summary[lang]}</p>
        {event.photos && (
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {event.photos.map((id) => {
              const p = photo(id);
              return (
                <div key={id} className="relative aspect-square overflow-hidden rounded-soft">
                  <CloudinaryImage publicId={p.publicId} alt={p.alt} fill sizes="(min-width: 1024px) 260px, 33vw" className="washed object-cover" />
                </div>
              );
            })}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {event.album && (
            <Link href={localizePath(lang, `/gallery/${event.album}`)} className="btn-secondary px-5 py-2.5">
              {t.photos(total)}
            </Link>
          )}
          {event.flyer && (
            <a href={event.flyer} target="_blank" rel="noopener" className="text-sm font-bold text-accent-700 hover:text-accent-800">
              {t.flyer} →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
