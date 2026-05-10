import Link from "next/link";

export const metadata = {
  title: "Venue | Tiaan & Hannah"
};

export default function VenuePage() {
  return (
    <main className="min-h-[100dvh] bg-ink px-4 py-7 text-white md:px-10">
      <header className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 font-sans text-[10px] uppercase tracking-[0.28em] text-white/78">
        <Link href="/" className="transition-opacity duration-700 ease-silk hover:opacity-60">
          Tiaan & Hannah
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2">
          <Link href="/rsvp" className="rounded-full border border-camel/50 bg-camel px-3 py-2 text-black transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            RSVP
          </Link>
          <Link href="/timeline" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Timeline
          </Link>
          <Link href="/bridal-party" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Bridal Party
          </Link>
          <Link href="/" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Return
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-[1500px] py-20 md:py-32">
        <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-camel">Venue</p>
        <h1 className="mt-6 max-w-[18ch] font-serif text-[14vw] font-medium uppercase leading-[0.72] md:text-[7vw]">
          Vintage Yard Wedding Venue
        </h1>
        <p className="mt-8 font-sans text-[11px] uppercase tracking-[0.28em] text-white/48">
          Parys, 9585
        </p>
      </section>

      <section className="mx-auto max-w-[1500px] pb-28">
        <div className="overflow-hidden rounded-[0.75rem] bg-white/[0.07] p-1.5">
          <div className="overflow-hidden rounded-[0.55rem]">
            <iframe
              src="https://maps.google.com/maps?q=Vintage+Yard+Wedding+Venue+Parys+9585+South+Africa&output=embed&z=15"
              width="100%"
              height="520"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vintage Yard Wedding Venue"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-serif text-3xl leading-none text-white/88 md:text-4xl">Vintage Yard Wedding Venue</p>
            <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.32em] text-white/42">Parys · 9585 · South Africa</p>
          </div>
          <a
            href="https://maps.google.com/?q=Vintage+Yard+Wedding+Venue+Parys+9585"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-camel/50 bg-camel px-5 py-2.5 font-sans text-[10px] uppercase tracking-[0.28em] text-black transition-transform duration-700 ease-silk hover:-translate-y-0.5"
          >
            Open in Google Maps
          </a>
        </div>
      </section>
    </main>
  );
}
