"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimatedServiceHeading({ title }: { title: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // ScrollTrigger animation
    gsap.fromTo(
      ".split-char-heading",
      { y: 80, opacity: 0, rotateZ: 8, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        rotateZ: 0, 
        scale: 1,
        duration: 1.2, 
        stagger: 0.02, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%", // Trigger slightly before it comes fully into view
        }
      }
    );
  }, { scope: containerRef });

  // Helper to split text by words then characters.
  // We wrap each word in an inline-block to prevent mid-word line breaks,
  // then we wrap each character for the stagger animation.
  const splitWordsAndChars = (text: string) => {
    return text.split(" ").map((word, wIdx) => (
      <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden pb-2 -mb-2">
        {word.split("").map((char, cIdx) => (
          <span 
            key={cIdx} 
            className="split-char-heading inline-block"
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <h2
      ref={containerRef}
      className="text-4xl sm:text-5xl md:text-6xl leading-[0.9] mb-6 flex flex-wrap"
      style={{
        fontFamily: '"Hanson Bold", serif',
        color: "#FFF5F0",
      }}
    >
      {splitWordsAndChars(title)}
    </h2>
  );
}
