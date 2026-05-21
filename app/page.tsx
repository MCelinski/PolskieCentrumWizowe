import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import PrivateClient from "@/components/sections/PrivateClient";
import ProcessSection from "@/components/sections/ProcessSection";
import TrustMetrics from "@/components/sections/TrustMetrics";
import Testimonials from "@/components/sections/Testimonials";
import ClientLogos from "@/components/sections/ClientLogos";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <div className="flex flex-col min-h-[100svh]">
          <Hero />
          <TrustBar />
        </div>
        <About />
        <Services />
        <PrivateClient />
        <ProcessSection />
        <TrustMetrics />
        <Testimonials />
        <ClientLogos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
