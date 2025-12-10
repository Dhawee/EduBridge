// src/pages/dashboard/DashboardSchools.jsx
import React from "react";

const dashboardSchools = [
  { id: 1, name: "St. Mary's Secondary School", location: "Lagos" },
  { id: 2, name: "Kings College", location: "Lagos" },
  { id: 3, name: "Queen's Academy", location: "Abuja" },
];

export default function DashboardSchools() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-6">Schools Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-6">#</th>
              <th className="text-left py-3 px-6">School Name</th>
              <th className="text-left py-3 px-6">Location</th>
              <th className="text-left py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dashboardSchools.map((school, index) => (
              <tr key={school.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{school.name}</td>
                <td className="py-3 px-6">{school.location}</td>
                <td className="py-3 px-6 space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
