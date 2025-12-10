import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { schools } from "./SchoolsList";

export default function SchoolDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const school = schools.find((s) => s.id === Number(id));

  if (!school)
    return (
      <p className="text-center text-red-600 mt-12">School not found</p>
    );

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
      {/* HERO IMAGE */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden mb-8 shadow-lg">
        <img
          src={school.img}
          alt={school.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {school.name}
          </h1>
        </div>
      </div>

      {/* SCHOOL INFO SECTION */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <div className="flex flex-col items-center md:items-start md:col-span-1 bg-white p-6 rounded-xl shadow border border-gray-200">
          <img
            src={school.logo}
            alt={`${school.name} Logo`}
            className="w-36 h-36 rounded-full object-cover border-4 border-green-500 mb-4"
          />

          <p className="text-black/80 text-center md:text-left mb-2">
            <strong className="text-black">Type:</strong> {school.type}
          </p>
          <p className="text-black/80 text-center md:text-left mb-2">
            <strong className="text-black">Established:</strong> {school.established}
          </p>
          <p className="text-black/80 text-center md:text-left mb-2">
            <strong className="text-black">LGA:</strong> {school.lga}
          </p>
          <p className="text-black/80 text-center md:text-left">
            <strong className="text-black">Address:</strong> {school.address}
          </p>
        </div>

        {/* DESCRIPTION / DETAILS */}
        <div className="md:col-span-2 bg-white rounded-xl p-6 shadow border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-black">
            About {school.name}
          </h2>

          <p className="text-black/80 leading-relaxed mb-4">
            {school.description || "No description available for this school."}
          </p>

          {school.courses && (
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2 text-black">Courses Offered:</h3>
              <ul className="list-disc list-inside text-black/80">
                {school.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>
          )}

          {school.fees && (
            <p className="text-black/80 mb-2">
              <strong className="text-black">Fees:</strong> {school.fees}
            </p>
          )}

          {school.facilities && (
            <div>
              <h3 className="font-semibold text-lg mb-2 text-black">Facilities:</h3>
              <ul className="list-disc list-inside text-black/80">
                {school.facilities.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mt-8 justify-center md:justify-start">
        <Button text="Back to Schools" to="/schools" variant="outline" />
        <Button text="Apply to School" onClick={handleApplyClick} />
      </div>
    </div>
  );
}
