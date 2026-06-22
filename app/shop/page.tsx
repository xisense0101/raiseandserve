import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Shop and Event Tickets",
  description:
    "Get tickets to upcoming RISE events or shop official merchandise. Proceeds support education, community feeding, and outreach programs.",
  path: "/shop",
  keywords: ["RISE shop", "RISE tickets", "nonprofit merchandise", "fundraising shop"],
});

export default function ShopPage() {
  return (
    <div className="flex flex-col h-[calc(100dvh-5rem)] w-full overflow-hidden bg-muted">
      <div className="w-full flex justify-center pt-4 px-4 shrink-0">
        <div className="w-full max-w-[800px] px-6 py-4 bg-primary/5 rounded-2xl border border-primary/10 text-xs text-slate-500 leading-relaxed font-body shadow-sm">
          <div className="flex gap-3">
            <span className="text-base select-none">💡</span>
            <div>
              <strong className="text-slate-800 text-[13px] block mb-1">Tip on Optional Platform Fees:</strong>
              <p className="text-slate-600">
                In the checkout section, you can opt out of the suggested platform contribution by selecting &quot;Other&quot; in the dropdown and entering $0.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <section className="flex-1 w-full overflow-hidden mt-4 relative bg-background">
        <iframe
          title="Donation form powered by Zeffy"
          style={{
            position: "absolute",
            border: 0,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
          }}
          src="https://www.zeffy.com/embed/ticketing/resourceful-impact-in-scholastic-educations-shop"
          {...{
            allowpaymentrequest: "true",
            allowtransparency: "true"
          }}
        />
      </section>
    </div>
  );
}
