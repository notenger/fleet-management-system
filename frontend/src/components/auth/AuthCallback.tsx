import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function AuthCallback() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.loginCallback().then(() => {
      navigate("/map");
    });
  }, []);

  return <div>Processing signin...</div>;
}

export default AuthCallback;
