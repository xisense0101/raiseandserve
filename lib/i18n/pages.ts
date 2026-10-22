import type { Locale } from "./config";

/**
 * Page copy for the redesigned pages, EN and ES side by side.
 * Spanish needs a native-speaker pass before launch (see handoff 1o).
 */

const home = {
  en: {
    heroBadge: "Watch: why we rise",
    heroTitle: "Together, we rise.",
    heroBody:
      "RISE serves free meals, keeps students in school and stocks the pantries our partner schools rely on, across North Texas.",
    donate: "Donate",
    volunteer: "Volunteer",
    give: {
      title: "Give today",
      once: "One-time",
      monthly: "Monthly",
      cta: (amount: number, monthly: boolean) => `Give $${amount}${monthly ? " a month" : ""}`,
      note: "Secure checkout by Givebutter. You can remove the processing fee.",
      amountsLabel: "Choose an amount",
      frequencyLabel: "How often",
    },
    summer: {
      kicker: "This summer",
      title: "Two events, two opportunities to make a real difference.",
      body: "This is not just a meal. This is about people coming together, sharing conversations and knowing they are not forgotten.",
      filmLabel: "Two events, one community",
      recap: "Photos & video",
      events: [
        { mon: "JUL", day: "6", title: "Community meal", where: "Catfish King, Mount Pleasant TX" },
        { mon: "JUL", day: "20", title: "Pantry fill", where: "CIS Greater Tarrant County, Fort Worth" },
      ],
    },
    goes: {
      title: "Where your gift goes",
      link: "See the July 20 pantry fill",
      cards: [
        { title: "Food on pantry shelves", body: "Canned goods, peanut butter and weekend food bags for CIS families." },
        { title: "Clothing & hygiene", body: "Hygiene kits, clothing and new shoes for the school closet." },
        { title: "Stocked for the school year", body: "CIS serves about 6,000 students in some 70 schools." },
      ],
    },
    partner: {
      kicker: "From our partners",
      quote:
        "We're going to be able to serve more families and more kids in our schools this school year than we ever have before.",
      name: "Jennifer Murphy",
      org: "Communities In Schools of Greater Tarrant County",
    },
    doTitle: "What we do",
    programs: [
      { title: "Community feeding", body: "Free hot meals where neighbors sit down together." },
      { title: "Talent pipeline", body: "Middle school to high school, high school to college, college to careers." },
      { title: "Food pantry", body: "Keeping partner pantries like CIS stocked through the school year." },
      { title: "Clothing drives", body: "Clothing and shoes for students and their families." },
    ],
    gallery: { title: "Community in action", link: "Open the gallery" },
    cta: "Something small to us can mean everything to someone else.",
    sticky: "Support RISE",
  },
  es: {
    heroBadge: "Mira: por qué nos levantamos",
    heroTitle: "Juntos nos levantamos.",
    heroBody:
      "RISE ofrece comidas gratuitas, ayuda a los estudiantes a seguir en la escuela y llena las despensas de nuestras escuelas aliadas en el norte de Texas.",
    donate: "Donar",
    volunteer: "Ser voluntario",
    give: {
      title: "Dona hoy",
      once: "Una vez",
      monthly: "Mensual",
      cta: (amount: number, monthly: boolean) => `Donar $${amount}${monthly ? " al mes" : ""}`,
      note: "Pago seguro con Givebutter. Puedes quitar la tarifa de procesamiento.",
      amountsLabel: "Elige una cantidad",
      frequencyLabel: "Frecuencia",
    },
    summer: {
      kicker: "Este verano",
      title: "Dos eventos, dos oportunidades de hacer una diferencia real.",
      body: "No es solo una comida. Es la comunidad reunida, compartiendo y sabiendo que nadie está olvidado.",
      filmLabel: "Dos eventos, una comunidad",
      recap: "Fotos y video",
      events: [
        { mon: "JUL", day: "6", title: "Comida comunitaria", where: "Catfish King, Mount Pleasant TX" },
        { mon: "JUL", day: "20", title: "Llenado de despensa", where: "CIS Greater Tarrant County, Fort Worth" },
      ],
    },
    goes: {
      title: "A dónde va tu donación",
      link: "Ver la despensa del 20 de julio",
      cards: [
        { title: "Comida en las despensas", body: "Enlatados, crema de cacahuate y bolsas de comida para el fin de semana." },
        { title: "Ropa e higiene", body: "Kits de higiene, ropa y zapatos nuevos para el armario escolar." },
        { title: "Listos para el año escolar", body: "CIS atiende a unos 6,000 estudiantes en unas 70 escuelas." },
      ],
    },
    partner: {
      kicker: "Nuestros aliados",
      quote:
        "Este año escolar vamos a poder atender a más familias y más niños en nuestras escuelas que nunca antes.",
      name: "Jennifer Murphy",
      org: "Communities In Schools of Greater Tarrant County",
    },
    doTitle: "Lo que hacemos",
    programs: [
      { title: "Alimentación comunitaria", body: "Comidas calientes y gratuitas donde la comunidad se reúne." },
      { title: "Talent pipeline", body: "De secundaria a preparatoria, de preparatoria a la universidad, de la universidad a una carrera." },
      { title: "Despensa de alimentos", body: "Llenamos las despensas de organizaciones aliadas como CIS." },
      { title: "Colectas de ropa", body: "Ropa y zapatos para estudiantes y familias." },
    ],
    gallery: { title: "La comunidad en acción", link: "Abrir la galería" },
    cta: "Algo pequeño para nosotros puede significarlo todo para alguien más.",
    sticky: "Apoya a RISE",
  },
};

const gallery = {
  en: {
    kicker: "Gallery",
    title: "Community in action",
    intro: "Every photo and film from our summer events, straight from the volunteers' phones.",
    albums: "Albums",
    films: "Films",
    photos: (n: number) => `${n} photos`,
    videos: (n: number) => `${n} videos`,
    back: "All albums",
    clips: "Clips from the day",
    recapFilm: "Recap film",
    lightbox: {
      label: "Photo viewer",
      prev: "Previous photo",
      next: "Next photo",
      close: "Close",
      of: (i: number, n: number) => `${i} of ${n}`,
    },
  },
  es: {
    kicker: "Galería",
    title: "La comunidad en acción",
    intro: "Todas las fotos y videos de nuestros eventos de verano, directo de los teléfonos de los voluntarios.",
    albums: "Álbumes",
    films: "Videos",
    photos: (n: number) => `${n} fotos`,
    videos: (n: number) => `${n} videos`,
    back: "Todos los álbumes",
    clips: "Momentos del día",
    recapFilm: "Video resumen",
    lightbox: {
      label: "Visor de fotos",
      prev: "Foto anterior",
      next: "Foto siguiente",
      close: "Cerrar",
      of: (i: number, n: number) => `${i} de ${n}`,
    },
  },
};

const donate = {
  en: {
    kicker: "Donate",
    title: "Every contribution, big or small, helps.",
    body: "Your gift puts hot meals on tables and fills school pantries, closets and supply rooms for students across North Texas.",
    trust: ["501(c)(3) nonprofit, gifts are tax-deductible", "Receipt sent to your email", "Secure checkout by Givebutter"],
    filmLabel: "See what your gift does",
    feeTitle: "How to remove the processing fee and optional tip",
    feeBody:
      "At checkout, select “Change” next to the processing fee to cover or remove it, and set the optional Givebutter tip to “Other” or 0%. Every dollar you leave on can go to RISE.",
    widgetLoading: "Loading secure checkout…",
    partnerKicker: "Straight from our partners",
    partnerQuote:
      "We have a food pantry, a clothing closet, and a school supply room. We are so grateful for RISE and all of their donations that are going to help our students this school year.",
    partnerName: "Ivy Beesley",
    partnerOrg: "Volunteer manager, Communities In Schools of Greater Tarrant County",
    otherTitle: "Other ways to give",
    other: [
      { title: "Volunteer", body: "Serve meals, sort donations and help at events.", href: "/volunteer" },
      { title: "Shop merch", body: "Every purchase supports RISE programs.", href: "/shop" },
      { title: "Donate goods or host a drive", body: "Food, clothing, hygiene kits and school supplies.", href: "/contact" },
      { title: "Corporate partnership", body: "Matching gifts, sponsorships and team service days.", href: "/contact" },
    ],
  },
  es: {
    kicker: "Donar",
    title: "Cada contribución, grande o pequeña, ayuda.",
    body: "Tu donación lleva comidas calientes a la mesa y llena despensas, armarios y salas de útiles escolares para estudiantes del norte de Texas.",
    trust: ["Organización 501(c)(3), donaciones deducibles de impuestos", "Recibo enviado a tu correo", "Pago seguro con Givebutter"],
    filmLabel: "Mira lo que hace tu donación",
    feeTitle: "Cómo quitar la tarifa de procesamiento y la propina opcional",
    feeBody:
      "Al pagar, selecciona “Change” junto a la tarifa de procesamiento para cubrirla o quitarla, y pon la propina opcional de Givebutter en “Other” o 0%. Así todo tu dinero puede ir a RISE.",
    widgetLoading: "Cargando pago seguro…",
    partnerKicker: "Directo de nuestros aliados",
    partnerQuote:
      "Tenemos una despensa de alimentos, un armario de ropa y una sala de útiles escolares. Estamos muy agradecidos con RISE y todas sus donaciones que ayudarán a nuestros estudiantes este año escolar.",
    partnerName: "Ivy Beesley",
    partnerOrg: "Coordinadora de voluntarios, Communities In Schools of Greater Tarrant County",
    otherTitle: "Otras formas de ayudar",
    other: [
      { title: "Ser voluntario", body: "Sirve comidas, organiza donaciones y ayuda en eventos.", href: "/volunteer" },
      { title: "Tienda", body: "Cada compra apoya los programas de RISE.", href: "/shop" },
      { title: "Dona artículos u organiza una colecta", body: "Comida, ropa, kits de higiene y útiles escolares.", href: "/contact" },
      { title: "Alianzas corporativas", body: "Donaciones equivalentes, patrocinios y días de servicio.", href: "/contact" },
    ],
  },
};

const thanks = {
  en: {
    kicker: "Thank you",
    title: "Thanks to all your help, this is what we were able to do.",
    body: "Your gift is on its way to families and students. A receipt is on its way to your inbox.",
    filmLabel: "The shelves you helped fill",
    shareTitle: "Share why you gave",
    shareText: "I just gave to RISE to help feed families and stock school pantries in North Texas.",
    copy: "Copy link",
    copied: "Link copied",
    moreTitle: "Want to do more?",
    more: [
      { title: "Volunteer", body: "Help at the next meal or pantry fill.", href: "/volunteer" },
      { title: "See the gallery", body: "Photos and films from this summer.", href: "/gallery" },
      { title: "Upcoming events", body: "Find out what's next.", href: "/events" },
    ],
  },
  es: {
    kicker: "Gracias",
    title: "Gracias a tu ayuda, esto es lo que logramos.",
    body: "Tu donación ya va en camino a las familias y estudiantes. Te enviamos un recibo a tu correo.",
    filmLabel: "Los estantes que ayudaste a llenar",
    shareTitle: "Comparte por qué donaste",
    shareText: "Acabo de donar a RISE para ayudar a alimentar familias y llenar despensas escolares en el norte de Texas.",
    copy: "Copiar enlace",
    copied: "Enlace copiado",
    moreTitle: "¿Quieres hacer más?",
    more: [
      { title: "Ser voluntario", body: "Ayuda en la próxima comida o despensa.", href: "/volunteer" },
      { title: "Ver la galería", body: "Fotos y videos de este verano.", href: "/gallery" },
      { title: "Próximos eventos", body: "Descubre lo que viene.", href: "/events" },
    ],
  },
};

export const pageCopy = {
  home: (lang: Locale) => home[lang],
  gallery: (lang: Locale) => gallery[lang],
  donate: (lang: Locale) => donate[lang],
  thanks: (lang: Locale) => thanks[lang],
};
