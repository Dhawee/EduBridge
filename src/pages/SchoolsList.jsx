// src/pages/SchoolsList.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

// 20 Schools extracted from your sheet (sample from your data)
const rawSchools = [
  { name: "Ado Comm High Schl, Ado Ekiti", address: "Ekute off Omisanjana, Ado", lga: "ADO", established: 1977 },
  { name: "Ado Grammar School, Ado Ekiti", address: "Odo Ado poly Road, Ado Ekiti", lga: "ADO", established: 1960 },
  { name: "All Souls Ang Gram Schl, Ado Ekiti", address: "New Iyin Road", lga: "ADO", established: 2003 },

  { name: "Amure Comm High Schl, Ado Ekiti", address: "Oke-Ila, Ado Ekiti", lga: "ADO", established: 1995 },
  { name: "Ayo Daramola College", address: "Ijero Road, Ado Ekiti", lga: "ADO", established: 1988 },
  { name: "Christ School, Ado Ekiti", address: "Fajuyi Area", lga: "ADO", established: 1933 },
  { name: "Ologede High School", address: "Opopogbooro", lga: "ADO", established: 2008 },
  { name: "Ikere Comm School", address: "Ikere Road", lga: "IKERE", established: 1986 },
  { name: "Ikere High School", address: "Odo Ikere", lga: "IKERE", established: 1993 },
  { name: "Oye High School", address: "Oye Ekiti", lga: "OYE", established: 1990 },
  { name: "Ifaki Grammar School", address: "Ifaki Ekiti", lga: "IFA", established: 1975 },
  { name: "Ilawe High School", address: "Ilawe Ekiti", lga: "ILAWE", established: 1999 },
  { name: "Aramoko Grammar School", address: "Aramoko Ekiti", lga: "ARAMOKO", established: 1982 },
  { name: "Iyin Comm School", address: "Iyin Ekiti", lga: "IYIN", established: 2001 },
  { name: "Efon Grammar School", address: "Efon Alaaye", lga: "EFON", established: 1967 },
  { name: "Ikole Comm High School", address: "Ikole Ekiti", lga: "IKOLE", established: 1981 },
  { name: "Igbara Odo High School", address: "Igbara Odo", lga: "IGBARA", established: 1992 },
  { name: "Odunayo High School", address: "Ado Ikere Road", lga: "ADO", established: 1996 },
  { name: "Ogotun High School", address: "Ogotun Ekiti", lga: "OGOTUN", established: 1984 },
  { name: "Ikoro High School", address: "Ikoro Ekiti", lga: "IKORO", established: 1973 },
];

// Add IDs + images automatically
const schools = rawSchools.map((s, i) => ({
  id: i + 1,
  ...s,
  img: `/assets/school${(i % 3) + 1}.jpg`,
}));

export default function SchoolsList() {
  const [search, setSearch] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("All");
  const [page, setPage] = useState(1);

  const perPage = 8;
  const totalPages = Math.ceil(schools.length / perPage);

  // Filtering
  const filtered = schools.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesLGA = selectedLGA === "All" || s.lga === selectedLGA;
    return matchesSearch && matchesLGA;
  });

  // Pagination slice
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // Unique LGAs
  const lgas = ["All", ...new Set(schools.map((s) => s.lga))];

  return (
    <div className="max-w-7xl mx-auto py-40 px-6">

      <h1 className="text-3xl font-bold mb-8 text-center">Available Schools</h1>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        <input
          type="text"
          placeholder="Search school name..."
          className="border px-4 py-2 rounded-lg w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-lg"
          value={selectedLGA}
          onChange={(e) => setSelectedLGA(e.target.value)}
        >
          {lgas.map((l, idx) => (
            <option key={idx} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {paginated.map((school) => (
          <Link
            key={school.id}
            to={`/schools/${school.id}`}
            className="border rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            <img src={school.img} className="w-full h-44 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{school.name}</h2>
              <p className="text-gray-600 text-sm">{school.address}</p>
              <p className="text-gray-800 font-medium text-sm mt-1">{school.lga}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          ← Prev
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next →
        </button>
      </div>

    </div>
  );
}

export { schools };