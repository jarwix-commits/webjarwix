import type { Metadata } from "next";
import ServicePage from "../../components/ServicePage";
export const metadata: Metadata = {
  title: "Web Design & SEO Solutions — Jarwix",
  description:
    "High-performance websites, local & technical SEO, and conversion rate optimisation built for ambitious businesses. Jarwix web & SEO services.",
};

const data = {
  number: "02 / Service",
  title: "Web & SEO Solutions",
  tagline: "Built for speed. Ranked for growth.",
  description:
    "We design and develop high-performance websites that convert visitors into customers, then optimise them to rank on page one. Every site we build is fast, accessible, and engineered for leads.",
  iconName: "global" as const,
  heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&q=85&auto=format&fit=crop",
  color: "#FF5A1F",
  what: [
    {
      title: "Website Design & Development",
      body: "Custom landing pages, WordPress sites, and full web apps built with modern frameworks — pixel-perfect, mobile-first, and blazing fast.",
    },
    {
      title: "Local SEO",
      body: "Google Business Profile optimisation, local citations, and geo-targeted content strategies that put you at the top of local search results.",
    },
    {
      title: "Technical SEO",
      body: "Full site audits, Core Web Vitals optimisation, structured data, sitemap management, and crawl error resolution.",
    },
    {
      title: "On-Page Optimisation",
      body: "Keyword-rich content architecture, metadata, internal linking, and heading structure aligned to your target search intent.",
    },
    {
      title: "Conversion Rate Optimisation",
      body: "Heatmaps, session recordings, A/B test design, and UX improvements that turn more of your existing traffic into paying customers.",
    },
    {
      title: "Landing Pages & Funnels",
      body: "Standalone high-converting landing pages and sales funnels with integrated form capture, thank-you flows, and CRM hooks.",
    },
  ],
  includes: [
    "Discovery call & website brief",
    "Wireframes & design mockups",
    "Responsive development (mobile-first)",
    "CMS setup & content migration",
    "Technical SEO audit & fixes",
    "Keyword research & content map",
    "Google Search Console & Analytics setup",
    "Core Web Vitals optimisation",
    "Monthly SEO reporting",
    "1-month post-launch support",
  ],
  results: [
    { value: "↑320%", label: "Average organic traffic increase" },
    { value: "↑2.4×", label: "Conversion rate improvement" },
    { value: "<1.5s", label: "Average page load time" },
  ],
  faqs: [
    {
      q: "How long does a website project take?",
      a: "A standard landing page takes 1–2 weeks. A full website typically takes 3–6 weeks depending on scope, content readiness, and revision rounds.",
    },
    {
      q: "Do you build on WordPress or custom frameworks?",
      a: "Both. We build on WordPress for content-heavy sites needing easy editing, and Next.js/React for performance-critical or complex web applications.",
    },
    {
      q: "How long before SEO starts showing results?",
      a: "Technical and on-page fixes show up in 4–8 weeks. Ranking improvements from content and link building typically take 3–6 months of consistent effort.",
    },
    {
      q: "Will you handle the hosting and domain?",
      a: "We recommend hosting providers and can manage the full setup, or work within your existing infrastructure — whichever you prefer.",
    },
  ],
};

export default function WebSeoPage() {
  return <ServicePage data={data} />;
}
