import React from "react";
import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Services from "../../components/landing/Services";
import Features from "../../components/landing/Features";
import Mission from "../../components/landing/Mission";
import Faq from "../../components/landing/Faq"

function Landingpage() {
  return (
    <main className="w-full min-h-screen">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* HERO SECTION */}
      <section className="w-full">
        <Hero />
      </section>

      {/* SERVICES SECTION */}
      <section className="w-full ">
        <Services />
      </section>

      <section><Features/></section>
      <section><Mission/></section>
      <section><Faq/></section>

    </main>
  );
}

export default Landingpage;