import ApplyPageClient from "@/components/ApplyPageClient";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Apply for Programs and Volunteer Opportunities",
  description:
    "Connect with RISE to apply for community programs, request support, or volunteer your time for service initiatives.",
  path: "/apply",
  keywords: ["apply for nonprofit programs", "volunteer application", "request community support"],
});

export default function ApplyPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] w-full bg-[#f8fafc] justify-center items-center py-12 px-4 space-y-12">
      <ApplyPageClient />
      
      <div className="w-full max-w-4xl rounded-3xl border border-primary/15 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-primary">
          Volunteer With RISE
        </p>
        <h2 className="mt-3 text-2xl font-heading font-black text-slate-900 sm:text-3xl">
          Apply for Volunteer Opportunities
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-650 sm:text-base">
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
  );
}
