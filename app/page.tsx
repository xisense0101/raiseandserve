import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Globe,
  GraduationCap,
  Sprout,
} from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import ServicesSlider from "@/components/ServicesSlider";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Community Support Through Education, Food, and Service",
  description:
    "RISE helps communities grow through feeding programs, accessible education, career development, clothing drives, volunteer service, and essential assistance.",
  path: "/",
  keywords: [
    "community support",
    "nonprofit education",
    "community feeding",
    "volunteer service",
    "essential assistance",
  ],
});

/* ─── Values ─── */
const VALUES = [
  {
    title: "Inclusivity",
    icon: <Globe size={24} />,
    desc: "RISE values inclusivity and aims to provide access to resources for all individuals, regardless of background or circumstances.",
  },
  {
    title: "Commitment to Education",
    icon: <GraduationCap size={24} />,
    desc: "Dedicated to promoting education as a pathway to success and believing in the importance of continuous learning.",
  },
  {
    title: "Giving Back",
    icon: <Sprout size={24} />,
    desc: "Encouraging individuals to give back to their communities and support others on their journey to success.",
  },
];

/* ─── Gallery ─── */
const GALLERY = [
  {
    caption: "Community Feeding Program",
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
  },
  {
    caption: "Volunteers Serving Meals",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
  },
  {
    caption: "Food Support and Outreach",
    img: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&w=600&q=80",
  },
  {
    caption: "RISE Team & Community Partners",
    img: "/add-image-1.png",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* ─── Hero Slider ─── */}
      <HeroSlider />

      {/* ─── LET'S / RISE / TOGETHER ─── */}
      <section className="py-20 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
            {[
              {
                label: "LET'S",
                text: "Spark change through education, curiosity, and shared purpose.",
                bg: "bg-primary-light/40",
                border: "border-primary/10",
                accent: "text-primary",
              },
              {
                label: "RISE",
                text: "Rise to your potential with knowledge, support, and empowerment.",
                bg: "bg-primary",
                border: "border-transparent",
                accent: "text-accent",
                white: true,
              },
              {
                label: "TOGETHER",
                text: "Build stronger communities through learning and unity.",
                bg: "bg-primary-light/40",
                border: "border-primary/10",
                accent: "text-primary",
              },
            ].map((item, i) => (
              <RevealItem key={i}>
                <div
                  className={`${item.bg} border ${item.border} rounded-3xl p-10 flex flex-col justify-between group hover:shadow-xl transition-all duration-300 h-full ${i === 1 ? "md:-translate-y-4 hover:-translate-y-6 shadow-xl shadow-primary/20" : "hover:-translate-y-2"}`}
                >
                  <div>
                    <h2 className={`${item.accent} font-bold tracking-widest uppercase text-sm mb-6 relative inline-block`}>
                      {item.label}
                      <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-current rounded-full transition-all duration-300 group-hover:w-full" />
                    </h2>
                    <p className={`text-2xl font-heading font-semibold leading-relaxed ${item.white ? "text-white" : "text-foreground"}`}>
                      {item.text}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ─── Who We Are ─── */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image collage */}
            <Reveal className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl overflow-hidden h-48 md:h-64 relative group shadow-lg mt-8">
                  <img
                    src="/rise-team-1.jpg"
                    alt="RISE Volunteers"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent flex items-end p-4">
                    <span className="text-white font-semibold text-sm">RISE Volunteers</span>
                  </div>
                </div>
                <div className="rounded-3xl overflow-hidden h-48 md:h-64 relative group shadow-lg">
                  <img
                    src="/rise-team-2.jpg"
                    alt="Community Outreach"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent flex items-end p-4">
                    <span className="text-white font-semibold text-sm">Community Outreach</span>
                  </div>
                </div>
                <div className="rounded-3xl overflow-hidden h-48 md:h-64 relative group shadow-lg mt-8 md:mt-12">
                  <img
                    src="/rise-team-3.jpg"
                    alt="Educational Support"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent flex items-end p-4">
                    <span className="text-white font-semibold text-sm">Educational Support</span>
                  </div>
                </div>
                <div className="rounded-3xl overflow-hidden h-48 md:h-64 relative group shadow-lg mt-0 md:mt-4">
                  <img
                    src="/rise-team-4.jpg"
                    alt="Giving Back"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent flex items-end p-4">
                    <span className="text-white font-semibold text-sm">Giving Back</span>
                  </div>
                </div>
              </div>
              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-primary text-white px-6 py-4 rounded-2xl shadow-xl shadow-primary/30 text-center">
                <p className="text-3xl font-extrabold font-heading">2023</p>
                <p className="text-xs text-primary-light font-medium uppercase tracking-wider mt-0.5">Serving Communities</p>
              </div>
            </Reveal>

            {/* Text */}
            <Reveal delay={0.1} className="order-1 lg:order-2 space-y-6">
              <h3 className="text-primary font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                <span className="w-8 h-0.5 bg-primary rounded-full" />
                Who We Are
              </h3>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight text-balance">
                Donation for the Better of Our Future World
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Established in September 2023, RISE is committed to empowering individuals to excel academically. Through workshops, seminars, and community service events, we provide access to educational resources and support.
                </p>
                <p>
                  Led by Chief Innovation Officer Toney Favors, our dedicated team collaborates with academic organizations to guide you academically, connect you to resources, and foster a culture of giving back.
                </p>
              </div>

              {/* Mission / Vision cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Mission", text: "Empower individuals through innovative educational resources and community support." },
                  { label: "Vision", text: "Inspire brighter futures through integrated education and community outreach initiatives." },
                ].map((item) => (
                  <div key={item.label} className="bg-primary/5 border border-primary/10 rounded-2xl p-5 hover:border-primary/30 transition-colors">
                    <h4 className="font-heading font-bold text-primary mb-2">{item.label}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center font-semibold text-primary hover:text-primary-dark transition-colors group"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Programs ─── */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h3 className="text-primary font-bold tracking-widest uppercase text-sm">What We Do</h3>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Our Ongoing Services
            </h2>
            <p className="text-muted-foreground text-lg">
              Join our ongoing efforts to support education, provide meals, strengthen families, and deliver essential assistance to those in need.
            </p>
          </Reveal>

          <ServicesSlider />
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="py-24 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#007ED1 2px, transparent 2px)", backgroundSize: "30px 30px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-4 space-y-6">
              <h3 className="text-accent font-bold tracking-widest uppercase text-sm">Our Values</h3>
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                Overcoming Challenges With Our True Values
              </h2>
              <p className="text-white/60 leading-relaxed">
                We believe in building a world where everyone has access to the resources, support, and opportunities they need to thrive.
              </p>
            </Reveal>

            <RevealGroup className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6" stagger={0.12} delay={0.1}>
              {VALUES.map((val, i) => (
                <RevealItem key={i}>
                  <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:-translate-y-2 hover:border-accent/30 h-full">
                    <div className="h-10 w-10 rounded-full bg-primary/20 text-primary-light flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:text-accent transition-colors">
                      {val.icon}
                    </div>
                    <h4 className="text-xl font-heading font-semibold mb-3">{val.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{val.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ─── Gallery ─── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h3 className="text-primary font-bold tracking-widest uppercase text-sm">Take A Look</h3>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Community in Action
            </h2>
            <p className="text-muted-foreground text-lg">
              See how RISE brings neighbors, volunteers, and partners together through service events, community feeding, and educational support.
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12" stagger={0.08}>
            {GALLERY.map((item, i) => (
              <RevealItem key={i}>
                <div className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-primary-900 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={item.img}
                    alt={item.caption}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium text-sm">{item.caption}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="text-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-border rounded-full text-base font-semibold text-foreground hover:border-primary hover:text-primary transition-colors duration-200"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
        />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent bg-accent/10 border border-accent/30 px-4 py-1.5 rounded-full">
            <Heart className="h-4 w-4" />
            Ready to Rise With Us?
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white text-balance">
            Every Action Strengthens Our Community
          </h2>
          <p className="text-xl text-primary-light max-w-2xl mx-auto leading-relaxed">
            Donate today, volunteer at an event, or apply to our career program. Together, we build brighter futures.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Magnetic strength={0.25}>
              <Link
                href="/donate"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-primary-dark bg-accent hover:bg-accent-hover transition-colors shadow-lg hover:-translate-y-0.5 transform duration-200 animate-pulse-ring hover-sheen"
              >
                Make a Donation
                <Heart className="ml-2 h-5 w-5" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href="/volunteer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white border-2 border-white/30 hover:bg-white/10 transition-colors hover:-translate-y-0.5 transform duration-200"
              >
                Become a Volunteer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
