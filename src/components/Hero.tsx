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
      gsap.to(scrollCueRef.current, {
        y: 10,
        duration: 1.4,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      })

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
        <p className="font-[family-name:var(--font-satoshi)] text-sm uppercase tracking-[0.3em] text-[#C9A96E] mt-2">
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
