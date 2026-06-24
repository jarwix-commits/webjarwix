"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { RiArrowRightLine, RiCheckLine } from "@remixicon/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: 3, suffix: "+", label: "Years delivering growth" },
  { value: 100, suffix: "+", label: "Clients worldwide" },
  { value: 3, suffix: "", label: "Markets: US · UK · India" },
];

const values = [
  {
    number: "01",
    title: "Results first",
    body: "Every decision we make is tied to a measurable outcome. Vanity metrics stay out of our reports.",
  },
  {
    number: "02",
    title: "Radical transparency",
    body: "You'll always know exactly what we're doing, why we're doing it, and how it's performing.",
  },
  {
    number: "03",
    title: "Built to scale",
    body: "We build systems, not campaigns. Everything we create is designed to compound over time.",
  },
  {
    number: "04",
    title: "AI-native thinking",
    body: "We use AI not as a buzzword but as a real lever — across strategy, execution, and automation.",
  },
];

const milestones = [
  { year: "2021", event: "Founded in India with a focus on performance marketing for D2C brands." },
  { year: "2022", event: "Expanded into Web & SEO, launching our first international clients in the UK." },
  { year: "2023", event: "Launched our Automation & AI division. Crossed 50+ active clients." },
  { year: "2024", event: "Opened operations in the US market. Surpassed 100 clients served globally." },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const isLoaderActive = document.querySelector(".ldr-tagline") !== null;
      const initialDelay = isLoaderActive ? 2.6 : 0.1;

      // Hero timeline
      const tl = gsap.timeline({ delay: initialDelay });

      tl.fromTo(
        ".ab-hero-label",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );

      // Character split animation for the main heading
      tl.fromTo(
        ".ab-split-char",
        { y: 100, opacity: 0, rotateZ: 10, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.03,
          ease: "power4.out"
        },
        "-=0.5"
      );

      tl.fromTo(
        ".ab-hero-sub",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.8"
      );

      // Stats counters
      stats.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 82%",
          once: true,
          onEnter: () => {
            const counter = { val: 0 };
            gsap.to(counter, {
              val: stat.value,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => { el.textContent = `${Math.round(counter.val)}${stat.suffix}`; },
            });
          },
        });
      });

      // Scroll reveals
      const reveals = [
        { sel: ".ab-stat-card", trigger: ".ab-stats", stagger: 0.1 },
        { sel: ".ab-value-card", trigger: ".ab-values", stagger: 0.1 },
        { sel: ".ab-milestone", trigger: ".ab-timeline", stagger: 0.08 },
        { sel: ".ab-img", trigger: ".ab-gallery", stagger: 0.12 },
      ];
      reveals.forEach(({ sel, trigger, stagger }) => {
        gsap.fromTo(sel, { y: 32, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger,
          scrollTrigger: { trigger, start: "top 82%" },
        });
      });

      gsap.fromTo(".ab-story-text", { opacity: 0, x: -24 }, {
        opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".ab-story", start: "top 80%" },
      });
      gsap.fromTo(".ab-story-img", { opacity: 0, x: 24, scale: 1.04 }, {
        opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".ab-story", start: "top 80%" },
      });
    },
    { scope: pageRef }
  );

  const splitChars = (text: string, highlightWord?: string) => {
    return text.split("").map((char, i) => {
      // Check if this character is part of the highlighted word "Jarwix."
      const isJ = highlightWord && char === "J" && text.includes("Jarwix.");
      
      return (
        <span
          key={i}
          className="ab-split-char inline-block"
          style={{ 
            whiteSpace: char === " " ? "pre" : "normal",
            color: isJ ? "#FF5A1F" : "inherit"
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div ref={pageRef} className="bg-black min-h-screen">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col justify-end px-4 sm:px-8 md:px-12 pb-16 sm:pb-24 pt-36 sm:pt-44 overflow-hidden">
        {/* Abstract Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}>
          <Image
            src="/generated_image/about_abstract_hero_bg.png"
            alt="Abstract Background"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse 70% 55% at 30% 50%, rgba(255,90,31,0.08) 0%, transparent 70%)" }}
        />
        <div className="bg-noise absolute inset-0 opacity-[0.07] pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <p
            className="ab-hero-label text-[10px] tracking-[0.22em] uppercase font-semibold mb-5"
            style={{ color: "#FF5A1F", opacity: 0 }}
          >
            Who we are
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] mb-8 max-w-4xl"
            style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
          >
            <div className="overflow-hidden pb-2 -mb-2">{splitChars("We are")}</div>
            <div className="overflow-hidden pb-2 -mb-2">{splitChars("Jarwix.", "Jarwix.")}</div>
          </h1>
          <p
            className="ab-hero-sub text-sm sm:text-base leading-relaxed max-w-xl"
            style={{ color: "rgba(255,245,240,0.52)", opacity: 0 }}
          >
            An AI-powered growth agency helping ambitious businesses across the US, UK, and India scale online — without the complexity, without the fluff.
          </p>
        </div>

        {/* Decorative large text */}
        <span
          className="absolute bottom-0 right-0 select-none pointer-events-none hidden lg:block"
          style={{
            fontFamily: '"Hanson Bold", serif',
            fontSize: "22vw",
            lineHeight: 0.8,
            color: "rgba(255,90,31,0.03)",
          }}
        >
          J
        </span>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 border-t" style={{ borderColor: "rgba(255,245,240,0.06)" }}>
        <div className="ab-stats max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="ab-stat-card rounded-2xl p-7 sm:p-8"
              style={{ background: "#111", border: "1px solid rgba(255,90,31,0.10)", opacity: 0 }}
            >
              <p
                className="text-5xl sm:text-6xl font-bold leading-none mb-2"
                style={{
                  fontFamily: '"Hanson Bold", serif',
                  background: "linear-gradient(120deg, #FFF5F0, #FF5A1F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <span ref={(el) => { counterRefs.current[i] = el; }}>0{stat.suffix}</span>
              </p>
              <p className="text-sm" style={{ color: "rgba(255,245,240,0.48)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Story ───────────────────────────────────────────────────── */}
      <section className="ab-story py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-t" style={{ borderColor: "rgba(255,245,240,0.06)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="ab-story-text" style={{ opacity: 0 }}>
            <p className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-4" style={{ color: "#FF5A1F" }}>
              Our story
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[0.9] mb-8" style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>
              Built for<br />
              <span style={{ color: "#FF5A1F" }}>builders.</span>
            </h2>
            <div className="space-y-5 text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,245,240,0.58)" }}>
              <p>
                Jarwix was founded in 2021 by a team of marketers and engineers who were tired of watching great businesses fail online — not because their product wasn't good, but because their digital presence wasn't.
              </p>
              <p>
                We started with one idea: what if a growth agency was built the way a product company is built? With systems, with data, with relentless iteration — and without the agency bloat.
              </p>
              <p>
                Three years later, we've helped over 100 businesses across the US, UK, and India build growth engines that don't sleep. AI-powered, automation-first, and obsessed with real outcomes.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["No retainer lock-ins", "Full transparency", "Results-led pricing"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <RiCheckLine size={13} style={{ color: "#FF5A1F" }} />
                  <span className="text-xs" style={{ color: "rgba(255,245,240,0.6)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ab-story-img relative rounded-3xl overflow-hidden aspect-[4/3]" style={{ opacity: 0 }}>
            <img
              src="/generated_image/small team of three figures huddled around a single glowing.jpeg"
              alt="Jarwix team collaborating"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,90,31,0.12) 0%, transparent 60%)" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-t" style={{ borderColor: "rgba(255,245,240,0.06)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-4" style={{ color: "#FF5A1F" }}>
                What drives us
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[0.9]" style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>
                Our values.
              </h2>
            </div>
          </div>
          <div className="ab-values grid grid-cols-1 sm:grid-cols-2 gap-3">
            {values.map((v) => (
              <div
                key={v.number}
                className="ab-value-card rounded-2xl p-7 sm:p-8 relative overflow-hidden"
                style={{ background: "#111", border: "1px solid rgba(255,90,31,0.08)", opacity: 0 }}
              >
                <span
                  className="absolute top-4 right-5 select-none pointer-events-none"
                  style={{ fontFamily: '"Hanson Bold", serif', fontSize: "5rem", lineHeight: 1, color: "rgba(255,90,31,0.05)" }}
                >
                  {v.number}
                </span>
                <div className="w-1.5 h-1.5 rounded-full mb-5" style={{ background: "#FF5A1F" }} />
                <h3 className="uppercase text-sm sm:text-base font-semibold mb-3 leading-tight" style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,245,240,0.52)" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-t" style={{ borderColor: "rgba(255,245,240,0.06)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-4" style={{ color: "#FF5A1F" }}>
            How we got here
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[0.9] mb-12 sm:mb-16" style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>
            Our journey.
          </h2>
          <div className="ab-timeline space-y-0">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="ab-milestone grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-6 sm:gap-10 py-7 sm:py-8"
                style={{ borderTop: "1px solid rgba(255,245,240,0.07)", opacity: 0 }}
              >
                <p
                  className="text-xl sm:text-2xl font-bold leading-none pt-0.5"
                  style={{ fontFamily: '"Hanson Bold", serif', color: "#FF5A1F" }}
                >
                  {m.year}
                </p>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,245,240,0.6)" }}>
                  {m.event}
                </p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,245,240,0.07)" }} />
          </div>
        </div>
      </section>

      {/* ── Image Gallery ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-t" style={{ borderColor: "rgba(255,245,240,0.06)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-10" style={{ color: "#FF5A1F" }}>
            How we work
          </p>
          <div className="ab-gallery grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="ab-img sm:col-span-2 rounded-2xl overflow-hidden h-56 sm:h-72 relative" style={{ opacity: 0 }}>
              <img
                src="/generated_image/two figures standing in front of a single illuminated.jpeg"
                alt="Team strategy session"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: "rgba(255,90,31,0.8)" }}>Strategy sessions</p>
              </div>
            </div>
            <div className="ab-img rounded-2xl overflow-hidden h-56 sm:h-72 relative" style={{ opacity: 0 }}>
              <img
                src="/generated_image/lone figure moving a single glowing piece across a dark.jpeg"
                alt="Campaign planning"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: "rgba(255,90,31,0.8)" }}>Campaign planning</p>
              </div>
            </div>
            <div className="ab-img rounded-2xl overflow-hidden h-56 sm:h-72 relative" style={{ opacity: 0 }}>
              <img
                src="/generated_image/tiny person standing at the base of a single enormous.jpeg"
                alt="Data analytics"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: "rgba(255,90,31,0.8)" }}>Growth analytics</p>
              </div>
            </div>
            <div className="ab-img sm:col-span-2 rounded-2xl overflow-hidden h-56 sm:h-72 relative" style={{ opacity: 0 }}>
              <img
                src="/generated_image/aerial view of a single lit room inside a dark stone.jpeg"
                alt="Modern workspace"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: "rgba(255,90,31,0.8)" }}>How we work</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl md:rounded-3xl px-8 sm:px-16 py-16 sm:py-24 text-center"
            style={{
              background: "linear-gradient(120deg, #0E0E0E 0%, #1a0800 50%, #2d0e00 100%)",
              border: "1px solid rgba(255,90,31,0.2)",
            }}
          >
            <p className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-5" style={{ color: "rgba(255,90,31,0.7)" }}>
              Ready to grow?
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[0.9] mb-5 max-w-2xl mx-auto" style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>
              Let's build your growth engine.
            </h2>
            <p className="text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: "rgba(255,245,240,0.5)" }}>
              Claim a free 30-minute growth audit and we'll map out exactly what it would take to scale your business online.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("open-audit-modal")); }}
                className="inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-2.5 text-sm font-semibold transition-all duration-300 hover:gap-3"
                style={{ background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)", color: "#FFF5F0" }}
              >
                Claim Free Audit
                <span className="flex items-center justify-center w-9 h-9 rounded-full" style={{ background: "rgba(0,0,0,0.15)" }}>
                  <RiArrowRightLine size={16} />
                </span>
              </Link>
              <Link
                href="/services"
                className="text-sm font-semibold transition-colors duration-200"
                style={{ color: "rgba(255,245,240,0.45)" }}
              >
                View our services →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
