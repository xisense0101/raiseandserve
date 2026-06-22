import VolunteerForm from "@/components/VolunteerForm";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Volunteer Registration",
  description:
    "Register to volunteer with RISE and support community outreach, events, feeding programs, education, and service initiatives.",
  path: "/volunteer",
  keywords: ["volunteer with RISE", "volunteer registration", "community volunteer opportunities"],
});

export default function VolunteerPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] w-full bg-muted py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary bg-primary-light px-3.5 py-1.5 rounded-full inline-block mb-3">
            Register Now
          </span>
          <h1 className="text-3xl font-heading font-black text-foreground tracking-tight sm:text-5xl">
            Volunteer Sign-Up
          </h1>
          <div className="mt-4 w-12 h-1.5 bg-primary mx-auto rounded-full" />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Ready to make a difference? Complete the registration form below to support our upcoming outreach.
          </p>
        </div>

        {/* Form */}
        <VolunteerForm />
      </div>
    </div>
  );
}
