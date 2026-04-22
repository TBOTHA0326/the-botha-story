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
