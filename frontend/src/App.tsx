import * as React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Frame from "./components/Frame";
import Orders from "./components/muitemplate/Orders";
import MapPage from "./components/MapPage";
import TestAPI from "./components/TestAPI";
import UserRegistrationForm from "./components/signup/UserRegistrationForm";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Home from "./components/Home";
import AuthCallback from "./components/auth/AuthCallback";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="openid/callback" element={<AuthCallback />} />

        <Route
          element={
            <ProtectedRoute>
              <Frame />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="signup" element={<UserRegistrationForm />} />
          <Route path="orders" element={<Orders />} />
          <Route path="map" element={<MapPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
