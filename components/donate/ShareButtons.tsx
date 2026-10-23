"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { siteUrl } from "@/lib/seo";

type Props = { text: string; copyLabel: string; copiedLabel: string };

/** Share the donate page (not the thank-you page) so friends land where they can give. */
export default function ShareButtons({ text, copyLabel, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);
  const url = `${siteUrl}/donate`;
  const encoded = encodeURIComponent(url);
  const message = encodeURIComponent(`${text} ${url}`);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(copyLabel, url);
    }
  };

  const linkClass = "btn-secondary px-5 py-2.5 text-[15px]";
  return (
    <div className="flex flex-wrap gap-2.5">
      <button type="button" onClick={copy} className={linkClass} aria-live="polite">
        {copied ? <Check aria-hidden className="size-4" strokeWidth={2.75} /> : <Link2 aria-hidden className="size-4" strokeWidth={2.75} />}
        {copied ? copiedLabel : copyLabel}
      </button>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
        Facebook
      </a>
      <a href={`https://wa.me/?text=${message}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
        WhatsApp
      </a>
      <a href={`https://x.com/intent/post?text=${message}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
        X
      </a>
    </div>
  );
}
