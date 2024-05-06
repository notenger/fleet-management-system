import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // if (auth.user === undefined) auth.login();
    if (auth.isTokenExpired()) navigate("/logout");
    if (!auth.isAuthenticated()) auth.login();
  });

  // return auth.user === undefined ? "" : children;
  return !auth.isAuthenticated() ? "" : children;
}
