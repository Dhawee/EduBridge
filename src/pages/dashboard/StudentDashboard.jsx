import { useState } from "react";
import {
  UserIcon,
  BookOpenIcon,
  ChartBarIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [active, setActive] = useState("profile");

  return (
    
    <div className="min-h-screen flex bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* SIDEBAR */}
      <aside className="w-64 hidden md:flex flex-col bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">
        <h1 className="text-2xl font-bold mb-10">Student Portal</h1>

        <nav className="flex flex-col space-y-3">
          <SidebarItem
            icon={<UserIcon className="w-5 h-5" />}
            label="Profile"
            active={active === "profile"}
            onClick={() => setActive("profile")}
          />

          <SidebarItem
            icon={<BookOpenIcon className="w-5 h-5" />}
            label="Courses"
            active={active === "courses"}
            onClick={() => setActive("courses")}
          />

          <SidebarItem
            icon={<ChartBarIcon className="w-5 h-5" />}
            label="Results"
            active={active === "results"}
            onClick={() => setActive("results")}
          />

          <SidebarItem
            icon={<BellIcon className="w-5 h-5" />}
            label="Notifications"
            active={active === "notifications"}
            onClick={() => setActive("notifications")}
          />
        </nav>

        <button className="mt-auto flex items-center space-x-2 text-red-400 hover:text-red-500 transition">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10">
        {active === "profile" && <ProfileSection />}
        {active === "courses" && <CoursesSection />}
        {active === "results" && <ResultsSection />}
        {active === "notifications" && <NotificationsSection />}
      </main>
    </div>
  );
}

/* -------------------------------- */
/* SIDEBAR ITEM COMPONENT */
/* -------------------------------- */
function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition 
      ${active ? "bg-green-500/20 text-green-400" : "text-gray-300 hover:bg-white/10"}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* -------------------------------- */
/* PROFILE SECTION */
/* -------------------------------- */
function ProfileSection() {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-gray-300">Name: John Doe</p>
        <p className="text-gray-300 mt-2">Email: johndoe@example.com</p>
        <p className="text-gray-300 mt-2">Level: 300</p>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* COURSES SECTION */
/* -------------------------------- */
function CoursesSection() {
  const courses = ["Mathematics", "Biology", "Chemistry", "English"];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold mb-4">Courses</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <div
            key={i}
            className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
          >
            {course}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- */
/* RESULTS SECTION */
/* -------------------------------- */
function ResultsSection() {
  const results = [
    { subject: "Mathematics", score: "85%" },
    { subject: "Biology", score: "92%" },
    { subject: "Chemistry", score: "78%" },
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold mb-4">Results</h2>

      <div className="space-y-4">
        {results.map((item, i) => (
          <div
            key={i}
            className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between"
          >
            <span>{item.subject}</span>
            <span className="text-green-400">{item.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- */
/* NOTIFICATIONS SECTION */
/* -------------------------------- */
function NotificationsSection() {
  const notices = [
    "Your assignment is due tomorrow.",
    "New class schedule update available.",
    "School portal will undergo maintenance at midnight."
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold mb-4">Notifications</h2>

      <div className="space-y-4">
        {notices.map((msg, i) => (
          <div
            key={i}
            className="p-4 bg-white/5 border border-white/10 rounded-xl"
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
