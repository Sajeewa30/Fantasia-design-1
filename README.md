# Fantasia Group — Design 1 — Paper & Thread (light editorial)

Approved direction. Next.js 16 (App Router), React 19, Tailwind CSS v4, Motion.

## Run locally

```bash
npm install
npm run dev
```

## Pages

| Route | Source |
| --- | --- |
| `/` | `src/app/page.tsx` — home |
| `/about` | `src/app/about/page.tsx` |
| `/businesses` | `src/app/businesses/page.tsx` |
| `/businesses/elastics` · `/yarn` · `/polymer` · `/chemx` | `src/app/businesses/[slug]/page.tsx` + `src/components/DivisionPage.tsx` |
| `/sustainability` | `src/app/sustainability/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` (`?area=yarn` pre-selects the business area) |
| `/privacy` · `/terms` · `/cookies` | `src/components/LegalPage.tsx` — awaiting approved wording |

## Content

Copy follows the "Fantasia Group Website Copy / Designer Handoff" document:

- `src/data/site.ts` — shared content (nav, footer, home page, business summaries)
- `src/data/pages.ts` — About, Our Businesses, Sustainability, Contact, legal
- `src/data/divisions.ts` — the four business-area pages, including their enquiry-form fields

Every `[REQUEST INFORMATION]` item in the document is rendered on the page as a dashed
"Awaiting information from Fantasia" block (`src/components/Pending.tsx`) so the client can see
exactly what is still needed. Delete the `pending` entries as the information arrives.

## Enquiry forms

All forms post to `src/app/api/enquiry/route.ts`, which forwards them by email through Resend's
REST API (no extra packages). Set these environment variables on Vercel:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from resend.com |
| `ENQUIRY_TO` | Inbox that receives enquiries (comma-separate several) |
| `ENQUIRY_FROM` | Verified sender, e.g. `Fantasia Website <enquiries@fantasia.lk>` |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used by `sitemap.xml` and `robots.txt` |

Until the first two are set, submissions are logged in the Vercel function logs and the visitor
still sees the success message, so the site can be reviewed before the mailbox is confirmed.
Attachments are limited to 3 files / 4 MB in total (Vercel's request-body limit is 4.5 MB).

## Assets

Images in `public/images` are AI-generated placeholders in the intended art direction; replace with
client photography when available. The logo in `public/brand` is the low-resolution PNG from
fantasia.lk — request the vector (SVG/AI) master from the client.

## Browser support

The stack targets Safari 16.4+ / evergreen browsers (Next 16 and Tailwind v4 defaults).
