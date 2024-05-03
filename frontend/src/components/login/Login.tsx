import { useAuth } from "../auth/AuthContext";
import { useEffect } from "react";

function Login() {
  const auth = useAuth();

  useEffect(() => {
    auth.login();
  });

  return "Redirecting to login form...";
}

export default Login;
