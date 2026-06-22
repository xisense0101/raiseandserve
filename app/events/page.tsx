import Link from "next/link";
import AutoplayMuxEmbed from "@/components/AutoplayMuxEmbed";
import EventsList from "@/components/EventsList";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Events and Community Service Initiatives",
  description:
    "Join RISE events, volunteer opportunities, outreach programs, and community service initiatives.",
  path: "/events",
  keywords: ["RISE events", "community service events", "volunteer events", "outreach programs"],
});

export default function EventsPage() {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-5rem)] bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col py-12 md:py-16">
        
        {/* Page Header - Premium & Refined styling */}
        <div className="mb-12 text-center flex-none">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary bg-primary-light px-3.5 py-1.5 rounded-full inline-block mb-3">
            RISE Initiatives
          </span>
          <h1 className="text-3xl font-heading font-black text-slate-900 tracking-tight sm:text-5xl">
            Upcoming Events
          </h1>
          <div className="mt-4 w-12 h-1.5 bg-primary mx-auto rounded-full animate-slide-right" />
        </div>

        {/* Events List Wrapper */}
        <div className="w-full">
          <EventsList />
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <AutoplayMuxEmbed
            src="https://player.mux.com/qb2zpTfjeQrU1600KoCrZSj5Hkh2koOQTMdHikDA00rUY"
            title="RISE volunteer video"
          />
        </div>

        <div className="mt-12 rounded-3xl border border-primary/15 bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-primary">
            Volunteer With RISE
          </p>
          <h2 className="mt-3 text-2xl font-heading font-black text-slate-900 sm:text-3xl">
            Apply for Volunteer Opportunities
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Interested in supporting upcoming events and community outreach? Complete the volunteer application form to get involved.
          </p>
          <Link
            href="/volunteer"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark sm:text-base"
          >
            Apply for Volunteer
          </Link>
        </div>

      </div>
    </div>
  );
}
