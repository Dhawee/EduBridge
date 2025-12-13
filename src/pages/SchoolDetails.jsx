// src/pages/SchoolDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import schoolsData from "../data/schoolsData";
import siteLogo from "../assets/logo.png";

export default function SchoolDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const school = schoolsData.find((s) => s.id === Number(id));

  if (!school) {
    return (
      <p className="text-center text-red-600 mt-12">
        School not found
      </p>
    );
  }

  const handleApplyClick = () => {
    const isLoggedIn = localStorage.getItem("user");

    if (isLoggedIn) {
      navigate("/dashboard/apply", { state: { school } });
    } else {
      navigate("/auth", {
        state: { redirectTo: "/dashboard/apply", school },
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-30 px-6 text-black">
      {/* HERO */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden mb-8 shadow-lg">
        <img
          src={school.img}
          alt={school.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {school.name}
          </h1>
        </div>
      </div>

      {/* INFO */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white p-6 rounded-xl shadow border">
          <img
            src={school.logo || siteLogo}
            className="w-36 h-36 rounded-full mx-auto border-4 border-green-500 mb-4"
          />

          <p><strong>Type:</strong> {school.type}</p>
          <p><strong>Established:</strong> {school.established}</p>
          <p><strong>LGA:</strong> {school.lga}</p>
          <p><strong>Address:</strong> {school.address}</p>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl p-6 shadow border">
          <h2 className="text-2xl font-bold mb-4">
            About {school.name}
          </h2>

          <p className="mb-4">
            {school.description || "No description available."}
          </p>

          {school.courses && (
            <>
              <h3 className="font-semibold mb-2">Courses Offered</h3>
              <ul className="list-disc list-inside mb-4">
                {school.courses.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </>
          )}

          {school.facilities && (
            <>
              <h3 className="font-semibold mb-2">Facilities</h3>
              <ul className="list-disc list-inside">
                {school.facilities.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4 justify-center md:justify-start">
        <Button text="Back to Schools" to="/schools" variant="outline" />
        <Button text="Apply to School" onClick={handleApplyClick} />
      </div>
    </div>
  );
}
