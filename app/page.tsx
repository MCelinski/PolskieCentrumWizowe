import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import TrustMetrics from "@/components/sections/TrustMetrics";
import Partners from "@/components/sections/Partners";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <TrustMetrics />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
