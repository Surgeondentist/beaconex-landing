import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Why from "@/components/Why";
import Testimonials from "@/components/Testimonials";
import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="contenido">
        <Hero />
        <Services />
        <Process />
        <Why />
        <Testimonials />
        <Banner />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
