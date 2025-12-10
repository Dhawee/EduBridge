import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturedSchools from "../components/FeaturedSchools";
import HowItWorks from "../components/HowItWorks";
import CTASection from "../components/CTASection";
import BlogSection from "../components/BlogSection";



export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedSchools />
      <HowItWorks />
      <BlogSection />
      <CTASection />
    </div>
  );
}
