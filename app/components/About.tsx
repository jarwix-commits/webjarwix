"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: "AI-First", suffix: "", label: "Strategy & execution" },
  { value: "Global", suffix: "", label: "Markets: US · UK · India" },
  { value: "Scalable", suffix: "", label: "Marketing + Web + AI" },
];

const pillars = [
  {
    title: "Collaborative Specialists",
    body: "Marketers, designers, and builders who plug in as an extension of your team — not a vendor.",
  },
  {
    title: "Custom Roadmaps",
    body: "Sprints shaped around your goals, audiences, and in-house capabilities. No generic playbooks.",
  },
  {
    title: "Outcome Planning",
    body: "Clear success metrics, feedback loops, and retros built into every engagement from day one.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.fromTo(
        ".about-label",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".about-label", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".about-heading span",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.07,
          scrollTrigger: { trigger: ".about-heading", start: "top 85%" },
        }
      );

      // Stat counters
      stats.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;

        const isNumeric = typeof stat.value === "number";

        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => {
            if (!isNumeric || prefersReduced) {
              el.textContent = `${stat.value}${stat.suffix}`;
              return;
            }
            const counter = { val: 0 };
            gsap.to(counter, {
              val: stat.value,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `${Math.round(counter.val)}${stat.suffix}`;
              },
            });
          },
        });
      });

      gsap.fromTo(
        ".stat-card",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".stats-row", start: "top 82%" },
        }
      );

      gsap.fromTo(
        ".pillar-card",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".pillars-row", start: "top 82%" },
        }
      );

      gsap.fromTo(
        ".about-para",
        { opacity: 0 },
        {
          opacity: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: ".about-para", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".about-img",
        { scale: 1.05, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".about-images", start: "top 80%" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl md:rounded-3xl px-6 sm:px-10 md:px-16 py-12 sm:py-16 md:py-24"
          style={{ background: "#101010" }}
        >
          {/* Label */}
          <p
            className="about-label text-[10px] sm:text-xs tracking-[0.22em] uppercase font-semibold mb-6"
            style={{ color: "#FF5A1F", opacity: 0 }}
          >
            Who we are
          </p>

          {/* Main Heading */}
          <h2
            className="about-heading text-4xl md:text-5xl lg:text-5xl xl:text-6xl max-w-4xl leading-[0.9] sm:leading-[0.88] mb-10 sm:mb-16"
            style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
          >
            {[
              "We are Jarwix,",
              "an AI-powered",
              "growth agency.",
            ].map((line, i) => (
              <span
                key={i}
                className={`block ${i === 1 ? "italic" : ""}`}
                style={{
                  fontFamily: i === 1 ? "Georgia, serif" : '"Hanson Bold", serif',
                  fontWeight: i === 1 ? 400 : 700,
                  textTransform: i === 1 ? "none" : "uppercase",
                  opacity: 0,
                }}
              >
                {line}
              </span>
            ))}
          </h2>

          {/* Stats */}
          <div className="stats-row grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12 sm:mb-16">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-card rounded-xl p-6"
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,90,31,0.10)",
                  opacity: 0,
                }}
              >
                <p
                  className="text-4xl sm:text-5xl font-bold mb-1 leading-none"
                  style={{
                    fontFamily: '"Hanson Bold", serif',
                    background: "linear-gradient(120deg, #FFF5F0, #FF5A1F)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <span ref={(el) => { counterRefs.current[i] = el; }}>
                    {stat.value}{stat.suffix}
                  </span>
                </p>
                <p
                  className="text-xs sm:text-sm"
                  style={{ color: "rgba(255,245,240,0.5)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Body paragraph */}
          <p
            className="about-para text-sm sm:text-base max-w-3xl leading-relaxed mb-14 sm:mb-16"
            style={{ color: "rgba(255,245,240,0.55)", opacity: 0 }}
          >
            We are Jarwix — an AI-powered growth agency built for ambitious
            businesses across the US, UK, and India. We combine engineering
            precision with marketing intuition to build full-stack growth
            systems. From AI-powered ad campaigns to fully automated workflows,
            we deliver results that scale. No jargon. No inflated fees. Just
            outcomes that speak for themselves.
          </p>

          {/* Image gallery */}
          <div className="about-images grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 sm:mb-14">
            <div className="about-img sm:col-span-2 rounded-2xl overflow-hidden h-52 sm:h-64 relative" style={{ opacity: 0 }}>
              <img
                src="/generated_image/small team of three figures huddled around a single glowing.jpeg"
                alt="Team working"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
            <div className="about-img sm:col-span-1 rounded-2xl overflow-hidden h-52 sm:h-64 relative" style={{ opacity: 0 }}>
              <img
                src="/generated_image/two figures standing in front of a single illuminated.jpeg"
                alt="Strategy session"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
          </div>

          {/* 3 Pillars */}
          <div className="pillars-row grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="pillar-card rounded-xl p-6"
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,90,31,0.08)",
                  opacity: 0,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mb-4"
                  style={{ background: "#FF5A1F" }}
                />
                <h4
                  className="uppercase text-xs sm:text-sm font-semibold mb-2"
                  style={{
                    fontFamily: '"Hanson Bold", serif',
                    color: "#FFF5F0",
                  }}
                >
                  {pillar.title}
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(255,245,240,0.5)" }}
                >
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
