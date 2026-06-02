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
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=900&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80&auto=format&fit=crop",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-black min-h-screen">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col justify-end px-4 sm:px-8 md:px-12 pb-16 sm:pb-24 pt-32 sm:pt-40 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(255,90,31,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="bg-noise absolute inset-0 opacity-[0.08] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <p
            className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-5"
            style={{ color: "#FF5A1F" }}
          >
            What we offer
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88]"
              style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
            >
              Growth
              <br />
              services.
              <br />
              <span style={{ color: "#FF5A1F" }}>Built different.</span>
            </h1>
            <div className="max-w-md">
              <p
                className="text-sm sm:text-base leading-relaxed mb-6"
                style={{ color: "rgba(255,245,240,0.55)" }}
              >
                Four interconnected service pillars — each one powered by AI,
                strategy, and execution — designed to work together and compound
                your growth.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full pl-5 pr-2 py-2 text-xs font-semibold transition-all duration-300 hover:gap-3"
                  style={{
                    background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
                    color: "#FFF5F0",
                    border: "1px solid rgba(255,90,31,0.4)",
                  }}
                >
                  Start a project
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-full"
                    style={{ background: "rgba(255,245,240,0.1)" }}
                  >
                    <RiArrowRightLine size={13} />
                  </span>
                </Link>
                <Link
                  href="/#audit"
                  className="text-xs font-semibold transition-colors duration-200 hover:opacity-100"
                  style={{ color: "rgba(255,245,240,0.45)" }}
                >
                  Free audit →
                </Link>
              </div>
            </div>
          </div>
        </div>
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
                  <h2
                    className="text-4xl sm:text-5xl md:text-6xl leading-[0.9] mb-6"
                    style={{
                      fontFamily: '"Hanson Bold", serif',
                      color: "#FFF5F0",
                    }}
                  >
                    {service.title}
                  </h2>
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
                        border: "1px solid rgba(255,90,31,0.35)",
                      }}
                    >
                      Explore service
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-full"
                        style={{ background: "rgba(255,245,240,0.1)" }}
                      >
                        <RiArrowRightLine size={13} />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.65) saturate(0.8)" }}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,90,31,0.1) 0%, transparent 60%)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Number watermark */}
                  <span
                    className="absolute bottom-4 right-5 select-none pointer-events-none"
                    style={{
                      fontFamily: '"Hanson Bold", serif',
                      fontSize: "clamp(4rem, 10vw, 8rem)",
                      lineHeight: 1,
                      color: "rgba(255,90,31,0.1)",
                    }}
                  >
                    {service.number}
                  </span>
                </div>
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
            <Link
              href="/#audit"
              className="inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-2.5 text-sm font-semibold transition-all duration-300 hover:gap-3"
              style={{
                background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
                color: "#FFF5F0",
                border: "1px solid rgba(255,90,31,0.4)",
              }}
            >
              Claim Free Audit
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full"
                style={{ background: "rgba(255,245,240,0.1)" }}
              >
                <RiArrowRightLine size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
