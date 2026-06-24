import type { Metadata } from "next";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact — Jarwix",
  description: "Get in touch with Jarwix to build your growth engine.",
};

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center pt-20">
        {/* We reuse the beautifully animated Contact component */}
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
