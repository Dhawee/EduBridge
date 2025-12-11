import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  BookOpenIcon,
  ChartBarIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("Student");
  const [userPicture, setUserPicture] = useState("");

  // Load user name and picture from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData.fullName) {
      setUserName(userData.fullName);
    }
    if (userData.passport) {
      setUserPicture(userData.passport);
    }
  }, []);

  const menuItems = [
    { name: "Home", path: "/dashboard", icon: <HomeIcon className="w-5 h-5" /> },
    { name: "Profile", path: "/dashboard/profile", icon: <UserIcon className="w-5 h-5" /> },
    { name: "Applications", path: "/dashboard/Applications", icon: <BookOpenIcon className="w-5 h-5" /> },
    { name: "Results", path: "/dashboard/results", icon: <ChartBarIcon className="w-5 h-5" /> },
    { name: "Notifications", path: "/dashboard/notifications", icon: <BellIcon className="w-5 h-5" /> },
  ];

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate("/auth");
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">

        {/* SIDEBAR */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex`}
        >
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-extrabold mb-10 text-green-500 tracking-wide">
              Student Portal
            </h1>

            {/* Navigation */}
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition 
                    ${isActive ? "bg-green-500 text-black font-semibold" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="flex flex-col space-y-3 mt-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-900" />
              )}
            </button>

            {/* Settings */}
            <NavLink
              to="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              onClick={() => setSidebarOpen(false)}
            >
              <Cog6ToothIcon className="w-5 h-5" />
              <span>Settings</span>
            </NavLink>

            {/* Logout */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600 hover:text-white transition"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden fixed top-4 left-4 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {sidebarOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto ml-0 md:ml-5 transition-all duration-300">
          <div className="flex items-center gap-4 mb-8">
          </div>

          <Outlet />
        </main>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md text-center space-y-6">
            <h2 className="text-xl font-bold">Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500 text-white rounded-xl"
              >
                Yes, Logout
              </button>

              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-3 bg-gray-300 dark:bg-gray-700 rounded-xl"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
