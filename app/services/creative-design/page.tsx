import type { Metadata } from "next";
import ServicePage from "../../components/ServicePage";
export const metadata: Metadata = {
  title: "Creative & Brand Design — Jarwix",
  description:
    "Logo, visual identity, motion graphics, and brand strategy for ambitious businesses. Jarwix creative & brand design services.",
};

const data = {
  number: "03 / Service",
  title: "Creative & Brand Design",
  tagline: "Memorable brands. Scroll-stopping visuals.",
  description:
    "We create brand identities and visual systems that make ambitious businesses impossible to ignore — from logo and style guide through to motion graphics, social creatives, and pitch decks.",
  iconName: "pen-nib" as const,
  heroImage: "/generated_image/artist floating in dark void holding single glowing color palette, amber light, minimal composition, vast empty space.jpeg",
  color: "#FF5A1F",
  what: [
    {
      title: "Branding & Identity",
      body: "Logo design, colour palette, typography system, and brand guidelines delivered as a production-ready style guide.",
    },
    {
      title: "Graphic Design",
      body: "Social media graphics, presentation design, marketing materials, print collateral, and ad creatives across all formats.",
    },
    {
      title: "Motion Graphics",
      body: "Animated logo reveals, Instagram Reels templates, explainer video animations, and branded short-form video content.",
    },
    {
      title: "Brand Strategy",
      body: "Positioning, messaging architecture, tone of voice, and competitive differentiation — the thinking behind the visuals.",
    },
    {
      title: "Social Media Templates",
      body: "Custom Canva or Figma template kits for every platform so your team can create on-brand content without a designer.",
    },
    {
      title: "Pitch Decks & Presentations",
      body: "Investor-ready pitch decks and sales presentations that communicate value with clarity and premium visual design.",
    },
  ],
  includes: [
    "Brand discovery & strategy session",
    "Logo (primary + alternate marks)",
    "Colour system & typography selection",
    "Brand guidelines document (PDF)",
    "Business card & letterhead design",
    "Social media profile graphics",
    "10 customisable social templates",
    "Animated logo (GIF + MP4)",
    "All files in production formats",
    "2 rounds of revisions included",
  ],
  results: [
    { value: "10×", label: "Brand recognition uplift" },
    { value: "↑65%", label: "Social engagement increase" },
    { value: "100%", label: "Clients reuse templates" },
  ],
  faqs: [
    {
      q: "How long does a full brand identity take?",
      a: "A complete brand identity project takes 2–4 weeks from kickoff to final delivery, including discovery, concepts, revisions, and file handover.",
    },
    {
      q: "Do you provide the source files?",
      a: "Yes. Every project includes full source files (Figma, AI, PSD) so you own the assets outright and can modify them freely.",
    },
    {
      q: "Can you refresh an existing brand rather than starting fresh?",
      a: "Absolutely. Brand refresh projects are common — we audit your existing assets and evolve them rather than replacing everything.",
    },
    {
      q: "What if I only need social media graphics?",
      a: "We offer standalone graphic design retainers and one-off project packages. You don't need a full brand project to work with us.",
    },
  ],
};

export default function CreativeDesignPage() {
  return <ServicePage data={data} />;
}
