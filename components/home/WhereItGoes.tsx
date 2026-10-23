import Link from "next/link";
import LoopVideo from "@/components/media/LoopVideo";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { loopSources } from "@/lib/media";

// Order matches the copy cards: pantry shelves, hygiene table, the shoe and clothing closet.
const LOOP_SLUGS = ["pantry-shelves", "hygiene-table", "closet"] as const;

/** Three muted 4:5 loops from the July 20 pantry fill (hi-fi section 4). */
export default function WhereItGoes({ lang, showLink = true }: { lang: Locale; showLink?: boolean }) {
  const t = pageCopy.home(lang).goes;
  return (
    <section className="mx-auto flex w-full max-w-site flex-col gap-7 px-4 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <h2 className="m-0 max-w-[560px] text-[clamp(28px,3.6vw,40px)]">{t.title}</h2>
        {showLink && (
          <Link href={localizePath(lang, "/gallery/2026-07-20-pantry-fill")} className="font-bold text-accent-700 hover:text-accent-800">
            {t.link} →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
        {LOOP_SLUGS.map((slug, i) => {
          const media = loopSources(slug);
          return (
            <figure key={slug} className="m-0 flex flex-col gap-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-soft-lg bg-neutral-300">
                <LoopVideo src={media.src} poster={media.poster} className="washed size-full object-cover" />
                <span className="absolute top-3 left-3 rounded-full bg-neutral-900/55 px-2.5 py-1 text-[11px] font-semibold text-white">
                  ⟳ {lang === "es" ? "20 de julio" : "July 20"}
                </span>
              </div>
              <figcaption className="flex flex-col gap-0.5 text-ink">
                <b className="font-heading text-xl font-normal">{t.cards[i].title}</b>
                <span className="text-sm text-neutral-700">{t.cards[i].body}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
