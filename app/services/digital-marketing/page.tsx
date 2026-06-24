import type { Metadata } from "next";
import ServicePage from "../../components/ServicePage";
export const metadata: Metadata = {
  title: "Digital Marketing & Advertising — Jarwix",
  description:
    "AI-powered social media, Meta & Google ads, email and WhatsApp campaigns built for measurable growth. Jarwix digital marketing services.",
};

const data = {
  number: "01 / Service",
  title: "Digital Marketing & Advertising",
  tagline: "Performance-led. Results-obsessed.",
  description:
    "We run AI-powered campaigns across every major channel — social, search, email, and messaging — designed to generate leads, reduce cost-per-acquisition, and compound results over time.",
  iconName: "megaphone" as const,
  heroImage: "/generated_image/lone figure standing on a dark floating rock island in deep space, holding a glowing tablet,.jpeg",
  color: "#FF5A1F",
  what: [
    {
      title: "Social Media Marketing",
      body: "Platform-native content strategy, community management, and performance analytics for Instagram, LinkedIn, Facebook, and X.",
    },
    {
      title: "Paid Advertising",
      body: "Meta, Google, and YouTube campaigns with conversion-optimised creatives, audience segmentation, and continuous A/B testing.",
    },
    {
      title: "Email Marketing",
      body: "Automated drip sequences, newsletter design, segmentation, and lifecycle campaigns that turn subscribers into buyers.",
    },
    {
      title: "WhatsApp Marketing",
      body: "WhatsApp Business API integration, broadcast campaigns, two-way automation, and personalised outreach at scale.",
    },
    {
      title: "Remarketing",
      body: "Full-funnel retargeting across display, social, and search to recapture warm audiences and reduce abandoned funnels.",
    },
    {
      title: "Analytics & Reporting",
      body: "Real-time dashboards, weekly performance reports, and data-backed recommendations to continuously improve ROI.",
    },
  ],
  includes: [
    "Full platform setup & account audit",
    "Content calendar & creative briefs",
    "Ad copy + creatives (static & video)",
    "Audience research & persona mapping",
    "Campaign build, launch & monitoring",
    "A/B testing & conversion optimisation",
    "Monthly performance reports",
    "WhatsApp & email automation flows",
    "Retargeting pixel setup & management",
    "Weekly check-in calls",
  ],
  results: [
    { value: "3.2×", label: "Average ROAS improvement" },
    { value: "↓41%", label: "Cost per lead reduction" },
    { value: "↑180%", label: "Organic reach growth" },
  ],
  faqs: [
    {
      q: "How soon will I see results from paid ads?",
      a: "Most clients see measurable improvements within the first 2–4 weeks as we gather data and optimise. Meaningful ROAS typically stabilises by week 6–8.",
    },
    {
      q: "Do you handle creative production?",
      a: "Yes. Our in-house team produces all ad creatives — static graphics, short-form videos, and carousel content — tailored to each platform.",
    },
    {
      q: "Which ad platforms do you manage?",
      a: "Meta (Facebook & Instagram), Google Ads (Search, Display, YouTube), and LinkedIn Ads. We can also manage TikTok and Pinterest on request.",
    },
    {
      q: "What's the minimum ad budget you recommend?",
      a: "We generally recommend a minimum of $500–$1,000/month in ad spend to generate enough data for meaningful optimisation. Higher budgets scale results faster.",
    },
  ],
};

export default function DigitalMarketingPage() {
  return <ServicePage data={data} />;
}
