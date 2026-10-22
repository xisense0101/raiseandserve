import Link from "next/link";
import { Check } from "lucide-react";
import CloudinaryImage from "@/components/media/CloudinaryImage";
import LoopVideo from "@/components/media/LoopVideo";
import { hasLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { loopSources, photo } from "@/lib/media";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Programs",
  description:
    "Community feeding, a talent pipeline from middle school to careers, partner food pantries and clothing drives: the four RISE programs and how to help.",
  path: "/programs",
  keywords: ["community feeding", "talent pipeline", "food pantry", "clothing drive", "RISE programs"],
});

// Media for each program, in copy order: a muted loop or a still photo.
const MEDIA: ({ loop: string } | { photo: string })[] = [
  { photo: "d1c2fc82-65b2-4edc-bce8-e8c10bc51380" },
  { photo: "6087bf8f-23f8-4403-a028-ee495a026cec" },
  { photo: "IMG_8172" },
  { loop: "closet" },
];

const COLORS = ["bg-accent", "bg-accent-2", "bg-accent-700", "bg-accent-2-700"];
const SHAPES = [
  "rounded-[999px_999px_28px_28px]",
  "rounded-soft-lg",
  "rounded-soft-lg",
  "rounded-[28px_28px_999px_999px]",
];

export default async function ProgramsPage({ params }: PageProps<"/[lang]/programs">) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = pageCopy.programs(lang);

  return (
    <div className="flex flex-col gap-16 pb-24 md:gap-20">
      <section className="mx-auto flex w-full max-w-site flex-col gap-8 px-4 pt-8 sm:px-6 md:pt-14">
        <div className="flex max-w-[760px] flex-col gap-5">
          <span className="tag-accent-2 self-start">{t.kicker}</span>
          <h1 className="m-0 text-[clamp(38px,6vw,68px)] leading-[1]">{t.title}</h1>
          <p className="m-0 max-w-[560px] text-lg leading-relaxed text-neutral-800">{t.intro}</p>
        </div>
        {/* Jump links double as a summary of the four programs. */}
        <nav aria-label={t.kicker} className="flex flex-wrap gap-2.5">
          {t.items.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-surface py-2 pr-4 pl-2 text-[15px] font-semibold text-ink no-underline transition-colors hover:bg-neutral-300"
            >
              <span className={cn("grid size-7 place-items-center rounded-full font-heading text-sm text-white", COLORS[i])}>{i + 1}</span>
              {item.title}
            </a>
          ))}
        </nav>
      </section>

      {t.items.map((item, i) => {
        const media = MEDIA[i];
        const flip = i % 2 === 1;
        return (
          <section key={item.id} id={item.id} className="mx-auto w-full max-w-site scroll-mt-24 px-4 sm:px-6">
            <div className={cn("grid items-center gap-10 md:gap-16 md:grid-cols-[minmax(0,420px)_1fr]", flip && "md:grid-cols-[1fr_minmax(0,420px)]")}>
              <div className={cn("relative aspect-[4/5] overflow-hidden bg-neutral-300", SHAPES[i], flip && "md:order-2")}>
                {"loop" in media ? (
                  <LoopVideo {...loopSources(media.loop)} className="washed size-full object-cover" />
                ) : (
                  <CloudinaryImage
                    publicId={photo(media.photo).publicId}
                    alt={photo(media.photo).alt}
                    fill
                    sizes="(min-width: 768px) 420px, 100vw"
                    className="washed object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-5">
                <span className={cn("grid size-14 place-items-center rounded-full font-heading text-2xl text-white", COLORS[i])}>{i + 1}</span>
                <h2 className="m-0 text-[clamp(30px,4vw,46px)]">{item.title}</h2>
                <p className="m-0 max-w-[560px] text-[17px] leading-relaxed text-pretty text-neutral-800">{item.body}</p>
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-[15px]">
                      <span className="grid size-6 flex-none place-items-center rounded-full bg-accent-2-100 text-accent-2-800">
                        <Check aria-hidden className="size-3.5" strokeWidth={3} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link href={localizePath(lang, item.href)} className={cn("mt-2 self-start px-6 py-3", item.href === "/donate" ? "btn-primary" : "btn-secondary")}>
                  {item.cta}
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <section className="mx-auto w-full max-w-site px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-7 rounded-soft-lg bg-accent-2 px-6 py-12 sm:px-11">
          <h2 className="m-0 max-w-[640px] text-[clamp(26px,3.4vw,40px)] text-white">
            {lang === "es" ? "Cada programa empieza con una donación." : "Every program starts with a donation."}
          </h2>
          <Link
            href={localizePath(lang, "/donate")}
            className="inline-flex items-center rounded-full bg-page px-7 py-3.5 font-heading text-base text-accent-2-900 transition-colors hover:bg-accent-2-100"
          >
            {lang === "es" ? "Donar" : "Donate"}
          </Link>
        </div>
      </section>
    </div>
  );
}
