import React from "react";
import { useNavigate } from "react-router-dom";
import blogData from "../utils/blogData";

export default function Blogs() {
  const navigate = useNavigate();

  return (
    <div className="py-20 px-6 md:px-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Articles & News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-52 object-cover rounded-t-xl"
            />

            <div className="p-5">
              <p className="text-green-700 text-sm">{blog.date}</p>
              <h2 className="text-xl font-bold mt-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mt-2">
                {blog.excerpt}
              </p>
              <button className="mt-4 text-green-700 font-semibold hover:underline">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
