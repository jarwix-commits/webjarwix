"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const ACCENT_WORDS = new Set(["last.", "design,", "data."]);

export default function HorizontalScrollText() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const text = textRef.current;
      const wrapper = wrapperRef.current;
      if (!text || !wrapper) return;

      const split = new SplitText(text, { type: "chars,words" });

      // Color accent words — chars inherit via CSS cascade
      split.words.forEach((word) => {
        const el = word as HTMLElement;
        if (ACCENT_WORDS.has(el.textContent?.trim() ?? "")) {
          el.style.color = "#FF5A1F";
        }
      });

      // Main horizontal scroll — pins wrapper, scrubs text left
      const scrollTween = gsap.to(text, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          end: "+=4500px",
          scrub: 1,
        },
      });

      // Each char tumbles in from a random Y + rotation as it enters viewport
      split.chars.forEach((char) => {
        gsap.from(char as HTMLElement, {
          yPercent: gsap.utils.random(-200, 200),
          rotation: gsap.utils.random(-22, 22),
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: char as HTMLElement,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "left 30%",
            scrub: 1,
          },
        });
      });

      return () => split.revert();
    },
    { scope: wrapperRef }
  );

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ background: "#080808", height: "100vh" }}
    >
      {/* Edge fade masks */}
      <div
        className="absolute inset-y-0 left-0 w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #080808, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #080808, transparent)" }}
      />

      {/* Scrolling text */}
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <p
          ref={textRef}
          className="whitespace-nowrap select-none"
          style={{
            fontFamily: '"Hanson Bold", serif',
            fontSize: "clamp(3.5rem, 9vw, 11rem)",
            lineHeight: 1,
            color: "#FFF5F0",
            paddingLeft: "100vw",
            paddingRight: "20vw",
          }}
        >
          Brands built to last. Growth by design, by data.
        </p>
      </div>
    </div>
  );
}
