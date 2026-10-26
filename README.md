# Xentro — Next.js Application

Next.js (App Router + TypeScript) migration of the Xentro landing website ("Entrepreneurial Infrastructure").

## Overview

This project is a migration of the original multi-page static website into a component-driven Next.js application while preserving the original visual identity, color palette, typography, responsive behavior, and custom CSS animations.

---

## Tech Stack & Architecture

- **Framework**: [Next.js 16.4.3](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/)
- **Styling**: Scoped CSS Modules with a minimal `globals.css` design-token layer
- **Font Optimization**: `next/font/google` self-hosting the authentic `Inter` typeface across all routes including Careers (intentional typography choice with zero runtime external requests)
- **Image Optimization**: `next/image` + `sharp` with default WebP format and responsive sizes
- **Code Quality**: ESLint 9 (flat config) and strict TypeScript compiler checks
- **Routing & Navigation**: Client-side transitions via `next/link` with automatic 308 redirects from legacy `.html` URLs

---

## Project Structure

```
d:/Home-page-main/Home-page-main/
├── public/
│   └── assets/                     # Static assets (Metalog.png, portraits, institution, careers/brand-symbol.png)
├── src/
│   ├── app/
│   │   ├── (main)/                 # Route group with shared Navbar
│   │   │   ├── layout.tsx          # Shared layout injecting <Navbar />
│   │   │   ├── page.tsx            # Home (/)
│   │   │   ├── about/page.tsx      # About Us (/about)
│   │   │   ├── explore/page.tsx    # Role-based Portal (/explore)
│   │   │   ├── blog/page.tsx       # Journal & Insights (/blog)
│   │   │   └── careers/page.tsx    # Careers & Culture Portal (/careers)
│   │   ├── join/
│   │   │   └── page.tsx            # Standalone Launch Countdown (/join)
│   │   ├── not-found.tsx           # Custom accessible 404 page
│   │   ├── layout.tsx              # Root HTML/body shell with Inter font & metadata
│   │   └── globals.css             # Design tokens (:root), resets, and accessibility
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Scroll-hide/reveal navbar with mobile drawer & Careers link
│   │   │   └── Navbar.module.css
│   │   ├── home/
│   │   │   ├── Home.module.css
│   │   │   ├── OrbitGraphic.tsx    # Animated SVG connection & pulse orbit
│   │   │   ├── PricingSection.tsx  # Interactive Standard vs Pro view switcher with keyboard nav
│   │   │   └── FaqAccordion.tsx    # Single-open accessible accordion
│   │   ├── about/
│   │   │   └── About.module.css    # Scoped styles for beliefs, timeline, and team cards
│   │   ├── explore/
│   │   │   ├── Explore.module.css
│   │   │   └── ExploreContent.tsx  # Audience tabs synced with URL hash & arrow keyboard navigation
│   │   ├── blog/
│   │   │   ├── Blog.module.css
│   │   │   ├── BlogGrid.tsx        # Filterable article grid
│   │   │   └── BlogSection.tsx     # Hero, Category Filter bar, Featured Insight, and Articles
│   │   ├── careers/
│   │   │   ├── Careers.module.css  # Scoped lime/black brand styling for careers page
│   │   │   ├── CareerForm.tsx      # Application preview form with validation (no network transmission)
│   │   │   └── RoleDirectory.tsx   # Searchable 48-specialization role directory with department filter
│   │   └── join/
│   │       ├── Join.module.css
│   │       └── CountdownTimer.tsx  # Hydration-safe live countdown timer (stops on expiry)
│   └── data/
│       ├── pricing.ts              # Typed plans for Standard and Pro tiers
│       ├── faqs.ts                 # FAQ list
│       ├── team.ts                 # Executive leadership team data
│       ├── explore.ts              # Audience tab information (Startups, Mentors, Investors, Institutions)
│       ├── blogs.ts                # Blog posts, categories, and editorial pillars
│       └── careers.ts              # 48 role specializations across 4 departments
├── eslint.config.mjs               # ESLint 9 flat configuration
├── next.config.mjs                 # Remote image patterns and .html redirects
├── tsconfig.json                   # TypeScript configuration
├── .env.example                    # Template for environment configuration
└── package.json
```

---

## Configuration & Environment Variables

The unconfirmed hardcoded production domain (`https://xentro.io`) has been removed and replaced with configurable environment resolution. In `src/app/layout.tsx`, `metadataBase` is derived dynamically:

```typescript
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
```

`metadataBase` supplies a base URL for resolving relative metadata assets (such as Open Graph and Twitter images); canonical links must be configured separately (for instance via `metadata.alternates.canonical`).

To specify the base URL for deployment environments:
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set `NEXT_PUBLIC_SITE_URL` to your verified site URL (e.g. `https://your-domain.com`).

---

## Typography Comparison & Explicit Font Loading

### Original Static Implementation
In the original CSS (`index.css`, `about.css`, etc.), the font stack was declared as:
```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```
However, the original static files **did not include any `@font-face` rules, local font files, or Google Fonts `<link>` stylesheets**. As a consequence:
- Machines with `Inter` installed locally (e.g. designer workstations) rendered Inter.
- Machines without `Inter` locally installed (the vast majority of standard end-user Windows and Android systems) silently fell back to OS fonts such as `Segoe UI` (Windows) or `Roboto` (Android).

### Next.js Migration Rationale (Intentional Typography Changes)
In the Next.js migration, `Inter` is loaded intentionally and explicitly via `next/font/google` in the root layout (`src/app/layout.tsx`) and inherited uniformly across all routes (Home, About, Explore, Blog, Join, and Careers). Careers-specific font overrides (such as Manrope) were removed to ensure exact visual and typographic harmony with the landing site.

**Benefits & Intentional Changes**:
1. **Visual Fidelity & Cohesion**: Delivers the intended design aesthetic uniformly across all operating systems without relying on pre-installed system fonts or divergent typeface families.
2. **Reduces Font-Related Layout Shift**: Next.js automatically calculates font fallback metrics (`size-adjust`), reducing layout shift during font hydration.
3. **Privacy & Offline Resilience**: Fonts are downloaded and self-hosted at build time inside the Next.js bundle, so no tracking requests or third-party connections are made to Google servers during page views.

---

## Unresolved Content & Product Decisions

In adherence to strict migration requirements, no dates, destinations, backend endpoints, or fake product functionality have been invented. The following decisions are explicitly recorded as pending stakeholder confirmation:

1. **Launch Target Date & Time Contradiction (`/join`)**:
   - In the original `join.html`, the executable timer initialized with `new Date('2026-09-30T17:00:00+05:30')`, matching the visible eyebrow headline (`30 September 2026 · 5:00 PM IST`). However, the footer text (`26.09.2026 · 17:00 IST`) and the inline script comment (`// Target: 26 September 2026...`) referenced 26 September.
   - The migration uses the executable 30 September 2026 timestamp. When the countdown expires, the implementation stops the interval timer, hides the countdown digits, and displays the live state ("We’re live" / "Xentro is now open.") with the launch action button.
   - *Status*: Pending confirmation of the final scheduled launch date from the product team.

2. **Join Public Status & Destination (`/join`)**:
   - In `join.html`, the brand logo and the post-launch "Enter Xentro" button linked to `index.html`. Changing that to `/` preserves the original destination.
   - *Status*: Join's public launch status and destination workflow remain an unresolved release decision.

3. **Blog Article Destinations (`/blog`)**:
   - All article cards in `blog.html` linked to `#` placeholders without individual article routes or published content.
   - The migration preserves these cards with accessible `#` anchors and active category filtering (`Build`, `Navigate`, `Learn`, etc.).
   - *Status*: Providing real article links or a visible "Coming soon" state remains an unresolved release decision; a CMS is optional and outside the current migration scope.

4. **Careers Job Descriptions & Vacancy Status (`/careers`)**:
   - All 48 specializations in the Role Directory show the label "JD coming soon". This indicates that downloadable or individual job descriptions are currently being prepared, and does not claim that every specialization is an active open vacancy.
   - *Status*: Pending publication of individual job descriptions and formal vacancy listings.

5. **Careers Application Form Preview (`/careers#apply`)**:
   - The form functions strictly as a client-side validation demonstration and application preview.
   - Personal details, inputs, and uploaded resume files remain strictly within the browser and are not transmitted over the network or stored in any backend database.
   - *Status*: Connecting a production recruitment API, backend submission endpoint, or applicant tracking system (ATS) remains an unresolved release decision.

6. **Public Interface Integrity**:
   - All internal development/approval notes and review labels were removed from public interfaces and consolidated here in the documentation.

---

## Getting Started

### Prerequisites

- Node.js 20.9.0 or newer (required by Next.js 16 and Sharp)
- npm `v9+` or `v10+`

### Installation

```bash
npm install
```

### Development Server

Start the development server:

```bash
npm run dev
```

### Linting and Type Checking

```bash
npm run lint
npm run typecheck
```

### Production Build

Compile and optimize the project for production:

```bash
npm run build
```

### Run Production Server

Serve the production build locally:

```bash
npm run start
# Or on a custom port:
npx next start -p 3000
```

---

## Route Mappings & Navigation

| Route | Source / Mapping | Status | Description |
| :--- | :--- | :--- | :--- |
| `/` | `index.html` | 308 Redirect / 200 OK | Hero, Problem, Orbit map, How it works, Pricing, FAQs, Footer CTA |
| `/about` | `about.html` | 308 Redirect / 200 OK | Motto, 5 Beliefs, Story timeline, Mission, Vision, Leadership team |
| `/explore` | `explore.html` | 308 Redirect / 200 OK | Audience tabs (supports hash routes: `/explore#startups`, `/explore#mentors`, `/explore#investors`, `/explore#institutions`) |
| `/blog` | `blog.html` | 308 Redirect / 200 OK | Category filter bar before Featured Insight, Latest Articles grid, Editorial pillars |
| `/careers` | Integrated Careers Package | 200 OK | Work, Culture, Career Paths, Hiring Process, 48-Role Directory, Preview Application Form |
| `/join` | `join.html` | 308 Redirect / 200 OK | Dedicated launch countdown layout, ambient lighting |

---

## Careers Application Flow & SMTP Setup

The Careers page (`/careers`) includes a secure, real-time application submission flow with server-side validation and email delivery directly to `hiring@xentro.in`.

### Applicant Flow
1. **Form Completion**: Candidate enters Personal Information (Full Name, Phone, Email), selects exactly one Department, chooses one or more Specializations, uploads a résumé (PDF/DOCX, max 5 MB), and accepts the consent terms.
2. **Review Application Step**: Clicking **Review application** validates the form on the client and displays a review card showing the applicant's details and attached résumé. **No data is uploaded or transmitted at this stage.**
3. **Edit or Submit**: The applicant can click **← Edit application** to return to the form with all fields preserved, or click **Submit application →** to confirm.
4. **Server Processing (`/api/careers/apply`)**:
   - Accepts only `multipart/form-data` via `POST`.
   - Independently verifies field lengths, email & phone formats, honeypot bot trap, and department/role consistency against allowed specializations.
   - Enforces 5 MB file size limit, checks file extension, and validates **magic byte file signatures** (`%PDF-` for PDF, `PK\x03\x04` for DOCX) to reject spoofed files.
   - Sanitizes filenames against directory traversal and unsafe characters.
   - Applies in-memory IP rate limiting (sliding window) and duplicate click prevention.
   - Keeps uploads in memory and releases them immediately after delivery; never writes files to disk or logs sensitive applicant data.
5. **SMTP Delivery**:
   - Uses Nodemailer to format a readable HTML + plain-text email with the validated résumé attached.
   - Recipient is fixed to `hiring@xentro.in` and `Reply-To` is set to the applicant's email address.
   - Success state is only shown to the applicant after the SMTP server accepts the message. If delivery fails, the applicant is informed and allowed to retry without re-entering data.

### SMTP Configuration (Environment Variables)

Add the following variables to `.env.local` for local testing or configure them in your production hosting platform (e.g., Vercel, Railway, AWS, DigitalOcean):

```env
# SMTP Server Settings
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASSWORD=your-smtp-password
SMTP_FROM="Xentro Careers" <no-reply@xentro.in>
```

> [!IMPORTANT]
> **Safety Notice**: Never commit `.env.local` or real passwords to version control. If SMTP credentials are not configured, the server fails safely (returning HTTP 503) without crashing or exposing sensitive stack traces.

### Deployment & Host Requirements

1. **Outbound SMTP Ports**: Ensure your hosting provider allows outbound TCP connections on port 587 (STARTTLS) or port 465 (TLS). If direct SMTP ports are blocked by your cloud host, configure an authorized transactional relay (e.g., Amazon SES, Resend, SendGrid, or Mailgun).
2. **Request & Message Size Limits**:
   - The server enforces a maximum résumé upload size of 5 MB.
   - When encoded in base64 within an email MIME message, a 5 MB file expands to approximately ~6.7 MB. Ensure your SMTP provider and hosting serverless function body size limit allow at least 10 MB payloads.
3. **Runtime**: The route handler uses the Node.js runtime (`export const runtime = 'nodejs';`) to support Nodemailer and streaming buffer validation.

### Automated Testing & Verification

Run the automated test suite covering all validation rules, file signature checks, rate limiting, and mocked SMTP transport:

```bash
npm test
```

To run TypeScript checks and production build:

```bash
npm run typecheck
npm run build
```


