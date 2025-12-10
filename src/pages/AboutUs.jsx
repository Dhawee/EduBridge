// src/pages/AboutUs.jsx
import React from "react";
import AboutImage from "../assets/Hero 1.jpg"; // Place an image in your assets folder

export default function AboutUs() {
  return (
    <div className="max-w-6xl mx-auto py-35 px-6">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">About EduBridge Ekiti</h1>
          <p className="text-gray-700 mb-4">
            EduBridge Ekiti is dedicated to connecting students with the best secondary schools across Nigeria. We strive to simplify the admission process through online registration, entrance exam management, and real-time admission updates.
          </p>
          <p className="text-gray-700">
            Our goal is to empower students and parents to make informed decisions about education while ensuring a seamless digital experience.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src={AboutImage} alt="About Us" className="rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p className="text-gray-700">
            To provide a trusted platform for students and parents to discover, register, and secure admission into the best secondary schools in Nigeria.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
          <p className="text-gray-700">
            To revolutionize the education admission process by making it fully digital, accessible, and transparent for all.
          </p>
        </div>
      </div>

      {/* Values / Team Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Integrity</h3>
            <p className="text-gray-700">We maintain honesty and transparency in all our dealings.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Excellence</h3>
            <p className="text-gray-700">We aim for the highest standards in service and technology.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Innovation</h3>
            <p className="text-gray-700">We embrace modern solutions to simplify education management.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
