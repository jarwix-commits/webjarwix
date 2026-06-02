"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const items = [
  "Digital Marketing",
  "★",
  "Web & SEO",
  "★",
  "Creative Design",
  "★",
  "Automation & AI",
  "★",
  "Growth Strategy",
  "★",
  "Brand Identity",
  "★",
  "Performance Ads",
  "★",
  "CRM Automation",
  "★",
];

interface TickerProps {
  /** "left" = left-to-right scroll, "right" = right-to-left (default) */
  direction?: "left" | "right";
  speed?: number; // seconds for one full loop
  accent?: boolean; // orange background variant
}

export default function Ticker({
  direction = "right",
  speed = 28,
  accent = false,
}: TickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.to(trackRef.current, {
        xPercent: direction === "right" ? -50 : 50,
        repeat: -1,
        duration: speed,
        ease: "none",
      });
    },
    { scope: trackRef }
  );

  // Duplicate items for seamless loop
  const allItems = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        background: accent
          ? "linear-gradient(120deg, #FF5A1F 0%, #cc3d00 100%)"
          : "#111111",
        borderTop: accent
          ? "none"
          : "1px solid rgba(255,90,31,0.08)",
        borderBottom: accent
          ? "none"
          : "1px solid rgba(255,90,31,0.08)",
      }}
    >
      {/* Fade masks on left/right edges */}
      <div
        className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
        style={{
          background: accent
            ? "linear-gradient(to right, #FF5A1F, transparent)"
            : "linear-gradient(to right, #111111, transparent)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
        style={{
          background: accent
            ? "linear-gradient(to left, #cc3d00, transparent)"
            : "linear-gradient(to left, #111111, transparent)",
        }}
      />

      <div ref={trackRef} className="flex items-center whitespace-nowrap will-change-transform">
        {allItems.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em]"
            style={{
              fontFamily: item === "★" ? "inherit" : '"Hanson Bold", serif',
              color: accent
                ? "rgba(255,245,240,0.9)"
                : item === "★"
                ? "#FF5A1F"
                : "rgba(255,245,240,0.45)",
              fontSize: item === "★" ? "8px" : undefined,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
