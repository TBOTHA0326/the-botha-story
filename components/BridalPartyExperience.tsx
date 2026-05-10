"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type Member = {
  name: string;
  role: string;
  image: string;
  objectPosition?: string;
};

export default function BridalPartyExperience({ members }: { members: Member[] }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.82,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      gsap.set(".party-card", { opacity: 1, y: 0, scale: 1 });
      gsap.set(".party-card:not(.party-card--top)", { opacity: 0, y: 42, scale: 0.985 });

      ScrollTrigger.batch(".party-card:not(.party-card--top)", {
        interval: 0.12,
        batchMax: 2,
        start: "top 84%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            stagger: 0.07,
            overwrite: true,
            ease: "power2.out"
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            opacity: 0.45,
            y: 26,
            scale: 0.99,
            duration: 0.35,
            overwrite: true,
            ease: "power2.out"
          })
      });
    }, rootRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main ref={rootRef} className="min-h-[100dvh] bg-ink px-4 py-7 text-white md:px-10">
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
          <Link href="/honeymoon-fund" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Fund
          </Link>
          <Link href="/venue" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Venue
          </Link>
          <Link href="/" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Return
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-[1500px] py-20 md:py-32">
        <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-camel">Bridal Party</p>
        <h1 className="mt-6 max-w-[72rem] font-serif text-[20vw] font-medium uppercase leading-[0.72] md:text-[10vw]">
          The people standing closest.
        </h1>
      </section>

      <section className="party-grid mx-auto grid max-w-[1300px] grid-cols-1 gap-6 pb-28 md:grid-cols-2 md:gap-9">
        {members.map((member, index) => (
          <article
            key={`${member.role}-${member.image}`}
            className={`party-card ${index < 2 ? "party-card--top" : ""} rounded-[0.75rem] bg-white/[0.07] p-1.5 ${
              index % 2 === 1 ? "md:translate-y-24" : ""
            }`}
          >
            <div className="overflow-hidden rounded-[0.55rem] bg-white/5">
              <div className="relative aspect-[4/5]">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  sizes="(min-width: 768px) 48vw, 100vw"
                  className={`object-cover ${member.objectPosition ? `object-${member.objectPosition}` : "object-center"}`}
                  priority={index < 2}
                  loading={index < 2 ? undefined : "lazy"}
                  quality={72}
                />
              </div>
              <div className="flex items-end justify-between px-5 py-5">
                <div>
                  <h2 className="font-serif text-4xl leading-none md:text-5xl">{member.name}</h2>
                  <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.32em] text-white/48">{member.role}</p>
                </div>
                <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-camel">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
