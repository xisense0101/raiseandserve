import { Suspense } from "react";
import { Check } from "lucide-react";
import ApplyPageClient from "@/components/ApplyPageClient";
import ContactForm from "@/components/ContactForm";
import InvolvedTabs, { TabsView, type InvolvedTab } from "@/components/involved/InvolvedTabs";
import CloudinaryImage from "@/components/media/CloudinaryImage";
import PlayCard from "@/components/media/PlayCard";
import ZeffyShop from "@/components/shop/ZeffyShop";
import VolunteerForm from "@/components/VolunteerForm";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { photo, playable, video } from "@/lib/media";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Get Involved: Volunteer, Apply, Partner or Shop",
  description:
    "Volunteer at a RISE meal or pantry fill, apply to the talent pipeline, partner with us or host a drive, or shop RISE merch on Zeffy.",
  path: "/get-involved",
  keywords: ["volunteer with RISE", "talent pipeline application", "host a drive", "nonprofit partnership", "RISE shop"],
});

function PanelHeader({ title, body }: { title: string; body: string }) {
  return (
    <div className="mb-6 flex max-w-[640px] flex-col gap-2">
      <h2 className="m-0 text-[clamp(26px,3.2vw,36px)]">{title}</h2>
      <p className="m-0 text-[16px] leading-relaxed text-neutral-800">{body}</p>
    </div>
  );
}

export default async function GetInvolvedPage({ params }: PageProps<"/[lang]/get-involved">) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = pageCopy.involved(lang);
  const hostFilm = playable(video("host-reminder"), lang);
  const volunteers = photo("c9e33a81-9f93-43a0-af4f-46c749a711a4");
  const donorWall = photo("IMG_8187");

  const panels: Record<InvolvedTab, React.ReactNode> = {
    volunteer: (
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_300px]">
        <div>
          <PanelHeader title={t.volunteerTitle} body={t.volunteerBody} />
          <VolunteerForm />
        </div>
        <aside className="flex flex-col gap-3 lg:sticky lg:top-24">
          <PlayCard video={hostFilm} tone="sage" label={t.volunteerFilm} className="mx-auto max-w-[260px] lg:max-w-none" />
        </aside>
      </div>
    ),
    apply: (
      <div>
        <PanelHeader title={t.applyTitle} body={t.applyBody} />
        <ApplyPageClient />
      </div>
    ),
    partner: (
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-6">
          <PanelHeader title={t.partnerTitle} body={t.partnerBody} />
          <ul className="m-0 -mt-2 flex list-none flex-col gap-2.5 p-0">
            {t.partnerPoints.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-[15px] font-semibold">
                <span className="grid size-6 flex-none place-items-center rounded-full bg-accent text-white">
                  <Check aria-hidden className="size-3.5" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="relative aspect-[4/3] overflow-hidden rounded-soft-lg">
            <CloudinaryImage publicId={donorWall.publicId} alt={donorWall.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="washed object-cover" />
          </div>
        </div>
        <div className="rounded-soft-lg bg-surface p-6 sm:p-8">
          <ContactForm initialTopic="partnership" />
        </div>
      </div>
    ),
    shop: (
      <div>
        <PanelHeader title={t.shopTitle} body={t.shopBody} />
        <ZeffyShop lang={lang} />
      </div>
    ),
  };

  return (
    <div className="flex flex-col gap-12 pb-24">
      <section className="mx-auto grid w-full max-w-site items-end gap-8 px-4 pt-8 sm:px-6 md:pt-14 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-5">
          <span className="tag-accent self-start">{t.kicker}</span>
          <h1 className="m-0 text-[clamp(40px,6.4vw,76px)] leading-[0.98]">{t.title}</h1>
          <p className="m-0 max-w-[520px] text-lg leading-relaxed text-neutral-800">{t.intro}</p>
        </div>
        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[999px_999px_28px_28px] lg:block">
          <CloudinaryImage publicId={volunteers.publicId} alt={volunteers.alt} fill priority sizes="340px" className="washed object-cover object-top" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-site px-4 sm:px-6">
        <Suspense fallback={<TabsView labels={t.tabs} panels={panels} active="volunteer" />}>
          <InvolvedTabs labels={t.tabs} panels={panels} />
        </Suspense>
      </section>
    </div>
  );
}
