import React from "react";
import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Services from "../../components/landing/Services";
import Features from "../../components/landing/Features";
import Mission from "../../components/landing/Mission";
import Faq from "../../components/landing/Faq";

function Landingpage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* HERO — has its own internal padding */}
      <Hero />

      {/* SERVICES — full bleed background, manages its own padding */}
      <Services />

      {/* FEATURES — full bleed background, manages its own padding */}
      <Features />

      {/* MISSION — full bleed background, manages its own padding */}
      <Mission />

      {/* FAQ — constrained width, centered */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-10">
        <div className="max-w-4xl mx-auto">
          <Faq />
        </div>
      </section>

    </main>
  );
}

export default Landingpage;