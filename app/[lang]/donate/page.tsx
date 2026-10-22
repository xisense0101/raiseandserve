import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";
import { Check, Info } from "lucide-react";
import GivebutterWidget from "@/components/donate/GivebutterWidget";
import CloudinaryImage from "@/components/media/CloudinaryImage";
import PlayCard from "@/components/media/PlayCard";
import { GIVEBUTTER_SCRIPT_ID, GIVEBUTTER_SCRIPT_SRC } from "@/lib/givebutter";
import { hasLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { photo, playable, video } from "@/lib/media";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Donate to Support Community Feeding and Education",
  description:
    "Support RISE with secure donations that help provide meals, educational resources, career development, clothing support, and community assistance.",
  path: "/donate",
  keywords: ["donate to RISE", "support community programs", "nonprofit donation", "education donation"],
});

// Same order as the impactPhotos captions: food, shoes, hygiene.
const IMPACT_PHOTOS = ["IMG_8189", "IMG_8192", "IMG_8194"];

export default async function DonatePage({ params }: PageProps<"/[lang]/donate">) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = pageCopy.donate(lang);
  const film = playable(video("pantry-fill-recap"), lang);
  const partner = playable(video("ivy-beesley"), lang);

  return (
    <div className="flex flex-col gap-20 pb-24 md:gap-24">
      {/* Same id as the idle-loaded script in the layout: next/script loads it once.
          Here it is needed right away, for visitors who land on /donate directly. */}
      <Script id={GIVEBUTTER_SCRIPT_ID} src={GIVEBUTTER_SCRIPT_SRC} strategy="afterInteractive" />

      {/* ─── Film + widget side by side (handoff 1f) ─── */}
      <section className="mx-auto grid w-full max-w-site items-start gap-10 px-4 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[1fr_440px]">
        <div className="flex flex-col gap-5">
          <span className="tag-accent self-start">{t.kicker}</span>
          <h1 className="m-0 max-w-[620px] text-[clamp(36px,5.4vw,60px)] leading-[1.02]">{t.title}</h1>
          <p className="m-0 max-w-[560px] text-[17px] leading-relaxed text-neutral-800">{t.body}</p>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px]">
            {t.trust.map((line) => (
              <li key={line} className="flex items-center gap-2.5">
                <span className="grid size-6 flex-none place-items-center rounded-full bg-accent-2-100 text-accent-2-800">
                  <Check aria-hidden className="size-3.5" strokeWidth={3} />
                </span>
                {line}
              </li>
            ))}
          </ul>
          <PlayCard video={film} label={t.filmLabel} className="mt-3 hidden max-w-[300px] lg:block" />
        </div>

        <div className="flex flex-col gap-3 lg:sticky lg:top-24">
          <div className="min-h-[520px] rounded-soft-lg bg-surface p-3 shadow-lg sm:p-4">
            <Suspense fallback={<p className="p-6 text-sm text-neutral-700">{t.widgetLoading}</p>}>
              <GivebutterWidget />
            </Suspense>
          </div>
          <details className="group rounded-soft-lg bg-neutral-100 px-5 py-4 text-sm">
            <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <Info aria-hidden className="size-4 flex-none text-accent-700" strokeWidth={2.75} />
              {t.feeTitle}
            </summary>
            <p className="m-0 mt-3 leading-relaxed text-neutral-800">{t.feeBody}</p>
          </details>
        </div>

        <PlayCard video={film} label={t.filmLabel} className="mx-auto max-w-[300px] lg:hidden" />
      </section>

      {/* ─── What one morning of donations did ─── */}
      <section className="mx-auto w-full max-w-site px-4 sm:px-6">
        <div className="flex flex-col gap-8 rounded-soft-lg bg-ink p-6 text-page sm:p-11">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="flex max-w-[620px] flex-col gap-4">
              <span className="text-xs font-bold tracking-widest text-accent-300 uppercase">{t.impactKicker}</span>
              <h2 className="m-0 text-[clamp(28px,3.6vw,42px)] text-page">{t.impactTitle}</h2>
              <p className="m-0 text-[17px] leading-relaxed text-neutral-200">{t.impactBody}</p>
            </div>
            <dl className="m-0 grid grid-cols-3 gap-4 sm:gap-8">
              {t.impactStats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <dt className="order-2 max-w-[140px] text-[13px] leading-snug text-neutral-300">{s.label}</dt>
                  <dd className="order-1 m-0 font-heading text-[clamp(30px,4vw,48px)] leading-none text-accent-300">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {IMPACT_PHOTOS.map((id, i) => {
              const p = photo(id);
              return (
                <figure key={id} className="m-0 flex flex-col gap-2.5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-soft">
                    <CloudinaryImage publicId={p.publicId} alt={p.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="text-sm font-semibold text-neutral-200">{t.impactPhotos[i]}</figcaption>
                </figure>
              );
            })}
          </div>
          <Link href={localizePath(lang, "/gallery/2026-07-20-pantry-fill")} className="self-start font-bold text-accent-300 hover:text-accent-200">
            {lang === "es" ? "Ver todas las fotos del 20 de julio" : "See every photo from July 20"} →
          </Link>
        </div>
      </section>

      {/* ─── Partner proof ─── */}
      <section className="mx-auto w-full max-w-site px-4 sm:px-6">
        <div className="grid items-center gap-10 rounded-soft-lg bg-accent-2-100 p-6 sm:p-11 md:grid-cols-[minmax(0,260px)_1fr]">
          <PlayCard video={partner} tone="sage" size="md" label={partner.title} className="mx-auto max-w-[260px]" />
          <div className="flex flex-col gap-[18px]">
            <span className="text-xs font-bold tracking-widest text-accent-2-800 uppercase">{t.partnerKicker}</span>
            <blockquote className="m-0 font-heading text-[clamp(22px,2.4vw,28px)] leading-tight text-pretty text-accent-2-900">
              “{t.partnerQuote}”
            </blockquote>
            <div className="flex flex-col">
              <b>{t.partnerName}</b>
              <span className="text-sm text-accent-2-800">{t.partnerOrg}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Other ways to give ─── */}
      <section className="mx-auto flex w-full max-w-site flex-col gap-7 px-4 sm:px-6">
        <h2 className="m-0 text-[clamp(28px,3.6vw,40px)]">{t.otherTitle}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
          {t.other.map((o) => (
            <Link
              key={o.title}
              href={localizePath(lang, o.href)}
              className="flex flex-col gap-2 rounded-soft-lg bg-surface p-6 text-ink transition-shadow hover:shadow-md"
            >
              <b className="font-heading text-xl font-normal">{o.title}</b>
              <span className="text-[15px] leading-normal text-neutral-800">{o.body}</span>
              <span className="mt-auto pt-2 text-sm font-bold text-accent-700">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
