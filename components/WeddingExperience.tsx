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
      gsap.set(".ring-layer", { opacity: 1 });
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
        .to(".ring-layer", { opacity: 0, scale: 0.82, ease: "power2.inOut" }, 0.05)
        .to(".pin-surface", { backgroundColor: "#F7F3EF", color: "#000000", ease: "power2.inOut" }, 0.18)
        .to(".minimal-letter", { opacity: 1, scale: 1, ease: "power2.inOut" }, 0.24)
        .to(".minimal-letter", { opacity: 0.74, scale: 1.045, ease: "power2.inOut" }, 0.38)
        .to(".minimal-letter", { opacity: 1, scale: 1, ease: "power2.inOut" }, 0.5)
        .to(".pin-surface", { backgroundColor: "#000000", color: "#ffffff", ease: "power2.inOut" }, 0.62)
        .to(".minimal-letter", { opacity: 0, scale: 1.18, ease: "power2.inOut", pointerEvents: "none" }, 0.61)
        .to(".ring-layer", { opacity: 1, scale: 1, ease: "power2.inOut" }, 0.68)
        .to(".reentry-copy", { opacity: 1, y: 0, ease: "power2.inOut" }, 0.72);

      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const engagementTrack = document.querySelector<HTMLElement>(".engagement-track");
      const engagementStage = document.querySelector<HTMLElement>(".engagement-horizontal");

      if (isDesktop && engagementTrack && engagementStage) {
        const getDistance = () => Math.max(0, engagementTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.08);
        const getScrollLength = () => Math.max(1800, getDistance() * 1.15);

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

      if (!isDesktop) {
        gsap.set(".engagement-card", { opacity: 0, y: 42, scale: 0.985 });

        ScrollTrigger.batch(".engagement-card", {
          interval: 0.12,
          batchMax: 2,
          start: "top 88%",
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.06,
              overwrite: true,
              ease: "power2.out"
            })
        });
      }

      gsap.set(".pillar-card", { opacity: 0, y: 58, scale: 0.975 });

      ScrollTrigger.batch(".pillar-card", {
        interval: 0.14,
        batchMax: 3,
        start: "top 86%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            overwrite: true,
            ease: "power2.out"
          })
      });

      gsap.to(".pillar-word-back", {
        yPercent: -24,
        ease: "none",
        scrollTrigger: {
          trigger: ".pillar-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".pillar-word-front", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".pillar-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".helix-track", {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: ".pillar-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.from(".split-content", {
        xPercent: 16,
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".split-section",
          start: "top 70%",
          end: "bottom 50%",
          scrub: true
        }
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
      <section className="container relative min-h-[100dvh] w-full !max-w-none overflow-hidden">
        <div className="pin-surface relative min-h-[100dvh] overflow-hidden bg-ink text-white">
          <div className="ring-layer pointer-events-none absolute inset-0">
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
                <span className="block translate-x-[12vw] text-camel md:translate-x-[22vw]">&amp;</span>
                <span className="block translate-x-[2vw]">HANNAH</span>
              </h1>
            </div>
          </div>

          <div className="minimal-letter pointer-events-none absolute inset-0 z-20 grid place-items-center font-serif text-[30vw] font-medium leading-none text-black md:text-[18vw]">
            H&amp;T
          </div>

          <div className="reentry-copy absolute bottom-8 left-5 z-20 max-w-[32rem] md:bottom-14 md:left-[10vw]">
            <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-camel">Tiaan & Hannah</p>
            <p className="mt-4 font-serif text-4xl leading-none md:text-7xl">The promise returns in gold and shadow.</p>
          </div>
        </div>
      </section>

      <section className="engagement-horizontal relative min-h-[100dvh] overflow-hidden bg-ink py-20 text-white md:py-0">
        <div className="engagement-behind pointer-events-none absolute left-[-4vw] top-[13dvh] z-0 whitespace-nowrap font-serif text-[30vw] uppercase leading-none text-white/[0.055] md:text-[15vw]">
          First light / First frame / Tiaan & Hannah /
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent md:w-44" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent md:w-44" />

        <div className="relative z-20 flex min-h-[100dvh] items-center">
          <div className="engagement-track grid w-full gap-5 px-4 md:flex md:w-max md:items-center md:gap-10 md:px-[8vw] md:will-change-transform">
            <article className="w-full md:w-[38vw] md:shrink-0">
              <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-camel">Engagement</p>
              <h2 className="mt-5 font-serif text-6xl leading-[0.88] md:text-[8rem]">
                First light, first frame.
              </h2>
              <p className="mt-7 max-w-[31rem] font-sans text-sm leading-7 text-white/58">
                A sideways chapter through the first images of the story. The photographs move across the frame while the words sit behind them like credits.
              </p>
            </article>

            {engagementImages.map((src, index) => (
              <figure
                key={src}
                className={`engagement-card relative z-20 w-full overflow-hidden rounded-[0.7rem] bg-white/6 p-1.5 md:w-[28vw] md:shrink-0 ${
                  index % 3 === 1 ? "md:translate-y-[-9dvh]" : index % 3 === 2 ? "md:translate-y-[8dvh]" : ""
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[0.52rem]">
                  <Image
                    src={src}
                    alt={`Tiaan and Hannah engagement photograph ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 28vw, 100vw"
                    className="object-cover"
                    priority={index < 2}
                    loading={index < 2 ? undefined : "lazy"}
                    quality={70}
                  />
                </div>
              </figure>
            ))}

            <article className="grid w-full gap-6 pb-10 md:w-[32vw] md:shrink-0 md:pb-0">
              <p className="font-serif text-5xl leading-[0.95] text-white/90 md:text-7xl">
                The gallery keeps moving, but the promise stays still.
              </p>
              <Link
                href="/rsvp"
                className="group inline-flex w-max items-center gap-4 rounded-full bg-camel px-2 py-2 pl-6 font-sans text-[11px] uppercase tracking-[0.25em] text-black transition-transform duration-700 ease-silk active:scale-[0.98]"
              >
                RSVP
                <span className="grid size-10 place-items-center rounded-full bg-black text-camel transition-transform duration-700 ease-silk group-hover:translate-x-1">
                  H
                </span>
              </Link>
            </article>
          </div>
        </div>
      </section>
      <section className="split-section grid min-h-[100dvh] bg-bone text-black md:grid-cols-[0.38fr_0.62fr]">
        <div className="flex items-center justify-center border-b border-black/10 p-8 md:border-b-0 md:border-r">
          <p className="vertical-writing hidden font-sans text-[11px] uppercase tracking-[0.42em] text-black/70 md:block">
            You are invited / You are invited / You are invited ·
          </p>
          <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-black/70 md:hidden">
            You are invited / You are invited ·
          </p>
        </div>
        <div className="split-content grid content-center gap-6 px-4 py-16 md:grid-cols-3 md:px-14">
          <div className="md:col-span-2">
            <h2 className="font-serif text-6xl leading-[0.88] md:text-[8rem]">A day shaped by every person they love.</h2>
          </div>
          <div className="grid gap-4">
            {splitImages.map((src, index) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-[0.55rem] bg-black/10 p-1">
                <Image
                  src={src}
                  alt={`Tiaan and Hannah invitation detail ${index + 1}`}
                  fill
                  sizes="(min-width: 768px) 22vw, 100vw"
                  className="rounded-[0.4rem] object-cover"
                  quality={72}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rose-section relative grid min-h-[110dvh] place-items-center overflow-hidden bg-ink px-4 py-24 text-white">
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

      <section className="pillar-section relative overflow-hidden bg-bone px-4 py-24 text-black md:px-10 md:py-36">
        <div className="pillar-word-back pointer-events-none absolute left-[-5vw] top-[8rem] font-serif text-[28vw] uppercase leading-[0.74] text-black/[0.045] md:text-[13vw]">
          After / The / Vows
        </div>
        <div className="pillar-word-back pointer-events-none absolute bottom-[24rem] right-[-6vw] hidden max-w-[7ch] text-right font-serif text-[10vw] uppercase leading-[0.78] text-camel/20 md:block">
          Still turning
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1500px] gap-14 md:grid-cols-[0.72fr_1.28fr]">
          <aside className="md:sticky md:top-10 md:h-[calc(100dvh-5rem)] md:self-start md:pt-8">
            <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-camel">After the first chapter</p>
            <h2 className="mt-5 max-w-[9ch] font-serif text-6xl leading-[0.88] md:text-[8.4rem]">
              The story keeps turning.
            </h2>
            <p className="mt-8 max-w-[28rem] font-sans text-sm leading-7 text-black/58">
              A slow vertical helix of photographs: not a carousel, not a grid, just frames drifting down the page like a physical column.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
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
                    H
                  </span>
                </Link>
              ))}
            </div>
          </aside>

          <div className="helix-track relative grid gap-10 md:min-h-[2850px] md:block">
            <div className="pillar-word-front pointer-events-none font-serif text-[18vw] uppercase leading-[0.75] text-camel/55 md:absolute md:left-[8%] md:top-[410px] md:z-20 md:max-w-[7ch] md:text-[7vw]">
              Hold this
            </div>
            <div className="pillar-word-front pointer-events-none text-right font-serif text-[17vw] uppercase leading-[0.76] text-black/32 md:absolute md:right-[4%] md:top-[1420px] md:z-20 md:max-w-[8ch] md:text-[6vw]">
              Keep moving
            </div>
            <div className="pillar-word-front pointer-events-none hidden font-sans text-[10px] uppercase tracking-[0.5em] text-black/45 md:absolute md:left-[22%] md:top-[1000px] md:z-20 md:block">
              soft frames / still motion
            </div>
            <div className="pillar-word-front pointer-events-none hidden max-w-[9ch] font-serif text-[5.2vw] uppercase leading-[0.8] text-camel/35 md:absolute md:right-[14%] md:top-[2180px] md:z-20 md:block">
              The night after
            </div>

            {otherImages.slice(0, 16).map((src, index) => {
              const offsets = [-22, 18, -8, 26, -18, 8, -28, 22];
              const widths = [42, 34, 48, 38, 30, 44, 36, 50];
              const rotations = [-4, 3, -1.5, 5, -3, 2, -5, 1.5];
              const top = 80 + index * 165;
              const offset = offsets[index % offsets.length];
              const width = widths[index % widths.length];
              const rotate = rotations[index % rotations.length];
              const depth = index % 4 === 0 ? "md:z-30" : index % 4 === 1 ? "md:z-10" : "md:z-20";

              return (
                <figure
                  key={src}
                  className={`pillar-card relative z-10 w-full overflow-hidden rounded-[0.7rem] bg-black/5 p-1.5 shadow-[0_30px_70px_-52px_rgba(0,0,0,0.55)] md:absolute ${depth}`}
                  style={{
                    top: `${top}px`,
                    left: `calc(50% + ${offset}%)`,
                    width: `${width}%`,
                    transform: `translateX(-50%) rotate(${rotate}deg)`
                  }}
                >
                  <div className={`relative overflow-hidden rounded-[0.52rem] ${index % 3 === 0 ? "aspect-[5/7]" : index % 3 === 1 ? "aspect-[4/5]" : "aspect-[5/6]"}`}>
                    <Image
                      src={src}
                      alt={`Tiaan and Hannah wedding story photograph ${index + 1}`}
                      fill
                      sizes="(min-width: 768px) 42vw, 100vw"
                      className="object-cover"
                      quality={66}
                    />
                  </div>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
