import { givebutterFormUrl } from "./givebutter";
import { ZEFFY_SHOP_URL } from "./zeffy";

/**
 * Pre-loads a third-party form (Givebutter, Zeffy) in a hidden iframe as soon as
 * a visitor shows intent (hover, touch, focus on a Donate or Shop link). The
 * real iframe on the next page then gets the form's scripts and styles from the
 * browser cache, which is shared between the two because both are embedded on
 * this site. Each form is warmed at most once per visit.
 */
const warmed = new Set<string>();

function saveData() {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(conn?.saveData);
}

export function warmFrame(key: string, url: string) {
  if (typeof document === "undefined" || warmed.has(key) || saveData()) return;
  // Already on a page that shows this form.
  if (document.querySelector(`iframe[src^="${url.split("?")[0]}"]`)) return;
  warmed.add(key);
  const frame = document.createElement("iframe");
  frame.src = url;
  frame.title = "";
  frame.tabIndex = -1;
  frame.setAttribute("aria-hidden", "true");
  frame.allow = "payment";
  frame.style.cssText = "position:fixed;left:-10000px;top:0;width:400px;height:600px;border:0;opacity:0;pointer-events:none";
  // Drop it once its assets are cached; the cap covers a load that never finishes.
  const remove = () => frame.remove();
  frame.addEventListener("load", () => setTimeout(remove, 4000), { once: true });
  setTimeout(remove, 30000);
  document.body.appendChild(frame);
}

export const warmDonation = (amount?: string | null, frequency?: string | null) =>
  warmFrame("givebutter", givebutterFormUrl(amount, frequency));

export const warmShop = () => warmFrame("zeffy", ZEFFY_SHOP_URL);
