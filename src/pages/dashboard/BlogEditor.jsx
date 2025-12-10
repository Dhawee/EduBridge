import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogData from "../../utils/blogData";

export default function BlogEditor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const existingBlog = blogData.find((b) => b.id === Number(id));

  const [title, setTitle] = useState(existingBlog?.title || "");
  const [excerpt, setExcerpt] = useState(existingBlog?.excerpt || "");
  const [content, setContent] = useState(existingBlog?.content || "");
  const [image, setImage] = useState(existingBlog?.image || "");

  // convert uploaded image to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!title || !excerpt || !content) {
      alert("Fill all fields");
      return;
    }

    alert("Blog saved successfully (connect backend later)");
    navigate("/dashboard/blogs");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Blog" : "Create New Blog"}
      </h1>

      <div className="space-y-5">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="text"
          placeholder="Short Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <textarea
          placeholder="Full Blog Content (HTML allowed)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-lg h-40"
        />

        <div>
          <p className="mb-2 font-medium">Upload Featured Image:</p>
          <input type="file" onChange={handleImageUpload} />

          {image && (
            <img
              src={image}
              className="w-40 h-40 rounded-lg object-cover mt-3"
            />
          )}
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-green-700 text-white rounded-lg"
        >
          Save Blog
        </button>
      </div>
    </div>
  );
}
