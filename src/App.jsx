import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import SchoolsList from "./pages/SchoolsList";
import SchoolDetails from "./pages/SchoolDetails";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import EmailVerify from "./pages/EmailVerify";
import ProtectedRoute from "./utils/ProtectedRoute";

// Dashboard pages
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import DashboardSchools from "./pages/dashboard/DashboardSchools";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import DashboardCourses from "./pages/dashboard/DashboardCourses";
import DashboardResults from "./pages/dashboard/DashboardResults";
import DashboardNotifications from "./pages/dashboard/DashboardNotifications";
import EditProfile from "./pages/dashboard/EditProfile";
import ApplyPage from "./pages/dashboard/ApplyPage";
import ApplicationsPage from "./pages/dashboard/ApplicationsPage";
import ApplicationDetailsPage from "./pages/dashboard/ApplicationDetailsPage";
import BlogDashboard from "./pages/dashboard/BlogDashboard";
import BlogEditor from "./pages/dashboard/BlogEditor";

// Toast
import { ToastProvider } from "./components/Toast";

function AppWrapper() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/schools" element={<SchoolsList />} />
        <Route path="/schools/:id" element={<SchoolDetails />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* Protected Dashboard */}
        <Route path="/dashboard/*" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="schools" element={<DashboardSchools />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="courses" element={<DashboardCourses />} />
            <Route path="results" element={<DashboardResults />} />
            <Route path="notifications" element={<DashboardNotifications />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="apply" element={<ApplyPage />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="application-details" element={<ApplicationDetailsPage />} />
            <Route path="blogs" element={<BlogDashboard />} />
            <Route path="blogs/create" element={<BlogEditor />} />
            <Route path="blogs/edit/:id" element={<BlogEditor />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<p className="text-center mt-12 text-red-500">Page not found</p>} />
      </Routes>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <AppWrapper />
      </Router>
    </ToastProvider>
  );
}
