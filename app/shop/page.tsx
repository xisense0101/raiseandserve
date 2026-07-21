import ShopPageClient from "@/components/ShopPageClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Shop and Event Tickets",
  description:
    "Get tickets to upcoming RISE events or shop official merchandise. Proceeds support education, community feeding, and outreach programs.",
  path: "/shop",
  keywords: ["RISE shop", "RISE tickets", "nonprofit merchandise", "fundraising shop"],
});

export default function ShopPage() {
  return <ShopPageClient />;
}
