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

                <div className="hidden md:flex absolute left-1/2 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C9A96E] ring-4 ring-zinc-950" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
