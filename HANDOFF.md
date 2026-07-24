# Rhianna Gray — Website Handoff

Practical reference for whoever takes over this site. It covers the live URLs,
every account/login involved, how to edit content, email, DNS, and how to deploy
changes. **No passwords or keys are stored in this file** — only where to find them.

_Last updated: 2026-07-21_

---

## 1. What this is

- **Site:** Rhianna Gray — intuitive astrology, animal communication, and Quanta
  Freedom Healing™, plus a blog ("Notebook").
- **Stack:** Next.js (App Router) + TypeScript, deployed on **Vercel**.
- **Data:** Postgres via Prisma (`DATABASE_URL`); image uploads via Vercel Blob.
- **Repo:** GitHub — `github.com/dennis-j-mccarthy/Rhianna`, branch **`main`**.

## 2. Live URLs

| URL | Notes |
|---|---|
| https://rhiannagray.com | Primary (HTTPS via Vercel) |
| https://www.rhiannagray.com | Redirects to primary |
| https://rhianna.vercel.app | Vercel default domain (always works) |
| https://rhiannagray.com/admin | Content admin (password-protected) |

## 3. Accounts & logins (the important part for a handoff)

| Service | What it controls | Where to sign in |
|---|---|---|
| **Vercel** | Hosting, deploys, environment variables. Team **`denwah`**, project **`rhianna`**. | vercel.com |
| **GitHub** | Source code (`dennis-j-mccarthy/Rhianna`). | github.com |
| **GoDaddy** | Domain registration **and** DNS **and** the Microsoft 365 email mailbox. | godaddy.com |
| **Site Admin** | Editing pages, blog posts, newsletter. Single password (no username). | rhiannagray.com/admin |
| **Anthropic** | API key that powers the AI blog-drafting feature. | console.anthropic.com |
| **Calendly** | Booking links (`rhianna-rhiannagray`). | calendly.com |
| **Resend** | Email API (account under `bellabonitasprings@gmail.com`). **Currently unused** — see §8. | resend.com |

> The domain, DNS, and email are **all** managed inside the one GoDaddy account.

## 4. Editing content (for Rhianna)

1. Go to **rhiannagray.com/admin**.
2. Enter the **admin password** (there's no username). Sessions last ~7 days.
3. From the dashboard you can:
   - **Quick Create** — type/speak a rough idea and AI drafts a full blog post.
   - Edit / publish / unpublish Notebook articles.
   - Build a newsletter; adjust settings (including the AI "writing voice" sample).

Most page text is editable through admin "text blocks" (stored in the database),
which override the defaults written in the code.

## 5. Email

- **Address:** `rhianna@rhiannagray.com` — a **Microsoft 365** mailbox purchased
  through GoDaddy.
- **Check it at:** **outlook.com** (sign in with the email + its password), or the
  Microsoft **Outlook** phone app.
- **DNS:** `MX → rhiannagray-com.mail.protection.outlook.com` (live).

## 6. Domain & DNS (GoDaddy)

Registrar and nameservers are GoDaddy (`ns59` / `ns60.domaincontrol.com`).
Key records currently set:

| Type | Name | Value | Purpose |
|---|---|---|---|
| A | `@` | `76.76.21.21` | Points apex to Vercel |
| CNAME | `www` | `cname.vercel-dns.com` | Points www to Vercel |
| MX | `@` | `rhiannagray-com.mail.protection.outlook.com` | Microsoft 365 email |
| TXT | `_dmarc` | `v=DMARC1; p=quarantine; …` | Email policy |

> ⚠️ The apex must stay an **A record** (never a CNAME). Don't remove the MX/DMARC
> records or email will break.

## 7. Deploying changes

The Vercel project is linked via the `.vercel/` folder. To ship:

```bash
git add -A && git commit -m "…" && git push origin main
npx vercel --prod --yes      # builds & aliases to rhiannagray.com
```

## 8. Contact form (current behavior + history)

- The contact form at **/contact** uses a **`mailto`** link: on submit it opens the
  **visitor's own email app** pre-addressed to `rhianna@rhiannagray.com`. The visitor
  must then press Send in their app.
- **Known limitation:** if a visitor has no email app configured, submitting does
  nothing, and there's **no server-side copy** of the inquiry. Some inquiries can be
  missed.
- A **server-side version** (Resend API, guaranteed delivery) was built and then
  reverted per request. If you want to revisit it: the `RESEND_API_KEY` is already in
  Vercel, but the Resend account's sending **domain must be verified**
  (resend.com/domains → add `rhiannagray.com` → add its DNS records) before it can
  email arbitrary recipients. Until then Resend only delivers to its own account
  address (`bellabonitasprings@gmail.com`).

## 9. Environment variables (names only — values live in Vercel → Settings)

| Name | Used for |
|---|---|
| `ADMIN_PASSWORD` | Admin login |
| `SESSION_SECRET` | Signs the admin session cookie |
| `DATABASE_URL` | Postgres (Prisma) |
| `ANTHROPIC_API_KEY` | AI blog drafting (model `claude-opus-4-7`) |
| `BLOB_READ_WRITE_TOKEN` | Image uploads (Vercel Blob) |
| `RESEND_API_KEY` | Unused (see §8) |

## 10. Open items / nice-to-haves

- Contact form reliability (see §8) — the one real caveat for capturing inquiries.
- No dedicated **/about** page yet (bio content lives on the home page).
- No `robots.txt` / `sitemap` / social-share image (fine to launch; good for SEO later).
- AI model is pinned to `claude-opus-4-7`; can be bumped to Opus 4.8.
