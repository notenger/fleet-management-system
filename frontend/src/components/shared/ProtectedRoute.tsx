import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();

  useEffect(() => {
    if (auth.user === undefined) auth.login();
  });

  return auth.user === undefined ? "" : children;
}
