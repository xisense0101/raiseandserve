"use client";

import { useEffect } from "react";

export default function AutoScroller({ targetId, delayMs = 3000 }: { targetId: string, delayMs?: number }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, delayMs);
    
    return () => clearTimeout(timer);
  }, [targetId, delayMs]);

  return null;
}
