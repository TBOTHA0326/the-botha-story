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
  open: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } },
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
