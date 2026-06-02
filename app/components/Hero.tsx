"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiArrowRightLine } from "@remixicon/react";

gsap.registerPlugin(useGSAP);

const CHARS = "JARWIX".split("");

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const asteriskRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        gsap.set(
          [charsRef.current, taglineRef.current, descRef.current, ctaRef.current],
          { opacity: 1, y: 0 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        charsRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.06 },
        0.3
      )
        .fromTo(
          asteriskRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
          0.9
        )
        .fromTo(
          taglineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="h-screen p-3 md:p-4">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
            type="video/mp4"
          />
        </video>

        {/* Noise Overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.65] mix-blend-overlay pointer-events-none" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/75" />

        {/* Hero Content — Bottom Aligned */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-7 md:p-10">
          <div className="grid grid-cols-12 gap-4 items-end">
            {/* Left: Giant Heading */}
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="flex items-end uppercase leading-[0.85] tracking-[-0.05em]"
                style={{
                  fontFamily: '"Hanson Bold", serif',
                  fontSize: "clamp(3rem, 11.5vw, 13vw)",
                  color: "#FFF5F0",
                }}
              >
                {CHARS.map((char, i) => (
                  <span
                    key={i}
                    ref={(el) => { charsRef.current[i] = el; }}
                    className="inline-block"
                    style={{ opacity: 0 }}
                  >
                    {char}
                  </span>
                ))}
                <span
                  ref={asteriskRef}
                  className="inline-block self-start ml-[0.1em] leading-none"
                  style={{
                    color: "#FF5A1F",
                    opacity: 0,
                    fontSize: "0.28em",
                    marginTop: "0.2em",
                  }}
                >
                  *
                </span>
              </h1>
            </div>

            {/* Right: Tagline + Description + CTA */}
            <div className="col-span-12 lg:col-span-4 pb-1 lg:pb-2 space-y-4 relative z-20">
              <p
                ref={taglineRef}
                className="uppercase tracking-[0.18em] text-[10px] sm:text-xs font-semibold"
                style={{ color: "#FF5A1F", opacity: 0 }}
              >
                Elevate With AI.
              </p>

              <p
                ref={descRef}
                className="text-xs sm:text-sm leading-[1.6]"
                style={{ color: "rgba(255,245,240,0.75)", opacity: 0 }}
              >
                AI-powered growth agency helping ambitious businesses worldwide
                dominate online — through marketing, automation, and web
                systems built for results.
              </p>

              <a
                ref={ctaRef}
                href="#audit"
                className="group inline-flex items-center gap-2 rounded-full pl-5 pr-1.5 py-1.5 transition-all duration-300 hover:gap-3"
                style={{
                  background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
                  border: "1px solid rgba(255,90,31,0.4)",
                  opacity: 0,
                }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#FFF5F0" }}
                >
                  Get Free Audit
                </span>
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(255,245,240,0.1)" }}
                >
                  <RiArrowRightLine size={16} style={{ color: "#FFF5F0" }} />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-10">
          <div
            className="w-px h-12 origin-top"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,90,31,0.6), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
