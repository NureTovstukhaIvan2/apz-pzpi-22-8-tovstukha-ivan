import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
