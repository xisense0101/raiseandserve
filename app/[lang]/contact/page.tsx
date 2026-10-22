import { Suspense } from "react";
import { MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ContactFormFromQuery from "@/components/contact/ContactFormFromQuery";
import CloudinaryImage from "@/components/media/CloudinaryImage";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { photo } from "@/lib/media";
import { createMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact RISE to ask questions, request support, discuss partnerships, volunteer, donate, or get involved with community programs.",
  path: "/contact",
  keywords: ["contact RISE", "nonprofit partnership", "community support contact"],
});

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = pageCopy.contact(lang);
  const team = photo("IMG_8231");

  return (
    <div className="mx-auto grid w-full max-w-site gap-6 px-4 pt-8 pb-24 sm:px-6 md:pt-12 lg:grid-cols-[400px_1fr]">
      <aside className="flex flex-col gap-8 overflow-hidden rounded-soft-lg bg-ink text-page">
        <div className="relative aspect-[4/3]">
          <CloudinaryImage publicId={team.publicId} alt={team.alt} fill priority sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col gap-8 px-6 pb-8 sm:px-8">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold tracking-widest text-accent-300 uppercase">{t.kicker}</span>
            <h1 className="m-0 text-[clamp(40px,5vw,60px)] leading-none text-page">{t.title}</h1>
            <p className="m-0 text-[16px] leading-relaxed text-neutral-300">{t.intro}</p>
          </div>
          <dl className="m-0 flex flex-col gap-5">
            <div className="flex gap-3.5">
              <Phone aria-hidden className="mt-0.5 size-5 flex-none text-accent-300" strokeWidth={2.25} />
              <div>
                <dt className="text-xs font-bold tracking-wider text-neutral-400 uppercase">{t.callUs}</dt>
                <dd className="m-0 mt-1">
                  <a href={CONTACT.phoneHref} className="font-heading text-xl text-page hover:text-accent-200">
                    {CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-3.5">
              <MapPin aria-hidden className="mt-0.5 size-5 flex-none text-accent-300" strokeWidth={2.25} />
              <div>
                <dt className="text-xs font-bold tracking-wider text-neutral-400 uppercase">{t.visit}</dt>
                <dd className="m-0 mt-1 text-[15px] leading-relaxed text-neutral-200">
                  {CONTACT.street}
                  <br />
                  {CONTACT.city}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </aside>

      <section className="rounded-soft-lg bg-surface p-6 sm:p-10">
        <h2 className="m-0 mb-6 text-[clamp(26px,3.2vw,36px)]">{t.formTitle}</h2>
        <Suspense fallback={<ContactForm />}>
          <ContactFormFromQuery />
        </Suspense>
      </section>
    </div>
  );
}
