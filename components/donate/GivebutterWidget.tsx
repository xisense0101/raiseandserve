"use client";

import { useSearchParams } from "next/navigation";
import { GIVEBUTTER_WIDGET_ID } from "@/lib/givebutter";

const AMOUNT = /^\d{1,6}$/;
const FREQUENCIES = new Set(["once", "monthly"]);

/**
 * Givebutter donation widget, pre-filled from the home give box
 * (/donate?amount=50&frequency=monthly). Givebutter only pre-selects amounts
 * that exist as suggested amounts on the campaign (25 / 50 / 100 / 250).
 */
export default function GivebutterWidget() {
  const params = useSearchParams();
  const amount = params.get("amount") ?? "";
  const frequency = params.get("frequency") ?? "";

  return (
    <givebutter-widget
      // Remount when the selection changes so the widget re-reads its attributes.
      key={`${amount}-${frequency}`}
      id={GIVEBUTTER_WIDGET_ID}
      amount={AMOUNT.test(amount) ? amount : undefined}
      frequency={FREQUENCIES.has(frequency) ? frequency : undefined}
    />
  );
}
