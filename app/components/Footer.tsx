"use client";

import { useRef } from "react";
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

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  { label: "Digital Marketing", href: "#services" },
  { label: "Web & SEO Solutions", href: "#services" },
  { label: "Creative & Design", href: "#services" },
  { label: "Automation & AI", href: "#services" },
];

const socialLinks = [
  { label: "Instagram", icon: RiInstagramLine, href: "#" },
  { label: "LinkedIn", icon: RiLinkedinBoxLine, href: "#" },
  { label: "X (Twitter)", icon: RiTwitterXLine, href: "#" },
  { label: "YouTube", icon: RiYoutubeLine, href: "#" },
  { label: "Facebook", icon: RiFacebookLine, href: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

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
        <div className="footer-grid grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-14">
          {/* Brand col */}
          <div className="footer-col col-span-2 md:col-span-1" style={{ opacity: 0 }}>
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
              className="text-[10px] tracking-[0.12em] uppercase font-semibold"
              style={{ color: "#FF5A1F" }}
            >
              Elevate With AI. ™
            </p>
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
                  <a
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
                  </a>
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
                  <a
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
                  </a>
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
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[11px] transition-colors duration-200"
                  style={{ color: "rgba(255,245,240,0.3)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,245,240,0.7)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,245,240,0.3)")
                  }
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
