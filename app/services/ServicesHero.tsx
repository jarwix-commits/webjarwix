"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

export default function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // If the global loader is currently in the DOM, it means this is an initial hard page load.
    // We delay the hero animation so it doesn't play behind the loader curtain.
    // If the loader is gone (client-side navigation), we start instantly.
    const isLoaderActive = document.querySelector(".ldr-tagline") !== null;
    const initialDelay = isLoaderActive ? 2.6 : 0.1;

    const tl = gsap.timeline({ delay: initialDelay });
    
    // Animate the "What we offer" tag
    tl.fromTo(
      ".hero-tag",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Stagger characters for the premium text split effect
    tl.fromTo(
      ".split-char",
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
      "-=0.6"
    );

    // Fade in the description and CTA
    tl.fromTo(
      ".hero-desc",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    );
  }, { scope: containerRef });

  const splitChars = (text: string) => {
    return text.split("").map((char, i) => (
      <span 
        key={i} 
        className="split-char inline-block" 
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto w-full">
      <p
        className="hero-tag text-[10px] tracking-[0.22em] uppercase font-semibold mb-5"
        style={{ color: "#FF5A1F" }}
      >
        What we offer
      </p>
      
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88]"
          style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
        >
          <div className="overflow-hidden pb-1 -mb-1">{splitChars("Growth")}</div>
          <div className="overflow-hidden pb-1 -mb-1">{splitChars("services.")}</div>
          <div className="overflow-hidden pb-1 -mb-1">
            <span style={{ color: "#FF5A1F" }}>{splitChars("Built different.")}</span>
          </div>
        </h1>
        
        <div className="max-w-md hero-desc">
          <p
            className="text-sm sm:text-base leading-relaxed mb-6"
            style={{ color: "rgba(255,245,240,0.55)" }}
          >
            Four interconnected service pillars — each one powered by AI,
            strategy, and execution — designed to work together and compound
            your growth.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full pl-5 pr-2 py-2 text-xs font-semibold transition-all duration-300 hover:gap-3"
              style={{
                background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
                color: "#FFF5F0",
                
              }}
            >
              Start a project
              <span
                className="flex items-center justify-center rounded-full bg-[#FF5A1F] text-white"
                style={{ width: 24, height: 24 }}
              >
                <RiArrowRightLine size={14} />
              </span>
            </Link>
            <button
              onClick={() => window.dispatchEvent(new Event("open-audit-modal"))}
              className="text-xs uppercase tracking-wider font-medium cursor-pointer hover:text-[#FFF5F0] transition-colors"
              style={{ color: "rgba(255,245,240,0.4)" }}
            >
              Free audit →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
