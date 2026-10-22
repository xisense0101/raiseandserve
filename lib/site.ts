import type { Dictionary } from "@/lib/i18n/dictionaries";

type NavKey = keyof Pick<
  Dictionary["nav"],
  "about" | "programs" | "events" | "gallery" | "getInvolved" | "shop"
>;

/** Primary navigation (IA from the redesign handoff, plus the Zeffy shop). */
export const NAV_LINKS: { key: NavKey; href: string; ready: boolean }[] = [
  { key: "about", href: "/about", ready: true },
  { key: "programs", href: "/programs", ready: true },
  { key: "events", href: "/events", ready: true },
  { key: "gallery", href: "/gallery", ready: true },
  { key: "getInvolved", href: "/get-involved", ready: true },
  { key: "shop", href: "/shop", ready: true },
];

export const PROGRAM_LINKS: { key: keyof Dictionary["programs"]; href: string }[] = [
  { key: "feeding", href: "/programs#community-feeding" },
  { key: "pipeline", href: "/programs#talent-pipeline" },
  { key: "pantry", href: "/programs#food-bank" },
  { key: "clothing", href: "/programs#clothing-drives" },
];

export const CONTACT = {
  phoneDisplay: "(972) 523-3544",
  phoneHref: "tel:+19725233544",
  street: "539 W Commerce St, Suite 6954",
  city: "Dallas, Texas 75208",
};
