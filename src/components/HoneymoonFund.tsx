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
