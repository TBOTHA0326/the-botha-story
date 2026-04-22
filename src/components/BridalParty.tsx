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
