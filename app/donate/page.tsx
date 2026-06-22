import DonatePageClient from "@/components/DonatePageClient";
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
    <div className="flex flex-col min-h-[calc(100vh-5rem)] w-full bg-[#f8fafc] justify-center items-center py-6 px-4">
      <DonatePageClient />
    </div>
  );
}
