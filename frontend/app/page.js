"use client";

import Navbar from "./home/Navbar";
import Hero from "./home/Hero";
import Features from "./home/Features";
import PlaySection from "./home/PlaySection";
import HowItWorks from "./home/HowItWorks";
import StatsSection from "./home/StatsSection";
import CTASection from "./home/CTASection";
import Footer from "./home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero></Hero>
        <Features></Features>
        <PlaySection></PlaySection>
        <HowItWorks></HowItWorks>
        <StatsSection></StatsSection>
        <CTASection></CTASection>
      </main>

      <Footer></Footer>
    </>
  );
}
