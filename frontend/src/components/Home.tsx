import { useAuth } from "./auth/AuthContext";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <form onSubmit={() => {}}>
      <h2>HOME PAGE</h2>
      <div>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default Home;
