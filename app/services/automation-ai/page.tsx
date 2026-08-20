import type { Metadata } from "next";
import ServicePage from "../../components/ServicePage";
export const metadata: Metadata = {
  title: "Automation & AI Integration — Jarwix",
  description:
    "CRM automation, AI agents, WhatsApp broadcasts, and process mapping for ambitious businesses. Jarwix automation & AI services.",
};

const data = {
  number: "04 / Service",
  title: "Automation & AI Integration",
  tagline: "Build once. Run forever.",
  description:
    "We map your business processes and replace manual, repetitive work with intelligent systems — CRM workflows, AI agents, WhatsApp automation, and end-to-end hyper-automation that compounds efficiency over time.",
  iconName: "robot" as const,
  heroImage: "/generated_image/lone engineer in dark control tower, single holographic display glowing amber, dark city below, minimal, cinematic aerial.jpeg",
  color: "#FF5A1F",
  what: [
    {
      title: "CRM Automation",
      body: "Lead capture, scoring, assignment, and follow-up sequences automated inside HubSpot, Salesforce, GoHighLevel, or your existing CRM.",
    },
    {
      title: "AI Agents",
      body: "Custom AI agents for content generation, customer support, lead qualification, and automated outreach — built on GPT-4 and fine-tuned to your brand.",
    },
    {
      title: "WhatsApp Automation",
      body: "WhatsApp Business API integration with automated broadcasts, drip sequences, chatbots, and two-way conversation management.",
    },
    {
      title: "Spreadsheet & Data Automation",
      body: "Automated data pipelines, reporting dashboards, and workflow triggers connecting your spreadsheets to every tool in your stack.",
    },
    {
      title: "Process Mapping",
      body: "End-to-end documentation of your business processes, identifying automation opportunities and bottlenecks before any build begins.",
    },
    {
      title: "System Integration",
      body: "Connect your CRM, email platform, ads manager, e-commerce store, and analytics into one unified, automated data flow.",
    },
  ],
  includes: [
    "Process audit & automation map",
    "CRM setup or migration",
    "Automated lead capture flows",
    "Email & WhatsApp drip sequences",
    "AI agent design & deployment",
    "Zapier / Make scenario builds",
    "Google Sheets data automation",
    "Performance analytics dashboard",
    "Team training & documentation",
    "30-day post-launch monitoring",
  ],
  results: [
    { value: "↓70%", label: "Manual task reduction" },
    { value: "24/7", label: "Systems run without staff" },
    { value: "↑4×", label: "Lead follow-up speed" },
  ],
  faqs: [
    {
      q: "What tools do you build automations on?",
      a: "We work with Zapier, Make (Integromat), n8n, and custom API integrations. For AI agents we use OpenAI, Anthropic, and fine-tuned open-source models.",
    },
    {
      q: "Do I need technical knowledge to use the systems you build?",
      a: "No. We design everything to be operated by non-technical staff and provide full training, documentation, and a 30-day support window after launch.",
    },
    {
      q: "How long does an automation project take?",
      a: "Simple workflow automations take 1–2 weeks. Complex multi-system integrations or AI agent deployments typically take 3–6 weeks.",
    },
    {
      q: "Can you automate my WhatsApp customer support?",
      a: "Yes. We build WhatsApp chatbots that handle FAQs, qualify leads, book appointments, and escalate to human agents — all within WhatsApp Business API.",
    },
  ],
};

export default function AutomationAIPage() {
  return <ServicePage data={data} />;
}
