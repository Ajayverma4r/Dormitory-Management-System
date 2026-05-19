import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";

import Beds from "../pages/Beds";

import Reports from "../pages/Reports";

import Users from "../pages/Users";


// PROTECTED ROUTE

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/" />;
}


function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
  path="/users"
  element={
    <ProtectedRoute>

      <Users />

    </ProtectedRoute>
  }
/>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        {/* BEDS */}

        <Route
          path="/beds"
          element={
            <ProtectedRoute>

              <Beds />

            </ProtectedRoute>
          }
        />

        {/* REPORTS */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute>

              <Reports />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;