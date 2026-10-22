import type { Metadata } from "next";
import Link from "next/link";
import ShareButtons from "@/components/donate/ShareButtons";
import PlayCard from "@/components/media/PlayCard";
import { hasLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { playable, video } from "@/lib/media";

// Set this page as the Givebutter redirect URL after a completed gift (handoff 1h).
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({ params }: PageProps<"/[lang]/donate/thank-you">) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = pageCopy.thanks(lang);
  const clip = playable(video("thank-you"), lang);

  return (
    <div className="mx-auto flex w-full max-w-site flex-col gap-16 px-4 pt-8 pb-24 sm:px-6 md:pt-14">
      <section className="grid items-center gap-10 md:grid-cols-[minmax(0,320px)_1fr]">
        <PlayCard video={clip} label={t.filmLabel} className="mx-auto max-w-[320px]" priority />
        <div className="flex max-w-[600px] flex-col gap-5">
          <span className="tag-accent-2 self-start">{t.kicker}</span>
          <h1 className="m-0 text-[clamp(34px,5vw,56px)] leading-[1.04]">{t.title}</h1>
          <p className="m-0 text-[17px] leading-relaxed text-neutral-800">{t.body}</p>
          <div className="mt-2 flex flex-col gap-3">
            <h2 className="m-0 font-body text-sm font-bold tracking-widest text-neutral-700 uppercase">{t.shareTitle}</h2>
            <ShareButtons text={t.shareText} copyLabel={t.copy} copiedLabel={t.copied} />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="m-0 text-[clamp(26px,3vw,34px)]">{t.moreTitle}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
          {t.more.map((m) => (
            <Link
              key={m.title}
              href={localizePath(lang, m.href)}
              className="flex flex-col gap-2 rounded-soft-lg bg-surface p-6 text-ink transition-shadow hover:shadow-md"
            >
              <b className="font-heading text-xl font-normal">{m.title}</b>
              <span className="text-[15px] text-neutral-800">{m.body}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
