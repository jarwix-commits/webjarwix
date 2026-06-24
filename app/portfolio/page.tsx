import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PortfolioGrid from "./PortfolioGrid";
import PortfolioHeader from "./PortfolioHeader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuditCTA from "../components/AuditCTA";

export const metadata: Metadata = {
  title: "Portfolio — Jarwix",
  description: "View our recent growth campaigns, digital designs, and AI automations.",
};

// Next.js config to ensure it fetches fresh data when DB changes (optional, but good for DB-driven pages)
export const revalidate = 60; 

export default async function PortfolioPage() {
  // Fetch projects from the database
  const projects = await prisma.project.findMany({
    orderBy: [
      { featured: 'desc' }, // Featured first
      { createdAt: 'desc' } // Then newest
    ],
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <PortfolioHeader />

          {/* Grid Component */}
          {projects.length > 0 ? (
            <PortfolioGrid projects={projects} />
          ) : (
            <div className="text-center py-20">
              <p style={{ color: "rgba(255,245,240,0.4)" }}>No projects found in the database.</p>
            </div>
          )}
        </div>
      </main>

      {/* Conversion CTA Section */}
      <AuditCTA />
      
      <Footer />
    </>
  );
}
