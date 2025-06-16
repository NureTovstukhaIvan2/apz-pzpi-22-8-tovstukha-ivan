import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthService from "./services/auth.service";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Aquariums from "./pages/Aquariums";
import AquariumDetails from "./pages/AquariumDetails";
import Users from "./pages/Users";
import Devices from "./pages/Devices";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./i18n";

function App() {
  const { t } = useTranslation();
  const currentUser = AuthService.getCurrentUser();

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar currentUser={currentUser} t={t} />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home t={t} />} />
            <Route path="/login" element={<Login t={t} />} />

            <Route
              path="/aquariums"
              element={
                <ProtectedRoute>
                  <Aquariums t={t} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/aquariums/:id"
              element={
                <ProtectedRoute>
                  <AquariumDetails t={t} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <Users t={t} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/devices"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
                  <Devices t={t} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
