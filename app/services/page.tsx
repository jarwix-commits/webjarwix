import type { Metadata } from "next";
import Link from "next/link";
import {
  RiMegaphoneLine,
  RiGlobalLine,
  RiPenNibLine,
  RiRobotLine,
  RiArrowRightLine,
  RiCheckLine,
} from "@remixicon/react";
import ServicesHero from "./ServicesHero";
import AnimatedServiceHeading from "./AnimatedServiceHeading";
import AnimatedServiceImage from "./AnimatedServiceImage";
import AuditModalTrigger from "../components/AuditModalTrigger";

export const metadata: Metadata = {
  title: "Services — Jarwix",
  description:
    "AI-powered growth services: digital marketing, web & SEO, creative design, and automation & AI. Built for ambitious brands in the US, UK, and India.",
};

const services = [
  {
    number: "01",
    title: "Digital Marketing & Advertising",
    tagline: "Performance-led. Results-obsessed.",
    description:
      "AI-powered campaigns across every major channel — social, search, email, and messaging — built to generate leads, reduce cost-per-acquisition, and compound results over time.",
    icon: RiMegaphoneLine,
    href: "/services/digital-marketing",
    offerings: [
      "Social media strategy & management",
      "Meta, Google & YouTube ads",
      "Email & WhatsApp automation",
      "Remarketing & retargeting",
      "Analytics & reporting",
    ],
    stat: { value: "3.2×", label: "Average ROAS improvement" },
    image:
      "/generated_image/lone marketer on dark floating island, single tablet glowing amber, vast dark space, one beam of light upward, isometric aerial, minimal.jpeg",
  },
  {
    number: "02",
    title: "Web & SEO Solutions",
    tagline: "Built for speed, trust, and conversions.",
    description:
      "High-performance websites and deep SEO strategies that turn traffic into revenue. We build sites that rank, load fast, and convert visitors into customers.",
    icon: RiGlobalLine,
    href: "/services/web-seo",
    offerings: [
      "Website design & development",
      "Local & technical SEO audits",
      "Conversion rate optimisation",
      "Landing pages & sales funnels",
      "Core Web Vitals optimisation",
    ],
    stat: { value: "↑220%", label: "Average organic traffic growth" },
    image:
      "/generated_image/single glowing wireframe structure rising from dark ocean, one tiny figure beside it, amber light, vast empty sky, cinematic aerial.jpeg",
  },
  {
    number: "03",
    title: "Creative & Brand Design",
    tagline: "Brands impossible to ignore.",
    description:
      "Strategic design that builds recognition and trust. From logo and identity systems to motion graphics and social content, we make your brand unforgettable.",
    icon: RiPenNibLine,
    href: "/services/creative-design",
    offerings: [
      "Logo & visual identity",
      "Brand strategy & style guides",
      "Social media graphics",
      "Motion graphics & reels",
      "Pitch decks & presentations",
    ],
    stat: { value: "100+", label: "Brands designed & launched" },
    image:
      "/generated_image/artist standing before single enormous blank canvas glowing amber, dark studio, minimal.jpeg",
  },
  {
    number: "04",
    title: "Automation & AI Integration",
    tagline: "Systems that run 24/7 so you don't have to.",
    description:
      "Streamline operations and eliminate manual work with intelligent automations. From CRM workflows to AI agents, we build growth infrastructure that scales.",
    icon: RiRobotLine,
    href: "/services/automation-ai",
    offerings: [
      "CRM & workflow automation",
      "AI agents for content & outreach",
      "WhatsApp broadcast automation",
      "Process mapping & hyper-automation",
      "Custom AI integrations",
    ],
    stat: { value: "↓68%", label: "Reduction in manual work hours" },
    image:
      "/generated_image/lone robotic arm emerging from dark void, single glowing amber.jpeg",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-black min-h-screen">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col justify-end px-4 sm:px-8 md:px-12 pb-16 sm:pb-24 pt-32 sm:pt-40 overflow-hidden">
        
        {/* Full-bleed background image for the Services index page */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/generated_image/lone engineer on dark hilltop, single massive glowing machine rising behind them, amber and gold light, epic scale, vast sky, isometric aerial..jpg"
            alt="Growth Services"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.7) saturate(0.8)" }}
            loading="eager"
          />
          {/* Left-heavy dark overlay — keeps text readable, reveals image right */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(14,14,14,0.98) 0%, rgba(14,14,14,0.92) 30%, rgba(14,14,14,0.65) 60%, rgba(14,14,14,0.2) 100%)",
            }}
          />
          {/* Top + bottom fades */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>

        <div className="bg-noise absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay" />

        <ServicesHero />
      </section>

      {/* ── Service Sections ───────────────────────────────────────── */}
      {services.map((service, i) => {
        const Icon = service.icon;
        const isEven = i % 2 === 0;

        return (
          <section
            key={service.number}
            className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-t"
            style={{ borderColor: "rgba(255,245,240,0.06)" }}
          >
            <div className="max-w-7xl mx-auto">

              {/* Service header row */}
              <div className="flex items-start justify-between mb-10 sm:mb-14 gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(255,90,31,0.1)",
                      border: "1px solid rgba(255,90,31,0.2)",
                    }}
                  >
                    <Icon size={18} style={{ color: "#FF5A1F" }} />
                  </div>
                  <span
                    className="text-xs font-medium tracking-[0.1em]"
                    style={{ color: "rgba(255,245,240,0.3)" }}
                  >
                    {service.number} / 04
                  </span>
                </div>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 hover:gap-2.5 shrink-0"
                  style={{ color: "#FF5A1F" }}
                >
                  View service
                  <RiArrowRightLine size={12} className="-rotate-45" />
                </Link>
              </div>

              {/* Two-column layout */}
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  !isEven ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Content */}
                <div>
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-3"
                    style={{ color: "rgba(255,90,31,0.7)" }}
                  >
                    {service.tagline}
                  </p>
                  <AnimatedServiceHeading title={service.title} />
                  <p
                    className="text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
                    style={{ color: "rgba(255,245,240,0.55)" }}
                  >
                    {service.description}
                  </p>

                  {/* Offerings list */}
                  <ul className="space-y-2.5 mb-8">
                    {service.offerings.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <RiCheckLine
                          size={14}
                          className="shrink-0 mt-0.5"
                          style={{ color: "#FF5A1F" }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: "rgba(255,245,240,0.6)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Stat + CTA */}
                  <div className="flex items-center gap-6 flex-wrap">
                    <div
                      className="rounded-2xl px-5 py-4"
                      style={{
                        background: "#111",
                        border: "1px solid rgba(255,90,31,0.12)",
                      }}
                    >
                      <p
                        className="text-2xl sm:text-3xl font-bold leading-none mb-1"
                        style={{
                          fontFamily: '"Hanson Bold", serif',
                          background:
                            "linear-gradient(120deg, #FFF5F0, #FF5A1F)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {service.stat.value}
                      </p>
                      <p
                        className="text-[10px] uppercase tracking-wider font-semibold"
                        style={{ color: "rgba(255,245,240,0.4)" }}
                      >
                        {service.stat.label}
                      </p>
                    </div>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 rounded-full pl-5 pr-2 py-2 text-xs font-semibold transition-all duration-300 hover:gap-3"
                      style={{
                        background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
                        color: "#FFF5F0",
                        
                      }}
                    >
                      Explore service
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-full"
                        style={{ background: "rgba(0,0,0,0.15)" }}
                      >
                        <RiArrowRightLine size={13} />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Animated Image Component */}
                <AnimatedServiceImage
                  src={service.image}
                  alt={service.title}
                  number={service.number}
                />
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Bottom CTA ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl md:rounded-3xl px-8 sm:px-16 py-16 sm:py-24 text-center"
            style={{
              background:
                "linear-gradient(120deg, #0E0E0E 0%, #1a0800 50%, #2d0e00 100%)",
              border: "1px solid rgba(255,90,31,0.2)",
            }}
          >
            <p
              className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-5"
              style={{ color: "rgba(255,90,31,0.7)" }}
            >
              Not sure where to start?
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl leading-[0.9] mb-5 max-w-3xl mx-auto"
              style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
            >
              Get a free growth audit.
            </h2>
            <p
              className="text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed"
              style={{ color: "rgba(255,245,240,0.5)" }}
            >
              In 30 minutes we'll map your biggest growth opportunities across all
              four service pillars — no commitment required.
            </p>
            <AuditModalTrigger
              className="inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-2.5 text-sm font-semibold transition-all duration-300 hover:gap-3"
              style={{
                background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
                color: "#FFF5F0",
                
              }}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
