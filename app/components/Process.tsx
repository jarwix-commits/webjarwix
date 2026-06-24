"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    body: "We analyze your business goals, audience, and competition to create a custom roadmap tailored to your market.",
    tags: ["Competitor analysis", "Audience research", "Custom roadmap"],
  },
  {
    number: "02",
    title: "Design & Development",
    body: "Crafting high-impact campaigns or functional websites and automations with precision engineering.",
    tags: ["Brand-aligned design", "Campaign creation", "System architecture"],
  },
  {
    number: "03",
    title: "Launch & Optimize",
    body: "Deploying solutions and continuously refining for maximum performance across every touchpoint.",
    tags: ["A/B testing", "Performance tuning", "Real-time monitoring"],
  },
  {
    number: "04",
    title: "Analyze & Scale",
    body: "Detailed reporting to scale successful strategies. Build, test, learn, repeat.",
    tags: ["Growth dashboards", "Scaling playbooks", "Retro & iteration"],
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Heading lives inside the pinned wrapper — no entry animation to avoid
      // the jump that happens when a mid-fade element suddenly gets position:fixed.

      if (prefersReduced) return;

      const wrapper = wrapperRef.current!;
      const track = trackRef.current!;

      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - wrapper.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          end: () => `+=${track.scrollWidth - wrapper.offsetWidth}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(".progress-fill", { scaleX: self.progress });
          },
        },
      });

      // Animate panel content as each panel enters the viewport during horizontal scroll
      wrapper.querySelectorAll<HTMLElement>(".panel-content").forEach((content, i) => {
        const items = content.querySelectorAll<HTMLElement>(".anim-item");

        if (i === 0) {
          gsap.fromTo(
            items,
            { y: 28, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.11,
              scrollTrigger: { trigger: wrapper, start: "top 78%" },
            }
          );
          return;
        }

        gsap.fromTo(
          items,
          { y: 28, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.1,
            scrollTrigger: {
              trigger: content.closest(".process-panel") as Element,
              containerAnimation: scrollTween,
              start: "left 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="process" ref={sectionRef} className="relative bg-black">

      {/* Pinned wrapper — heading + track together, heading always visible while scrolling */}
      <div
        ref={wrapperRef}
        className="relative overflow-hidden flex flex-col"
        style={{ height: "80vh" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <img
            src="/generated_image/lone figure standing on a dark hilltop holding a single.jpeg"
            alt="Process Background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-black" />
        </div>

        {/* Heading — always visible, no entry animation (avoids pin-jump glitch) */}
        <div className="shrink-0 px-4 sm:px-8 md:px-12 pt-20 sm:pt-12 pb-4 sm:pb-5">
          <p
            className="process-label text-[10px] tracking-[0.22em] uppercase font-semibold mb-3"
            style={{ color: "#FF5A1F" }}
          >
            How we work
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2
              className="process-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl leading-[0.88]"
              style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
            >
              {["Proven", "methodology.", "Sprint speed."].map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h2>
            <p
              className="text-[11px] shrink-0 sm:mb-1 hidden sm:block"
              style={{ color: "rgba(255,245,240,0.25)", letterSpacing: "0.1em" }}
            >
              scroll to explore →
            </p>
          </div>
        </div>

        {/* Track fills remaining height */}
        <div className="flex-1 overflow-hidden relative">
        {/* Horizontal track */}
        <div ref={trackRef} className="flex h-full" style={{ width: "max-content" }}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="process-panel flex-shrink-0 h-full relative"
              style={{
                width: "clamp(300px, 82vw, 760px)",
                marginRight: i < steps.length - 1 ? "clamp(16px, 3vw, 48px)" : "10vw",
                marginLeft: i === 0 ? "max(16px, 4vw)" : 0,
              }}
            >
              {/* Vertical separator line */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-8 bottom-8"
                  style={{ width: "1px", background: "rgba(255,245,240,0.06)" }}
                />
              )}

              {/* Giant watermark number */}
              <span
                className="absolute select-none pointer-events-none"
                style={{
                  fontFamily: '"Hanson Bold", serif',
                  fontSize: "clamp(9rem, 28vw, 28rem)",
                  lineHeight: 0.82,
                  color: "rgba(255,90,31,0.045)",
                  bottom: "-1rem",
                  right: "-0.5rem",
                  zIndex: 0,
                }}
              >
                {step.number}
              </span>

              {/* Panel content */}
              <div
                className="panel-content relative z-10 h-full flex flex-col justify-between"
                style={{ padding: "clamp(24px, 5vw, 64px) clamp(20px, 4vw, 56px)" }}
              >
                {/* Top row: step counter + dot indicators */}
                <div className="anim-item flex items-center justify-between">
                  <span
                    className="text-[10px] tracking-[0.22em] uppercase font-semibold"
                    style={{ color: "rgba(255,90,31,0.65)" }}
                  >
                    {step.number} / 04
                  </span>
                  <div className="flex gap-1.5 items-center">
                    {steps.map((_, j) => (
                      <div
                        key={j}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: j === i ? "20px" : "6px",
                          height: "4px",
                          background:
                            j === i
                              ? "#FF5A1F"
                              : "rgba(255,245,240,0.14)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Middle: title + body */}
                <div>
                  <h3
                    className="anim-item uppercase leading-[0.92] mb-5 sm:mb-6"
                    style={{
                      fontFamily: '"Hanson Bold", serif',
                      color: "#FFF5F0",
                      fontSize: "clamp(1.2rem, 2.4vw, 2rem)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="anim-item text-sm sm:text-base leading-relaxed"
                    style={{
                      color: "rgba(255,245,240,0.62)",
                      maxWidth: "420px",
                    }}
                  >
                    {step.body}
                  </p>
                </div>

                {/* Bottom: tags */}
                <div className="anim-item flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(255,90,31,0.07)",
                        color: "rgba(255,90,31,0.72)",
                        border: "1px solid rgba(255,90,31,0.16)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>{/* /flex-1 track container */}

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "2px", background: "rgba(255,245,240,0.04)" }}
        >
          <div
            className="progress-fill h-full origin-left"
            style={{ background: "#FF5A1F", transform: "scaleX(0)" }}
          />
        </div>
      </div>{/* /wrapperRef */}
    </section>
  );
}
