# The Botha Story — Wedding Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, cinematic wedding website for Tiaan & Hannah (06 Dec 2026) with scroll-driven GSAP animations, a Framer Motion UI layer, and a Supabase RSVP form — across 5 routes.

**Architecture:** Next.js 16 App Router with Server Component page shells importing isolated `'use client'` islands. GSAP + ScrollTrigger handles all scroll choreography; Framer Motion handles all UI micro-interactions. These two libraries are never mixed in the same component tree. All page routes live under `src/app/`, all reusable UI under `src/components/`, utilities under `src/lib/`.

**Tech Stack:** Next.js 16.2.4, React 19, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Framer Motion, Supabase (`@supabase/ssr`), `@phosphor-icons/react`, `next/font` (Cormorant Garamond + Satoshi)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Modify | Add gsap, framer-motion, @supabase/ssr, @phosphor-icons/react |
| `src/app/globals.css` | Modify | Tailwind v4 base, CSS custom properties, grain pseudo-element |
| `src/app/layout.tsx` | Modify | Root layout: fonts, metadata, GrainOverlay, Navbar |
| `src/app/page.tsx` | Modify | `/` route server shell — renders Hero + OurStory |
| `src/app/timeline/page.tsx` | Create | `/timeline` server shell |
| `src/app/bridal-party/page.tsx` | Create | `/bridal-party` server shell |
| `src/app/rsvp/page.tsx` | Create | `/rsvp` server shell |
| `src/app/honeymoon-fund/page.tsx` | Create | `/honeymoon-fund` server shell |
| `src/lib/utils.ts` | Create | `cn()` helper (clsx + tailwind-merge) |
| `src/lib/supabase.ts` | Create | Supabase browser client |
| `src/components/GrainOverlay.tsx` | Create | Fixed noise texture overlay |
| `src/components/Navbar.tsx` | Create | Hamburger + Framer Motion full-screen overlay menu |
| `src/components/Hero.tsx` | Create | GSAP pin + parallax scroll-out hero section |
| `src/components/OurStory.tsx` | Create | 3-chapter narrative with GSAP scroll reveals |
| `src/components/Timeline.tsx` | Create | Alternating timeline with GSAP entry reveals |
| `src/components/BridalParty.tsx` | Create | Asymmetric photo grid with Framer Motion hover |
| `src/components/RSVPForm.tsx` | Create | Supabase form with 3 states + Framer Motion |
| `src/components/HoneymoonFund.tsx` | Create | Banking details with clipboard + Framer Motion |
| `.env.local.example` | Create | Template for Supabase env vars |

---

## Before You Write Any Code

Read the Next.js 16 docs at `node_modules/next/dist/docs/` — specifically the App Router guide. This is NOT the Next.js from your training data. Heed deprecation notices.

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install all required packages**

```bash
npm install gsap framer-motion @supabase/ssr @supabase/supabase-js @phosphor-icons/react clsx tailwind-merge
```

Expected output: `added N packages` with no errors.

- [ ] **Step 2: Verify installs in package.json**

Open `package.json` and confirm these appear in `dependencies`:
- `gsap`
- `framer-motion`
- `@supabase/ssr`
- `@supabase/supabase-js`
- `@phosphor-icons/react`
- `clsx`
- `tailwind-merge`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install gsap, framer-motion, supabase, phosphor-icons, clsx"
```

---

## Task 2: Restore Scaffold Files

The initial commit files were deleted from the working tree. Restore them so the project builds.

**Files:**
- Modify: working tree (restore from HEAD)

- [ ] **Step 1: Restore all deleted scaffold files**

```bash
git checkout HEAD -- .gitignore AGENTS.md README.md eslint.config.mjs next.config.ts package-lock.json package.json postcss.config.mjs public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg src/app/favicon.ico src/app/globals.css src/app/layout.tsx src/app/page.tsx tsconfig.json
```

- [ ] **Step 2: Verify the dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000`, no compile errors. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: restore scaffold files"
```

---

## Task 3: Foundation — globals.css, utils, env template

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/lib/utils.ts`
- Create: `.env.local.example`

- [ ] **Step 1: Rewrite globals.css**

```css
@import "tailwindcss";

@theme inline {
  --color-accent: #C9A96E;
  --font-display: var(--font-cormorant);
  --font-sans: var(--font-satoshi);
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  background-color: #09090b;
  color: #f4f4f5;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-satoshi), system-ui, sans-serif;
  background-color: #09090b;
  min-height: 100dvh;
  overflow-x: hidden;
}
```

- [ ] **Step 2: Create src/lib/utils.ts**

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 3: Create .env.local.example**

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/lib/utils.ts .env.local.example
git commit -m "feat: foundation — globals, utils, env template"
```

---

## Task 4: Root Layout — Fonts + Metadata

**Files:**
- Modify: `src/app/layout.tsx`

Note: Satoshi is not in Google Fonts — it must be self-hosted or loaded via a CDN. Use `next/font/local` for Satoshi. Download Satoshi from `https://api.fontshare.com/v2/fonts/download/satoshi` — place the woff2 files at `public/fonts/Satoshi-Variable.woff2`. For Cormorant Garamond use `next/font/google`.

- [ ] **Step 1: Download Satoshi font**

Download `Satoshi-Variable.woff2` from Fontshare and place it at:
```
public/fonts/Satoshi-Variable.woff2
```

- [ ] **Step 2: Rewrite src/app/layout.tsx**

```typescript
import type { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/Navbar'
import GrainOverlay from '@/components/GrainOverlay'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const satoshi = localFont({
  src: '../../public/fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tiaan & Hannah — 06.12.2026',
  description: 'We\'re getting married. Join us on the 6th of December 2026.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${satoshi.variable}`}>
      <body className="bg-zinc-950 text-zinc-100 antialiased overflow-x-hidden">
        <GrainOverlay />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify dev server still compiles**

```bash
npm run dev
```

Expected: Compiles without errors (GrainOverlay and Navbar don't exist yet — you'll get module-not-found errors which is fine; the build will be fixed in subsequent tasks).

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx public/fonts/
git commit -m "feat: root layout with Cormorant + Satoshi fonts"
```

---

## Task 5: GrainOverlay Component

**Files:**
- Create: `src/components/GrainOverlay.tsx`

- [ ] **Step 1: Create GrainOverlay.tsx**

```typescript
'use client'

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] pointer-events-none select-none"
      style={{ opacity: 0.035 }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
```

- [ ] **Step 2: Verify it renders**

```bash
npm run dev
```

Open `http://localhost:3000`. The grain overlay should be visible as a subtle texture. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/GrainOverlay.tsx
git commit -m "feat: grain overlay component"
```

---

## Task 6: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create Navbar.tsx**

```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'

const links = [
  { label: 'Our Story', href: '/' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Wedding Party', href: '/bridal-party' },
  { label: 'RSVP', href: '/rsvp' },
  { label: 'Honeymoon Fund', href: '/honeymoon-fund' },
]

const overlayVariants = {
  closed: { opacity: 0, transition: { duration: 0.3, when: 'afterChildren' } },
  open: { opacity: 1, transition: { duration: 0.3, when: 'beforeChildren' } },
}

const listVariants = {
  closed: {},
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const itemVariants = {
  closed: { opacity: 0, y: 24 },
  open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-50 text-zinc-100 hover:text-[#C9A96E] transition-colors duration-200"
        aria-label="Open menu"
      >
        <List size={28} weight="light" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[200] bg-zinc-950/95 backdrop-blur-sm flex flex-col justify-center px-[8vw]"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-zinc-100 hover:text-[#C9A96E] transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={28} weight="light" />
            </button>

            <motion.nav variants={listVariants} initial="closed" animate="open" exit="closed">
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <motion.li key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-light text-zinc-100 hover:text-[#C9A96E] transition-colors duration-200 tracking-tight leading-tight block"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            <p className="absolute bottom-8 left-[8vw] font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.25em] text-zinc-600">
              Tiaan & Hannah · 06.12.2026
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Verify navbar renders and opens**

```bash
npm run dev
```

Open `http://localhost:3000`. The hamburger icon should appear top-right. Clicking it should open a full-screen overlay with staggered nav links. Clicking a link or X should close it. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: navbar with Framer Motion full-screen overlay"
```

---

## Task 7: Hero Component

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```typescript
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll cue float animation
      gsap.to(scrollCueRef.current, {
        y: 10,
        duration: 1.4,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      })

      // Pin hero and scrub content out
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center bg-zinc-950"
    >
      <div
        ref={contentRef}
        className="px-[8vw] pt-24 pb-16 flex flex-col gap-6"
      >
        <p className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.3em] text-[#C9A96E]">
          We are getting married
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-6xl sm:text-7xl md:text-[10vw] font-light tracking-tight leading-none text-zinc-100">
          Tiaan<br />&amp; Hannah
        </h1>
        <p
          className="font-[family-name:var(--font-satoshi)] text-sm uppercase tracking-[0.3em] text-[#C9A96E] mt-2"
        >
          06 · 12 · 2026
        </p>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute bottom-10 right-[8vw] text-zinc-600"
        aria-hidden="true"
      >
        <ArrowDown size={22} weight="light" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire Hero into the home page**

Rewrite `src/app/page.tsx`:

```typescript
import Hero from '@/components/Hero'

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Verify Hero renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Should see "Tiaan & Hannah" large left-aligned on a dark background. Scroll cue arrow should float up/down. Scrolling should fade the headline out. No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/app/page.tsx
git commit -m "feat: Hero component with GSAP scroll-out"
```

---

## Task 8: OurStory Component

**Files:**
- Create: `src/components/OurStory.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create OurStory.tsx**

```typescript
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const chapters = [
  {
    number: '01',
    title: 'How We Met',
    body: 'Add your story here. Where did you first cross paths? What was that moment like? Tell it in your own words.',
  },
  {
    number: '02',
    title: 'Falling in Love',
    body: 'Add your story here. Describe the journey from meeting to knowing — the small moments that became everything.',
  },
  {
    number: '03',
    title: 'The Proposal',
    body: 'Add your story here. How did the question get asked? Paint the scene, the nerves, the joy.',
  },
]

const quotes = [
  '"Whatever our souls are made of, his and hers are the same."',
  '"You are my today and all of my tomorrows."',
]

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([])
  const quoteRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      chapterRefs.current.forEach((el) => {
        if (!el) return
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        })
      })

      quoteRefs.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              end: 'top 40%',
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-zinc-950 py-32">
      <div className="max-w-[1400px] mx-auto px-[8vw]">
        <p className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-20">
          Our Story
        </p>

        {chapters.map((chapter, i) => (
          <div key={chapter.number}>
            <div
              ref={(el) => { chapterRefs.current[i] = el }}
              className="relative grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-24 md:mb-32"
            >
              <span
                aria-hidden="true"
                className="absolute -left-4 top-0 font-[family-name:var(--font-cormorant)] text-[20vw] leading-none font-light text-zinc-100 opacity-[0.04] select-none pointer-events-none hidden md:block"
              >
                {chapter.number}
              </span>
              <div className="md:pt-3">
                <p className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.2em] text-zinc-600 mb-3">
                  Chapter {chapter.number}
                </p>
                <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light tracking-tight text-zinc-100">
                  {chapter.title}
                </h2>
              </div>
              <p className="font-[family-name:var(--font-satoshi)] text-base leading-relaxed text-zinc-400 max-w-[60ch] md:pt-10">
                {chapter.body}
              </p>
            </div>

            {i < quotes.length && (
              <div
                ref={(el) => { quoteRefs.current[i] = el }}
                className="border-t border-zinc-800 py-16 md:py-24 mb-24 md:mb-32"
              >
                <p className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl italic font-light text-[#C9A96E] max-w-[50ch]">
                  {quotes[i]}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add OurStory to home page**

```typescript
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <OurStory />
    </main>
  )
}
```

- [ ] **Step 3: Verify OurStory renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Scroll past the Hero. Three chapters should appear with scroll-triggered fade-in. Pull quotes between chapters should fade in/out as you scrub through them. No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/OurStory.tsx src/app/page.tsx
git commit -m "feat: OurStory component with GSAP chapter reveals and quote scrub"
```

---

## Task 9: Timeline Page

**Files:**
- Create: `src/app/timeline/page.tsx`
- Create: `src/components/Timeline.tsx`

- [ ] **Step 1: Create Timeline.tsx**

```typescript
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const events = [
  { date: 'Add date', title: 'Add your first event', description: 'Describe this milestone in your story.' },
  { date: 'Add date', title: 'Add your second event', description: 'Describe this milestone in your story.' },
  { date: 'Add date', title: 'Add your third event', description: 'Describe this milestone in your story.' },
  { date: 'Add date', title: 'Add your fourth event', description: 'Describe this milestone in your story.' },
  { date: 'Add date', title: 'Add your fifth event', description: 'Describe this milestone in your story.' },
  { date: '06 · 12 · 2026', title: 'The Wedding', description: 'The day it all comes together.' },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      entryRefs.current.forEach((el) => {
        if (!el) return
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-zinc-950 min-h-[100dvh] py-32">
      <div className="max-w-[1400px] mx-auto px-[8vw]">
        <p className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
          The Journey
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-7xl font-light tracking-tight text-zinc-100 mb-24">
          Our Timeline
        </h1>

        <div className="relative">
          {/* Center line — hidden on mobile */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 hidden md:block" aria-hidden="true" />

          <div className="flex flex-col gap-16 md:gap-24">
            {events.map((event, i) => (
              <div
                key={i}
                ref={(el) => { entryRefs.current[i] = el }}
                className={`relative flex flex-col md:flex-row md:items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content block */}
                <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-[#C9A96E] mb-2">
                    {event.date}
                  </p>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl font-light text-zinc-100 mb-3">
                    {event.title}
                  </h3>
                  <p className="font-[family-name:var(--font-satoshi)] text-sm text-zinc-400 leading-relaxed max-w-[45ch] inline-block">
                    {event.description}
                  </p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C9A96E] ring-4 ring-zinc-950" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create src/app/timeline/page.tsx**

```typescript
import Timeline from '@/components/Timeline'

export default function TimelinePage() {
  return (
    <main>
      <Timeline />
    </main>
  )
}
```

- [ ] **Step 3: Verify Timeline page**

```bash
npm run dev
```

Open `http://localhost:3000/timeline`. Should see alternating left/right timeline entries with scroll-triggered reveals. Camel dots on the center line. Single column on mobile. No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Timeline.tsx src/app/timeline/page.tsx
git commit -m "feat: Timeline page with GSAP scroll reveals"
```

---

## Task 10: Bridal Party Page

**Files:**
- Create: `src/app/bridal-party/page.tsx`
- Create: `src/components/BridalParty.tsx`

- [ ] **Step 1: Create BridalParty.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const members = [
  { name: 'Maid of Honour', role: 'Maid of Honour', seed: 'moh-placeholder' },
  { name: 'Bridesmaid One', role: 'Bridesmaid', seed: 'bridesmaid-one' },
  { name: 'Bridesmaid Two', role: 'Bridesmaid', seed: 'bridesmaid-two' },
  { name: 'Best Man', role: 'Best Man', seed: 'bestman-one' },
  { name: 'Groomsman One', role: 'Groomsman', seed: 'groomsman-one' },
  { name: 'Groomsman Two', role: 'Groomsman', seed: 'groomsman-two' },
]

export default function BridalParty() {
  return (
    <section className="bg-zinc-950 min-h-[100dvh] py-32">
      <div className="max-w-[1400px] mx-auto px-[8vw]">
        <p className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
          The People
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-7xl font-light tracking-tight text-zinc-100 mb-20">
          The Wedding Party
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-6 md:gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.seed}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className={`group relative cursor-default ${i === 0 ? 'sm:col-span-2 md:col-span-1 md:row-span-2' : ''}`}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={`https://picsum.photos/seed/${member.seed}/400/530`}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Camel border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#C9A96E] transition-colors duration-300 rounded-sm" />
              </div>
              <div className="mt-4">
                <p className="font-[family-name:var(--font-cormorant)] text-xl font-light text-zinc-100">
                  {member.name}
                </p>
                <p className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.2em] text-zinc-500 mt-1">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add picsum.photos to Next.js image domains**

Modify `next.config.ts`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 3: Create src/app/bridal-party/page.tsx**

```typescript
import BridalParty from '@/components/BridalParty'

export default function BridalPartyPage() {
  return (
    <main>
      <BridalParty />
    </main>
  )
}
```

- [ ] **Step 4: Verify Bridal Party page**

```bash
npm run dev
```

Open `http://localhost:3000/bridal-party`. Should see an asymmetric grid of 6 portrait photos. Hovering should scale slightly and reveal camel border. Photos start grayscale and color on hover. No console errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/BridalParty.tsx src/app/bridal-party/page.tsx next.config.ts
git commit -m "feat: Bridal Party page with asymmetric grid and Framer hover"
```

---

## Task 11: Supabase Client

**Files:**
- Create: `src/lib/supabase.ts`

- [ ] **Step 1: Create src/lib/supabase.ts**

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/supabase.ts
git commit -m "feat: Supabase browser client"
```

---

## Task 12: RSVP Form Page

**Files:**
- Create: `src/app/rsvp/page.tsx`
- Create: `src/components/RSVPForm.tsx`

- [ ] **Step 1: Create RSVPForm.tsx**

```typescript
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { createClient } from '@/lib/supabase'

type FormState = 'idle' | 'loading' | 'success' | 'error'

type FormData = {
  name: string
  attending: boolean | null
  dietary: string
  message: string
}

type FieldErrors = {
  name?: string
  attending?: string
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    attending: null,
    dietary: '',
    message: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<FormState>('idle')

  const buttonRef = useRef<HTMLButtonElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const translateX = useTransform(mouseX, [-50, 50], [-6, 6])
  const translateY = useTransform(mouseY, [-25, 25], [-4, 4])

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  function validate(): boolean {
    const newErrors: FieldErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.'
    if (formData.attending === null) newErrors.attending = 'Please let us know if you can make it.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setState('loading')
    const supabase = createClient()
    const { error } = await supabase.from('rsvps').insert({
      name: formData.name.trim(),
      attending: formData.attending,
      dietary: formData.dietary.trim() || null,
      message: formData.message.trim() || null,
    })

    if (error) {
      setState('error')
    } else {
      setState('success')
    }
  }

  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        className="text-center py-16"
      >
        <p className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-zinc-100 mb-4">
          Thank you, {formData.name.split(' ')[0]}.
        </p>
        <p className="font-[family-name:var(--font-satoshi)] text-base text-zinc-400">
          We can&apos;t wait to celebrate with you.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.2em] text-zinc-400"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-transparent border-b border-zinc-700 focus:border-[#C9A96E] outline-none py-3 font-[family-name:var(--font-satoshi)] text-base text-zinc-100 transition-colors duration-200 placeholder:text-zinc-700"
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="font-[family-name:var(--font-satoshi)] text-xs text-rose-400/80">{errors.name}</p>
        )}
      </div>

      {/* Attendance */}
      <div className="flex flex-col gap-3">
        <p className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.2em] text-zinc-400">
          Will you be joining us?
        </p>
        <div className="flex gap-4">
          {[{ label: 'Joyfully accepts', value: true }, { label: 'Regretfully declines', value: false }].map(
            (option) => (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => setFormData({ ...formData, attending: option.value })}
                className={`font-[family-name:var(--font-satoshi)] text-sm px-5 py-3 border transition-colors duration-200 ${
                  formData.attending === option.value
                    ? 'border-[#C9A96E] text-[#C9A96E]'
                    : 'border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300'
                }`}
              >
                {option.label}
              </button>
            )
          )}
        </div>
        {errors.attending && (
          <p className="font-[family-name:var(--font-satoshi)] text-xs text-rose-400/80">{errors.attending}</p>
        )}
      </div>

      {/* Dietary */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="dietary"
          className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.2em] text-zinc-400"
        >
          Dietary Requirements <span className="normal-case tracking-normal text-zinc-600">(optional)</span>
        </label>
        <textarea
          id="dietary"
          value={formData.dietary}
          onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
          rows={2}
          className="bg-transparent border-b border-zinc-700 focus:border-[#C9A96E] outline-none py-3 font-[family-name:var(--font-satoshi)] text-base text-zinc-100 transition-colors duration-200 resize-none placeholder:text-zinc-700"
          placeholder="Any allergies or dietary needs"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.2em] text-zinc-400"
        >
          A Message for Us <span className="normal-case tracking-normal text-zinc-600">(optional)</span>
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
          className="bg-transparent border-b border-zinc-700 focus:border-[#C9A96E] outline-none py-3 font-[family-name:var(--font-satoshi)] text-base text-zinc-100 transition-colors duration-200 resize-none placeholder:text-zinc-700"
          placeholder="Say something kind"
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <motion.button
          ref={buttonRef}
          type="submit"
          disabled={state === 'loading'}
          style={{ x: translateX, y: translateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-[#C9A96E] text-zinc-950 font-[family-name:var(--font-satoshi)] text-sm uppercase tracking-[0.2em] px-10 py-4 disabled:opacity-60 transition-opacity"
        >
          <AnimatePresence mode="wait">
            {state === 'loading' ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <span className="w-4 h-4 border border-zinc-950/40 border-t-zinc-950 rounded-full animate-spin inline-block" />
                Sending
              </motion.span>
            ) : (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Send RSVP
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {state === 'error' && (
          <p className="mt-4 font-[family-name:var(--font-satoshi)] text-xs text-rose-400/80">
            Something went wrong. Please try again or reach out directly.
          </p>
        )}
      </div>
    </form>
  )
}
```

- [ ] **Step 2: Create src/app/rsvp/page.tsx**

```typescript
import RSVPForm from '@/components/RSVPForm'

export default function RSVPPage() {
  return (
    <main className="bg-zinc-950 min-h-[100dvh] py-32">
      <div className="max-w-lg mx-auto px-6">
        <p className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
          Join Us
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-7xl font-light tracking-tight text-zinc-100 mb-16">
          RSVP
        </h1>
        <RSVPForm />
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verify RSVP page renders**

```bash
npm run dev
```

Open `http://localhost:3000/rsvp`. Form should render with name field, two attendance toggle buttons, two optional textareas, and a camel submit button. Hovering the button should have a subtle magnetic pull. No console errors. (Supabase submit will fail without `.env.local` — that's expected.)

- [ ] **Step 4: Commit**

```bash
git add src/components/RSVPForm.tsx src/app/rsvp/page.tsx src/lib/supabase.ts
git commit -m "feat: RSVP form with Supabase, Framer Motion magnetic button, 3 states"
```

---

## Task 13: Honeymoon Fund Page

**Files:**
- Create: `src/app/honeymoon-fund/page.tsx`
- Create: `src/components/HoneymoonFund.tsx`

- [ ] **Step 1: Create HoneymoonFund.tsx**

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, CheckCircle } from '@phosphor-icons/react'

type BankDetail = {
  label: string
  value: string
}

type BankAccount = {
  bankName: string
  details: BankDetail[]
}

const accounts: BankAccount[] = [
  {
    bankName: 'Add Bank Name',
    details: [
      { label: 'Account Name', value: 'Add Account Name' },
      { label: 'Account Number', value: 'Add Account Number' },
      { label: 'Branch Code', value: 'Add Branch Code' },
      { label: 'Account Type', value: 'Cheque / Current' },
    ],
  },
]

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.9 }}
      animate={copied ? { scale: [1, 1.2, 1] } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={`transition-colors duration-200 ${copied ? 'text-[#C9A96E]' : 'text-zinc-600 hover:text-zinc-300'}`}
      aria-label={`Copy ${value}`}
    >
      {copied ? <CheckCircle size={16} weight="fill" /> : <Copy size={16} weight="light" />}
    </motion.button>
  )
}

export default function HoneymoonFund() {
  return (
    <section className="bg-zinc-950 min-h-[100dvh] py-32">
      <div className="max-w-[1400px] mx-auto px-[8vw]">
        <p className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
          A Gift
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-7xl font-light tracking-tight text-zinc-100 mb-6">
          Honeymoon Fund
        </h1>
        <p className="font-[family-name:var(--font-satoshi)] text-base text-zinc-400 leading-relaxed max-w-[55ch] mb-16">
          Your presence at our wedding is the greatest gift. If you&apos;d like to contribute to our honeymoon, the details below are all you need.
        </p>

        <div className="flex flex-col gap-6 max-w-xl">
          {accounts.map((account) => (
            <div
              key={account.bankName}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-zinc-100 mb-8">
                {account.bankName}
              </p>
              <div className="flex flex-col divide-y divide-zinc-800">
                {account.details.map((detail) => (
                  <div key={detail.label} className="flex items-center justify-between py-4 gap-4">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <p className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-[0.15em] text-zinc-600">
                        {detail.label}
                      </p>
                      <p className="font-[family-name:var(--font-satoshi)] text-sm text-zinc-200 truncate">
                        {detail.value}
                      </p>
                    </div>
                    <CopyButton value={detail.value} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create src/app/honeymoon-fund/page.tsx**

```typescript
import HoneymoonFund from '@/components/HoneymoonFund'

export default function HoneymoonFundPage() {
  return (
    <main>
      <HoneymoonFund />
    </main>
  )
}
```

- [ ] **Step 3: Verify Honeymoon Fund page**

```bash
npm run dev
```

Open `http://localhost:3000/honeymoon-fund`. Should see a glassmorphism card with banking detail rows. Clicking the copy icon should change it to a camel checkmark with a spring scale pop, then reset after 2 seconds. No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/HoneymoonFund.tsx src/app/honeymoon-fund/page.tsx
git commit -m "feat: Honeymoon Fund page with clipboard copy and Framer spring"
```

---

## Task 14: Final Polish — Build Check + Cleanup

**Files:**
- Modify: `src/app/page.tsx` (ensure no scaffold junk)
- Modify: `public/` (remove unused SVGs from scaffold)

- [ ] **Step 1: Remove unused scaffold SVGs**

```bash
rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors. TypeScript errors = fix them. `next/image` warnings about missing `sizes` = add them.

- [ ] **Step 3: Fix any TypeScript or build errors found in Step 2**

Common issues to check:
- Missing `'use client'` on components that use hooks
- `next/image` missing `alt` or `sizes` props
- Unused imports flagged by ESLint

- [ ] **Step 4: Run build again to confirm clean**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: clean build, remove unused scaffold assets"
```

---

## Content Checklist (User Action Required After Build)

These items require real content from Tiaan — the build works with placeholders:

| File | What to fill in |
|---|---|
| `src/components/OurStory.tsx` | Replace placeholder `body` text in the `chapters` array for all 3 chapters |
| `src/components/Timeline.tsx` | Replace placeholder `events` array with real dates and milestones |
| `src/components/BridalParty.tsx` | Replace placeholder names, roles, and `seed` values (or real image URLs) |
| `src/components/HoneymoonFund.tsx` | Replace placeholder banking details in `accounts` array |
| `.env.local` | Copy `.env.local.example`, fill in Supabase URL and anon key |
| Supabase dashboard | Run the SQL from the spec to create the `rsvps` table |
