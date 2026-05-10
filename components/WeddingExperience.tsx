"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const RingScene = dynamic(() => import("@/components/RingScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />
});

type WeddingExperienceProps = {
  engagementImages: string[];
  otherImages: string[];
};

export default function WeddingExperience({ engagementImages, otherImages }: WeddingExperienceProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      duration: reduceMotion ? 0.25 : 0.82,
      smoothWheel: !reduceMotion,
      syncTouch: false,
      touchMultiplier: 0.8,
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
      gsap.set(".minimal-letter", { opacity: 0, scale: 0.86 });
      gsap.set(".ring-layer", { opacity: 1, scale: 1, x: 0, y: 0 });
      gsap.set(".reentry-copy", { opacity: 0, y: 42 });
      gsap.set(".other-card", { opacity: 0, y: 46, scale: 0.985 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".container",
          start: "top top",
          end: "+=5000",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const zoom = self.progress > 0.58 ? Math.min(1, (self.progress - 0.58) * 2.4) : 0;
            window.dispatchEvent(new CustomEvent("ring-zoom", { detail: zoom }));
          }
        }
      });

      tl.to(".hero-title", { scale: 0.08, yPercent: -70, opacity: 0, ease: "power2.inOut" }, 0)
        .to(".hero-kicker", { y: -70, opacity: 0, ease: "power2.inOut" }, 0)
        .to(".ring-layer", { opacity: 0, ease: "power2.inOut" }, 0.05)
        .to(".pin-surface", { backgroundColor: "#F7F3EF", color: "#000000", ease: "power2.inOut" }, 0.18)
        .to(".minimal-letter", { opacity: 1, scale: 1, ease: "power2.inOut" }, 0.24)
        .to(".minimal-letter", { opacity: 0.74, scale: 1.045, ease: "power2.inOut" }, 0.38)
        .to(".minimal-letter", { opacity: 1, scale: 1, ease: "power2.inOut" }, 0.5)
        .to(".pin-surface", { backgroundColor: "#000000", color: "#ffffff", ease: "power2.inOut" }, 0.62)
        .to(".minimal-letter", { opacity: 0, scale: 1.18, ease: "power2.inOut", pointerEvents: "none" }, 0.61)
        .to(".ring-layer", { opacity: 1, ease: "power2.inOut" }, 0.68)
        .to(".reentry-copy", { opacity: 1, y: 0, ease: "power2.inOut" }, 0.72);

      const engagementTrack = document.querySelector<HTMLElement>(".engagement-track");
      const engagementStage = document.querySelector<HTMLElement>(".engagement-horizontal");

      if (engagementTrack && engagementStage) {
        const getDistance = () => Math.max(0, engagementTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.06);
        const getScrollLength = () => Math.max(1400, getDistance() * 1.2);

        gsap.to(engagementTrack, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: engagementStage,
            start: "top top",
            end: () => `+=${getScrollLength()}`,
            scrub: 0.55,
            pin: true,
            invalidateOnRefresh: true
          }
        });

        gsap.to(".engagement-behind", {
          xPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: engagementStage,
            start: "top top",
            end: () => `+=${getScrollLength()}`,
            scrub: 0.55
          }
        });
      }

      gsap.to(".pillar-word-back", {
        yPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: ".pillar-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.utils.toArray<HTMLElement>(".spiral-card").forEach((card) => {
        const isRight = card.classList.contains("spiral-card--right");
        gsap.fromTo(
          card,
          { opacity: 0, x: isRight ? 60 : -60, rotate: "var(--tilt)" },
          {
            opacity: 1,
            x: 0,
            rotate: "var(--tilt)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 55%",
              scrub: 1.1
            }
          }
        );
      });


      gsap.from(".spread-kicker", {
        opacity: 0,
        y: 22,
        ease: "power2.out",
        scrollTrigger: { trigger: ".split-section", start: "top 80%", end: "top 44%", scrub: 1 }
      });

      gsap.from(".spread-headline", {
        opacity: 0,
        y: 70,
        ease: "power2.out",
        scrollTrigger: { trigger: ".split-section", start: "top 75%", end: "top 28%", scrub: 1.3 }
      });

      gsap.from(".spread-meta", {
        opacity: 0,
        y: 32,
        ease: "power2.out",
        scrollTrigger: { trigger: ".split-section", start: "top 68%", end: "top 20%", scrub: 1.1 }
      });

      gsap.utils.toArray<HTMLElement>(".spread-photo").forEach((photo, i) => {
        gsap.from(photo, {
          opacity: 0,
          y: 56 + i * 18,
          rotate: i % 2 === 0 ? -1.5 : 1.5,
          scale: 0.93,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".split-section",
            start: `top ${78 - i * 6}%`,
            end: `top ${24 - i * 8}%`,
            scrub: 1.2 + i * 0.15
          }
        });
      });

      gsap.from(".rose-core", {
        scale: 0.72,
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".rose-section",
          start: "top 72%",
          end: "center 45%",
          scrub: true
        }
      });

      gsap.to(".circle-text", {
        rotate: 360,
        transformOrigin: "50% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: ".rose-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, rootRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const splitImages = engagementImages.slice(1, 4);

  return (
    <main ref={rootRef} className="bg-ink text-white">
      <section className="container relative min-h-[100dvh] w-full !max-w-none">
        <div className="pin-surface relative min-h-[100dvh] bg-ink text-white">
          <div className="ring-layer pointer-events-none fixed inset-0 z-[1]">
            <RingScene className="h-full w-full" />
          </div>
          <div className="absolute inset-x-0 top-5 z-20 flex items-start justify-between gap-4 px-4 text-[9px] uppercase tracking-[0.28em] text-white/70 md:top-7 md:px-10 md:text-[10px] md:tracking-[0.36em]">
            <Link href="/" className="transition-opacity duration-700 ease-silk hover:opacity-60">
              T & H
            </Link>
            <nav className="flex max-w-[72vw] flex-wrap items-center justify-end gap-1.5 md:max-w-none md:gap-3">
              <Link href="/rsvp" className="rounded-full border border-camel/50 bg-camel px-2.5 py-1.5 text-black transition-transform duration-700 ease-silk hover:-translate-y-0.5 md:px-3 md:py-2">
                RSVP
              </Link>
              <Link href="/timeline" className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 transition-transform duration-700 ease-silk hover:-translate-y-0.5 hover:bg-white/16 md:px-3 md:py-2">
                Timeline
              </Link>
              <Link href="/honeymoon-fund" className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 transition-transform duration-700 ease-silk hover:-translate-y-0.5 hover:bg-white/16 md:px-3 md:py-2">
                Fund
              </Link>
              <Link href="/venue" className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 transition-transform duration-700 ease-silk hover:-translate-y-0.5 hover:bg-white/16 md:px-3 md:py-2">
                Venue
              </Link>
              <Link href="/bridal-party" className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 transition-transform duration-700 ease-silk hover:-translate-y-0.5 hover:bg-white/16 md:px-3 md:py-2">
                Bridal Party
              </Link>
            </nav>
          </div>

          <div className="relative z-10 flex min-h-[100dvh] items-center px-4 py-24 md:px-10">
            <div className="w-full">
              <p className="hero-kicker mb-5 max-w-[34rem] font-sans text-[10px] uppercase tracking-[0.44em] text-camel/90 md:ml-[9vw]">
                A wedding story in motion
              </p>
              <h1 className="hero-title font-serif text-[23vw] font-medium uppercase leading-[0.68] tracking-normal text-white mix-blend-difference md:text-[15vw]">
                <span className="block translate-x-[-4vw]">TIAAN</span>
                <span className="block translate-x-[6vw] text-camel md:translate-x-[22vw]">&amp;</span>
                <span className="block translate-x-[2vw]">HANNAH</span>
              </h1>
            </div>
          </div>

          <div className="minimal-letter pointer-events-none absolute inset-0 z-20 grid place-items-center font-serif text-[30vw] font-medium leading-none text-black md:text-[18vw]">
            H&amp;T
          </div>

          <div className="reentry-copy absolute bottom-8 left-5 z-20 max-w-[32rem] md:bottom-14 md:left-[10vw]">
            <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-camel">Tiaan & Hannah</p>
            <p className="mt-4 font-serif text-4xl leading-none md:text-7xl">And the TWO shall become ONE.</p>
          </div>
        </div>
      </section>

      <section className="engagement-horizontal relative isolate z-[2] min-h-[100dvh] overflow-hidden bg-ink py-20 text-white md:py-0">
        <div className="engagement-behind pointer-events-none absolute left-[-4vw] top-[13dvh] z-0 whitespace-nowrap font-serif text-[30vw] uppercase leading-none text-white/[0.055] md:text-[15vw]">
          First light / First frame / Tiaan & Hannah /
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent md:w-44" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent md:w-44" />

        <div className="relative z-20 flex min-h-[100dvh] items-center">
          <div className="engagement-track flex w-max items-center gap-6 px-[6vw] will-change-transform md:gap-10 md:px-[8vw]">
            <article className="w-[78vw] shrink-0 md:w-[38vw]">
              <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-camel">Engagement</p>
              <h2 className="mt-5 font-serif text-5xl leading-[0.88] md:text-[8rem]">
                We decided on FOREVER.
              </h2>
              <p className="mt-6 max-w-[31rem] font-sans text-sm leading-7 text-white/58">
                The morning after the proposal. These photographs were taken before the world knew, in the hours when it was still just the two of us.
              </p>
            </article>

            {engagementImages.map((src, index) => (
              <figure
                key={src}
                className={`engagement-card relative z-20 w-[62vw] shrink-0 overflow-hidden rounded-[0.7rem] bg-white/6 p-1.5 md:w-[28vw] ${
                  index % 3 === 1 ? "md:translate-y-[-9dvh]" : index % 3 === 2 ? "md:translate-y-[8dvh]" : ""
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[0.52rem]">
                  <Image
                    src={src}
                    alt={`Tiaan and Hannah engagement photograph ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 28vw, 62vw"
                    className="object-cover"
                    priority={index < 2}
                    loading={index < 2 ? undefined : "lazy"}
                    quality={70}
                  />
                </div>
              </figure>
            ))}

            <article className="w-[72vw] shrink-0 md:w-[32vw]">
              <p className="font-serif text-4xl leading-[0.95] text-white/90 md:text-7xl">
                The gallery keeps moving, but the promise stays still.
              </p>
              <Link
                href="/rsvp"
                className="group mt-8 inline-flex w-max items-center gap-4 rounded-full bg-camel px-2 py-2 pl-6 font-sans text-[11px] uppercase tracking-[0.25em] text-black transition-transform duration-700 ease-silk active:scale-[0.98]"
              >
                RSVP
                <span className="grid size-10 place-items-center rounded-full bg-black text-camel transition-transform duration-700 ease-silk group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          </div>
        </div>
      </section>
      <section className="split-section relative isolate z-[2] min-h-[100dvh] overflow-hidden bg-bone px-4 py-20 text-black md:px-14 md:py-28">

        {/* Ghost watermark behind everything */}
        <p className="pointer-events-none absolute right-[-2vw] top-[6rem] hidden font-serif text-[18vw] uppercase leading-none text-black/[0.04] md:block">
          Invited
        </p>

        {/* Top bar */}
        <div className="spread-kicker relative z-10 mb-16 flex items-center justify-between border-b border-black/12 pb-5 md:mb-20">
          <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-camel">You are invited</p>
          <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-black/38">6 December 2026</p>
        </div>

        {/* Main editorial grid */}
        <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-16">

          {/* Left — headline + meta */}
          <div className="flex flex-col justify-between gap-12">
            <h2 className="spread-headline font-serif text-[15vw] font-medium leading-[0.84] md:text-[8.8rem]">
              A day shaped<br />by every<br />person<br />we love.
            </h2>

            <div className="spread-meta grid gap-6 md:grid-cols-2 md:gap-10">
              {[
                ["Date", "6 December 2026"],
                ["Time", "15:00 For 15:30"],
                ["Dress code", "All Black - Formal"],
                ["Location", "Vintage Yard | Wedding Venue"],
                ["RSVP by", "1 October 2026"]
              ].map(([label, value]) => (
                <div key={label} className="border-t border-black/14 pt-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-black/38">{label}</p>
                  <p className="mt-2 font-serif text-2xl leading-tight text-black/80">{value}</p>
                </div>
              ))}
              <div className="md:col-span-2">
                <Link
                  href="/rsvp"
                  className="group inline-flex w-max items-center gap-4 rounded-full bg-black px-2 py-2 pl-6 font-sans text-[11px] uppercase tracking-[0.25em] text-white transition-transform duration-700 ease-silk active:scale-[0.98]"
                >
                  Confirm attendance
                  <span className="grid size-9 place-items-center rounded-full bg-camel text-black transition-transform duration-700 ease-silk group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right — staggered photo column */}
          <div className="flex flex-col gap-4 md:w-[28vw] md:gap-6">
            {splitImages.map((src, index) => (
              <div
                key={src}
                className={`spread-photo relative overflow-hidden rounded-[0.6rem] bg-black/8 p-1.5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.22)] ${
                  index === 1 ? "md:translate-x-8" : index === 2 ? "md:-translate-x-4" : ""
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[0.45rem]">
                  <Image
                    src={src}
                    alt={`Tiaan and Hannah photograph ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 28vw, 100vw"
                    className="object-cover"
                    quality={72}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rose-section relative isolate z-[2] grid min-h-[110dvh] place-items-center overflow-hidden bg-ink px-4 py-24 text-white">
        <div className="relative grid aspect-square min-w-0 place-items-center [width:min(78vw,650px)]">
          <svg className="circle-text absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 500 500" aria-hidden="true">
            <defs>
              <path id="love-circle" d="M250,250 m-190,0 a190,190 0 1,1 380,0 a190,190 0 1,1 -380,0" />
            </defs>
            <text className="fill-camel font-sans text-[17px] uppercase tracking-[0.32em]">
              <textPath href="#love-circle">Love Story / Love Story / Love Story / Love Story ·</textPath>
            </text>
          </svg>
          <div className="rose-core relative aspect-square w-[46%] rounded-full bg-camel/10 p-2">
            <div className="grid h-full w-full place-items-center rounded-full bg-camel/10 shadow-[inset_0_1px_20px_rgba(199,160,106,0.18)]">
              <div className="relative aspect-square w-[72%] animate-[pulse_3.6s_cubic-bezier(0.32,0.72,0,1)_infinite]">
                <span className="absolute inset-[8%] rounded-[68%_32%_58%_42%] border border-camel/80" />
                <span className="absolute inset-[18%] rotate-45 rounded-[42%_58%_36%_64%] border border-camel/80" />
                <span className="absolute inset-[30%] -rotate-12 rounded-[58%_42%_62%_38%] bg-camel" />
              </div>
            </div>
          </div>
          <p className="absolute bottom-[4%] max-w-[19rem] text-center font-sans text-[10px] uppercase tracking-[0.35em] text-white/55">
            Tiaan & Hannah / love story
          </p>
        </div>
      </section>

      <section className="pillar-section relative isolate z-[2] overflow-hidden bg-bone px-4 py-24 text-black md:px-10 md:py-36">
        <div className="pillar-word-back pointer-events-none absolute left-[-5vw] top-[8rem] font-serif text-[28vw] uppercase leading-[0.74] text-black/[0.045] md:text-[13vw]">
          Before / The / Day
        </div>
        <div className="pillar-word-back pointer-events-none absolute bottom-[24rem] right-[-6vw] hidden max-w-[7ch] text-right font-serif text-[10vw] uppercase leading-[0.78] text-camel/20 md:block">
          Still turning
        </div>

        <div className="relative z-10 mx-auto max-w-[1500px]">
          <aside className="mb-4 pb-4 md:mb-2 md:pt-8">
            <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-camel">Before the day</p>
            <h2 className="mt-4 max-w-[9ch] font-serif text-5xl leading-[0.88] md:mt-5 md:text-[8.4rem]">
              The story keeps turning.
            </h2>
            <p className="mt-5 max-w-[28rem] font-sans text-sm leading-7 text-black/58 md:mt-8">
              Years of ordinary moments that made the extraordinary ones possible. These are the frames from before the wedding day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
              {[
                ["RSVP", "/rsvp"],
                ["Timeline", "/timeline"],
                ["Honeymoon Fund", "/honeymoon-fund"],
                ["Bridal Party", "/bridal-party"]
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="group inline-flex w-max items-center gap-4 rounded-full bg-black px-2 py-2 pl-6 font-sans text-[11px] uppercase tracking-[0.2em] text-white transition-transform duration-700 ease-silk active:scale-[0.98]"
                >
                  {label}
                  <span className="grid size-10 place-items-center rounded-full bg-camel text-black transition-transform duration-700 ease-silk group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </aside>

          {/* Polaroid staircase spiral */}
          <div className="spiral-stack">
            {otherImages.map((src, index) => {
              const isRight = index % 2 === 1;
              const tilts = [-2.5, 2, -1.5, 3, -2, 1.5, -3, 2.5, -1, 2];
              const tilt = isRight
                ? Math.abs(tilts[index % tilts.length])
                : -Math.abs(tilts[index % tilts.length]);
              return (
                <figure
                  key={src}
                  className={`spiral-card ${isRight ? "spiral-card--right" : "spiral-card--left"}`}
                  style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
                >
                  <div className="spiral-photo">
                    <Image
                      src={src}
                      alt={`Tiaan and Hannah photograph ${index + 1}`}
                      fill
                      sizes="(min-width: 768px) 380px, 72vw"
                      className="object-cover"
                      quality={70}
                    />
                  </div>
                  <div className="spiral-caption">T &amp; H</div>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
