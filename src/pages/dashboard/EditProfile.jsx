import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [passportPreview, setPassportPreview] = useState(null);

  // Initialize form with user data from localStorage
  const userData = localStorage.getItem("user");
  const initialForm = userData ? JSON.parse(userData) : {
    fullName: "",
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    lga: "",
    year: "",
    term: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    guardianRelationship: "",
  };

  const [form, setForm] = useState(initialForm);
  const [showToast, setShowToast] = useState(false);

  // Load profile picture on mount
  useEffect(() => {
    const savedPassport = localStorage.getItem("userPassport");
    if (savedPassport) setPassportPreview(savedPassport);
  }, []);

  // Handle text input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle profile picture upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPassportPreview(imageUrl);
    localStorage.setItem("userPassport", imageUrl);
  };

  // Save changes
  const handleSaveChanges = () => {
    localStorage.setItem("user", JSON.stringify(form));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/dashboard/profile");
    }, 1500);
  };

  const displayName = form.fullName || form.fullname || "Student";

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Edit Profile</h1>

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={passportPreview || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          className="w-32 h-32 rounded-full border-4 border-green-500 object-cover shadow-md"
          alt="Profile"
        />

        <label className="mt-4 cursor-pointer bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition font-medium">
          Change Photo
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Full Name */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName || form.fullname || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            City
          </label>
          <input
            type="text"
            name="city"
            value={form.city || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* LGA */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            LGA
          </label>
          <input
            type="text"
            name="lga"
            value={form.lga || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Year */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Year
          </label>
          <input
            type="text"
            name="year"
            value={form.year || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Term */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Term
          </label>
          <input
            type="text"
            name="term"
            value={form.term || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Guardian Name */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Guardian Name
          </label>
          <input
            type="text"
            name="guardianName"
            value={form.guardianName || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Guardian Phone */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Guardian Phone
          </label>
          <input
            type="text"
            name="guardianPhone"
            value={form.guardianPhone || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Guardian Email */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Guardian Email
          </label>
          <input
            type="email"
            name="guardianEmail"
            value={form.guardianEmail || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Guardian Relationship */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Guardian Relationship
          </label>
          <input
            type="text"
            name="guardianRelationship"
            value={form.guardianRelationship || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-8 gap-4">
        <button
          onClick={() => navigate("/dashboard/profile")}
          className="px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSaveChanges}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
        >
          Save Changes
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          Profile updated successfully!
        </div>
      )}
    </div>
  );
}
