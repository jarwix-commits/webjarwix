"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.body.style.overflow = "hidden";

    if (prefersReduced) {
      setTimeout(() => {
        document.body.style.overflow = "";
        setDone(true);
      }, 400);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    // Logo scales + fades in
    tl.fromTo(
      ".ldr-logo",
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.75, ease: "power3.out" }
    )
      // SVG line draws from left to right via stroke-dashoffset
      .to(
        ".ldr-svg-line",
        { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" },
        "-=0.15"
      )
      // Tagline fades up
      .fromTo(
        ".ldr-tagline",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        "-=0.3"
      )
      // Curtain slides up
      .to(loader, {
        yPercent: -100,
        duration: 0.85,
        ease: "power3.inOut",
        delay: 0.45,
      });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#0E0E0E" }}
    >
      <div className="bg-noise absolute inset-0 opacity-[0.08] pointer-events-none" />

      <div className="relative flex flex-col items-center">
        {/* SVG logo */}
        <img
          src="/logo.svg"
          alt="Jarwix"
          className="ldr-logo"
          style={{
            width: "clamp(180px, 40vw, 340px)",
            opacity: 0,
          }}
        />

        {/* Single SVG line — draws left→right via stroke-dashoffset */}
        <svg
          className="mt-5"
          width="clamp(180px, 40vw, 340px)"
          height="4"
          viewBox="0 0 340 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible", width: "clamp(180px, 40vw, 340px)" }}
        >
          {/* Track */}
          <line
            x1="0" y1="2" x2="340" y2="2"
            stroke="rgba(255,245,240,0.08)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Animated fill line */}
          <line
            className="ldr-svg-line"
            x1="0" y1="2" x2="340" y2="2"
            stroke="url(#ldrGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="340"
            strokeDashoffset="340"
          />
          <defs>
            <linearGradient id="ldrGrad" x1="0" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF5A1F" />
              <stop offset="100%" stopColor="#ff8c5a" />
            </linearGradient>
          </defs>
        </svg>

        {/* Tagline */}
        <p
          className="ldr-tagline mt-6 text-[10px] tracking-[0.25em] uppercase font-semibold"
          style={{ color: "rgba(255,245,240,0.28)", opacity: 0 }}
        >
          Elevate with AI.
        </p>
      </div>
    </div>
  );
}
