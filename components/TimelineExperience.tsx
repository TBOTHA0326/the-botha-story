"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type TimelineItem = {
  time: string;
  title: string;
  detail: string;
};

export default function TimelineExperience({ timeline }: { timeline: TimelineItem[] }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      duration: reduceMotion ? 0.25 : 0.82,
      smoothWheel: !reduceMotion,
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
      gsap.fromTo(
        ".timeline-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-list",
            start: "top 72%",
            end: "bottom 58%",
            scrub: true
          }
        }
      );

      gsap.utils.toArray<HTMLElement>(".timeline-event").forEach((event) => {
        gsap.fromTo(
          event,
          { opacity: 0, y: 62, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: event,
              start: "top 78%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".timeline-time").forEach((time) => {
        gsap.fromTo(
          time,
          { opacity: 0, scale: 0.72, rotate: -3 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.65,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: time,
              start: "top 72%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, rootRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main ref={rootRef} className="min-h-[100dvh] overflow-hidden bg-ink px-4 py-7 text-white md:px-10">
      <header className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 font-sans text-[10px] uppercase tracking-[0.28em] text-white/78">
        <Link href="/" className="transition-opacity duration-700 ease-silk hover:opacity-60">
          Tiaan & Hannah
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2">
          <Link href="/rsvp" className="rounded-full border border-camel/60 bg-camel px-3 py-2 text-black transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            RSVP
          </Link>
          <Link href="/bridal-party" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Bridal Party
          </Link>
          <Link href="/honeymoon-fund" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Fund
          </Link>
          <Link href="/venue" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 transition-transform duration-700 ease-silk hover:-translate-y-0.5">
            Venue
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-[1500px] py-20 md:py-32">
        <div className="mx-auto max-w-[54rem] text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-camel">Wedding Timeline</p>
          <h1 className="mt-6 font-serif text-[18vw] font-medium uppercase leading-[0.72] md:text-[8.6rem]">
            The day, slowly.
          </h1>
          <p className="mx-auto mt-8 max-w-[31rem] font-sans text-sm leading-7 text-white/56">
            Every moment, in order.
          </p>
        </div>

        <div className="timeline-list relative mx-auto mt-20 max-w-[1120px] pb-24 md:mt-28">
          <div className="absolute left-4 top-0 h-full w-px bg-white/16 md:left-1/2 md:-translate-x-1/2" />
          <div className="timeline-line-fill absolute left-4 top-0 h-full w-px origin-top bg-camel md:left-1/2 md:-translate-x-1/2" />

          <div className="grid gap-16 md:gap-20">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <article
                  key={item.time}
                  className="timeline-event relative min-h-[11rem] pl-12 md:grid md:min-h-[15rem] md:grid-cols-[1fr_9rem_1fr] md:items-start md:gap-8 md:pl-0"
                >
                  <div className="timeline-time absolute left-4 top-0 z-10 grid size-20 -translate-x-1/2 place-items-center rounded-full border border-camel/30 bg-camel text-black shadow-[0_20px_60px_-34px_rgba(199,160,106,0.75)] md:left-1/2 md:top-0 md:-translate-x-1/2">
                    <span className="font-serif text-3xl leading-none">{item.time}</span>
                  </div>

                  <div
                    className={`pt-1 md:pt-0 ${
                      isLeft
                        ? "md:col-start-1 md:row-start-1 md:pr-5 md:text-right"
                        : "md:col-start-3 md:row-start-1 md:pl-5 md:text-left"
                    }`}
                  >
                    <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/38">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </p>
                    <h2 className="mt-3 font-serif text-5xl leading-none md:text-6xl">{item.title}</h2>
                    <p className={`mt-4 max-w-[32rem] font-sans text-sm leading-7 text-white/56 ${isLeft ? "md:ml-auto" : ""}`}>
                      {item.detail}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
