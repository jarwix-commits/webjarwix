import { prisma } from "../lib/prisma";
import "dotenv/config";

const projects = [
  {
    title: "NexGen Analytics Platform",
    description: "A complete AI-driven analytics dashboard giving enterprises real-time predictive insights on customer behavior.",
    imageUrl: "/generated_image/A solitary, glowing data sphere, filled with a tiny, abstract figure, drifts in a pitch-black void. The sphere emanates a powerful amber light. The image is clean and free of clutter. Sci-fi concept art.jpeg",
    featured: true,
  },
  {
    title: "Vanguard Digital Campaign",
    description: "A comprehensive high-converting digital marketing campaign resulting in a 400% ROI over six months.",
    imageUrl: "/generated_image/lone figure holding single glowing megaphone, dark background, amber beam of light, minimal.jpeg",
    featured: false,
  },
  {
    title: "Equinox Brand Design",
    description: "Complete identity architecture and brand positioning for a luxury fintech startup.",
    imageUrl: "/generated_image/single glowing letterform carved in dark stone wall, amber backlight, vast empty space.jpeg",
    featured: false,
  },
  {
    title: "Omni Automation Engine",
    description: "A custom internal robotic process automation system saving 10,000+ human hours annually.",
    imageUrl: "/generated_image/single robot hand reaching toward one point of amber light in dark void, minimal.jpeg",
    featured: true,
  },
  {
    title: "Horizon Strategy & Insights",
    description: "Deep data strategy mapping to uncover a $50M untargeted market segment for an enterprise retailer.",
    imageUrl: "/generated_image/tiny person floating in dark galaxy of sparse amber light particles, minimal, vast space.jpeg",
    featured: false,
  },
  {
    title: "Apex Creative Direction",
    description: "Multi-platform visual storytelling blending 3D rendering with live-action for a global product launch.",
    imageUrl: "/generated_image/artist standing before single enormous blank canvas glowing amber, dark studio, minimal.jpeg",
    featured: false,
  }
];

async function main() {
  console.log("Seeding portfolio projects...");
  
  // Clear existing projects to prevent duplicates if run multiple times
  await prisma.project.deleteMany();
  
  for (const project of projects) {
    const p = await prisma.project.create({
      data: project,
    });
    console.log(`Created project: ${p.title}`);
  }
  
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
