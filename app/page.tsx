"use client";

import IntroOverlay from "./components/IntroOverlay";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LenderMarquee from "./components/LenderMarquee";
import AboutBills from "./components/AboutBills";
import SavingsCalculator from "./components/SavingsCalculator";
import LoanOptions from "./components/LoanOptions";
import HowItWorks from "./components/HowItWorks";
import Timeline from "./components/Timeline";
import FAQs from "./components/FAQs";
import Testimonials from "./components/Testimonials";
import Consultants from "./components/Consultants";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <LenderMarquee />
        <AboutBills />
        <SavingsCalculator />
        <LoanOptions />
        <HowItWorks />
        <Timeline />
        <FAQs />
        <Testimonials />
        <Consultants />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
