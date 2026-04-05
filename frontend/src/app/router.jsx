import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import CreativeBriefPage from "../pages/CreativeBriefPage";

const isAuth = () => !!localStorage.getItem("token");

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={isAuth() ? <DashboardPage /> : <Navigate to="/login" />}
        />

        <Route path="/brief" element={<CreativeBriefPage />} />
      </Routes>
    </BrowserRouter>
  );
}