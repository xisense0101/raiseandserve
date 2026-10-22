"use client";

import { useSearchParams } from "next/navigation";
import ContactForm, { INQUIRY_TYPES, type InquiryType } from "@/components/ContactForm";

/** Pre-selects the topic from ?topic= (e.g. /contact?topic=events). Render inside <Suspense>. */
export default function ContactFormFromQuery() {
  const topic = useSearchParams().get("topic");
  const initial = INQUIRY_TYPES.includes(topic as InquiryType) ? (topic as InquiryType) : undefined;
  // key: a different topic in the URL starts a fresh form with that topic selected.
  return <ContactForm key={initial ?? "none"} initialTopic={initial} />;
}
