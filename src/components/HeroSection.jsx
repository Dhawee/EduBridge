import React from "react";
import HeroImage from "../assets/Hero 2.jpg";
import Button from "../components/Button";

export default function HeroSection() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center -mt-1"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black to-green-800/70"></div>

      {/* Text Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-16 text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Connecting Primary Students to <br /> Ekiti Secondary Schools
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-2xl">
          Explore schools, register for entrance exams, track admissions,
          and stay informed, all in one portal.
        </p>

        <div className="mt-6 flex gap-4">
          <Button text="Get Started" variant="solid" to="/auth" />
          <Button text="Explore Schools" to="/schools" variant="outline" />
        </div>
      </div>
    </div>
  );
}
