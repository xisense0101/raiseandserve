# riseandserve.org

Next.js 16 (App Router) site for RISE — Resourceful Impact in Scholastic Education.
The redesign follows the "Organic" design handoff (warm palette, Caprasimo + Figtree,
video-led storytelling via Cloudinary, EN/ES).

## Getting started

```bash
cp .env.example .env.local   # fill in keys (see below)
npm install
npm run dev
```

## How it's put together

| Area | Where | Notes |
| --- | --- | --- |
| Design tokens | `app/globals.css` (`@theme`) | `bg-page`, `bg-surface`, `text-ink`, `accent-100…900`, `accent-2-100…900`, `neutral-100…900`, `rounded-soft-lg` (28px), `shadow-sm/md/lg`, `.washed`, `.btn-primary`, `.btn-secondary`, `.tag-accent`. Old `primary-*` names are temporary aliases. |
| Fonts | `app/[lang]/layout.tsx` | Self-hosted with `next/font` (no Google request at runtime). |
| Languages | `proxy.ts`, `lib/i18n/*` | English at `/about`, Spanish at `/es/about`. Every page is prerendered for both. The EN/ES toggle stores a `NEXT_LOCALE` cookie; first-time visitors whose browser prefers Spanish land on `/es`. Server components use `getDictionary(lang)`, client components use `useLocale()`. |
| Navbar / Footer | `components/layout/*` | Nav items live in `lib/site.ts`. |
| Bot protection | `components/security/Turnstile.tsx`, `lib/turnstile.ts` | Every form sends a Cloudflare Turnstile token; every `/api/*` route verifies it before doing anything. In production a missing secret rejects submissions (fail closed). |
| Media catalog | `lib/media.ts` | Every photo (alt text, album) and video (event, aspect, poster frame) in Cloudinary cloud `nc7sref5`. Albums were sorted by camera timestamps: IMG_7891–8005 + UUID JPGs = July 6 meal, IMG_8155–8237 = July 20 CIS pantry fill. |
| Media delivery | `lib/cloudinary.ts`, `components/media/*` | URL builders, a `next/image` loader (Cloudinary resizes, AVIF/WebP), `LoopVideo` (muted, loads only near the viewport, poster-only for reduced motion / Save-Data), `PlayCard` + one shared `VideoModal`. |
| Pre-generated video | `scripts/cloudinary-eager.ts` | All derived videos/posters are eager-generated so nobody waits on a transcode. Re-run `npx tsx scripts/cloudinary-eager.ts --run` after changing a transformation or adding a video. |
| Donations | `lib/givebutter.ts` | Givebutter script loads at idle on every page and immediately on `/donate`. |

## Environment variables

See `.env.example`. Set the same values in Vercel → Project → Settings → Environment Variables.

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` — Cloudflare dashboard → Turnstile → add a widget (Managed) for `riseandserve.org`, `www.riseandserve.org`, your Vercel preview domain and `localhost`.
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — Cloudinary console → Dashboard.
- `RESEND_*` — email delivery for the forms.
