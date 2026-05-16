import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Beds from "../pages/Beds";
import Login from "../pages/Login";
import Reports from "../pages/Reports";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/beds" element={<Beds />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;