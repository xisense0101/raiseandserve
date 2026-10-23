import Link from "next/link";
import { preconnect } from "react-dom";
import CloudinaryImage from "@/components/media/CloudinaryImage";
import ZeffyShop from "@/components/shop/ZeffyShop";
import { hasLocale, localizePath, type Locale } from "@/lib/i18n/config";
import { pageCopy } from "@/lib/i18n/pages";
import { photo } from "@/lib/media";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Shop and Event Tickets",
  description:
    "Get tickets to upcoming RISE events or shop official merchandise. Proceeds support education, community feeding, and outreach programs.",
  path: "/shop",
  keywords: ["RISE shop", "RISE tickets", "nonprofit merchandise", "fundraising shop"],
});

export default async function ShopPage({ params }: PageProps<"/[lang]/shop">) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = pageCopy.shop(lang);
  preconnect("https://www.zeffy.com");
  const team = photo("b88e24d2-9931-4b77-9bdb-fb749e08d9c8");

  return (
    <div className="flex flex-col gap-10 pb-24">
      <section className="mx-auto w-full max-w-site px-4 pt-8 sm:px-6 md:pt-12">
        <div className="grid items-center gap-6 overflow-hidden rounded-soft-lg bg-accent-2-100 md:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-4 p-6 sm:p-10">
            <span className="tag-accent-2 self-start">{t.kicker}</span>
            <h1 className="m-0 text-[clamp(38px,5.6vw,64px)] leading-none text-accent-2-900">{t.title}</h1>
            <p className="m-0 max-w-[520px] text-[17px] leading-relaxed text-accent-2-900">{t.intro}</p>
            <Link href={localizePath(lang, "/donate")} className="text-sm font-bold text-accent-2-800 hover:text-accent-2-900">
              {lang === "es" ? "¿Prefieres donar directamente? →" : "Rather donate directly? →"}
            </Link>
          </div>
          <div className="relative hidden h-full min-h-[280px] md:block">
            <CloudinaryImage publicId={team.publicId} alt={team.alt} fill priority sizes="360px" className="washed object-cover" />
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[960px] px-4 sm:px-6">
        <ZeffyShop lang={lang} />
      </section>
    </div>
  );
}
