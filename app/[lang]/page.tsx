import Link from "next/link";
import GiveBox from "@/components/home/GiveBox";
import HeroMedia from "@/components/home/HeroMedia";
import MobileGiveBar from "@/components/home/MobileGiveBar";
import WhereItGoes from "@/components/home/WhereItGoes";
import CloudinaryImage from "@/components/media/CloudinaryImage";
import PlayBadge from "@/components/media/PlayBadge";
import PlayCard from "@/components/media/PlayCard";
import { hasLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { photo, playable, video, videoFor } from "@/lib/media";
import { createMetadata } from "@/lib/seo";
import { PROGRAM_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Community Support Through Education, Food, and Service",
  description:
    "RISE helps communities grow through feeding programs, accessible education, career development, clothing drives, volunteer service, and essential assistance.",
  path: "/",
  keywords: ["community support", "nonprofit education", "community feeding", "volunteer service", "essential assistance"],
});

const PROGRAM_COLORS = ["bg-accent", "bg-accent-2", "bg-accent-700", "bg-accent-2-700"];
const EVENT_COLORS = ["bg-accent", "bg-accent-2"];
const EVENT_ALBUMS = ["/gallery/2026-07-06-community-meal", "/gallery/2026-07-20-pantry-fill"];

// Organic shapes from the hi-fi gallery strip: first card arched on top, last arched below.
const STRIP = [
  { id: "e2866917-2a36-48e2-a42a-9f5ec2608c76", shape: "rounded-[999px_999px_28px_28px]" },
  { id: "1fd6a3c1-274b-4cf5-ad16-29e72fa993ee", shape: "rounded-soft-lg" },
  { id: "IMG_8193", shape: "rounded-soft-lg" },
  { id: "c5e72c79-2aa2-4716-8225-a9bd069ca90e", shape: "rounded-[28px_28px_999px_999px]" },
];

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = pageCopy.home(lang);
  const href = (h: string) => localizePath(lang, h);


  // The produced RISE reel: clear voice-over explaining who RISE is and what it does.
  const reel = playable(video("reel"), lang);
  const campaign = playable(videoFor("campaign", lang), lang);
  // Edited take with captions (IMG_2553); the raw take IMG_8200 stays in the July 20 album.
  const partner = playable(video("jennifer-thanks"), lang);

  return (
    <div className="flex flex-col gap-20 pb-24 md:gap-24">
      {/* ─── Hero ─── */}
      {/* The sticky mobile bar waits until hero and give box have both scrolled away. */}
      <section id="home-hero" className="mx-auto mt-2 w-full max-w-site px-4 sm:px-6">
        <div
          className="relative isolate flex min-h-[min(82svh,680px)] items-end overflow-hidden rounded-soft-lg bg-neutral-800 md:min-h-[560px]"
        >
          <HeroMedia />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-neutral-900)_35%,transparent)_0%,color-mix(in_srgb,var(--color-neutral-900)_55%,transparent)_45%,color-mix(in_srgb,var(--color-neutral-900)_85%,transparent)_100%)]" />
          <div className="absolute top-4 left-4 z-10 md:top-[22px] md:left-[22px]">
            <PlayBadge video={reel} label={t.heroBadge} />
          </div>
          <div className="relative flex w-full flex-wrap items-end justify-between gap-8 px-5 pt-24 pb-6 sm:px-8 md:px-10 md:pt-[88px] md:pb-10">
            <div className="flex max-w-[560px] flex-col gap-4">
              <h1 className="m-0 text-[clamp(44px,7vw,80px)] leading-none text-white">{t.heroTitle}</h1>
              <p className="m-0 max-w-[460px] text-lg leading-normal text-pretty text-neutral-100">{t.heroBody}</p>
              <div className="flex flex-wrap gap-2.5">
                <Link href={href("/donate")} className="btn-primary px-[26px] py-[13px] text-base">
                  {t.donate}
                </Link>
                <Link
                  href={href("/get-involved?tab=volunteer")}
                  className="inline-flex items-center rounded-full border-[1.5px] border-white px-6 py-3 font-heading text-base text-white transition-colors hover:bg-white/14"
                >
                  {t.volunteer}
                </Link>
              </div>
            </div>
            <GiveBox glass className="hidden md:flex" />
          </div>
        </div>
        <GiveBox className="mt-4 md:hidden" />
      </section>

      {/* ─── This summer ─── */}
      <section className="mx-auto grid w-full max-w-site grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-12 px-4 sm:px-6">
        <PlayCard
          video={campaign}
          label={t.summer.filmLabel}
          className="max-w-[280px] justify-self-center sm:max-w-[340px] sm:justify-self-start"
        />
        <div className="flex max-w-[560px] flex-col gap-[18px]">
          <span className="tag-accent self-start">{t.summer.kicker}</span>
          <h2 className="m-0 text-[clamp(30px,4vw,44px)]">{t.summer.title}</h2>
          <p className="m-0 text-[17px] leading-relaxed text-pretty text-neutral-800">{t.summer.body}</p>
          <div className="flex flex-col gap-3">
            {t.summer.events.map((e, i) => (
              <div key={e.day} className="flex items-center gap-4 rounded-soft-lg bg-surface p-3.5">
                <div
                  className={cn(
                    "flex size-[62px] flex-none flex-col items-center justify-center rounded-full font-heading leading-none text-white",
                    EVENT_COLORS[i],
                  )}
                >
                  <span className="text-xs">{e.mon}</span>
                  <span className="text-[22px]">{e.day}</span>
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                  <b className="text-base">{e.title}</b>
                  <span className="text-sm text-neutral-700">{e.where}</span>
                </div>
                <Link href={href(EVENT_ALBUMS[i])} className="text-sm font-bold whitespace-nowrap text-accent-700 hover:text-accent-800">
                  {t.summer.recap} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Where your donation goes ─── */}
      <WhereItGoes lang={lang} />

      {/* ─── Partner quote ─── */}
      <section className="mx-auto w-full max-w-site px-4 sm:px-6">
        <div className="grid items-center gap-10 rounded-soft-lg bg-accent-2-100 p-6 sm:p-11 md:grid-cols-[minmax(0,280px)_1fr]">
          <PlayCard video={partner} tone="sage" size="md" label={partner.title} className="mx-auto max-w-[280px]" />
          <div className="flex flex-col gap-[18px]">
            <span className="text-xs font-bold tracking-widest text-accent-2-800 uppercase">{t.partner.kicker}</span>
            <blockquote className="m-0 font-heading text-[clamp(22px,2.6vw,30px)] leading-tight text-pretty text-accent-2-900">
              “{t.partner.quote}”
            </blockquote>
            <div className="flex flex-col">
              <b>{t.partner.name}</b>
              <span className="text-sm text-accent-2-800">{t.partner.org}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What we do ─── */}
      <section className="mx-auto flex w-full max-w-site flex-col gap-8 px-4 sm:px-6">
        <h2 className="m-0 text-[clamp(28px,3.6vw,40px)]">{t.doTitle}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
          {t.programs.map((p, i) => (
            <Link
              key={p.title}
              href={href(PROGRAM_LINKS[i].href)}
              className="flex flex-col gap-3 rounded-soft-lg bg-surface p-6 text-ink transition-shadow hover:shadow-md"
            >
              <span className={cn("grid size-12 place-items-center rounded-full font-heading text-xl text-white", PROGRAM_COLORS[i])}>
                {i + 1}
              </span>
              <b className="font-heading text-[21px] font-normal">{p.title}</b>
              <span className="text-[15px] leading-normal text-neutral-800">{p.body}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Gallery strip ─── */}
      <section className="mx-auto flex w-full max-w-site flex-col gap-6 px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="m-0 text-[clamp(28px,3.6vw,40px)]">{t.gallery.title}</h2>
          <Link href={href("/gallery")} className="btn-secondary px-5 py-2.5">
            {t.gallery.link}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
          {STRIP.map(({ id, shape }) => {
            const p = photo(id);
            return (
              <div key={id} className={cn("relative aspect-[4/5] overflow-hidden", shape)}>
                <CloudinaryImage
                  publicId={p.publicId}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 280px, 50vw"
                  className="washed object-cover"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA band ─── */}
      <section className="mx-auto w-full max-w-site px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-7 rounded-soft-lg bg-accent px-6 py-12 sm:px-11 sm:py-14">
          <h2 className="m-0 max-w-[720px] text-[clamp(28px,3.8vw,44px)] text-white">{t.cta}</h2>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href={href("/donate")}
              className="inline-flex items-center rounded-full bg-page px-7 py-3.5 font-heading text-base text-accent-800 transition-colors hover:bg-accent-100"
            >
              {t.donate}
            </Link>
            <Link
              href={href("/get-involved?tab=volunteer")}
              className="inline-flex items-center rounded-full border-[1.5px] border-white px-[26px] py-[13px] font-heading text-base text-white transition-colors hover:bg-accent-600"
            >
              {t.volunteer}
            </Link>
          </div>
        </div>
      </section>

      <MobileGiveBar watchId="home-hero" />
    </div>
  );
}
