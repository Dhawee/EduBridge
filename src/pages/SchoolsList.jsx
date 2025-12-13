// src/pages/SchoolsList.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import schoolsData from "../data/schoolsData";

export default function SchoolsList() {
  const [search, setSearch] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("All");
  const [page, setPage] = useState(1);

  const perPage = 8;

  const filtered = schoolsData.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesLGA = selectedLGA === "All" || s.lga === selectedLGA;
    return matchesSearch && matchesLGA;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const lgas = ["All", ...new Set(schoolsData.map((s) => s.lga))];

  return (
    <div className="max-w-7xl mx-auto py-40 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Schools</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          placeholder="Search school..."
          className="border px-4 py-2 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-lg"
          value={selectedLGA}
          onChange={(e) => setSelectedLGA(e.target.value)}
        >
          {lgas.map((lga) => (
            <option key={lga} value={lga}>{lga}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {paginated.map((school) => (
          <Link
            key={school.id}
            to={`/schools/${school.id}`}
            className="border rounded-xl overflow-hidden hover:shadow-xl"
          >
            <img src={school.img} className="h-44 w-full object-cover" />
            <div className="p-4">
              <h2 className="font-semibold">{school.name}</h2>
              <p className="text-sm text-gray-600">{school.address}</p>
              <p className="text-sm font-medium">{school.lga}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
