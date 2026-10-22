/**
 * Givebutter donation form, embedded directly.
 *
 * The official <givebutter-widget> loads a 270 KB script after hydration, then
 * calls Givebutter's API, and only then creates this same iframe. Embedding the
 * iframe ourselves (URL from that API: /elements/api/v2/<acct>/elements/LeZ9Nv)
 * starts the form download while the HTML is still parsing.
 *
 * If the campaign changes in Givebutter, update GIVEBUTTER_EMBED_URL.
 */
export const GIVEBUTTER_WIDGET_ID = "LeZ9Nv";
export const GIVEBUTTER_EMBED_URL = "https://givebutter.com/embed/c/fund-rising-for-the-needy-nydoyb";
export const GIVEBUTTER_FRAME_ID = "givebutter-form";

/** Same query string the official widget sends (goal bar off, widget id, platform). */
const BASE_PARAMS = `goalBar=false&gba_gb.element.id=${GIVEBUTTER_WIDGET_ID}&gba_gb.element.platform=other`;

const AMOUNT = /^\d{1,6}$/;
const FREQUENCIES = new Set(["once", "monthly"]);

/** Form URL, pre-filled from the home give box (amount must be one of the campaign's suggested amounts). */
export function givebutterFormUrl(amount?: string | null, frequency?: string | null) {
  const params = new URLSearchParams(BASE_PARAMS);
  if (amount && AMOUNT.test(amount)) params.set("amount", amount);
  if (frequency && FREQUENCIES.has(frequency)) params.set("frequency", frequency);
  return `${GIVEBUTTER_EMBED_URL}?${params}`;
}

/**
 * Tiny inline script that creates the form iframe right where it runs, reading
 * ?amount= and ?frequency= from the address bar. Server-rendered, it runs during
 * HTML parsing, long before React hydrates. Kept in sync with givebutterFormUrl.
 */
export const GIVEBUTTER_BOOT_SCRIPT = `(function(){var s=document.currentScript,q=new URLSearchParams(location.search),p=new URLSearchParams(${JSON.stringify(BASE_PARAMS)}),a=q.get("amount"),f=q.get("frequency");if(a&&/^\\d{1,6}$/.test(a))p.set("amount",a);if(f==="once"||f==="monthly")p.set("frequency",f);var i=document.createElement("iframe");i.id=${JSON.stringify(GIVEBUTTER_FRAME_ID)};i.name="givebutter";i.title="Donation form";i.allow="payment";i.setAttribute("allowpaymentrequest","true");i.style.cssText="display:block;width:100%;height:680px;border:0;background:transparent";i.onload=function(){i.setAttribute("data-loaded","")};i.src=${JSON.stringify(GIVEBUTTER_EMBED_URL)}+"?"+p;s.parentNode.insertBefore(i,s)})();`;
