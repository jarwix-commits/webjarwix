"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { RiArrowRightLine, RiMenuLine, RiCloseLine } from "@remixicon/react";
import Link from "next/link";
import MultiStepAuditForm from "./MultiStepAuditForm";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleOpenAudit = () => setIsAuditModalOpen(true);
    window.addEventListener("open-audit-modal", handleOpenAudit);
    return () => window.removeEventListener("open-audit-modal", handleOpenAudit);
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    if (menuOpen) {
      gsap.fromTo(
        menu,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
      );
      gsap.fromTo(
        menu.querySelectorAll(".mobile-link"),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: "power3.out", delay: 0.05 }
      );
    } else {
      gsap.to(menu, { opacity: 0, y: -6, duration: 0.2, ease: "power2.in" });
    }
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <div
          ref={navRef}
          className="flex items-center gap-4 rounded-full px-4 py-2 transition-all duration-300 w-full max-w-xl sm:w-auto sm:max-w-none"
          style={{
            background: scrolled ? "rgba(14,14,14,0.92)" : "rgba(14,14,14,0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,90,31,0.12)",
            boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logo.svg" alt="Jarwix" className="h-5 w-auto" />
          </Link>

          <div className="hidden sm:block w-px h-4 bg-white/10" />

          {/* Desktop Links */}
          <nav className="hidden sm:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium transition-colors duration-200"
                style={{ color: "rgba(255,245,240,0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFF5F0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,245,240,0.6)")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA — desktop */}
          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="hidden sm:inline-flex group items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 hover:gap-2.5 ml-1 cursor-pointer"
            style={{
              background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
              color: "#FFF5F0",
              }}
          >
            Free Audit
            <RiArrowRightLine size={12} />
          </button>

          {/* Mobile: CTA + hamburger */}
          <div className="flex sm:hidden items-center gap-2 ml-auto">
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold cursor-pointer"
              style={{
                background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)",
                color: "#FFF5F0",
                }}
            >
              Free Audit
              <RiArrowRightLine size={12} />
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center justify-center rounded-full px-3 py-1.5 cursor-pointer transition-colors duration-200"
              style={{
                background: "rgba(255,245,240,0.07)",
                border: "1px solid rgba(255,245,240,0.1)",
                color: "#FFF5F0",
              }}
              aria-label="Toggle menu"
            >
              {menuOpen
                ? <RiCloseLine size={14} />
                : <RiMenuLine size={14} />
              }
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-[72px] left-4 right-4 z-40 rounded-2xl p-5 sm:hidden"
          style={{
            background: "rgba(14,14,14,0.97)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,90,31,0.15)",
            opacity: 0,
          }}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="mobile-link flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-colors duration-200"
                style={{ color: "rgba(255,245,240,0.7)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,90,31,0.08)";
                  e.currentTarget.style.color = "#FFF5F0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,245,240,0.7)";
                }}
              >
                {link.label}
                <RiArrowRightLine size={14} style={{ opacity: 0.4 }} />
              </Link>
            ))}
          </nav>

          <div
            className="mt-4 pt-4"
            style={{ borderTop: "1px solid rgba(255,245,240,0.06)" }}
          >
            <a
              href="mailto:info@jarwix.com"
              className="mobile-link text-xs"
              style={{ color: "rgba(255,245,240,0.35)" }}
            >
              info@jarwix.com
            </a>
          </div>
        </div>
      )}

      {/* Free Audit Modal */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
          <div className="relative w-full max-w-lg bg-[#0A0A0A] border border-[rgba(255,90,31,0.2)] rounded-3xl p-8 shadow-2xl overflow-hidden">
            <button
              onClick={() => setIsAuditModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-[#FF5A1F] transition-colors cursor-pointer z-10"
            >
              <RiCloseLine size={24} />
            </button>

            <MultiStepAuditForm isModal={true} onClose={() => setIsAuditModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
