import ServicesPageClient from "@/components/ServicesPageClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Community Services",
  description:
    "Explore RISE services for community outreach, resource collection and distribution, mentorship, education, career development, and collaborative service initiatives.",
  path: "/services",
  keywords: [
    "community services",
    "community outreach",
    "resource distribution",
    "donation drives",
    "mentorship programs",
    "career development programs",
    "service initiatives",
  ],
});

export default function ServicesPage() {
  return <ServicesPageClient />;
}
