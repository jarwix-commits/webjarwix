"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiTwitterXLine,
  RiYoutubeLine,
  RiFacebookLine,
} from "@remixicon/react";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Web & SEO Solutions", href: "/services/web-seo" },
  { label: "Creative & Design", href: "/services/creative-design" },
  { label: "Automation & AI", href: "/services/automation-ai" },
];

const socialLinks = [
  { label: "Instagram", icon: RiInstagramLine, href: "https://instagram.com" },
  { label: "LinkedIn", icon: RiLinkedinBoxLine, href: "https://linkedin.com" },
  { label: "X (Twitter)", icon: RiTwitterXLine, href: "https://x.com" },
  { label: "YouTube", icon: RiYoutubeLine, href: "https://youtube.com" },
  { label: "Facebook", icon: RiFacebookLine, href: "https://facebook.com" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to subscribe");
      setStatus("success");
      setMessage("Subscribed successfully!");
      setEmail("");
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "An error occurred");
    }
  };

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".footer-col",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".footer-grid", start: "top 90%" },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative bg-black px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 pb-8"
      style={{ borderTop: "1px solid rgba(255,245,240,0.06)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main footer grid */}
        <div className="footer-grid grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 mb-14">
          {/* Brand col */}
          <div className="footer-col col-span-2 md:col-span-2 pr-0 md:pr-12" style={{ opacity: 0 }}>
            <div className="mb-4">
              <img src="/logo.svg" alt="Jarwix" className="h-5 w-auto" />
            </div>
            <p
              className="text-xs leading-relaxed mb-5"
              style={{ color: "rgba(255,245,240,0.4)" }}
            >
              Helping businesses grow through innovative digital solutions and
              strategic marketing.
            </p>
            <p
              className="text-[10px] tracking-[0.12em] uppercase font-semibold mb-8"
              style={{ color: "#FF5A1F" }}
            >
              Elevate With AI. ™
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-semibold mb-3 text-[#FFF5F0]">Subscribe to our newsletter</p>
              <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-[#1A1A1A] border border-[rgba(255,90,31,0.15)] rounded-full px-4 py-2.5 text-xs text-[#FFF5F0] outline-none focus:border-[#FF5A1F] transition-colors pr-10"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="absolute right-1 top-1 bottom-1 w-8 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50"
                  style={{ background: "#FF5A1F" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF5F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
              {message && (
                <p className={`text-[10px] mt-2 px-3 ${status === "success" ? "text-green-400" : "text-[#FF5A1F]"}`}>
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col" style={{ opacity: 0 }}>
            <p
              className="text-[10px] tracking-[0.18em] uppercase font-semibold mb-5"
              style={{ color: "rgba(255,245,240,0.35)" }}
            >
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs transition-colors duration-200"
                    style={{ color: "rgba(255,245,240,0.55)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#FFF5F0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,245,240,0.55)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col" style={{ opacity: 0 }}>
            <p
              className="text-[10px] tracking-[0.18em] uppercase font-semibold mb-5"
              style={{ color: "rgba(255,245,240,0.35)" }}
            >
              Services
            </p>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs transition-colors duration-200"
                    style={{ color: "rgba(255,245,240,0.55)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#FFF5F0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,245,240,0.55)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="footer-col" style={{ opacity: 0 }}>
            <p
              className="text-[10px] tracking-[0.18em] uppercase font-semibold mb-5"
              style={{ color: "rgba(255,245,240,0.35)" }}
            >
              Follow us
            </p>
            <ul className="space-y-2.5">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs transition-colors duration-200"
                    style={{ color: "rgba(255,245,240,0.55)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#FF5A1F")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,245,240,0.55)")
                    }
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(255,245,240,0.06)" }}
        >
          <p
            className="text-[11px]"
            style={{ color: "rgba(255,245,240,0.3)" }}
          >
            © 2026 Jarwix. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (policy) => (
                <a
                  key={policy}
                  href="/"
                  className="text-[11px] transition-colors duration-200"
                  style={{ color: "rgba(255,245,240,0.3)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,245,240,0.7)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,245,240,0.3)")
                  }
                >
                    {policy}
                  </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
