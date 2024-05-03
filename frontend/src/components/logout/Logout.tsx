import { useAuth } from "../auth/AuthContext";
import { useEffect } from "react";

function Logout() {
  const auth = useAuth();

  useEffect(() => {
    auth.logout();
  });

  return "Signing out...";
}

export default Logout;
