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

  // NO TOKEN

  if (!token) {

    return <Navigate to="/" />;
  }

  try {

    // DECODE TOKEN

    const payload = JSON.parse(

      atob(
        token.split(".")[1]
      )
    );

    // CHECK EXPIRY

    const isExpired =

      payload.exp * 1000 <
      Date.now();

    if (isExpired) {

      // REMOVE TOKEN

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      return <Navigate to="/" />;
    }

  } catch (error) {

    return <Navigate to="/" />;
  }

  return children;
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
  path="/boys"
  element={
    <ProtectedRoute>

      <Beds type="boys" />

    </ProtectedRoute>
  }
/>

<Route
  path="/girls"
  element={
    <ProtectedRoute>

      <Beds type="girls" />

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