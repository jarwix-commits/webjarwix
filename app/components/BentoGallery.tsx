"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import {
  RiMegaphoneLine,
  RiGlobalLine,
  RiPenNibLine,
  RiRobotLine,
  RiArrowRightLine,
} from "@remixicon/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

export default function BentoGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [sizeKey, setSizeKey] = useState(0);

  // Re-run Flip context on resize (positions change)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setSizeKey((k) => k + 1), 250);
    };
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(timer); window.removeEventListener("resize", onResize); };
  }, []);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const grid = gridRef.current;
      const section = sectionRef.current;
      if (!grid || !section) return;

      // Heading fade-in (always)
      if (!prefersReduced) {
        gsap.fromTo(
          ".bg-heading-word",
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.07,
            scrollTrigger: { trigger: ".bg-heading", start: "top 85%" },
          }
        );
      } else {
        gsap.set(".bg-heading-word", { opacity: 1, y: 0 });
        gsap.set(".bg-card", { opacity: 1 });
        return;
      }

      // ── Flip morph: desktop only ──────────────────────────────
      if (window.innerWidth < 640) {
        // Mobile: simple stagger reveal, no flip
        gsap.fromTo(
          ".bg-card",
          { scale: 0.88, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)",
            stagger: { each: 0.07, from: "center" },
            scrollTrigger: { trigger: grid, start: "top 78%" },
          }
        );
        return;
      }

      // 1. Apply final class to capture bento positions
      grid.classList.add("bento-final");
      const flipState = Flip.getState(grid.querySelectorAll(".bg-card"));
      grid.classList.remove("bento-final");

      // 2. Make all cards visible in the compact initial state
      gsap.set(".bg-card", { opacity: 1 });

      // 3. Flip.to animates from current (compact) → captured (bento) positions
      const flip = Flip.to(flipState, {
        ease: "expo.inOut",
        duration: 1,
        simple: true,
      });

      // 4. Drive with ScrollTrigger scrub + pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: "+=120%",
          scrub: 1,
          pin: section,
          invalidateOnRefresh: true,
        },
      });
      tl.add(flip);
    },
    { scope: sectionRef, dependencies: [sizeKey] }
  );

  const accent = "#FF5A1F";
  const card = "#1A1A1A";
  const border = "1px solid rgba(255,90,31,0.12)";
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
          <p className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-3" style={{ color: accent }}>
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
          Grid:
          - Mobile: explicit 2-col placement (col-start/row-start classes)
          - Desktop (sm+): bento-flip-grid CSS takes over
            Initial = uniform 4×3 grid; Final = bento via .bento-final class
            Flip.to() morphs between the two states on scroll
        */}
        <div
          ref={gridRef}
          className="bento-flip-grid grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5"
        >
          {/* ── 100+ stat ── mobile col1 row1 */}
          <div
            className="bg-card bfc-stat1 rounded-2xl flex flex-col justify-between p-4 sm:p-5
                        h-28 col-start-1 row-start-1"
            style={{ background: card, border, opacity: 0 }}
          >
            <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: "rgba(255,90,31,0.5)" }}>
              Clients
            </span>
            <div>
              <p className="text-4xl sm:text-5xl font-bold leading-none mb-1" style={statGrad}>100+</p>
              <p className="text-[10px]" style={{ color: "rgba(255,245,240,0.45)" }}>US · UK · India</p>
            </div>
          </div>

          {/* ── 3+ stat ── mobile col2 row1 */}
          <div
            className="bg-card bfc-stat3 rounded-2xl flex flex-col justify-between p-4 sm:p-5
                        h-28 col-start-2 row-start-1"
            style={{ background: card, border, opacity: 0 }}
          >
            <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: "rgba(255,90,31,0.5)" }}>
              Years
            </span>
            <div>
              <p className="text-4xl sm:text-5xl font-bold leading-none mb-1" style={statGrad}>3+</p>
              <p className="text-[10px]" style={{ color: "rgba(255,245,240,0.45)" }}>Delivering growth</p>
            </div>
          </div>

          {/* ── Digital Marketing ── mobile full-width row2 */}
          <div
            className="bg-card bfc-dm rounded-2xl overflow-hidden relative
                        h-44 col-start-1 col-end-3 row-start-2"
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
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center mb-2"
                style={{ background: "rgba(255,90,31,0.2)", border: "1px solid rgba(255,90,31,0.3)" }}>
                <RiMegaphoneLine size={12} style={{ color: accent }} />
              </div>
              <p className="uppercase text-xs font-semibold leading-tight"
                style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>Digital Marketing</p>
              <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,245,240,0.55)" }}>AI-powered campaigns</p>
            </div>
          </div>

          {/* ── Automation ── mobile full-width row3 */}
          <div
            className="bg-card bfc-auto rounded-2xl overflow-hidden relative
                        h-44 col-start-1 col-end-3 row-start-3"
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
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center mb-2"
                style={{ background: "rgba(255,90,31,0.2)", border: "1px solid rgba(255,90,31,0.3)" }}>
                <RiRobotLine size={12} style={{ color: accent }} />
              </div>
              <p className="uppercase text-xs font-semibold leading-tight"
                style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>Automation & AI</p>
              <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,245,240,0.55)" }}>Systems that run 24/7</p>
            </div>
          </div>

          {/* ── Web & SEO ── mobile col1 row4 */}
          <div
            className="bg-card bfc-web rounded-2xl p-4 sm:p-5 flex flex-col justify-between
                        h-36 col-start-1 row-start-4"
            style={{ background: card, border: "1px solid rgba(255,90,31,0.10)", opacity: 0 }}
          >
            <div className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,90,31,0.10)", border: "1px solid rgba(255,90,31,0.18)" }}>
              <RiGlobalLine size={14} style={{ color: accent }} />
            </div>
            <div>
              <p className="uppercase text-[11px] font-semibold leading-tight mb-1"
                style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>Web & SEO</p>
              <p className="text-[10px]" style={{ color: "rgba(255,245,240,0.45)" }}>Speed · Conversions</p>
            </div>
          </div>

          {/* ── Creative Design ── mobile col2 row4 */}
          <div
            className="bg-card bfc-creat rounded-2xl p-4 sm:p-5 flex flex-col justify-between
                        h-36 col-start-2 row-start-4"
            style={{ background: card, border: "1px solid rgba(255,90,31,0.10)", opacity: 0 }}
          >
            <div className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,90,31,0.10)", border: "1px solid rgba(255,90,31,0.18)" }}>
              <RiPenNibLine size={14} style={{ color: accent }} />
            </div>
            <div>
              <p className="uppercase text-[11px] font-semibold leading-tight mb-1"
                style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>Creative Design</p>
              <p className="text-[10px]" style={{ color: "rgba(255,245,240,0.45)" }}>Brands to remember</p>
            </div>
          </div>

          {/* ── 24/7 stat ── mobile full-width row5 */}
          <div
            className="bg-card bfc-stat247 rounded-2xl flex items-center justify-between px-5
                        sm:flex-col sm:items-start sm:justify-between sm:p-5
                        h-16 col-start-1 col-end-3 row-start-5"
            style={{ background: card, border, opacity: 0 }}
          >
            <div className="sm:hidden w-1 h-6 rounded-full" style={{ background: accent }} />
            <p className="text-3xl sm:text-5xl font-bold leading-none" style={statGrad}>24/7</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,245,240,0.55)" }}>
              Systems running
            </p>
          </div>

          {/* ── Tagline CTA ── mobile full-width row6 */}
          <div
            className="bg-card bfc-tag rounded-2xl flex items-center justify-between px-5 sm:px-8
                        h-14 col-start-1 col-end-3 row-start-6"
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
