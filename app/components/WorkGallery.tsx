"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// 3×3 grid — index 4 (center) is the featured zoom card
const cells = [
  { src: "/generated_image/A solitary, glowing data sphere, filled with a tiny, abstract figure, drifts in a pitch-black void. The sphere emanates a powerful amber light. The image is clean and free of clutter. Sci-fi concept art.jpeg", label: "Analytics" },
  { src: "/generated_image/lone figure holding single glowing megaphone, dark background, amber beam of light, minimal.jpeg", label: "Digital Campaigns" },
  { src: "/generated_image/three figures around one lit table on cliff top, dark sky, amber glow, minimal.jpeg", label: "Team Strategy" },
  { src: "/generated_image/single glowing letterform carved in dark stone wall, amber backlight, vast empty space.jpeg", label: "Brand Design" },
  // ── CENTER FEATURED ──
  { 
    src: "/generated_image/lone engineer on dark hilltop, single massive glowing machine rising behind them, amber and gold light, epic scale, vast sky, isometric aerial..jpg", 
    fgSrc: "/generated_image/lone engineer on dark hilltop, single massive glowing machine rising behind them, amber and gold light, epic scale, vast sky, isometric aerial Topaz Gigapixel.png",
    label: "Growth Engine", 
    featured: true 
  },
  { src: "/generated_image/lone figure at single illuminated war table in dark room, amber light, deep shadows.jpeg", label: "Campaign Planning" },
  { src: "/generated_image/single robot hand reaching toward one point of amber light in dark void, minimal.jpeg", label: "AI Automation" },
  { src: "/generated_image/tiny person floating in dark galaxy of sparse amber light particles, minimal, vast space.jpeg", label: "Data & Insights" },
  { src: "/generated_image/artist standing before single enormous blank canvas glowing amber, dark studio, minimal.jpeg", label: "Creative Direction" },
];

export default function WorkGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Zoom animation desktop-only — mobile shows static grid
      if (prefersReduced || window.innerWidth < 768) return;

      const featured = featuredRef.current;
      const desktop = desktopRef.current;
      if (!featured || !desktop) return;

      const grid = desktop.querySelector<HTMLDivElement>(".wg-grid");
      if (!grid) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: desktop,
          pin: true,
          start: "top top",
          end: "+=250%",
          scrub: 1.2, // Smoothes out chunky mouse-wheel events over 1.2s to fix frame jitters
          anticipatePin: 1,
        },
      });
      
      // The massive grid zoom
      tl.to(grid, {
        scale: 3.3, // 3x3 grid, so scale > 3 guarantees the center fills the viewport
        rotationZ: 0.01, // Forces 3D hardware acceleration to prevent frame jitters
        force3D: true,
        ease: "none",
        duration: 1,
      }, 0);

      // Setup initial text state
      gsap.set(".wg-text-anim", { opacity: 0 });

      // Animate text fade-in halfway through the zoom
      tl.to(".wg-text-anim", {
        opacity: 1,
        duration: 0.4,
        stagger: 0.15,
        ease: "power2.out",
      }, 0.4);

      // (Animations removed per request)
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
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
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
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
      <div 
        ref={desktopRef} 
        className="hidden md:block w-full h-screen relative overflow-hidden" 
      >
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
              <Image
                src={cell.src}
                alt={cell.label}
                fill
                className="object-cover z-0"
                priority={isFeatured}
                sizes={isFeatured ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />
              
              <p
                className="absolute bottom-2 left-3 text-[9px] tracking-[0.15em] uppercase font-semibold z-40"
                style={{ color: isFeatured ? "rgba(255,90,31,0.9)" : "rgba(255,245,240,0.5)" }}
              >
                {cell.label}
              </p>

              {/* Center card: brand overlay (Text sandwiched between background and foreground) */}
              {isFeatured && (
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
                >
                  <p
                    className="wg-text-anim text-[10px] tracking-[0.22em] uppercase font-semibold mb-2"
                    style={{ color: "rgba(255,90,31,0.8)" }}
                  >
                    Jarwix
                  </p>
                  <h2
                    className="wg-text-anim text-2xl sm:text-4xl md:text-5xl text-center leading-[0.9] px-4"
                    style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
                  >
                    Growth.<br />By design.
                  </h2>
                </div>
              )}

              {/* Center card: Foreground Transparent PNG Overlay */}
              {isFeatured && cell.fgSrc && (
                <Image
                  src={cell.fgSrc}
                  alt={cell.label + " foreground"}
                  fill
                  className="object-cover pointer-events-none z-30"
                  priority
                  sizes="100vw"
                />
              )}
            </div>
          );
        })}
      </div>
      </div>{/* /desktop height wrapper */}
    </section>
  );
}
