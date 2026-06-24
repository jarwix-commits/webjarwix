"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PortfolioHeader() {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const elements = gsap.utils.toArray<HTMLElement>(".header-reveal");
      
      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.2 // slight delay to wait for page load
        }
      );
    },
    { scope: headerRef }
  );

  return (
    <div ref={headerRef} className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
      <p className="header-reveal text-[10px] tracking-[0.22em] uppercase font-semibold mb-6" style={{ color: "#FF5A1F", opacity: 0 }}>
        Our Work
      </p>
      <h1 
        className="header-reveal text-5xl sm:text-6xl md:text-7xl leading-[0.9] mb-8"
        style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0", opacity: 0 }}
      >
        Building the future <br /> of digital growth.
      </h1>
      <p className="header-reveal text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,245,240,0.6)", opacity: 0 }}>
        Explore how we've helped ambitious brands transform their digital presence, scale revenue, and automate operations with cutting-edge AI.
      </p>
    </div>
  );
}
