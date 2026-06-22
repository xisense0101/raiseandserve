"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, CheckCircle2, Heart } from "lucide-react";

/* ─── Service definitions ─── */
const SERVICES = [
  {
    id: "community-outreach-service",
    title: "Community Outreach & Service",
    tagline: "Bringing Communities Together Through Action",
    description:
      "RISE works alongside local organizations, businesses, volunteers, and donors to support individuals and families through community outreach, service projects, and collaborative initiatives. Our efforts focus on connecting people with resources, encouraging community involvement, and creating opportunities to make a meaningful impact together.",
    features: [
      "Community outreach and volunteer opportunities",
      "Donation drives for essential resources",
      "Community feeding and engagement events",
      "Partnerships with local organizations and businesses",
    ],
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "resource-collection-distribution",
    title: "Resource Collection & Distribution",
    tagline: "Supporting Communities Through Shared Resources",
    description:
      "RISE collects and distributes food, clothing, shoes, hygiene products, and other essential items to food pantries, nonprofit organizations, and community programs serving individuals and families in need. Through the generosity of donors, volunteers, and community partners, we help extend resources where they can make the greatest impact.",
    features: [
      "Non-perishable food and pantry item donations",
      "Clothing and footwear collection drives",
      "Hygiene and personal care item donations",
      "Support for food pantries and community organizations",
    ],
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "education-mentorship-career-development",
    title: "Education, Mentorship & Career Development",
    tagline: "Empowering Growth Through Guidance and Opportunity",
    description:
      "RISE supports students and aspiring professionals by providing mentorship, educational workshops, career guidance, and access to valuable resources. Through community partnerships and volunteer support, we help individuals explore educational opportunities, develop practical skills, and gain the confidence needed to pursue their academic and career goals.",
    features: [
      "Educational workshops and informational seminars",
      "Student mentorship and personal development support",
      "Career exploration and professional guidance",
      "Networking opportunities with professionals and community leaders",
    ],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
];

/* ─── Select option labels matching IDs ─── */
const SERVICE_OPTIONS: Record<string, string> = {
  "community-outreach-service": "Community Outreach & Service",
  "resource-collection-distribution": "Resource Collection & Distribution",
  "education-mentorship-career-development": "Education, Mentorship & Career Development",
};

export default function ServicesPageClient() {
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  /* Scroll to form + auto-select the clicked service */
  const handleInquire = (serviceId: string) => {
    setSelectedService(serviceId);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !selectedService || !message.trim()) {
      setSubmitError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          serviceOfInterest: selectedService,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSubmitted(false); // To clear the form visually and show success
      setSubmitted(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
              "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        />
        <div className="absolute inset-0 bg-primary-900/75" />
        <div className="absolute inset-0 bg-primary/10" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#007ED1 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 space-y-6 max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent bg-accent/10 border border-accent/30 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            What We Offer
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-[1.15] text-balance text-shadow">
            Services That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">
              Lift Every Neighbor
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed">
            RISE connects volunteers, donors, partners, students, and families through outreach, shared resources, mentorship, and collaborative service.
          </p>
          <button
            onClick={() => handleInquire("")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-primary-dark bg-accent hover:bg-accent-hover transition-all shadow-lg hover:-translate-y-1 duration-200"
          >
            <MessageSquare size={18} />
            Make an Inquiry
          </button>
        </div>
      </section>

      {/* ─── Services Grid (image cards) ─── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h3 className="text-primary font-bold tracking-widest uppercase text-sm">Our Services</h3>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              How RISE Serves the Community
            </h2>
            <p className="text-muted-foreground text-lg">
              Each service addresses a specific need in our community. Click{" "}
              <strong className="text-primary">&quot;Inquire&quot;</strong> on any service to auto-fill the form below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                id={svc.id}
                className="group flex flex-col rounded-3xl overflow-hidden border border-border shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 scroll-mt-24"
              >
                {/* ── Background image header ── */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  {/* Title on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-heading font-bold text-white drop-shadow">{svc.title}</h3>
                    <p className="text-accent text-sm font-semibold mt-0.5">{svc.tagline}</p>
                  </div>
                </div>

                {/* ── Card body ── */}
                <div className="flex flex-col flex-grow bg-background p-6 space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">{svc.description}</p>

                  <ul className="space-y-2">
                    {svc.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 mt-auto">
                    <button
                      onClick={() => handleInquire(svc.id)}
                      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-semibold text-sm text-white bg-primary hover:bg-primary-dark transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 group-hover:gap-3"
                    >
                      <MessageSquare size={15} />
                      Inquire About This Service
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Inquiry Form (auto-filled) ─── */}
      <section className="py-20 bg-[#fff8eb] border-y border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div className="space-y-4">
              <h3 className="text-primary font-bold tracking-widest uppercase text-sm">Not Sure Where to Start?</h3>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                Tell Us What You Need — We&apos;ll Point You in the Right Direction.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our team is here to help you navigate the resources available. Whether you want to donate essential items, volunteer, partner with us, or connect with mentorship and career guidance, reach out and we&apos;ll point you in the right direction.
              </p>

              {/* Quick service chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {SERVICES.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => handleInquire(svc.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                      selectedService === svc.id
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-muted-foreground border-gray-200 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {svc.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right form */}
            <div ref={formRef} className="bg-background rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 p-8">
              {submitted ? (
                <div className="text-center py-8 space-y-4 animate-fade-in">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-500">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-xl font-heading font-bold text-foreground">Inquiry Sent!</h4>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    Thank you. We have received your inquiry and will contact you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h4 className="text-xl font-heading font-bold text-foreground">Quick Service Inquiry</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedService
                        ? `Inquiring about: ${SERVICE_OPTIONS[selectedService]}`
                        : "Fill in your details and we'll get back to you within 24 hours."}
                    </p>
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold animate-fade-in">
                      {submitError}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          disabled={isSubmitting}
                          placeholder="Your first name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white disabled:opacity-50 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          disabled={isSubmitting}
                          placeholder="Your last name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white disabled:opacity-50 text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        placeholder="Your email address"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white disabled:opacity-50 text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Service of Interest *
                      </label>
                      <select
                        required
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white text-gray-700 disabled:opacity-50"
                      >
                        <option value="">Select a service...</option>
                        <option value="community-outreach-service">Community Outreach & Service</option>
                        <option value="resource-collection-distribution">Resource Collection & Distribution</option>
                        <option value="education-mentorship-career-development">Education, Mentorship & Career Development</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Message *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isSubmitting}
                        placeholder="Your message"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none bg-white disabled:opacity-50 text-slate-800"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-all duration-200 text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending Inquiry...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      Prefer to talk?{" "}
                      <Link href="tel:9725233544" className="text-primary font-semibold hover:underline">
                        Call (972)-523-3544
                      </Link>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(white 2px, transparent 2px)",
                backgroundSize: "30px 30px",
              }}
            />
            <div className="relative z-10 space-y-6">
              <Heart className="mx-auto h-12 w-12 text-accent animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white text-balance max-w-2xl mx-auto">
                Ready to Rise With Us?
              </h2>
              <p className="text-lg text-primary-light max-w-xl mx-auto">
                Whether you need our services or want to help provide them every person who connects with RISE strengthens our entire community.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/donate"
                  className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-full text-base font-bold transition-all shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Heart size={18} />
                  Make a Donation
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full text-base font-bold transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
