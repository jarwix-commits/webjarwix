"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimatedServiceImage({
  src,
  alt,
  number,
}: {
  src: string;
  alt: string;
  number: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", // Starts animating when image is 85% down the viewport
      },
    });

    // Animate the mask reveal
    tl.fromTo(
      ".service-img-mask",
      { clipPath: "inset(100% 0% 0% 0%)" }, // Hidden at bottom
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut" }
    );

    // Parallax scale down the image itself
    tl.fromTo(
      ".service-img",
      { scale: 1.3 },
      { scale: 1, duration: 1.6, ease: "power3.out" },
      0 // Start at the same time as mask reveal
    );

    // Fade up the watermark number
    tl.fromTo(
      ".service-number-watermark",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="service-img-mask relative rounded-3xl overflow-hidden aspect-[4/3]">
      <img
        src={src}
        alt={alt}
        className="service-img w-full h-full object-cover"
        style={{ filter: "brightness(0.65) saturate(0.8)" }}
        loading="lazy"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,90,31,0.1) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      {/* Number watermark */}
      <span
        className="service-number-watermark absolute bottom-4 right-5 select-none pointer-events-none"
        style={{
          fontFamily: '"Hanson Bold", serif',
          fontSize: "clamp(4rem, 10vw, 8rem)",
          lineHeight: 1,
          color: "rgba(255,90,31,0.1)",
        }}
      >
        {number}
      </span>
    </div>
  );
}
