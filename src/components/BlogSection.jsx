import React from "react";
import { useNavigate } from "react-router-dom";

const sampleBlogs = [
  {
    id: 1,
    title: "How to Prepare Your Child for Secondary School",
    image: "/blog1.jpg",
    date: "January 20, 2025",
    excerpt: "A simple guide for parents to help students adapt to a new school environment...",
  },
  {
    id: 2,
    title: "Top 10 Schools in Ekiti State for 2025",
    image: "/blog2.jpg",
    date: "January 12, 2025",
    excerpt: "Here are the top-rated schools based on facilities, performance, and safety...",
  },
  {
    id: 3,
    title: "Why Secondary Education Matters More Than Ever",
    image: "/blog3.jpg",
    date: "January 5, 2025",
    excerpt: "A closer look at the importance of quality education in a digital world...",
  },
];

export default function BlogSection() {
  const navigate = useNavigate();

  return (
    <div className="py-16 px-6 md:px-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-3">Latest News & Articles</h2>
      <p className="text-gray-600 text-center mb-10">
        Stay updated with education insights, school news, and useful guides.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-50 rounded-xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <p className="text-sm text-green-700 font-medium">{blog.date}</p>

              <h3 className="text-xl font-semibold mt-2">{blog.title}</h3>

              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
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
