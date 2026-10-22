import Script from "next/script";
import DonatePageClient from "@/components/DonatePageClient";
import { GIVEBUTTER_SCRIPT_ID, GIVEBUTTER_SCRIPT_SRC } from "@/lib/givebutter";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Donate to Support Community Feeding and Education",
  description:
    "Support RISE with secure donations that help provide meals, educational resources, career development, clothing support, and community assistance.",
  path: "/donate",
  keywords: ["donate to RISE", "support community programs", "nonprofit donation", "education donation"],
});

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] w-full bg-muted justify-center items-center py-6 px-4">
      {/* Same id as the idle-loaded script in the layout: next/script loads it once.
          Here it is needed right away, for visitors who land on /donate directly. */}
      <Script id={GIVEBUTTER_SCRIPT_ID} src={GIVEBUTTER_SCRIPT_SRC} strategy="afterInteractive" />
      <DonatePageClient />
    </div>
  );
}
