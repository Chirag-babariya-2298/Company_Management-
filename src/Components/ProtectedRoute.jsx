import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../Utils/AuthUtils";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired()) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
