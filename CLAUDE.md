# OctaUnitech Website — Claude Project Memory

## Company Info
- **Name:** OctaUnitech Solutions Pvt. Ltd.
- **Founded:** 2010
- **Location:** #21 Oxford Towers, 139 HAL Old Airport Road, Kodihalli, Bangalore – 560008
- **Email:** sales@octaunitech.com
- **Website:** www.octaunitech.com
- **Business:** Cloud Computing, DevOps, Digital Transformation, System Integration, ML/AI/Analytics, Consulting

## Tech Stack
- **Framework:** Next.js (App Router, no src/ directory)
- **Language:** JavaScript (no TypeScript selected)
- **Styling:** Custom CSS in `app/globals.css` — NO Tailwind
- **Fonts:** Montserrat (display) + Inter (body) via next/font/google

## Project Structure
```
octaunitech-website/
├── app/
│   ├── layout.tsx        ← fonts, metadata, root html
│   ├── page.tsx          ← homepage assembly
│   └── globals.css       ← ALL styles live here
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── WhyUs.tsx
│   ├── Testimonial.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   └── ScrollReveal.tsx  ← client component for scroll animations
├── public/               ← images, logos go here
└── CLAUDE.md
```

## Design System
| Token | Value | CSS Variable |
|---|---|---|
| Background | `#FFFFFF` | `--bg` |
| Card background | `#FAFAFA` | `--bg-card` |
| Elevated surface | `#F4F4F5` | `--bg-elevated` |
| Section (alt bg) | `#F8F8F8` | `--bg-section` |
| Accent (Orange) | `#F97316` | `--accent` |
| Accent hover | `#EA580C` | `--accent-hover` |
| Accent dim | `rgba(249,115,22,0.08)` | `--accent-dim` |
| Accent glow | `rgba(249,115,22,0.22)` | `--accent-glow` |
| Text primary | `#1B3A6B` | `--text` |
| Text secondary | `#3D5478` | `--text-secondary` |
| Text muted | `#8A97B0` | `--text-muted` |
| Border | `rgba(27,58,107,0.10)` | `--border` |
| Border accent | `rgba(249,115,22,0.35)` | `--border-accent` |
| Display Font | Montserrat (600, 700, 800) | `--font-display` |
| Body Font | Inter (300, 400, 500) | `--font-body` |

## Design Rules — ALWAYS FOLLOW
- **White theme** — white (`#FFFFFF`) and very light grays for backgrounds
- **Orange** (`#F97316`) is the ONLY accent color — matches the logo's orange rings
- No video backgrounds — hero uses CSS decorative rings only
- All CSS goes into `globals.css` using class names — no inline styles except layout tweaks
- All sections have `.reveal` class for scroll-triggered fade-up animation
- Generous white space — avoid clutter
- Typography: display font for headings, body font for all other text
- No Tailwind, no CSS modules, no styled-components

## Key Stats (use these consistently)
- 13+ Years of Excellence
- 200+ Projects Delivered
- 50+ Enterprise Clients

## Content Tone
- Professional, confident, enterprise-grade
- Avoid clichés: "cutting-edge", "synergy", "leverage" (unless natural)
- Sentence case for body copy
- Copyright year: 2026

## Pages Built
- [x] Homepage (`app/page.tsx`)

## Pages To Build Next
- [ ] `/about` — Company story, team, values
- [ ] `/services/cloud` — Cloud Services detail page
- [ ] `/services/devops` — DevOps detail page
- [ ] `/services/digital-transformation`
- [ ] `/services/system-integration`
- [ ] `/services/ml-ai`
- [ ] `/services/consulting`
- [ ] `/careers` — Job listings
- [ ] `/contact` — Contact form page
- [ ] `/blog` — Thought leadership

## Components To Add Later
- [ ] Mobile hamburger menu (Navbar)
- [ ] Real client logo images (replace placeholder text in Clients section)
- [ ] Contact form with validation
- [ ] Blog card component
- [ ] Case study card component

## Common Claude Instructions for This Project
When asked to make changes:
1. Always check which component the section lives in before editing
2. Add new CSS classes to `globals.css` — do not use inline styles for design
3. Keep 'use client' only on components that use hooks or browser APIs
4. New pages go in `app/[pagename]/page.tsx`
5. Shared components go in `components/`
