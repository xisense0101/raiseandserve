import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import CloudinaryImage from "@/components/media/CloudinaryImage";
import PlayCard from "@/components/media/PlayCard";
import { hasLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { photo, playable, video } from "@/lib/media";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about Resourceful Impact in Scholastic Education, our mission, leadership, values, and work to empower communities through education and service.",
  path: "/about",
  keywords: ["about RISE", "nonprofit mission", "community empowerment", "education nonprofit"],
});

// One photo per partner card, in the same order as the copy: CIS, then Catfish King.
const PARTNER_PHOTOS = ["IMG_8181", "IMG_7998"];

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = pageCopy.about(lang);
  const href = (h: string) => localizePath(lang, h);

  const story = playable(video("story-take-1"), lang);
  const sean = playable(video("sean-taylor"), lang);
  const team = photo("97c0a3f7-aee3-4122-892d-40f381018279");
  const crew = photo("724e9e18-e981-4ca2-87fd-2ee824f17746");

  return (
    <div className="flex flex-col gap-20 pb-24 md:gap-28">
      {/* ─── Intro: headline left, the RISE story film right ─── */}
      <section className="mx-auto grid w-full max-w-site items-center gap-12 px-4 pt-8 sm:px-6 md:pt-14 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <span className="tag-accent self-start">{t.kicker}</span>
          <h1 className="m-0 max-w-[720px] text-[clamp(40px,6.4vw,76px)] leading-[0.98]">{t.title}</h1>
          <p className="m-0 max-w-[600px] text-lg leading-relaxed text-pretty text-neutral-800">{t.intro}</p>
        </div>
        <div className="relative mx-auto w-full max-w-[300px] lg:max-w-none">
          <div aria-hidden className="absolute -inset-3 -z-10 rotate-3 rounded-[999px_999px_28px_28px] bg-accent-2-300" />
          <PlayCard video={story} label={t.filmLabel} priority className="rounded-[999px_999px_28px_28px]" />
        </div>
      </section>

      {/* ─── Who we are ─── */}
      <section className="mx-auto grid w-full max-w-site items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative grid grid-cols-[1.25fr_1fr] items-end gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-soft-lg">
            <CloudinaryImage publicId={team.publicId} alt={team.alt} fill sizes="(min-width: 1024px) 320px, 55vw" className="washed object-cover" />
          </div>
          <div className="relative mb-10 aspect-[2/3] overflow-hidden rounded-[28px_28px_999px_999px]">
            <CloudinaryImage publicId={crew.publicId} alt={crew.alt} fill sizes="(min-width: 1024px) 240px, 40vw" className="washed object-cover" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="m-0 text-[clamp(30px,4vw,44px)]">{t.missionTitle}</h2>
          {t.mission.map((para) => (
            <p key={para} className="m-0 text-[17px] leading-relaxed text-pretty text-neutral-800">
              {para}
            </p>
          ))}
          <ul className="m-0 mt-2 grid list-none gap-3 p-0 sm:grid-cols-2">
            {t.missionPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[15px] font-semibold">
                <span className="mt-0.5 grid size-6 flex-none place-items-center rounded-full bg-accent text-white">
                  <Check aria-hidden className="size-3.5" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Leadership ─── */}
      <section className="mx-auto flex w-full max-w-site flex-col gap-8 px-4 sm:px-6">
        <h2 className="m-0 text-[clamp(28px,3.6vw,40px)]">{t.leadershipTitle}</h2>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article className="grid gap-6 rounded-soft-lg bg-surface p-6 sm:grid-cols-[220px_1fr] sm:p-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[999px_999px_28px_28px] bg-neutral-300">
              <Image src="/about-tony.jpeg" alt={t.founder.name} fill sizes="220px" className="object-cover" />
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="m-0 text-[28px]">{t.founder.name}</h3>
                <p className="m-0 mt-1 text-sm font-bold tracking-wide text-accent-700 uppercase">{t.founder.role}</p>
              </div>
              {t.founder.bio.map((para) => (
                <p key={para} className="m-0 text-[15px] leading-relaxed text-neutral-800">
                  {para}
                </p>
              ))}
            </div>
          </article>
          <article className="grid grid-cols-[120px_1fr] items-center gap-5 rounded-soft-lg bg-accent-2-100 p-6 sm:grid-cols-[150px_1fr] sm:p-8">
            <PlayCard video={sean} tone="sage" size="sm" />
            <div className="flex flex-col gap-3">
              <blockquote className="m-0 font-heading text-xl leading-snug text-pretty text-accent-2-900">“{t.board.quote}”</blockquote>
              <div className="flex flex-col">
                <b>{t.board.name}</b>
                <span className="text-sm text-accent-2-800">{t.board.role}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ─── Partners ─── */}
      <section className="mx-auto flex w-full max-w-site flex-col gap-8 px-4 sm:px-6">
        <h2 className="m-0 text-[clamp(28px,3.6vw,40px)]">{t.partnersTitle}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {t.partners.map((partner, i) => {
            const p = photo(PARTNER_PHOTOS[i]);
            return (
              <article key={partner.name} className="flex flex-col overflow-hidden rounded-soft-lg bg-surface">
                <div className="relative aspect-[16/9]">
                  <CloudinaryImage publicId={p.publicId} alt={p.alt} fill sizes="(min-width: 768px) 580px, 100vw" className="washed object-cover" />
                </div>
                <div className="flex flex-col gap-2 p-6">
                  <h3 className="m-0 text-[22px]">{partner.name}</h3>
                  <p className="m-0 text-[15px] leading-relaxed text-neutral-800">{partner.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="mx-auto w-full max-w-site px-4 sm:px-6">
        <div className="flex flex-col gap-10 rounded-soft-lg bg-ink p-6 text-page sm:p-11">
          <h2 className="m-0 text-[clamp(28px,3.6vw,40px)] text-page">{t.valuesTitle}</h2>
          <ol className="m-0 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {t.values.map((v, i) => (
              <li key={v.title} className="flex flex-col gap-2 border-t border-neutral-700 pt-5">
                <span className="font-heading text-sm text-accent-300">0{i + 1}</span>
                <b className="font-heading text-[22px] font-normal">{v.title}</b>
                <span className="text-[15px] leading-relaxed text-neutral-300">{v.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="mx-auto flex w-full max-w-site flex-col items-center gap-6 px-4 text-center sm:px-6">
        <h2 className="m-0 max-w-[720px] text-[clamp(28px,3.8vw,44px)]">{t.cta}</h2>
        <div className="flex flex-wrap justify-center gap-2.5">
          <Link href={href("/donate")} className="btn-primary px-7 py-3.5 text-base">
            {lang === "es" ? "Donar" : "Donate"}
          </Link>
          <Link href={href("/events")} className="btn-secondary px-6 py-3 text-base">
            {lang === "es" ? "Ver eventos" : "See events"}
          </Link>
        </div>
      </section>
    </div>
  );
}
