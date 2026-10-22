import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  GraduationCap,
  Heart,
  Sprout,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about Resourceful Impact in Scholastic Education, our mission, leadership, values, and work to empower communities through education and service.",
  path: "/about",
  keywords: ["about RISE", "nonprofit mission", "community empowerment", "education nonprofit"],
});

const VALUES = [
  {
    icon: <Globe size={22} />,
    title: "Inclusivity",
    desc: "We value inclusivity and aim to provide access to resources for all individuals, regardless of their background or circumstances. Every person deserves a seat at the table.",
  },
  {
    icon: <GraduationCap size={22} />,
    title: "Commitment to Education",
    desc: "RISE is dedicated to promoting education as a pathway to success and believes in the importance of continuous learning and growth for every member of our community.",
  },
  {
    icon: <Sprout size={22} />,
    title: "Giving Back",
    desc: "RISE encourages individuals to give back to their communities and support others on their journey to success, creating a lasting cycle of empowerment.",
  },
  {
    icon: <Heart size={22} />,
    title: "Compassion",
    desc: "Every initiative we run is rooted in genuine compassion. We show up with kindness and dignity for every person who walks through our doors.",
  },
  {
    icon: <Users size={22} />,
    title: "Community First",
    desc: "Our community is our priority. We listen, we adapt, and we serve — meeting people where they are and building trust through consistent action.",
  },
  {
    icon: <Award size={22} />,
    title: "Excellence",
    desc: "We hold ourselves to the highest standard in everything we do, from community feeding programs to academic workshops and career development events.",
  },
];



export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">

      {/* ─── Hero ─── */}
      <section
        className="relative w-full overflow-hidden bg-primary-900"
        style={{ height: "calc(100vh - 80px)", minHeight: 560 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        />
        <div className="absolute inset-0 bg-primary-900/70" />
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center space-y-6">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent bg-accent/10 border border-accent/30 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-[1.15] text-balance">
            From the Dinner Table{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">
              to the Boardroom.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
            RISE empowers individuals through community feeding, career development, accessible education, and essential support for our neighbors in our community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/donate"
              className="px-8 py-4 rounded-full font-bold text-primary-dark bg-accent hover:bg-accent-hover transition-all shadow-lg hover:-translate-y-1 duration-200"
            >
              Make a Donation
            </Link>
            <Link
              href="/volunteer"
              className="px-8 py-4 rounded-full font-bold text-white border-2 border-white/30 hover:bg-white/10 transition-all hover:-translate-y-1 duration-200 flex items-center gap-2"
            >
              Volunteer With Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Leadership — Tony Favors (first, right after hero) ─── */}
      <section className="py-24 bg-[#fff8eb] overflow-hidden relative -mt-12">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-3">
            <h3 className="text-primary font-bold tracking-widest uppercase text-sm">Our Leadership</h3>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Meet the Visionary Behind RISE</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-primary/20" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 aspect-[3/4]">
                  <Image
                    src="/about-tony.jpeg"
                    alt="Toney Favors — Chief Innovation Officer, RISE"
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                {/* Badge */}
                <div className="absolute -bottom-6 -right-6 bg-primary text-white px-6 py-4 rounded-2xl shadow-xl shadow-primary/30 text-center">
                  <p className="text-xs text-primary-light font-medium uppercase tracking-wider">Chief Innovation</p>
                  <p className="font-heading font-bold text-base">Officer</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-1">Toney Favors</h3>
                <p className="text-accent font-semibold text-lg">Chief Innovation Officer & Founder</p>
              </div>

              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Toney Favors is the visionary founder and Chief Innovation Officer of RISE, driven by an unwavering belief that every individual regardless of their circumstances deserves access to the tools, resources, and support needed to thrive.
                </p>
                <p>
                  With a deep-rooted passion for education and community empowerment, Toney established RISE in September 2023 to bridge the gap between need and opportunity for communities that need support. Under his leadership, RISE has grown from a grassroots initiative to a thriving nonprofit impacting thousands of lives annually.
                </p>
                <p>
                  Toney believes that real change begins at the dinner table and extends all the way to the boardroom and every step in between is an opportunity to lift someone up. His hands-on approach and compassionate leadership style set the tone for everything RISE stands for.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center font-semibold text-primary hover:text-primary-dark transition-colors group"
              >
                Get in Touch With Toney
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Who We Are / Mission ─── */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div className="space-y-8">
              <div>
                <h3 className="text-primary font-bold tracking-widest uppercase text-sm mb-3 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  Who We Are
                </h3>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                  Building a Stronger Community Through Education &amp; Service.
                </h2>
              </div>

              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Resourceful Impact in Scholastic Education (RISE) is committed to empowering individuals to excel academically and professionally. We believe that true impact happens when we address the immediate needs of our community from food security and clothing to education and career readiness.
                </p>
                <p>
                  Our dedicated team collaborates with academic organizations, local restaurants, volunteers, and donors to connect people with vital resources, guidance, and opportunities while fostering a lifelong culture of giving back.
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  "Workshops, seminars, and community service events",
                  "Partnership with local food banks and restaurants",
                  "Career mentorship and talent pipeline programs",
                  "Educational resources for all backgrounds",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div className="relative group rounded-3xl overflow-hidden aspect-square sm:aspect-[4/3] lg:aspect-square w-full min-h-[300px] bg-muted shadow-2xl shadow-primary/10">
              <Image
                src="/add-image-3.png"
                alt="RISE team and community outreach"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute inset-0 object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 via-gray-900/15 to-transparent z-10" />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <p className="text-white font-medium text-base leading-snug drop-shadow-md">
                  RISE volunteers serving neighbors at a community feeding event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h3 className="text-primary font-bold tracking-widest uppercase text-sm">What We Stand For</h3>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Overcoming Challenges With Our True Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our values aren&apos;t just words on a wall — they&apos;re the principles that guide every decision, every event, and every interaction we have.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {VALUES.map((val, i) => (
              <div
                key={i}
                className="group bg-background border border-border rounded-3xl p-7 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 hover-sheen"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {val.icon}
                </div>
                <h4 className="text-lg font-heading font-bold text-foreground mb-3">{val.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Call to Action ─── */}
      <section className="py-24 bg-muted">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(#007ED1 2px, transparent 2px)", backgroundSize: "30px 30px" }}
            />
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <BookOpen className="mx-auto h-14 w-14 text-accent" />
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white text-balance max-w-2xl mx-auto">
                Join Us in Making a Lasting Impact.
              </h2>
              <p className="text-lg text-white/70 max-w-xl mx-auto">
                Whether you choose to donate to our programs or volunteer your time at our next event, your contribution matters more than you know.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/donate"
                  className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-full text-lg font-bold transition-all shadow-lg hover:-translate-y-1"
                >
                  Make a Donation
                </Link>
                <Link
                  href="/volunteer"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full text-lg font-bold transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Volunteer With Us <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
