import type { Locale } from "./config";

/**
 * Page copy for the redesigned pages, EN and ES side by side.
 * Spanish needs a native-speaker pass before launch (see handoff 1o).
 */

const home = {
  en: {
    heroBadge: "Watch: what RISE does",
    heroTitle: "Together, we rise.",
    heroBody:
      "RISE serves free meals, keeps students in school and stocks the pantries our partner schools rely on, across North Texas.",
    donate: "Donate",
    volunteer: "Volunteer",
    give: {
      title: "Donate today",
      once: "One-time",
      monthly: "Monthly",
      cta: (amount: number, monthly: boolean) => `Donate $${amount}${monthly ? " a month" : ""}`,
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
      title: "Where your donation goes",
      link: "See the July 20 pantry fill",
      cards: [
        { title: "Food on pantry shelves", body: "Canned goods, peanut butter and weekend food bags for CIS families." },
        { title: "Hygiene kits", body: "Soap, shampoo, toothpaste and personal care items, sorted for students." },
        { title: "New shoes & clothing", body: "A stocked clothing closet for students across about 70 CIS schools." },
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
    heroBadge: "Mira: lo que hace RISE",
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
        { title: "Kits de higiene", body: "Jabón, champú, pasta de dientes y artículos de cuidado personal para estudiantes." },
        { title: "Zapatos nuevos y ropa", body: "Un armario de ropa lleno para estudiantes de unas 70 escuelas de CIS." },
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
    body: "Your donation puts hot meals on tables and fills school pantries, closets and supply rooms for students across North Texas.",
    trust: ["501(c)(3) nonprofit, donations are tax-deductible", "Receipt sent to your email", "Secure checkout by Givebutter"],
    filmLabel: "What one day of donations did",
    feeTitle: "How to remove the processing fee and optional tip",
    feeBody:
      "At checkout, select “Change” next to the processing fee to cover or remove it, and set the optional Givebutter tip to “Other” or 0%. Every dollar you leave on can go to RISE.",
    widgetLoading: "Loading secure checkout…",
    impactKicker: "July 20, 2026 · Fort Worth",
    impactTitle: "What your donations did in one morning",
    impactBody:
      "RISE volunteers filled the resource rooms at Communities In Schools of Greater Tarrant County: the food pantry, the clothing closet and the school supply room that families use all year.",
    impactStats: [
      { value: "~6,000", label: "students served by CIS" },
      { value: "~70", label: "schools with CIS social workers" },
      { value: "3", label: "resource rooms restocked" },
    ],
    impactPhotos: ["Tables of donated food", "New shoes for students", "Hygiene kits sorted by volunteers"],
    partnerKicker: "Straight from our partners",
    partnerQuote:
      "We have a food pantry, a clothing closet, and a school supply room. We are so grateful for RISE and all of their donations that are going to help our students this school year.",
    partnerName: "Ivy Beesley",
    partnerOrg: "Volunteer manager, Communities In Schools of Greater Tarrant County",
    otherTitle: "Other ways to give",
    other: [
      { title: "Volunteer", body: "Serve meals, sort donations and help at events.", href: "/get-involved?tab=volunteer" },
      { title: "Shop RISE merch", body: "Every purchase supports RISE programs.", href: "/shop" },
      { title: "Donate goods or host a drive", body: "Food, clothing, hygiene kits and school supplies.", href: "/get-involved?tab=partner" },
      { title: "Corporate partnership", body: "Matching donations, sponsorships and team service days.", href: "/get-involved?tab=partner" },
    ],
  },
  es: {
    kicker: "Donar",
    title: "Cada contribución, grande o pequeña, ayuda.",
    body: "Tu donación lleva comidas calientes a la mesa y llena despensas, armarios y salas de útiles escolares para estudiantes del norte de Texas.",
    trust: ["Organización 501(c)(3), donaciones deducibles de impuestos", "Recibo enviado a tu correo", "Pago seguro con Givebutter"],
    filmLabel: "Lo que logró un día de donaciones",
    feeTitle: "Cómo quitar la tarifa de procesamiento y la propina opcional",
    feeBody:
      "Al pagar, selecciona “Change” junto a la tarifa de procesamiento para cubrirla o quitarla, y pon la propina opcional de Givebutter en “Other” o 0%. Así todo tu dinero puede ir a RISE.",
    widgetLoading: "Cargando pago seguro…",
    impactKicker: "20 de julio de 2026 · Fort Worth",
    impactTitle: "Lo que lograron tus donaciones en una mañana",
    impactBody:
      "Los voluntarios de RISE llenaron las salas de recursos de Communities In Schools of Greater Tarrant County: la despensa, el armario de ropa y la sala de útiles que las familias usan todo el año.",
    impactStats: [
      { value: "~6,000", label: "estudiantes atendidos por CIS" },
      { value: "~70", label: "escuelas con trabajadores sociales de CIS" },
      { value: "3", label: "salas de recursos reabastecidas" },
    ],
    impactPhotos: ["Mesas de comida donada", "Zapatos nuevos para estudiantes", "Kits de higiene organizados"],
    partnerKicker: "Directo de nuestros aliados",
    partnerQuote:
      "Tenemos una despensa de alimentos, un armario de ropa y una sala de útiles escolares. Estamos muy agradecidos con RISE y todas sus donaciones que ayudarán a nuestros estudiantes este año escolar.",
    partnerName: "Ivy Beesley",
    partnerOrg: "Coordinadora de voluntarios, Communities In Schools of Greater Tarrant County",
    otherTitle: "Otras formas de ayudar",
    other: [
      { title: "Ser voluntario", body: "Sirve comidas, organiza donaciones y ayuda en eventos.", href: "/get-involved?tab=volunteer" },
      { title: "Tienda", body: "Cada compra apoya los programas de RISE.", href: "/shop" },
      { title: "Dona artículos u organiza una colecta", body: "Comida, ropa, kits de higiene y útiles escolares.", href: "/get-involved?tab=partner" },
      { title: "Alianzas corporativas", body: "Donaciones equivalentes, patrocinios y días de servicio.", href: "/get-involved?tab=partner" },
    ],
  },
};

const thanks = {
  en: {
    kicker: "Thank you",
    title: "Thanks to all your help, this is what we were able to do.",
    body: "Your donation is on its way to families and students. A receipt is on its way to your inbox.",
    filmLabel: "The shelves you helped fill",
    shareTitle: "Share why you gave",
    shareText: "I just gave to RISE to help feed families and stock school pantries in North Texas.",
    copy: "Copy link",
    copied: "Link copied",
    moreTitle: "Want to do more?",
    more: [
      { title: "Volunteer", body: "Help at the next meal or pantry fill.", href: "/get-involved?tab=volunteer" },
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
      { title: "Ser voluntario", body: "Ayuda en la próxima comida o despensa.", href: "/get-involved?tab=volunteer" },
      { title: "Ver la galería", body: "Fotos y videos de este verano.", href: "/gallery" },
      { title: "Próximos eventos", body: "Descubre lo que viene.", href: "/events" },
    ],
  },
};

const about = {
  en: {
    kicker: "Our story · since September 2023",
    title: "From the dinner table to the boardroom.",
    intro:
      "Resourceful Impact in Scholastic Education (RISE) meets people where they are. We start with the immediate needs, food, clothing and hygiene, and stay for the long run: mentorship, education and careers.",
    filmLabel: "Why we rise",
    missionTitle: "Who we are",
    mission: [
      "RISE is a 501(c)(3) nonprofit committed to helping people excel academically and professionally. We believe real impact happens when you address today's needs and tomorrow's opportunities together.",
      "We work alongside schools, local restaurants, volunteers and donors to connect people with food, clothing, guidance and opportunity, and to build a culture of giving back.",
    ],
    missionPoints: [
      "Free community meals, served with dignity",
      "Restocking partner pantries, closets and supply rooms",
      "Mentorship and a talent pipeline from middle school to careers",
      "Workshops, seminars and community service events",
    ],
    leadershipTitle: "Leadership",
    founder: {
      name: "Toney Favors",
      role: "Founder & Chief Innovation Officer",
      bio: [
        "Toney founded RISE in September 2023 on a simple belief: every person, whatever their circumstances, deserves the tools, resources and support to thrive.",
        "He believes real change begins at the dinner table and reaches all the way to the boardroom, and that every step in between is a chance to lift someone up.",
      ],
    },
    board: {
      name: "Shanta Lockett",
      role: "Board member",
      quote: "We have to rise where we are and give back as much as we can, so students feel together with their peers, not left behind.",
    },
    partnersTitle: "Partners",
    partners: [
      {
        name: "Communities In Schools of Greater Tarrant County",
        body: "CIS places social workers on school campuses full time, in about 70 schools serving some 6,000 students. RISE restocks their food pantry, clothing closet and school supply room.",
      },
      {
        name: "Catfish King, Mount Pleasant",
        body: "Our host for the July 6 community meal: a free hot dinner for every neighbor who walked through the door, from 4 to 7 PM.",
      },
    ],
    valuesTitle: "What we stand for",
    values: [
      { title: "Inclusivity", body: "Resources for everyone, whatever their background. Everyone gets a seat at the table." },
      { title: "Commitment to education", body: "Education is a pathway to success, and learning never stops." },
      { title: "Giving back", body: "People who are lifted up lift others, a lasting cycle of empowerment." },
      { title: "Compassion", body: "Kindness and dignity for every person who walks through our doors." },
      { title: "Community first", body: "We listen, adapt and serve, and build trust through consistent action." },
      { title: "Excellence", body: "The same high standard for a community meal as for a career workshop." },
    ],
    cta: "Join us at the next meal, pantry fill or workshop.",
  },
  es: {
    kicker: "Nuestra historia · desde septiembre de 2023",
    title: "De la mesa del comedor a la sala de juntas.",
    intro:
      "Resourceful Impact in Scholastic Education (RISE) apoya a las personas donde están. Empezamos por lo inmediato, comida, ropa e higiene, y seguimos a largo plazo: mentoría, educación y carreras.",
    filmLabel: "Por qué nos levantamos",
    missionTitle: "Quiénes somos",
    mission: [
      "RISE es una organización sin fines de lucro 501(c)(3) que ayuda a las personas a sobresalir académica y profesionalmente. Creemos que el impacto real ocurre cuando atendemos las necesidades de hoy y las oportunidades de mañana al mismo tiempo.",
      "Trabajamos con escuelas, restaurantes locales, voluntarios y donantes para conectar a las personas con comida, ropa, orientación y oportunidades, y para construir una cultura de ayudar a los demás.",
    ],
    missionPoints: [
      "Comidas comunitarias gratuitas, servidas con dignidad",
      "Reabastecimiento de despensas, armarios y salas de útiles",
      "Mentoría y un camino de talento desde secundaria hasta una carrera",
      "Talleres, seminarios y eventos de servicio comunitario",
    ],
    leadershipTitle: "Liderazgo",
    founder: {
      name: "Toney Favors",
      role: "Fundador y Director de Innovación",
      bio: [
        "Toney fundó RISE en septiembre de 2023 con una idea simple: toda persona, sin importar sus circunstancias, merece las herramientas, los recursos y el apoyo para salir adelante.",
        "Cree que el cambio real empieza en la mesa del comedor y llega hasta la sala de juntas, y que cada paso intermedio es una oportunidad para levantar a alguien.",
      ],
    },
    board: {
      name: "Shanta Lockett",
      role: "Miembro de la junta",
      quote: "Tenemos que levantarnos donde estamos y ayudar todo lo que podamos, para que los estudiantes se sientan unidos a sus compañeros y no se queden atrás.",
    },
    partnersTitle: "Aliados",
    partners: [
      {
        name: "Communities In Schools of Greater Tarrant County",
        body: "CIS tiene trabajadores sociales de tiempo completo en unas 70 escuelas que atienden a unos 6,000 estudiantes. RISE reabastece su despensa, su armario de ropa y su sala de útiles escolares.",
      },
      {
        name: "Catfish King, Mount Pleasant",
        body: "Nuestro anfitrión de la comida comunitaria del 6 de julio: una cena caliente y gratuita para cada vecino que llegó, de 4 a 7 PM.",
      },
    ],
    valuesTitle: "Lo que defendemos",
    values: [
      { title: "Inclusión", body: "Recursos para todos, sin importar su origen. Todos tienen un lugar en la mesa." },
      { title: "Compromiso con la educación", body: "La educación es un camino al éxito y el aprendizaje nunca termina." },
      { title: "Ayudar a los demás", body: "Quien recibe apoyo apoya a otros: un ciclo de empoderamiento." },
      { title: "Compasión", body: "Amabilidad y dignidad para cada persona que llega." },
      { title: "La comunidad primero", body: "Escuchamos, nos adaptamos y servimos con acciones constantes." },
      { title: "Excelencia", body: "El mismo estándar para una comida comunitaria que para un taller profesional." },
    ],
    cta: "Acompáñanos en la próxima comida, despensa o taller.",
  },
};

const programs = {
  en: {
    kicker: "What we do",
    title: "Four programs, one goal: no one left behind.",
    intro: "From a hot meal tonight to a career next year. Every program has a way for you to help.",
    items: [
      {
        id: "community-feeding",
        title: "Community feeding",
        body: "Free hot meals where neighbors sit down together, no questions asked. In July we filled Catfish King in Mount Pleasant from 4 to 7 PM.",
        points: ["Free meals at partner restaurants", "Volunteers serve and host every table", "Open to everyone, no judgment"],
        cta: "Volunteer at a meal",
        href: "/get-involved?tab=volunteer",
      },
      {
        id: "talent-pipeline",
        title: "Talent pipeline",
        body: "Mentorship and guidance from middle school to high school, high school to college, and college to careers.",
        points: ["Student mentorship and personal development", "Career exploration with professionals", "Workshops and informational seminars"],
        cta: "Apply to the pipeline",
        href: "/get-involved?tab=apply",
      },
      {
        id: "food-bank",
        title: "Food pantry",
        body: "We keep partner pantries stocked through the school year, like the CIS resource rooms in Fort Worth that families rely on in an emergency or for a weekend food bag.",
        points: ["Non-perishable food and weekend food bags", "Restocking partner pantries on site", "Hygiene and personal care items"],
        cta: "Fund the next pantry fill",
        href: "/donate",
      },
      {
        id: "clothing-drives",
        title: "Clothing drives",
        body: "Clothing, new shoes and hygiene kits for students and their families, delivered to school clothing closets.",
        points: ["Clothing and footwear drives", "Back-to-school essentials", "Drives hosted by schools, churches and businesses"],
        cta: "Host a drive",
        href: "/get-involved?tab=partner",
      },
    ],
  },
  es: {
    kicker: "Lo que hacemos",
    title: "Cuatro programas, una meta: que nadie se quede atrás.",
    intro: "De una comida caliente hoy a una carrera el próximo año. Cada programa tiene una forma en que puedes ayudar.",
    items: [
      {
        id: "community-feeding",
        title: "Alimentación comunitaria",
        body: "Comidas calientes y gratuitas donde la comunidad se sienta junta, sin preguntas. En julio llenamos Catfish King en Mount Pleasant de 4 a 7 PM.",
        points: ["Comidas gratuitas en restaurantes aliados", "Voluntarios sirven y atienden cada mesa", "Abierto a todos, sin juicios"],
        cta: "Sé voluntario en una comida",
        href: "/get-involved?tab=volunteer",
      },
      {
        id: "talent-pipeline",
        title: "Talent pipeline",
        body: "Mentoría y orientación de secundaria a preparatoria, de preparatoria a la universidad y de la universidad a una carrera.",
        points: ["Mentoría y desarrollo personal", "Exploración de carreras con profesionales", "Talleres y seminarios informativos"],
        cta: "Aplica al programa",
        href: "/get-involved?tab=apply",
      },
      {
        id: "food-bank",
        title: "Despensa de alimentos",
        body: "Mantenemos llenas las despensas de nuestros aliados durante el año escolar, como las salas de recursos de CIS en Fort Worth.",
        points: ["Comida no perecedera y bolsas para el fin de semana", "Reabastecimiento en sitio", "Artículos de higiene y cuidado personal"],
        cta: "Financia la próxima despensa",
        href: "/donate",
      },
      {
        id: "clothing-drives",
        title: "Colectas de ropa",
        body: "Ropa, zapatos nuevos y kits de higiene para estudiantes y sus familias, entregados a los armarios escolares.",
        points: ["Colectas de ropa y calzado", "Artículos para el regreso a clases", "Colectas organizadas por escuelas, iglesias y empresas"],
        cta: "Organiza una colecta",
        href: "/get-involved?tab=partner",
      },
    ],
  },
};

const events = {
  en: {
    kicker: "Events",
    title: "Show up, sit down, serve.",
    intro: "Every RISE event is free and open to everyone. Here's what's next and what we've done so far.",
    upcomingTitle: "Up next",
    noneTitle: "Our next event is being planned.",
    noneBody: "Want to hear first? Send us a note and we'll let you know the date, place and how to sign up.",
    notify: "Get event updates",
    volunteer: "Volunteer at the next one",
    signUp: "Sign up on Zeffy",
    pastTitle: "Past events",
    when: "When",
    where: "Where",
    flyer: "View flyer",
    photos: (n: number) => `See all ${n} photos`,
  },
  es: {
    kicker: "Eventos",
    title: "Llega, siéntate, sirve.",
    intro: "Todos los eventos de RISE son gratuitos y abiertos a todos. Esto es lo que viene y lo que hemos hecho.",
    upcomingTitle: "Próximo",
    noneTitle: "Estamos planeando nuestro próximo evento.",
    noneBody: "¿Quieres enterarte primero? Escríbenos y te avisaremos la fecha, el lugar y cómo inscribirte.",
    notify: "Recibir avisos de eventos",
    volunteer: "Sé voluntario en el próximo",
    signUp: "Inscríbete en Zeffy",
    pastTitle: "Eventos pasados",
    when: "Cuándo",
    where: "Dónde",
    flyer: "Ver volante",
    photos: (n: number) => `Ver las ${n} fotos`,
  },
};

const involved = {
  en: {
    kicker: "Get involved",
    title: "There's a place for everyone.",
    intro: "Pick a path. Each one takes a couple of minutes.",
    tabs: {
      volunteer: { label: "Volunteer", hint: "Serve at events" },
      apply: { label: "Talent pipeline", hint: "Apply for mentorship & careers" },
      partner: { label: "Partner / host a drive", hint: "Schools, restaurants, businesses" },
      shop: { label: "Shop", hint: "Merch & tickets on Zeffy" },
    },
    volunteerTitle: "Volunteer with RISE",
    volunteerBody: "Serve meals, sort donations, greet families and help set up. Tell us which events you can make and we'll be in touch.",
    volunteerFilm: "A message from the team",
    applyTitle: "Apply to the talent pipeline",
    applyBody: "For students and early-career professionals looking for mentorship, internships and career opportunities.",
    partnerTitle: "Partner with RISE or host a drive",
    partnerBody: "Restaurants can host a community meal. Schools, churches and businesses can run a food, clothing or hygiene drive. Companies can sponsor events or match employee donations.",
    partnerPoints: ["Host a free community meal", "Run a food, clothing or hygiene drive", "Sponsor an event or match donations"],
    shopTitle: "Shop RISE merch",
    shopBody: "Every purchase supports RISE programs.",
  },
  es: {
    kicker: "Participa",
    title: "Hay un lugar para todos.",
    intro: "Elige un camino. Cada uno toma un par de minutos.",
    tabs: {
      volunteer: { label: "Ser voluntario", hint: "Sirve en eventos" },
      apply: { label: "Talent pipeline", hint: "Mentoría y carreras" },
      partner: { label: "Alianzas / colectas", hint: "Escuelas, restaurantes, empresas" },
      shop: { label: "Tienda", hint: "Artículos y boletos en Zeffy" },
    },
    volunteerTitle: "Sé voluntario con RISE",
    volunteerBody: "Sirve comidas, organiza donaciones, recibe a las familias y ayuda a preparar. Dinos a qué eventos puedes ir y te contactaremos.",
    volunteerFilm: "Un mensaje del equipo",
    applyTitle: "Aplica al talent pipeline",
    applyBody: "Para estudiantes y profesionales que buscan mentoría, prácticas y oportunidades de carrera.",
    partnerTitle: "Alíate con RISE u organiza una colecta",
    partnerBody: "Los restaurantes pueden ser sede de una comida comunitaria. Escuelas, iglesias y empresas pueden organizar colectas de comida, ropa o higiene. Las empresas pueden patrocinar eventos o igualar donaciones.",
    partnerPoints: ["Sé sede de una comida comunitaria", "Organiza una colecta de comida, ropa o higiene", "Patrocina un evento o iguala donaciones"],
    shopTitle: "Tienda de RISE",
    shopBody: "Cada compra apoya los programas de RISE.",
  },
};

const shop = {
  en: {
    kicker: "Shop",
    title: "Wear the mission.",
    intro: "RISE merch and event tickets, powered by Zeffy. Every purchase supports community meals, pantry fills and the talent pipeline.",
    tipTitle: "How to skip the optional Zeffy tip",
    tipBody: "Zeffy is free for nonprofits and asks buyers for an optional contribution. At checkout, choose “Other” in the dropdown and enter $0 to remove it.",
    loading: "Loading the RISE shop…",
  },
  es: {
    kicker: "Tienda",
    title: "Lleva la misión puesta.",
    intro: "Artículos de RISE y boletos para eventos, con Zeffy. Cada compra apoya comidas comunitarias, despensas y el talent pipeline.",
    tipTitle: "Cómo omitir la contribución opcional de Zeffy",
    tipBody: "Zeffy es gratis para organizaciones sin fines de lucro y pide una contribución opcional. Al pagar, elige “Other” y escribe $0 para quitarla.",
    loading: "Cargando la tienda de RISE…",
  },
};

const contact = {
  en: {
    kicker: "Contact",
    title: "Let's talk.",
    intro: "Questions about a donation, an event, volunteering or a partnership? Send us a note and the team will get back to you.",
    callUs: "Call us",
    visit: "Mailing address",
    formTitle: "Send a message",
  },
  es: {
    kicker: "Contacto",
    title: "Hablemos.",
    intro: "¿Preguntas sobre una donación, un evento, voluntariado o una alianza? Escríbenos y el equipo te responderá.",
    callUs: "Llámanos",
    visit: "Dirección postal",
    formTitle: "Envía un mensaje",
  },
};

export const pageCopy = {
  home: (lang: Locale) => home[lang],
  gallery: (lang: Locale) => gallery[lang],
  donate: (lang: Locale) => donate[lang],
  thanks: (lang: Locale) => thanks[lang],
  about: (lang: Locale) => about[lang],
  programs: (lang: Locale) => programs[lang],
  events: (lang: Locale) => events[lang],
  involved: (lang: Locale) => involved[lang],
  shop: (lang: Locale) => shop[lang],
  contact: (lang: Locale) => contact[lang],
};
