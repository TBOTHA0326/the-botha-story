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
