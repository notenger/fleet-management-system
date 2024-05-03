import React, { useEffect } from "react";
import { useAuth } from "./auth/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    // Check authentication status when the component mounts
    if (!isAuthenticated) {
      // If not authenticated, trigger the login process
      login();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAuthenticated ? children : "";
};

export default ProtectedRoute;
