import React from "react";
import { CheckCircle } from "lucide-react";
import ProcessImg from "../assets/process.png"; // <-- IMPORT IMAGE

export default function HowItWorks() {
  const steps = [
    "Explore available secondary schools",
    "Create account & register for entrance exams",
    "Make exam payment online",
    "Write exam and track your results",
    "Get admission updates instantly",
  ];

  return (
    <div className="py-16 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">

        {/* Steps list */}
        <div>
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3 mb-4">
              <CheckCircle className="text-green-600" size={28} />
              <p className="text-lg">{step}</p>
            </div>
          ))}
        </div>

        {/* Illustration */}
        <div>
          <img 
            src={ProcessImg}   // <-- NOW WORKS
            alt="how it works"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

      </div>
    </div>
  );
}
