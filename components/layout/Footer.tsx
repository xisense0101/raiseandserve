import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { CONTACT, NAV_LINKS, PROGRAM_LINKS } from "@/lib/site";

const linkClass = "text-neutral-300 no-underline transition-colors hover:text-white";
const headingClass = "font-heading text-[17px] leading-tight text-white";

export default function Footer({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const href = (h: string) => localizePath(lang, h);

  return (
    <footer className="bg-ink text-sm leading-[1.6] text-neutral-300">
      <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-9 px-6 pt-14 pb-7">
        <div className="flex flex-col items-start gap-3.5">
          <Image
            src="/logo-full.png"
            alt="RISE: Resourceful Impact in Scholastic Education"
            width={864}
            height={574}
            sizes="180px"
            className="h-auto w-[180px]"
          />
          <p>{dict.footer.mission}</p>
          <Link href={href("/donate")} className="btn-primary px-5 py-2.5 text-[15px]">
            {dict.footer.donate}
          </Link>
        </div>

        <nav aria-labelledby="footer-explore" className="flex flex-col gap-1.5">
          <h2 id="footer-explore" className={headingClass}>
            {dict.footer.explore}
          </h2>
          {NAV_LINKS.filter((l) => l.ready).map((l) => (
            <Link key={l.key} href={href(l.href)} className={linkClass}>
              {dict.nav[l.key]}
            </Link>
          ))}
          <Link href={href("/contact")} className={linkClass}>
            {dict.nav.contact}
          </Link>
          <Link href={href("/donate")} className={linkClass}>
            {dict.nav.donate}
          </Link>
        </nav>

        <nav aria-labelledby="footer-programs" className="flex flex-col gap-1.5">
          <h2 id="footer-programs" className={headingClass}>
            {dict.footer.programs}
          </h2>
          {PROGRAM_LINKS.map((p) => (
            <Link key={p.key} href={href(p.href)} className={linkClass}>
              {dict.programs[p.key]}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-1">
          <h2 className={headingClass}>{dict.footer.contact}</h2>
          <address className="flex flex-col gap-1 not-italic">
            <a href={CONTACT.phoneHref} className="text-neutral-300 underline-offset-[3px] hover:text-white">
              {CONTACT.phoneDisplay}
            </a>
            <span>{CONTACT.street}</span>
            <span>{CONTACT.city}</span>
          </address>
        </div>
      </div>

      <div className="mx-auto flex max-w-site flex-wrap justify-between gap-x-6 gap-y-1 px-6 pt-[18px] pb-7 text-xs text-neutral-500">
        <span>{dict.footer.copyright(new Date().getFullYear())}</span>
        <span>{dict.footer.taxNote}</span>
      </div>
    </footer>
  );
}
