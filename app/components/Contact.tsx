"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RiArrowRightLine,
  RiMailLine,
  RiMapPinLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from "@remixicon/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".contact-label",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-label", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".contact-heading span",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: ".contact-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".contact-info-item",
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".contact-info", start: "top 82%" },
        }
      );

      gsap.fromTo(
        ".contact-field",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: ".contact-form", start: "top 82%" },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed.");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "#1A1A1A",
    border: "1px solid rgba(255,90,31,0.15)",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "#FFF5F0",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    fontFamily: "'Quicksand', sans-serif",
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "rgba(255,245,240,0.5)",
    marginBottom: "6px",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8"
    >
      <div className="bg-noise absolute inset-0 opacity-[0.1] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p
            className="contact-label text-[10px] sm:text-xs tracking-[0.22em] uppercase font-semibold mb-4"
            style={{ color: "#FF5A1F", opacity: 0 }}
          >
            Get in touch
          </p>
          <h2
            className="contact-heading text-4xl md:text-5xl lg:text-5xl xl:text-6xl max-w-3xl leading-[0.9] sm:leading-[0.88]"
            style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
          >
            {["Let's build", "your growth", "engine."].map((line, i) => (
              <span key={i} className="block" style={{ opacity: 0 }}>
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Left: Info */}
          <div className="contact-info lg:col-span-2 space-y-6">
            <div
              className="contact-info-item flex items-start gap-4 rounded-xl p-5"
              style={{
                background: "#1A1A1A",
                border: "1px solid rgba(255,90,31,0.08)",
                opacity: 0,
              }}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                style={{ background: "rgba(255,90,31,0.12)" }}
              >
                <RiMailLine size={16} style={{ color: "#FF5A1F" }} />
              </div>
              <div>
                <p
                  className="text-[10px] tracking-[0.15em] uppercase font-semibold mb-0.5"
                  style={{ color: "rgba(255,245,240,0.4)" }}
                >
                  Email us
                </p>
                <a
                  href="mailto:info@jarwix.com"
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: "#FFF5F0" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#FF5A1F")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#FFF5F0")
                  }
                >
                  info@jarwix.com
                </a>
              </div>
            </div>

            <div
              className="contact-info-item flex items-start gap-4 rounded-xl p-5"
              style={{
                background: "#1A1A1A",
                border: "1px solid rgba(255,90,31,0.08)",
                opacity: 0,
              }}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                style={{ background: "rgba(255,90,31,0.12)" }}
              >
                <RiMapPinLine size={16} style={{ color: "#FF5A1F" }} />
              </div>
              <div>
                <p
                  className="text-[10px] tracking-[0.15em] uppercase font-semibold mb-0.5"
                  style={{ color: "rgba(255,245,240,0.4)" }}
                >
                  Location
                </p>
                <p className="text-sm" style={{ color: "#FFF5F0" }}>
                  444 Alaska Avenue Suite
                  <br />
                  Torrance, CA 90503, USA
                </p>
              </div>
            </div>

            <div
              className="contact-info-item rounded-xl p-5"
              style={{
                background: "#1A1A1A",
                border: "1px solid rgba(255,90,31,0.08)",
                opacity: 0,
              }}
            >
              <p
                className="text-[10px] tracking-[0.15em] uppercase font-semibold mb-3"
                style={{ color: "rgba(255,245,240,0.4)" }}
              >
                Follow us
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Instagram", icon: RiInstagramLine, href: "#" },
                  { label: "LinkedIn", icon: RiLinkedinBoxLine, href: "#" },
                  { label: "X", icon: RiTwitterXLine, href: "#" },
                  { label: "YouTube", icon: RiYoutubeLine, href: "#" },
                ].map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                    style={{
                      background: "rgba(255,245,240,0.05)",
                      border: "1px solid rgba(255,245,240,0.08)",
                      color: "rgba(255,245,240,0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,90,31,0.3)";
                      e.currentTarget.style.color = "#FF5A1F";
                      e.currentTarget.style.background = "rgba(255,90,31,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,245,240,0.08)";
                      e.currentTarget.style.color = "rgba(255,245,240,0.5)";
                      e.currentTarget.style.background = "rgba(255,245,240,0.05)";
                    }}
                  >
                    <Icon size={13} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form lg:col-span-3">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center h-full min-h-[400px] rounded-2xl p-10 text-center"
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,90,31,0.15)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "rgba(255,90,31,0.12)" }}
                >
                  <RiArrowRightLine size={24} style={{ color: "#FF5A1F" }} />
                </div>
                <h3
                  className="uppercase text-xl mb-3"
                  style={{
                    fontFamily: '"Hanson Bold", serif',
                    color: "#FFF5F0",
                  }}
                >
                  Message received!
                </h3>
                <p
                  className="text-sm max-w-sm"
                  style={{ color: "rgba(255,245,240,0.5)" }}
                >
                  Our team will contact you soon. In the meantime, feel free to
                  schedule a meeting directly.
                </p>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 text-sm font-medium"
                  style={{ color: "#FF5A1F" }}
                >
                  Schedule a meeting →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="contact-field" style={{ opacity: 0 }}>
                    <label style={labelStyle}>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Smith"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#FF5A1F";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(255,90,31,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor =
                          "rgba(255,90,31,0.15)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div className="contact-field" style={{ opacity: 0 }}>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@company.com"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#FF5A1F";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(255,90,31,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor =
                          "rgba(255,90,31,0.15)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="contact-field" style={{ opacity: 0 }}>
                    <label style={labelStyle}>
                      Phone{" "}
                      <span style={{ color: "rgba(255,245,240,0.3)" }}>
                        (optional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 234 567 890"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#FF5A1F";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(255,90,31,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor =
                          "rgba(255,90,31,0.15)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div className="contact-field" style={{ opacity: 0 }}>
                    <label style={labelStyle}>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="I need help with..."
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#FF5A1F";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(255,90,31,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor =
                          "rgba(255,90,31,0.15)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <div className="contact-field" style={{ opacity: 0 }}>
                  <label style={labelStyle}>Your Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your business and goals..."
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#FF5A1F";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(255,90,31,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,90,31,0.15)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {error && (
                  <p className="text-xs px-1" style={{ color: "#FF5A1F" }}>
                    {error}
                  </p>
                )}

                <div
                  className="contact-field flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  style={{ opacity: 0 }}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-2 font-semibold text-sm transition-all duration-300 hover:gap-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
                      color: "#FFF5F0",
                      border: "1px solid rgba(255,90,31,0.4)",
                    }}
                  >
                    {loading ? "Sending…" : "Send Message"}
                    <span
                      className="flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "rgba(255,245,240,0.1)" }}
                    >
                      <RiArrowRightLine size={16} style={{ color: "#FFF5F0" }} />
                    </span>
                  </button>

                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: "rgba(255,245,240,0.45)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#FFF5F0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "rgba(255,245,240,0.45)")
                    }
                  >
                    Or schedule a meeting →
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
