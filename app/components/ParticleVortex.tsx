"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiArrowRightLine } from "@remixicon/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ORANGE     = "#FF5A1F";
const CREAM      = "#FFF5F0";
const ORANGE_DIM = "rgba(255,90,31,0.65)";
const CREAM_DIM  = "rgba(255,245,240,0.5)";
const PALETTE    = [ORANGE, CREAM, ORANGE, ORANGE_DIM, CREAM, ORANGE, CREAM_DIM, ORANGE];

function makeShape(type: number, size = 120): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = size; c.height = size;
  const ctx = c.getContext("2d")!;
  const color = PALETTE[type % PALETTE.length];
  const cx = size / 2, cy = size / 2, r = size * 0.36;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(3, size / 7);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  switch (type % 8) {
    case 0: // Asterisk
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r * 0.22, cy + Math.sin(a) * r * 0.22);
        ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.2, 0, Math.PI * 2); ctx.fill();
      break;
    case 1: // Arrow ↑
      ctx.beginPath(); ctx.moveTo(cx, cy + r); ctx.lineTo(cx, cy - r * 0.3); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.55, cy - r * 0.15);
      ctx.lineTo(cx, cy - r * 0.85);
      ctx.lineTo(cx + r * 0.55, cy - r * 0.15);
      ctx.stroke(); break;
    case 2: // Diamond
      ctx.beginPath();
      ctx.moveTo(cx, cy - r); ctx.lineTo(cx + r * 0.62, cy);
      ctx.lineTo(cx, cy + r); ctx.lineTo(cx - r * 0.62, cy);
      ctx.closePath(); ctx.fill(); break;
    case 3: // Plus
      ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke(); break;
    case 4: // Circle
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.72, 0, Math.PI * 2); ctx.fill(); break;
    case 5: // Lightning
      ctx.beginPath();
      ctx.moveTo(cx + r * 0.32, cy - r);
      ctx.lineTo(cx - r * 0.08, cy - r * 0.05);
      ctx.lineTo(cx + r * 0.28, cy - r * 0.05);
      ctx.lineTo(cx - r * 0.32, cy + r);
      ctx.lineTo(cx + r * 0.08, cy + r * 0.05);
      ctx.lineTo(cx - r * 0.28, cy + r * 0.05);
      ctx.closePath(); ctx.fill(); break;
    case 6: // X
      ctx.beginPath(); ctx.moveTo(cx - r * 0.7, cy - r * 0.7); ctx.lineTo(cx + r * 0.7, cy + r * 0.7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + r * 0.7, cy - r * 0.7); ctx.lineTo(cx - r * 0.7, cy + r * 0.7); ctx.stroke(); break;
    case 7: // 4-point star
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const rad = i % 2 === 0 ? r : r * 0.38;
        const x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.fill(); break;
  }
  return c;
}

export default function ParticleVortex() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  // ── Canvas particle animation ─────────────────────────────
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let cw = (c.width  = window.innerWidth);
    let ch = (c.height = window.innerHeight);
    let radius = Math.max(cw, ch);

    const shapes = Array.from({ length: 8 }, (_, i) => makeShape(i, 48));
    const COUNT  = 99;
    const particles = Array.from({ length: COUNT }, (_, i) => ({
      x: 0, y: 0, scale: 0, rotate: 0,
      img: shapes[i % shapes.length],
    }));

    function draw() {
      particles.sort((a, b) => a.scale - b.scale);
      ctx.clearRect(0, 0, cw, ch);
      particles.forEach((p) => {
        if (p.scale <= 0) return;
        ctx.save();
        ctx.translate(cw / 2, ch / 2);
        ctx.rotate(p.rotate);
        ctx.globalAlpha = Math.min(1, p.scale * 2);
        ctx.drawImage(
          p.img,
          p.x - (p.img.width  * p.scale) / 2,
          p.y - (p.img.height * p.scale) / 2,
          p.img.width  * p.scale,
          p.img.height * p.scale,
        );
        ctx.restore();
      });
    }

    const tl = gsap.timeline({ onUpdate: draw })
      .fromTo(particles,
        {
          x: (i) => { const a = (i / COUNT) * Math.PI * 2 - Math.PI / 2; return Math.cos(a * 10) * radius; },
          y: (i) => { const a = (i / COUNT) * Math.PI * 2 - Math.PI / 2; return Math.sin(a * 10) * radius; },
          scale: 1.4, rotate: 0,
        },
        { duration: 5, ease: "sine", x: 0, y: 0, scale: 0, rotate: -2, stagger: { each: -0.05, repeat: -1 } },
        0
      )
      .seek(99);

    const onResize = () => {
      cw = c.width = window.innerWidth;
      ch = c.height = window.innerHeight;
      radius = Math.max(cw, ch);
      tl.invalidate();
    };
    const onPointer = () => gsap.to(tl, { timeScale: tl.isActive() ? 0 : 1 });

    window.addEventListener("resize", onResize);
    c.addEventListener("pointerup", onPointer);
    return () => { tl.kill(); window.removeEventListener("resize", onResize); c.removeEventListener("pointerup", onPointer); };
  }, []);

  // ── CTA content scroll animations ────────────────────────
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
    tl.fromTo(".audit-badge",   { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
      .fromTo(".audit-heading span", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 }, "-=0.2")
      .fromTo(".audit-sub",     { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .fromTo(".audit-cta",     { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4");
  }, { scope: sectionRef });

  return (
    <section
      id="audit"
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Particle canvas — full background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: "pointer", zIndex: 0, opacity: 0.9 }}
      />

      {/* Dark gradient overlay so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(14,14,14,0.25) 0%, rgba(14,14,14,0.5) 100%)",
          zIndex: 1,
        }}
      />

      {/* CTA content */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-4 sm:px-8 py-28 sm:py-36"
        style={{ zIndex: 2, minHeight: "100vh" }}
      >
        {/* Badge */}
        <div
          className="audit-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
          style={{ background: "rgba(255,90,31,0.12)", border: "1px solid rgba(255,90,31,0.35)", opacity: 0 }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF5A1F" }} />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "#FF5A1F" }}>
            $120 value — Free
          </span>
        </div>

        {/* Heading */}
        <h2
          className="audit-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-[0.88] mb-6"
          style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}
        >
          {["Claim Your", "Free Growth", "Audit."].map((line, i) => (
            <span key={i} className="block" style={{ opacity: 0 }}>{line}</span>
          ))}
        </h2>

        {/* Sub */}
        <p
          className="audit-sub text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-10"
          style={{ color: "rgba(255,245,240,0.6)", opacity: 0 }}
        >
          Get a 30-minute strategy sprint with our senior consultants to map
          the quick wins and long-term growth plays tailored to your brand.
        </p>

        {/* CTA buttons */}
        <div className="audit-cta flex flex-col sm:flex-row items-center gap-3" style={{ opacity: 0 }}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-2 font-semibold text-sm transition-all duration-300 hover:gap-3"
            style={{ background: "linear-gradient(120deg, #0E0E0E, #FF5A1F)", color: "#FFF5F0", border: "1px solid rgba(255,90,31,0.4)" }}
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFF5F0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,245,240,0.5)")}
          >
            Or schedule a meeting →
          </a>
        </div>

      </div>
    </section>
  );
}
