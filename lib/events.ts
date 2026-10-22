import type { Locale } from "./i18n/config";
import type { AlbumSlug } from "./media";

type Localized = Record<Locale, string>;

export type RiseEvent = {
  slug: string;
  /** ISO date, used for sorting and for upcoming vs. past. */
  date: string;
  title: Localized;
  when: Localized;
  where: Localized;
  summary: Localized;
  /** Zeffy ticketing slug: zeffy.com/ticketing/<slug>. Free sign-up for upcoming events. */
  zeffy?: string;
  flyer?: string;
  /** Recap media once the event has happened. */
  album?: AlbumSlug;
  film?: string;
  photos?: string[];
};

/**
 * Every RISE event, newest last. Add the next one here with a Zeffy slug and
 * it shows up under "Up next" with a sign-up button until its date passes.
 */
export const EVENTS: RiseEvent[] = [
  {
    slug: "2026-07-06-community-meal",
    date: "2026-07-06",
    title: { en: "Eat It, Love It: free community meal", es: "Eat It, Love It: comida comunitaria gratuita" },
    when: { en: "Monday, July 6, 2026 · 4–7 PM", es: "Lunes 6 de julio de 2026 · 4–7 PM" },
    where: { en: "Catfish King, Mount Pleasant TX", es: "Catfish King, Mount Pleasant TX" },
    summary: {
      en: "A free hot dinner for every neighbor who walked through the door. Volunteers served every table while families, kids and grandparents shared catfish, conversation and a night out.",
      es: "Una cena caliente y gratuita para cada vecino que llegó. Los voluntarios atendieron cada mesa mientras familias, niños y abuelos compartían comida, conversación y una noche juntos.",
    },
    zeffy: "eat-it-love-it",
    flyer: "/event-catfish.jpg",
    album: "2026-07-06-community-meal",
    film: "final-draft-en",
    photos: ["3e87f51d-81c0-43a0-98bd-15b365764f63", "dd835421-6473-4308-880d-6542653a0417", "bb6e9f64-6f79-4872-a60e-e49e6bada01e"],
  },
  {
    slug: "2026-07-20-pantry-fill",
    date: "2026-07-20",
    title: { en: "Pantry fill at Communities In Schools", es: "Llenado de despensa en Communities In Schools" },
    when: { en: "Monday, July 20, 2026 · 10 AM–12 PM", es: "Lunes 20 de julio de 2026 · 10 AM–12 PM" },
    where: { en: "CIS Greater Tarrant County, Fort Worth", es: "CIS Greater Tarrant County, Fort Worth" },
    summary: {
      en: "RISE volunteers delivered and sorted food, new shoes, clothing and hygiene kits for the CIS food pantry, clothing closet and school supply room, ready for the new school year.",
      es: "Los voluntarios de RISE entregaron y organizaron comida, zapatos nuevos, ropa y kits de higiene para la despensa, el armario de ropa y la sala de útiles de CIS, listos para el nuevo año escolar.",
    },
    zeffy: "2st-event",
    flyer: "/event-cis.jpg",
    album: "2026-07-20-pantry-fill",
    film: "story-take-1",
    photos: ["IMG_8176", "IMG_8191", "IMG_8195"],
  },
];

export const zeffyTicketUrl = (slug: string) => `https://www.zeffy.com/ticketing/${slug}`;

/** Splits events around today (compared as ISO dates, so the day of an event still counts as upcoming). */
export function splitEvents(today = new Date().toISOString().slice(0, 10)) {
  const upcoming = EVENTS.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = EVENTS.filter((e) => e.date < today).sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}
