// src/pages/dashboard/DashboardHome.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import schoolsData from "../../data/schoolsData.js";

export default function DashboardHome() {
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("Student");
  const [userPicture, setUserPicture] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData.fullName) setUserName(userData.fullName);
    if (userData.passport) setUserPicture(userData.passport);
  }, []);

  const filteredSchools = schoolsData.filter((school) =>
    school.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = (school) => {
    navigate("/dashboard/apply", { state: { school } });
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={userPicture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-green-500 object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome {userName}</h1>
          <p className="text-gray-300">Browse and apply to available schools</p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-8 flex justify-center">
        <div className="flex items-center w-full max-w-xl bg-gray-800 p-3 rounded-xl">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search schools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none px-3 text-gray-200"
          />
        </div>
      </div>

      {/* SCHOOLS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          >
            <div className="flex items-center gap-4">
              <img src={school.logo} className="w-14 h-14 rounded-full" />
              <div>
                <h3 className="text-lg font-bold">{school.name}</h3>
                <p className="text-sm text-gray-400">{school.location}</p>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => handleApply(school)}
                className="px-5 py-2 bg-green-500 text-black rounded-lg font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No schools found.</p>
      )}
    </div>
  );
}
