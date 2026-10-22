import type { Locale } from "./config";

/**
 * UI copy shared by the site chrome (navbar, footer, language switch).
 * Page copy lives next to each page and is added as pages are redesigned.
 */
const en = {
  skipToContent: "Skip to content",
  orgName: "Resourceful Impact in Scholastic Education",
  nav: {
    home: "Home",
    about: "About",
    programs: "Programs",
    events: "Events",
    gallery: "Gallery",
    getInvolved: "Get involved",
    donate: "Donate",
    volunteer: "Volunteer",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryLabel: "Primary",
  },
  language: {
    label: "Language",
    en: "English",
    es: "Español",
  },
  footer: {
    mission:
      "RISE uplifts individuals in need through empowerment, education, and community service for a brighter future. Let's rise together.",
    explore: "Explore",
    programs: "Programs",
    contact: "Contact",
    donate: "Donate",
    taxNote: "RISE is a 501(c)(3) nonprofit. Gifts are tax-deductible.",
    copyright: (year: number) =>
      `Copyright © Resourceful Impact in Scholastic Education ${year}. All Rights Reserved.`,
  },
  programs: {
    feeding: "Community feeding",
    pipeline: "Talent pipeline",
    pantry: "Food pantry",
    clothing: "Clothing drives",
  },
  giveBar: {
    label: "Support RISE",
  },
  media: {
    close: "Close video",
    tapToClose: "Tap anywhere to close",
    watch: "Watch",
  },
  verification: {
    checking: "Checking that you're human…",
    failed: "Verification failed. Please refresh the page and try again.",
    notConfigured: "Form verification is not configured.",
  },
};

export type Dictionary = typeof en;

const es: Dictionary = {
  skipToContent: "Ir al contenido",
  orgName: "Resourceful Impact in Scholastic Education",
  nav: {
    home: "Inicio",
    about: "Nosotros",
    programs: "Programas",
    events: "Eventos",
    gallery: "Galería",
    getInvolved: "Participa",
    donate: "Donar",
    volunteer: "Ser voluntario",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    primaryLabel: "Principal",
  },
  language: {
    label: "Idioma",
    en: "English",
    es: "Español",
  },
  footer: {
    mission:
      "RISE impulsa a las personas que lo necesitan a través del empoderamiento, la educación y el servicio comunitario para un futuro mejor. Levantémonos juntos.",
    explore: "Explora",
    programs: "Programas",
    contact: "Contacto",
    donate: "Donar",
    taxNote: "RISE es una organización sin fines de lucro 501(c)(3). Las donaciones son deducibles de impuestos.",
    copyright: (year: number) =>
      `Copyright © Resourceful Impact in Scholastic Education ${year}. Todos los derechos reservados.`,
  },
  programs: {
    feeding: "Alimentación comunitaria",
    pipeline: "Talent pipeline",
    pantry: "Despensa de alimentos",
    clothing: "Colectas de ropa",
  },
  giveBar: {
    label: "Apoya a RISE",
  },
  media: {
    close: "Cerrar video",
    tapToClose: "Toca en cualquier lugar para cerrar",
    watch: "Ver",
  },
  verification: {
    checking: "Verificando que eres humano…",
    failed: "No se pudo verificar. Actualiza la página e inténtalo de nuevo.",
    notConfigured: "La verificación del formulario no está configurada.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
