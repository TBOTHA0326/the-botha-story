import Link from "next/link";

const bankingDetails = [
  ["Bank", "Capitec"],
  ["Account holder", "Tiaan & Hannah"],
  ["Account number", "1234567890"],
  ["Branch code", "470010"],
  ["Reference", "Your name and surname"]
];

export const metadata = {
  title: "Honeymoon Fund | Tiaan & Hannah"
};

export default function HoneymoonFundPage() {
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
        </nav>
      </header>

      <section className="mx-auto grid max-w-[1500px] gap-12 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-32">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-camel">Honeymoon Fund</p>
          <h1 className="mt-6 max-w-[10ch] font-serif text-[20vw] font-medium uppercase leading-[0.72] md:text-[9vw]">
            Banking details.
          </h1>
        </div>

        <div className="self-end rounded-[0.8rem] bg-white/[0.07] p-1.5">
          <div className="rounded-[0.6rem] bg-black p-6 shadow-[inset_0_1px_18px_rgba(255,255,255,0.06)] md:p-8">
            <p className="max-w-[36rem] font-serif text-4xl leading-[1.02] text-white/88 md:text-6xl">
              Your presence is the gift. For anyone who would still like to contribute, these are the placeholder banking details.
            </p>

            <dl className="mt-12 grid gap-0 border-t border-white/14">
              {bankingDetails.map(([label, value]) => (
                <div key={label} className="grid gap-2 border-b border-white/14 py-5 md:grid-cols-[12rem_1fr] md:gap-8">
                  <dt className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/42">{label}</dt>
                  <dd className="font-serif text-3xl leading-none text-camel md:text-5xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
