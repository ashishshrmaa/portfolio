import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Resume from "@/components/Resume";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import QuoteModal from "@/components/QuoteModal";
import Footer from "@/components/Footer";
import Scripts from "@/components/Scripts";

export default function Home() {
  return (
    <>
      <Header />
      <main className="main-page-wrapper">
        <Hero />
        <Services />
        <Portfolio />
        <Resume />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <QuoteModal />
      <Scripts />
    </>
  );
}
