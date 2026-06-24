"use client";

import { useRef } from "react";
import Image from "next/link"; // oops, let's use next/image properly
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/app/generated/prisma/client";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.set(".portfolio-card", { y: 50, opacity: 0 });

      ScrollTrigger.batch(".portfolio-card", {
        interval: 0.15,
        batchMax: 3,
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          });
        },
        start: "top 85%",
      });
    },
    { scope: gridRef }
  );

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {projects.map((project) => (
        <div 
          key={project.id} 
          className="portfolio-card group relative rounded-3xl overflow-hidden cursor-pointer"
          style={{ background: "#0a0a0a", border: "1px solid rgba(255,245,240,0.05)" }}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {/* We'll use a regular img tag for now to avoid next/image complexity with unknown external domains or local generated_images, though our generated images are in public/ */}
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            
            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full" style={{ background: "rgba(255,90,31,0.15)", backdropFilter: "blur(8px)" }}>
                <p className="text-[10px] tracking-widest uppercase font-semibold text-[#FF5A1F]">Featured</p>
              </div>
            )}
          </div>
          
          {/* Text Content */}
          <div className="p-8 sm:p-10">
            <h3 className="text-2xl sm:text-3xl mb-4 transition-colors duration-300 group-hover:text-[#FF5A1F]" style={{ fontFamily: '"Hanson Bold", serif', color: "#FFF5F0" }}>
              {project.title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,245,240,0.6)" }}>
              {project.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
