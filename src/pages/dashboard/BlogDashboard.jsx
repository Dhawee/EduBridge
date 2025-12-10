import React from "react";
import { useNavigate } from "react-router-dom";
import blogData from "../../utils/blogData";

export default function BlogDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <button
          onClick={() => navigate("/dashboard/blogs/create")}
          className="px-4 py-2 bg-green-700 text-white rounded-lg"
        >
          + New Blog
        </button>
      </div>

      <div className="space-y-6">
        {blogData.map((blog) => (
          <div
            key={blog.id}
            className="p-5 bg-gray-50 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600 text-sm">{blog.date}</p>
            </div>

            <button
              onClick={() =>
                navigate(`/dashboard/blogs/edit/${blog.id}`)
              }
              className="px-4 py-2 bg-gray-800 text-white rounded-lg"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
