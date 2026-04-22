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
