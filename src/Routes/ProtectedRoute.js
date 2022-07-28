import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  //The Child component (passed from outside) only accessable if there is a user otherwise it will redirect to login page.
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
