"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RiMegaphoneLine,
  RiGlobalLine,
  RiPenNibLine,
  RiRobotLine,
  RiArrowRightLine,
} from "@remixicon/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function BentoGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        gsap.set(".bg-card", { opacity: 1, scale: 1, y: 0 });
        gsap.set(".bg-heading-word", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".bg-heading-word",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.07,
          scrollTrigger: { trigger: ".bg-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".bg-card",
        { scale: 0.8, opacity: 0, y: 16 },
        {
          scale: 1, opacity: 1, y: 0,
          duration: 0.7, ease: "back.out(1.3)",
          stagger: { each: 0.07, from: "center" },
          scrollTrigger: { trigger: ".bg-grid", start: "top 78%" },
        }
      );
    },
    { scope: sectionRef }
  );

  const accent = "#FF5A1F";
  const statGrad = {
    fontFamily: '"Hanson Bold", serif',
    background: "linear-gradient(120deg, #FFF5F0, #FF5A1F)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-16 sm:py-24 px-4 sm:px-6 md:px-8"
    >
      <div className="bg-noise absolute inset-0 opacity-[0.1] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="bg-heading mb-8 sm:mb-10">
          <p
            className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-3"
            style={{ color: accent }}
          >
            Everything we build
          </p>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88]"
            style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
          >
            {["Growth.", "By design.", "By data."].map((word, i) => (
              <span key={i} className="bg-heading-word block" style={{ opacity: 0 }}>
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/*
          Mobile  (2-col): stats → full-width images → service pair → stat bar → CTA
          Desktop (4-col): classic bento layout with row/col spans

          Explicit placement per card so both breakpoints are intentional.
        */}
        <div className="bg-grid grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">

          {/* ── Stat 100+ ── mobile col1 row1 / desktop col1 row1 */}
          <div
            className="bg-card rounded-2xl flex flex-col justify-between p-4 sm:p-5
                        h-28 sm:h-[200px]
                        col-start-1 row-start-1 sm:col-start-1 sm:row-start-1"
            style={{ background: "#1A1A1A", border: "1px solid rgba(255,90,31,0.12)", opacity: 0 }}
          >
            <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: "rgba(255,90,31,0.5)" }}>
              Clients
            </span>
            <div>
              <p className="text-4xl sm:text-5xl font-bold leading-none mb-1" style={statGrad}>
                100+
              </p>
              <p className="text-[10px]" style={{ color: "rgba(255,245,240,0.45)" }}>
                US · UK · India
              </p>
            </div>
          </div>

          {/* ── Stat 3+ ── mobile col2 row1 / desktop col4 row1 */}
          <div
            className="bg-card rounded-2xl flex flex-col justify-between p-4 sm:p-5
                        h-28 sm:h-[200px]
                        col-start-2 row-start-1 sm:col-start-4 sm:row-start-1"
            style={{ background: "#1A1A1A", border: "1px solid rgba(255,90,31,0.12)", opacity: 0 }}
          >
            <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: "rgba(255,90,31,0.5)" }}>
              Years
            </span>
            <div>
              <p className="text-4xl sm:text-5xl font-bold leading-none mb-1" style={statGrad}>
                3+
              </p>
              <p className="text-[10px]" style={{ color: "rgba(255,245,240,0.45)" }}>
                Delivering growth
              </p>
            </div>
          </div>

          {/* ── Digital Marketing ── mobile full-width row2 / desktop col2-3 row1 */}
          <div
            className="bg-card rounded-2xl overflow-hidden relative
                        h-44 sm:h-[200px]
                        col-start-1 col-end-3 row-start-2
                        sm:col-start-2 sm:col-end-4 sm:row-start-1"
            style={{ opacity: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=900&q=80&auto=format&fit=crop"
              alt="Digital Marketing"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.5) saturate(0.75)" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <div
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center mb-2"
                style={{ background: "rgba(255,90,31,0.2)", border: "1px solid rgba(255,90,31,0.3)" }}
              >
                <RiMegaphoneLine size={12} style={{ color: accent }} />
              </div>
              <p className="uppercase text-xs font-semibold leading-tight"
                style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>
                Digital Marketing
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,245,240,0.55)" }}>
                AI-powered campaigns across every channel
              </p>
            </div>
          </div>

          {/* ── Automation ── mobile full-width row3 / desktop col1 row2-3 */}
          <div
            className="bg-card rounded-2xl overflow-hidden relative
                        h-44 sm:h-auto
                        col-start-1 col-end-3 row-start-3
                        sm:col-start-1 sm:col-end-2 sm:row-start-2 sm:row-span-2"
            style={{ opacity: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop"
              alt="Automation & AI"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.5) saturate(0.75)" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <div
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center mb-2"
                style={{ background: "rgba(255,90,31,0.2)", border: "1px solid rgba(255,90,31,0.3)" }}
              >
                <RiRobotLine size={12} style={{ color: accent }} />
              </div>
              <p className="uppercase text-xs font-semibold leading-tight"
                style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>
                Automation & AI
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,245,240,0.55)" }}>
                Systems that run 24/7
              </p>
            </div>
          </div>

          {/* ── Web & SEO ── mobile col1 row4 / desktop col2 row2 */}
          <div
            className="bg-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between
                        h-36 sm:h-[200px]
                        col-start-1 row-start-4 sm:col-start-2 sm:row-start-2"
            style={{ background: "#1A1A1A", border: "1px solid rgba(255,90,31,0.10)", opacity: 0 }}
          >
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,90,31,0.10)", border: "1px solid rgba(255,90,31,0.18)" }}
            >
              <RiGlobalLine size={14} style={{ color: accent }} />
            </div>
            <div>
              <p className="uppercase text-[11px] sm:text-xs font-semibold leading-tight mb-1"
                style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>
                Web & SEO
              </p>
              <p className="text-[10px]" style={{ color: "rgba(255,245,240,0.45)" }}>
                Speed · Conversions
              </p>
            </div>
          </div>

          {/* ── Creative Design ── mobile col2 row4 / desktop col3 row2 */}
          <div
            className="bg-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between
                        h-36 sm:h-[200px]
                        col-start-2 row-start-4 sm:col-start-3 sm:row-start-2"
            style={{ background: "#1A1A1A", border: "1px solid rgba(255,90,31,0.10)", opacity: 0 }}
          >
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,90,31,0.10)", border: "1px solid rgba(255,90,31,0.18)" }}
            >
              <RiPenNibLine size={14} style={{ color: accent }} />
            </div>
            <div>
              <p className="uppercase text-[11px] sm:text-xs font-semibold leading-tight mb-1"
                style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>
                Creative Design
              </p>
              <p className="text-[10px]" style={{ color: "rgba(255,245,240,0.45)" }}>
                Brands to remember
              </p>
            </div>
          </div>

          {/* ── Stat 24/7 ── mobile full-width row5 / desktop col4 row2 */}
          <div
            className="bg-card rounded-2xl flex items-center justify-between px-5 sm:flex-col sm:items-start sm:justify-between sm:p-5
                        h-16 sm:h-[200px]
                        col-start-1 col-end-3 row-start-5
                        sm:col-start-4 sm:col-end-5 sm:row-start-2"
            style={{ background: "#1A1A1A", border: "1px solid rgba(255,90,31,0.12)", opacity: 0 }}
          >
            <div className="sm:hidden w-1 h-6 rounded-full" style={{ background: accent }} />
            <div className="sm:block hidden w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            <p className="text-3xl sm:text-5xl font-bold leading-none" style={statGrad}>
              24/7
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wider sm:mt-1" style={{ color: "rgba(255,245,240,0.55)" }}>
              Systems running
            </p>
          </div>

          {/* ── Tagline CTA ── mobile full-width row6 / desktop col2-4 row3 */}
          <div
            className="bg-card rounded-2xl flex items-center justify-between px-5 sm:px-8
                        h-14 sm:h-20
                        col-start-1 col-end-3 row-start-6
                        sm:col-start-2 sm:col-end-5 sm:row-start-3"
            style={{
              background: "linear-gradient(120deg, #0E0E0E 0%, #1a0800 60%, #2d0e00 100%)",
              border: "1px solid rgba(255,90,31,0.18)",
              opacity: 0,
            }}
          >
            <p className="text-sm sm:text-base font-semibold"
              style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>
              Elevate with AI.
            </p>
            <a
              href="#services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold hover:gap-2.5 transition-all duration-200 whitespace-nowrap"
              style={{ color: accent }}
            >
              See all services
              <RiArrowRightLine size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
