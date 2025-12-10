// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // No token — user is not authenticated
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // User is authenticated, allow page access
  return <Outlet />;
}
