import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import BentoGallery from "./components/BentoGallery";
import HorizontalScrollText from "./components/HorizontalScrollText";
import Services from "./components/Services";
import WorkGallery from "./components/WorkGallery";
import About from "./components/About";
import Process from "./components/Process";
import ParticleVortex from "./components/ParticleVortex";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <BentoGallery />
        <HorizontalScrollText />
        <Services />
        <WorkGallery />
        <About />
        <Process />
        <ParticleVortex />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
