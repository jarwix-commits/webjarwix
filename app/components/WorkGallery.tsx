"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// 3×3 grid — index 4 (center) is the featured zoom card
const cells = [
  { src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80&auto=format&fit=crop", label: "Analytics" },
  { src: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&q=80&auto=format&fit=crop", label: "Digital Campaigns" },
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&auto=format&fit=crop", label: "Team Strategy" },
  { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&auto=format&fit=crop", label: "Brand Design" },
  // ── CENTER FEATURED ──
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=90&auto=format&fit=crop", label: "Growth Engine", featured: true },
  { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80&auto=format&fit=crop", label: "Campaign Planning" },
  { src: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop", label: "AI Automation" },
  { src: "https://images.unsplash.com/photo-1553484771-898ed465e931?w=600&q=80&auto=format&fit=crop", label: "Data & Insights" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&auto=format&fit=crop", label: "Creative Direction" },
];

export default function WorkGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const [sizeKey, setSizeKey] = useState(0);

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
      // Zoom animation desktop-only — mobile shows static grid
      if (prefersReduced || window.innerWidth < 768) return;

      const featured = featuredRef.current;
      const section = sectionRef.current;
      if (!featured || !section) return;

      const grid = section.querySelector<HTMLDivElement>(".wg-grid");
      if (!grid) return;

      const getScale = () => {
        const rect = featured.getBoundingClientRect();
        return Math.max(
          window.innerWidth / rect.width,
          window.innerHeight / rect.height
        ) * 1.02;
      };

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }).to(grid, {
        scale: getScale,
        ease: "none",
        duration: 1,
      });
    },
    { scope: sectionRef, dependencies: [sizeKey] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ overflow: "hidden" }}
    >
      {/* ── Mobile: static 2-col gallery with top padding for navbar ── */}
      <div className="md:hidden px-3 pt-24 pb-10">
        <p
          className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-5 text-center"
          style={{ color: "rgba(255,90,31,0.7)" }}
        >
          Our work
        </p>
        <div className="grid grid-cols-2 gap-2">
          {cells.map((cell, i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden relative ${i === 4 ? "col-span-2" : ""}`}
              style={{ height: i === 4 ? "220px" : "140px" }}
            >
              <img
                src={cell.src}
                alt={cell.label}
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.65) saturate(0.8)" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p
                className="absolute bottom-2 left-3 text-[9px] tracking-[0.15em] uppercase font-semibold"
                style={{ color: cell.featured ? "rgba(255,90,31,0.9)" : "rgba(255,245,240,0.5)" }}
              >
                {cell.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop: 3×3 zoom gallery (hidden on mobile) ── */}
      <div className="hidden md:block" style={{ height: "100vh" }}>
      {/* Section label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <p
          className="text-[10px] tracking-[0.22em] uppercase font-semibold"
          style={{ color: "rgba(255,90,31,0.7)" }}
        >
          Our work
        </p>
      </div>

      {/* 3×3 grid — the whole thing scales up as one unit on scroll */}
      <div
        className="wg-grid grid grid-cols-3 h-full"
        style={{ gap: "3px", transformOrigin: "center center" }}
      >
        {cells.map((cell, i) => {
          const isFeatured = cell.featured;

          return (
            <div
              key={i}
              ref={isFeatured ? featuredRef : undefined}
              className={`${isFeatured ? "wg-featured relative z-10" : "wg-side relative"} overflow-hidden`}
            >
              <img
                src={cell.src}
                alt={cell.label}
                className="w-full h-full object-cover"
                style={{
                  filter: isFeatured
                    ? "brightness(0.75) saturate(0.85)"
                    : "brightness(0.5) saturate(0.7)",
                }}
                loading={isFeatured ? "eager" : "lazy"}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: isFeatured
                    ? "linear-gradient(to top, rgba(14,14,14,0.6) 0%, transparent 50%)"
                    : "rgba(14,14,14,0.25)",
                }}
              />

              {/* Label */}
              <div className="absolute bottom-2 left-3">
                <p
                  className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase font-semibold"
                  style={{ color: isFeatured ? "rgba(255,90,31,0.9)" : "rgba(255,245,240,0.35)" }}
                >
                  {cell.label}
                </p>
              </div>

              {/* Center card: brand overlay */}
              {isFeatured && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p
                    className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-2"
                    style={{ color: "rgba(255,90,31,0.8)" }}
                  >
                    Jarwix
                  </p>
                  <h2
                    className="text-2xl sm:text-4xl md:text-5xl text-center leading-[0.9] px-4"
                    style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
                  >
                    Growth.<br />By design.
                  </h2>
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>{/* /desktop height wrapper */}
    </section>
  );
}
