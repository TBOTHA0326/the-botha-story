# The Botha Story — Wedding Website Design Spec

**Date:** 2026-04-21  
**Couple:** Tiaan & Hannah  
**Wedding date:** 06 December 2026

---

## 1. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Scroll choreography | GSAP + ScrollTrigger (isolated — never mixed with Framer Motion) |
| UI motion | Framer Motion (menu, form states, hover micro-interactions) |
| Data | Supabase (`rsvps` table) |
| Fonts | `Cormorant Garamond` (display/serif) + `Satoshi` (UI/sans) via next/font |
| Icons | `@phosphor-icons/react` |

---

## 2. Route Structure

```
/                  Hero + Our Story (single scroll page)
/timeline          Timeline
/bridal-party      Bridal Party
/rsvp              RSVP Form
/honeymoon-fund    Honeymoon Fund
```

---

## 3. Visual Language

### Palette
| Token | Value | Use |
|---|---|---|
| Background | `zinc-950` `#09090b` | All page backgrounds |
| Surface | `zinc-900` `#18181b` | Cards, panels |
| Border | `zinc-800` `#27272a` | 1px dividers, outlines |
| Accent | `#C9A96E` (warm camel/gold) | CTAs, dates, hover states, pull quotes |
| Text primary | `zinc-100` `#f4f4f5` | Headlines, key copy |
| Text muted | `zinc-400` `#a1a1aa` | Body text, labels |

Single accent rule: `#C9A96E` only. No other accent colors.

### Typography
| Role | Font | Style |
|---|---|---|
| Display (hero, section titles) | Cormorant Garamond | `text-7xl md:text-[10vw] tracking-tight font-light` |
| Sub-labels | Satoshi | `text-sm uppercase tracking-[0.2em]` |
| Body | Satoshi | `text-base leading-relaxed text-zinc-400` |
| Accent/date | Cormorant Garamond italic | Camel accent color |

### Texture
Single fixed `pointer-events-none` grain pseudo-element on `<body>`. Applied via a CSS class on a `<div>` with `fixed inset-0 z-[1] pointer-events-none opacity-[0.035]` using an SVG noise filter. Never applied to scrolling containers.

### Taste-Skill Dials
- `DESIGN_VARIANCE: 8` — asymmetric layouts, left-aligned hero, offset section compositions
- `MOTION_INTENSITY: 6` — fluid scroll reveals, spring physics on UI, no over-choreography
- `VISUAL_DENSITY: 3` — gallery-like spacing, negative space as a design element

---

## 4. Component Architecture

```
src/
  app/
    layout.tsx              Root layout: fonts, grain overlay, Navbar
    page.tsx                / route — Hero + OurStory (Server shell)
    timeline/page.tsx       /timeline
    bridal-party/page.tsx   /bridal-party
    rsvp/page.tsx           /rsvp
    honeymoon-fund/page.tsx /honeymoon-fund
    globals.css             Tailwind v4 base + custom CSS vars
  components/
    Navbar.tsx              Fixed hamburger + Framer Motion overlay menu
    GrainOverlay.tsx        Fixed noise texture (client, pointer-events-none)
    Hero.tsx                GSAP pin + parallax scroll-out (client)
    OurStory.tsx            3-chapter scroll narrative + GSAP scrub quotes (client)
    Timeline.tsx            GSAP viewport-reveal entries (client)
    BridalParty.tsx         Asymmetric photo grid (client)
    RSVPForm.tsx            Supabase form, 3 states (client)
    HoneymoonFund.tsx       Banking details + clipboard (client)
  lib/
    supabase.ts             Supabase browser client
    utils.ts                cn() helper
```

All GSAP-heavy components are isolated Client Components. All page routes are Server Component shells importing those islands.

---

## 5. Page Designs

### `/` — Hero

- `min-h-[100dvh]`, full zinc-950 background
- Left-aligned layout, `padding-left: 8vw`
- Main headline: `Tiaan & Hannah` — Cormorant Garamond, `text-[12vw]` on desktop, `text-6xl` mobile, `font-light`
- Sub-label: `06 · 12 · 2026` — Satoshi caps, `tracking-[0.3em]`, camel accent, below headline
- Bottom-right: animated scroll cue (Phosphor `ArrowDown` icon, infinite float animation)
- Background: zinc-950 + grain overlay. Optional: full-bleed photo with `bg-black/80` overlay (photo slot left for user to add)
- GSAP ScrollTrigger: pins hero, scrubs `opacity` and `y` of headline as user scrolls into Our Story

### `/` — Our Story (below Hero, same page)

- Three chapters: *How We Met*, *Falling in Love*, *The Proposal*
- Each chapter: large faint chapter number left (`Cormorant, text-[20vw], opacity-5`), text content right
- Chapter text: title in Cormorant `text-4xl`, body in Satoshi `text-base text-zinc-400`
- Between chapters: full-width pull quote — Cormorant italic, camel accent, GSAP `fromTo opacity 0→1` scrub
- No cards. Pure negative space and type hierarchy.
- GSAP `from: { opacity: 0, y: 40 }` reveal on each chapter as it enters viewport

### `/timeline`

- Page title: `Our Timeline` — Cormorant, left-aligned, `text-6xl`
- Vertical center line (1px `zinc-800`)
- Entries alternate left/right on `md:`, single column on mobile
- Each entry: date in camel Cormorant italic, event title in Cormorant `text-2xl`, description in Satoshi `text-sm text-zinc-400`
- GSAP `from: { opacity: 0, y: 60 }` staggered reveal per entry on scroll

### `/bridal-party`

- Page title: `The Wedding Party` — Cormorant, left-aligned
- Grid: CSS Grid `grid-cols-1 md:grid-cols-[2fr_1fr_1fr]` with offset rows — NOT equal 3 columns
- 6 members: Maid of Honour, 2× Bridesmaid, Groomsman, 2× Best Man (slots for real photos)
- Portrait: `aspect-[3/4]`, photo via `picsum.photos/seed/{name}/400/530`
- Name below portrait: Cormorant `text-xl`
- Role: Satoshi caps `text-xs tracking-[0.2em] text-zinc-400`
- Hover: `scale-[1.02]` + 1px camel border reveal via Framer Motion `whileHover`

### `/rsvp`

- Centered single-column form, `max-w-lg mx-auto`, generous vertical padding
- Fields: Full name, Attendance (custom styled yes/no toggle), Dietary requirements (textarea), Personal message (textarea)
- Labels above inputs, `gap-2` per field block
- Submit button: camel accent background, magnetic hover (Framer Motion `useMotionValue`)
- States:
  - Default: standard form
  - Loading: button shimmer skeleton
  - Success: brief particle burst (Framer Motion), then `Thank you, [name]. We can't wait to celebrate with you.`
  - Error: inline error per field, red `zinc-400`-adjacent tint (no neon red)
- Supabase insert on submit to `rsvps` table

### `/honeymoon-fund`

- Page title + short copy above cards
- One or two glassmorphism panels: `bg-zinc-900 border border-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`
- Each panel: bank name header, rows of `label: value` with copy-to-clipboard Phosphor icon per row
- On copy success: icon swaps to `CheckCircle`, camel color, Framer Motion spring scale pop
- `rounded-2xl`, `p-8`

### Navbar (all pages)

- Fixed `top-6 right-6`, `z-50`
- Hamburger: Phosphor `List` icon, zinc-100, no background
- On click: full-screen overlay, `bg-zinc-950/95 backdrop-blur-sm`, Framer Motion `AnimatePresence`
- Nav links stagger-reveal: `Our Story`, `Timeline`, `Wedding Party`, `RSVP`, `Honeymoon Fund`
- Links: Cormorant `text-5xl font-light`, camel on hover
- Close: Phosphor `X` top-right

---

## 6. Motion Strategy

| Layer | Tool | Pattern |
|---|---|---|
| Hero scroll-out | GSAP ScrollTrigger | Pin + scrub `y` + `opacity` |
| Our Story chapter reveals | GSAP ScrollTrigger | `from: {opacity:0, y:40}` on enter |
| Pull quote scrub | GSAP ScrollTrigger | `fromTo opacity` tied to scroll position |
| Timeline entry reveals | GSAP ScrollTrigger | Staggered `from: {opacity:0, y:60}` |
| Navbar overlay | Framer Motion | `AnimatePresence` + stagger children |
| Bridal party hover | Framer Motion | `whileHover: {scale:1.02}` |
| RSVP button magnetic | Framer Motion | `useMotionValue` + `useTransform` |
| RSVP success | Framer Motion | Particle burst + fade-in confirmation |
| Copy success | Framer Motion | Spring scale pop on icon swap |

GSAP and Framer Motion are **never in the same component tree**. GSAP components use `useEffect` with strict cleanup (`ctx.revert()`).

---

## 7. Data — Supabase `rsvps` Table

```sql
create table rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  attending boolean not null,
  dietary text,
  message text
);
```

Client: `src/lib/supabase.ts` — `createBrowserClient` from `@supabase/ssr`.  
Env vars required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## 8. Content Placeholders (User Must Fill)

| Location | Placeholder |
|---|---|
| `Hero.tsx` | Background photo (optional) |
| `OurStory.tsx` | Chapter copy for each of the 3 chapters |
| `Timeline.tsx` | Real dates and events |
| `BridalParty.tsx` | Real names, roles, and portrait photos |
| `HoneymoonFund.tsx` | Real banking details |
| `.env.local` | `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` |

---

## 9. Performance Rules

- Grain only on fixed `pointer-events-none` overlay — never on scroll containers
- Animate only `transform` and `opacity` — never `top`, `left`, `width`, `height`
- All perpetual animations in isolated `memo`-wrapped Client Components
- GSAP contexts always cleaned up with `ctx.revert()` in `useEffect` return
- `min-h-[100dvh]` on all full-height sections — never `h-screen`
