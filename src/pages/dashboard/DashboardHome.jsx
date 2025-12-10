import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import schoolsData from "../../data/schoolsData";

export default function DashboardHome() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredSchools = schoolsData.filter((school) =>
    school.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Correct Apply handler
  const handleApply = (school) => {
    navigate("/dashboard/apply", { state: { school } });
  };

  return (
    <div>
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">Welcome Back ✨</h1>

      <p className="text-gray-300 mb-8">
        Here’s a quick overview of your student activities.
      </p>

      {/* STAT CARDS
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-gray-800 rounded-xl shadow border border-gray-700">
          <h3 className="text-xl font-semibold">Schools</h3>
          <p className="text-gray-400 mt-2">Here are the list of schools applied</p>
        </div>

        <div className="p-6 bg-gray-800 rounded-xl shadow border border-gray-700">
          <h3 className="text-xl font-semibold">Results</h3>
          <p className="text-gray-400 mt-2">Latest grades available</p>
        </div>

        <div className="p-6 bg-gray-800 rounded-xl shadow border border-gray-700">
          <h3 className="text-xl font-semibold">Notifications</h3>
          <p className="text-gray-400 mt-2">2 new alerts</p>
        </div>
      </div> */}

      {/* SEARCH BAR */}
      <div className="mb-8 flex justify-center">
        <div className="flex items-center w-full max-w-xl bg-gray-800 border border-gray-700 p-3 rounded-xl shadow">
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

      {/* SCHOOL LIST */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={school.logo}
                alt="logo"
                className="w-14 h-14 rounded-full border border-gray-600"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{school.name}</h3>
                <p className="text-sm text-gray-400">{school.location}</p>
              </div>
            </div>

            {/* APPLY BUTTON */}
            <div className="mt-6 text-right">
              <button
                className="px-5 py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg font-semibold shadow"
                onClick={() => handleApply(school)}
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* NO RESULTS */}
      {filteredSchools.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No schools found.</p>
      )}
    </div>
  );
}
