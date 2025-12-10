import React, { useEffect, useState } from "react";
import Button from "../../components/Button";

export default function DashboardProfile() {
  // Initialize with user data from localStorage (saved as "user" from auth)
  const regData = localStorage.getItem("user");
  const initialUser = regData ? JSON.parse(regData) : {
    fullName: "",
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

  const savedPassport = localStorage.getItem("userPassport");

  const [user, setUser] = useState(initialUser);
  const [passportPreview, setPassportPreview] = useState(savedPassport || null);

  // Update user if data loads after component mounts
  useEffect(() => {
    const regData = localStorage.getItem("user");
    if (regData) {
      setUser(JSON.parse(regData));
    }

    const savedPassport = localStorage.getItem("userPassport");
    if (savedPassport) setPassportPreview(savedPassport);
  }, []);

  const handlePassportUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPassportPreview(preview);
      localStorage.setItem("userPassport", preview);
    }
  };

  return (
    <div className="animate-fadeIn space-y-6 pb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-green-400">My Profile</h1>
      </div>

      {/* HEADER CARD WITH PROFILE IMAGE AND INFO */}
      <div className="bg-linear-to-br from-green-500/10 to-green-400/5 dark:from-green-900/20 dark:to-green-800/10 border border-green-400/30 dark:border-green-700/30 p-8 rounded-3xl shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-green-400 to-green-600 rounded-full opacity-20 blur-lg"></div>
            <img
              src={passportPreview || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              className="relative w-40 h-40 rounded-full border-4 border-green-400 shadow-lg object-cover"
              alt="Profile"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {user.fullName || user.fullname || "Student Name"}
            </h2>
            <p className="text-lg text-green-500 dark:text-green-400 font-semibold mb-4">Student Profile</p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{user.email || "Email not provided"}</p>
            
            {/* Quick Actions */}
            <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start">
              <Button text="Edit Profile" to="/dashboard/edit-profile" variant="primary" />
            </div>
          </div>
        </div>
      </div>

      {/* STUDENT DETAILS SECTION */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b-2 border-green-400">
          📚 Student Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Full Name", value: user.fullName || user.fullname, icon: "👤" },
            { label: "Email", value: user.email, icon: "📧" },
            { label: "Phone", value: user.phone, icon: "📱" },
            { label: "Address", value: user.address, icon: "📍" },
            { label: "City", value: user.city, icon: "🏙️" },
            { label: "LGA", value: user.lga, icon: "🗺️" },
            { label: "Year", value: user.year, icon: "📅" },
            { label: "Term", value: user.term, icon: "📖" },
          ].map((field, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{field.icon}</span>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {field.label}
                </span>
              </div>
              <p className={field.value ? "text-lg font-semibold text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500 italic"}>
                {field.value || "Not filled"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* GUARDIAN INFORMATION SECTION */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b-2 border-green-400">
          👨‍👩‍👧 Parent / Guardian Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Guardian Name", value: user.guardianName, icon: "👨‍💼" },
            { label: "Guardian Phone", value: user.guardianPhone, icon: "📞" },
            { label: "Guardian Email", value: user.guardianEmail, icon: "📬" },
            { label: "Relationship", value: user.guardianRelationship, icon: "🔗" },
          ].map((field, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{field.icon}</span>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {field.label}
                </span>
              </div>
              <p className={field.value ? "text-lg font-semibold text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500 italic"}>
                {field.value || "Not filled"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
