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
  description: "We're getting married. Join us on the 6th of December 2026.",
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
