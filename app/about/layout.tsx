import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LenisProvider from "../components/LenisProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Jarwix",
  description:
    "Learn about Jarwix, an AI-powered growth agency built for ambitious businesses across the US, UK, and India. Discover our mission, values, and journey.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </LenisProvider>
  );
}
