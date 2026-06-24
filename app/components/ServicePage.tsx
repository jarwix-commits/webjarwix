"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RiArrowRightLine,
  RiCheckLine,
  RiArrowLeftLine,
  RiMegaphoneLine,
  RiGlobalLine,
  RiPenNibLine,
  RiRobotLine,
} from "@remixicon/react";

const iconMap = {
  megaphone: RiMegaphoneLine,
  global: RiGlobalLine,
  "pen-nib": RiPenNibLine,
  robot: RiRobotLine,
} as const;

type IconName = keyof typeof iconMap;
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface ServicePageData {
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: IconName;
  color: string;
  heroImage: string;
  what: { title: string; body: string }[];
  includes: string[];
  results: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
}

export default function ServicePage({ data }: { data: ServicePageData }) {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      // Hero
      gsap.fromTo(
        ".sp-number",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".sp-title span",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.07, delay: 0.4 }
      );
      gsap.fromTo(
        ".sp-tagline",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.8 }
      );
      gsap.fromTo(
        ".sp-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.95 }
      );
      gsap.fromTo(
        ".sp-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 1.05 }
      );

      // Scroll reveals
      gsap.fromTo(
        ".sp-what-card",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".sp-what-grid", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".sp-include-item",
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.07,
          scrollTrigger: { trigger: ".sp-includes", start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".sp-result-card",
        { scale: 0.92, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)", stagger: 0.1,
          scrollTrigger: { trigger: ".sp-results", start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".sp-faq-item",
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".sp-faqs", start: "top 82%" },
        }
      );
    },
    { scope: pageRef }
  );

  const Icon = iconMap[data.iconName];
  const titleWords = data.title.split(" ");

  return (
    <div ref={pageRef} className="bg-black min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative h-screen max-h-[900px] min-h-[600px] overflow-hidden">

        {/* Full-bleed image — covers entire section */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={data.heroImage}
            alt={data.title}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Left-heavy dark overlay — keeps text readable, reveals image right */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(14,14,14,0.97) 0%, rgba(14,14,14,0.88) 25%, rgba(14,14,14,0.55) 55%, rgba(14,14,14,0.15) 80%, transparent 100%)",
            }}
          />
          {/* Top + bottom fades */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/42" />
        </div>

        {/* Noise */}
        <div className="noise-overlay absolute inset-0 opacity-[0.45] mix-blend-overlay pointer-events-none" />

        {/* Top bar: back link + badge — absolute so it never pushes content */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 sm:px-8 md:px-12 pt-24 sm:pt-28">
          <Link
            href="/services"
            className="sp-number inline-flex items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color: "rgba(255,245,240,0.45)", opacity: 0 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFF5F0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,245,240,0.45)")}
          >
            <RiArrowLeftLine size={13} />
            All services
          </Link>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background: "rgba(14,14,14,0.75)",
              border: `1px solid ${data.color}25`,
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ background: `${data.color}20` }}
            >
              <Icon size={12} style={{ color: data.color }} />
            </div>
            <span
              className="text-[10px] tracking-[0.18em] uppercase font-semibold"
              style={{ color: data.color }}
            >
              {data.number}
            </span>
          </div>
        </div>

        {/* Bottom-anchored content — mirrors main Hero layout */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 sm:px-8 md:px-12 pb-8 sm:pb-12">
          <div className="grid grid-cols-12 gap-4 items-end">

            {/* Left: giant title */}
            <div className="col-span-12 lg:col-span-7">
              <h1
                className="sp-title leading-[0.88] tracking-[-0.03em]"
                style={{
                  fontFamily: '"Hanson Bold", serif',
                  color: "#FFF5F0",
                  fontSize: "clamp(2.2rem, 5.5vw, 6.5rem)",
                }}
              >
                {titleWords.map((w, i) => (
                  <span key={i} className="inline-block mr-[0.15em]" style={{ opacity: 0 }}>
                    {w}
                  </span>
                ))}
              </h1>
            </div>

            {/* Right: tagline + description + CTA */}
            <div className="col-span-12 lg:col-span-5 pb-1 space-y-4">
              <p
                className="sp-tagline text-[10px] tracking-[0.22em] uppercase font-semibold"
                style={{ color: data.color, opacity: 0 }}
              >
                {data.tagline}
              </p>
              <p
                className="sp-desc text-xs sm:text-sm leading-relaxed"
                style={{ color: "rgba(255,245,240,0.6)", opacity: 0 }}
              >
                {data.description}
              </p>
              <div className="sp-cta" style={{ opacity: 0 }}>
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-2 rounded-full pl-5 pr-1.5 py-1.5 font-semibold text-xs sm:text-sm transition-all duration-300 hover:gap-3"
                  style={{
                    background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
                    color: "#FFF5F0",
                    
                  }}
                >
                  Start with this service
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "rgba(0,0,0,0.15)" }}
                  >
                    <RiArrowRightLine size={14} style={{ color: "#FFF5F0" }} />
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── What we do ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-4"
            style={{ color: data.color }}
          >
            What we do
          </p>
          <div className="sp-what-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.what.map((item) => (
              <div
                key={item.title}
                className="sp-what-card rounded-2xl p-6"
                style={{
                  background: "#1A1A1A",
                  border: `1px solid ${data.color}15`,
                  opacity: 0,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mb-4"
                  style={{ background: data.color }}
                />
                <h3
                  className="uppercase text-sm font-semibold mb-2 leading-tight"
                  style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,245,240,0.5)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Includes ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl md:rounded-3xl px-6 sm:px-12 py-12 sm:py-16"
            style={{ background: "#101010" }}
          >
            <p
              className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-3"
              style={{ color: data.color }}
            >
              Everything included
            </p>
            <h2
              className="text-[22px] sm:text-3xl md:text-4xl leading-[1] sm:leading-[0.95] mb-10"
              style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
            >
              What you get.
            </h2>
            <ul className="sp-includes grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.includes.map((item) => (
                <li
                  key={item}
                  className="sp-include-item flex items-start gap-3"
                  style={{ opacity: 0 }}
                >
                  <RiCheckLine
                    size={15}
                    className="shrink-0 mt-0.5"
                    style={{ color: data.color }}
                  />
                  <span className="text-sm" style={{ color: "rgba(255,245,240,0.65)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Results ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-4"
            style={{ color: data.color }}
          >
            Results we deliver
          </p>
          <div className="sp-results grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.results.map((r) => (
              <div
                key={r.label}
                className="sp-result-card rounded-2xl p-6 text-center"
                style={{
                  background: "#1A1A1A",
                  border: `1px solid ${data.color}18`,
                  opacity: 0,
                }}
              >
                <p
                  className="text-4xl sm:text-5xl font-bold leading-none mb-2"
                  style={{
                    fontFamily: '"Hanson Bold", serif',
                    background: `linear-gradient(120deg, #FFF5F0, ${data.color})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {r.value}
                </p>
                <p className="text-xs" style={{ color: "rgba(255,245,240,0.5)" }}>
                  {r.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-4"
            style={{ color: data.color }}
          >
            Common questions
          </p>
          <div className="sp-faqs space-y-0">
            {data.faqs.map((faq, i) => (
              <div
                key={i}
                className="sp-faq-item py-6"
                style={{
                  borderTop: "1px solid rgba(255,245,240,0.07)",
                  opacity: 0,
                }}
              >
                <p
                  className="uppercase text-sm font-semibold mb-2"
                  style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
                >
                  {faq.q}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,245,240,0.5)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,245,240,0.07)" }} />
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl md:rounded-3xl px-8 sm:px-14 py-14 sm:py-20 text-center"
            style={{
              background: "linear-gradient(120deg, #0E0E0E 0%, #1a0800 50%, #2d0e00 100%)",
              border: "1px solid rgba(255,90,31,0.2)",
            }}
          >
            <h2
              className="text-[22px] sm:text-3xl md:text-4xl leading-[1] sm:leading-[0.93] mb-4 max-w-xl mx-auto"
              style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
            >
              Ready to elevate with {data.title.split(" ")[0].toLowerCase()}?
            </h2>
            <p
              className="text-sm mb-8 max-w-md mx-auto"
              style={{ color: "rgba(255,245,240,0.55)" }}
            >
              Claim your free 30-minute growth audit and we'll map out exactly how we'll deliver results for your business.
            </p>
            <Link
              href="#"
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("open-audit-modal")); }}
              className="group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 font-semibold text-sm transition-all duration-300 hover:gap-4"
              style={{
                background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
                color: "#FFF5F0",
                
              }}
            >
              Claim Free Audit
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(0,0,0,0.15)" }}
              >
                <RiArrowRightLine size={16} style={{ color: "#FFF5F0" }} />
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
