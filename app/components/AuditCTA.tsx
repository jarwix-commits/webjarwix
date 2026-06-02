"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiArrowRightLine } from "@remixicon/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AuditCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      tl.fromTo(
        ".audit-badge",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      )
        .fromTo(
          ".audit-heading span",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
          "-=0.2"
        )
        .fromTo(
          ".audit-sub",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".audit-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="audit"
      ref={sectionRef}
      className="relative py-4 sm:py-6 px-4 sm:px-6 md:px-8 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl md:rounded-3xl px-8 sm:px-14 md:px-20 py-16 sm:py-20 md:py-28 text-center"
          style={{
            background: "linear-gradient(120deg, #0E0E0E 0%, #1a0800 50%, #2d0e00 100%)",
            border: "1px solid rgba(255,90,31,0.2)",
          }}
        >
          {/* Glow blob */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(255,90,31,0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10">
            {/* Badge */}
            <div
              className="audit-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{
                background: "rgba(255,90,31,0.12)",
                border: "1px solid rgba(255,90,31,0.3)",
                opacity: 0,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#FF5A1F" }}
              />
              <span
                className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase"
                style={{ color: "#FF5A1F" }}
              >
                $120 value — Free
              </span>
            </div>

            {/* Heading */}
            <h2
              className="audit-heading text-4xl md:text-5xl lg:text-5xl xl:text-6xl max-w-4xl mx-auto leading-[0.9] sm:leading-[0.88] mb-6"
              style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
            >
              {["Claim Your", "Free Growth", "Audit."].map(
                (line, i) => (
                  <span key={i} className="block" style={{ opacity: 0 }}>
                    {line}
                  </span>
                )
              )}
            </h2>

            {/* Sub */}
            <p
              className="audit-sub text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-10"
              style={{ color: "rgba(255,245,240,0.55)", opacity: 0 }}
            >
              Get a 30-minute strategy sprint with our senior consultants to map
              the quick wins and long-term growth plays tailored to your brand.
            </p>

            {/* CTA */}
            <div className="audit-cta flex flex-col sm:flex-row items-center justify-center gap-3" style={{ opacity: 0 }}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-2 font-semibold text-sm transition-all duration-300 hover:gap-3"
                style={{
                  background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
                  color: "#FFF5F0",
                  border: "1px solid rgba(255,90,31,0.4)",
                }}
              >
                Claim Free Audit
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(255,245,240,0.1)" }}
                >
                  <RiArrowRightLine size={16} style={{ color: "#FFF5F0" }} />
                </span>
              </a>

              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "rgba(255,245,240,0.5)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#FFF5F0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,245,240,0.5)")
                }
              >
                Or schedule a meeting →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
