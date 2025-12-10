import React from "react";
import { useParams, Link } from "react-router-dom";
import blogData from "../utils/blogData";

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === Number(id));

  if (!blog)
    return <p className="text-center mt-20 text-red-600 py-30">Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-green-600 mb-6">{blog.date}</p>

      <div className="prose prose-lg max-w-none text-gray-700">
        {blog.content}
      </div>

      <Link
        to="/blogs"
        className="inline-block mt-10 px-6 py-3 bg-green-700 text-white rounded-lg"
      >
        ← Back to Blogs
      </Link>
    </div>
  );
}
