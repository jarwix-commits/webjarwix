"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RiArrowRightLine,
  RiCheckLine,
  RiMegaphoneLine,
  RiGlobalLine,
  RiPenNibLine,
  RiRobotLine,
} from "@remixicon/react";
import type { RemixiconComponentType } from "@remixicon/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services: {
  number: string;
  title: string;
  description: string;
  items: string[];
  icon: RemixiconComponentType;
  href: string;
}[] = [
  {
    number: "01",
    title: "Digital Marketing & Advertising",
    description: "Performance-led campaigns focused on measurable results across every channel.",
    items: [
      "Social media strategy & management",
      "Meta, Google & YouTube ads",
      "Email & WhatsApp marketing",
      "Multi-channel ad management",
    ],
    icon: RiMegaphoneLine,
    href: "/services/digital-marketing",
  },
  {
    number: "02",
    title: "Web & SEO Solutions",
    description: "High-performance websites built for user experience, speed, and conversions.",
    items: [
      "Website design & development",
      "Local & technical SEO audits",
      "Conversion rate optimization",
      "Landing pages & sales funnels",
    ],
    icon: RiGlobalLine,
    href: "/services/web-seo",
  },
  {
    number: "03",
    title: "Creative & Brand Design",
    description: "Memorable brand experiences through innovative design and motion.",
    items: [
      "Logo & visual identity",
      "Brand strategy & style guides",
      "Social media graphics",
      "Motion graphics & explainer reels",
    ],
    icon: RiPenNibLine,
    href: "/services/creative-design",
  },
  {
    number: "04",
    title: "Automation & AI Integration",
    description: "Streamlining operations and enhancing productivity with intelligent systems.",
    items: [
      "CRM & workflow automation",
      "AI agents for content & outreach",
      "WhatsApp broadcast automation",
      "Process mapping & hyper-automation",
    ],
    icon: RiRobotLine,
    href: "/services/automation-ai",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".services-label",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".services-label", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".services-heading span",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".services-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".service-card",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".services-grid", start: "top 80%" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8"
    >
      <div className="bg-noise absolute inset-0 opacity-[0.12] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <p
            className="services-label text-[10px] sm:text-xs tracking-[0.22em] uppercase font-semibold mb-4"
            style={{ color: "#FF5A1F", opacity: 0 }}
          >
            What we do
          </p>
          <h2
            className="services-heading text-4xl md:text-5xl lg:text-5xl xl:text-6xl max-w-3xl leading-[0.9] sm:leading-[0.88]"
            style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
          >
            {["Growth", "services", "built for", "bold teams."].map(
              (word, i) => (
                <span key={i} className="block" style={{ opacity: 0 }}>
                  {word}
                </span>
              )
            )}
          </h2>
        </div>

        {/* Bento grid: mobile=1col, tablet=2col, desktop=3col with image spanning 2 rows */}
        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

          {/* Image card — full col on mobile/tablet, spans 2 rows on desktop */}
          <div
            className="service-card relative rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[280px] lg:row-span-2 lg:min-h-0"
            style={{ opacity: 0 }}
          >
            <img
              src="/generated_image/tiny figure seated at a single glowing screen on a dark.jpeg"
              alt="Growth analytics"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/10 to-transparent" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, transparent 50%, rgba(255,90,31,0.12))" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p
                className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-2"
                style={{ color: "rgba(255,90,31,0.9)" }}
              >
                AI-Powered Growth
              </p>
              <p
                className="text-xl sm:text-2xl leading-[1.05]"
                style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
              >
                Your growth engine. Running 24/7.
              </p>
            </div>
          </div>

          {/* 4 service cards — fill remaining 2 cols × 2 rows on desktop */}
          {services.map((service) => (
            <div
              key={service.number}
              className="service-card group flex flex-col justify-between rounded-2xl p-5 sm:p-6 cursor-pointer"
              style={{
                background: "#1A1A1A",
                border: "1px solid rgba(255,90,31,0.10)",
                opacity: 0,
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,90,31,0.35)";
                el.style.boxShadow = "0 0 32px rgba(255,90,31,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,90,31,0.10)";
                el.style.boxShadow = "none";
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(255,90,31,0.10)",
                      border: "1px solid rgba(255,90,31,0.18)",
                    }}
                  >
                    <service.icon size={20} style={{ color: "#FF5A1F" }} />
                  </div>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "rgba(255,245,240,0.25)" }}
                  >
                    {service.number}
                  </span>
                </div>

                <h3
                  className="uppercase text-sm font-semibold mb-2 leading-[1.1]"
                  style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ color: "rgba(255,245,240,0.45)" }}
                >
                  {service.description}
                </p>

                <ul className="space-y-1.5">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <RiCheckLine size={13} className="shrink-0 mt-0.5" style={{ color: "#FF5A1F" }} />
                      <span className="text-xs" style={{ color: "rgba(255,245,240,0.5)" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={service.href}
                className="inline-flex items-center gap-1.5 text-xs mt-5 group/link hover:gap-2.5 transition-all duration-200"
                style={{ color: "#FF5A1F" }}
              >
                Learn more
                <RiArrowRightLine size={12} className="-rotate-45 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
