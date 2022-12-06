import React from "react";
import Navbar from "../components/navbar/navbar";
import Home from "../components/home/home";
import About from "../components/about/about";
import Feature from "../components/feature/feature";
import Contact from "../components/contact/contact";

function LandingPage() {
  return (
    <div className="landingpage">
      <Navbar />
      <Home />
      <About />
      <Feature />
      <Contact />
    </div>
  );
}

export default LandingPage;
