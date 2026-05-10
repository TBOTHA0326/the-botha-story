import Link from "next/link";
import RsvpForm from "@/components/RsvpForm";

export const metadata = {
  title: "RSVP | Tiaan & Hannah"
};

export default function RsvpPage() {
  return (
    <main className="min-h-[100dvh] bg-ink px-4 py-7 text-white md:px-10">
      <header className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 font-sans text-[10px] uppercase tracking-[0.28em] text-white/78">
        <Link href="/" className="transition-opacity duration-700 ease-silk hover:opacity-60">
          Tiaan & Hannah
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2">
          <Link href="/timeline" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Timeline
          </Link>
          <Link href="/honeymoon-fund" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Fund
          </Link>
          <Link href="/venue" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Venue
          </Link>
          <Link href="/bridal-party" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Bridal Party
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-[1500px] gap-12 py-20 md:grid-cols-[1fr_0.78fr] md:py-32">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-camel">RSVP</p>
          <h1 className="mt-6 max-w-[9ch] font-serif text-[22vw] font-medium uppercase leading-[0.72] md:text-[10vw]">
            Say you will be there.
          </h1>
        </div>

        <div className="self-end rounded-[0.8rem] bg-white/[0.07] p-1.5">
          <div className="rounded-[0.6rem] bg-black p-6 shadow-[inset_0_1px_18px_rgba(255,255,255,0.06)] md:p-8">
            <p className="mb-10 max-w-[32rem] font-serif text-4xl leading-[1.02] text-white/88">
              Let us know you are coming. Just your name — nothing else needed.
            </p>
            <RsvpForm />
          </div>
        </div>
      </section>
    </main>
  );
}
