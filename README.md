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
| Media | `lib/cloudinary.ts`, `components/media/CloudinaryImage.tsx` | URL builders (`f_auto,q_auto`, video posters, captions) and a `next/image` loader that lets Cloudinary do the resizing. |
| Donations | `lib/givebutter.ts` | Givebutter script loads at idle on every page and immediately on `/donate`. |

## Environment variables

See `.env.example`. Set the same values in Vercel → Project → Settings → Environment Variables.

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` — Cloudflare dashboard → Turnstile → add a widget (Managed) for `riseandserve.org`, `www.riseandserve.org`, your Vercel preview domain and `localhost`.
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — Cloudinary console → Dashboard.
- `RESEND_*` — email delivery for the forms.
