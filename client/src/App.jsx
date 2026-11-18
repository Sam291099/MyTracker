
import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ActivityProvider } from "./context/ActivityContext";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protect application pages
function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="p-4">Loading MyTracker...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

// Redirect logged-in users away from login/register
function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="p-4">Loading MyTracker...</div>;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ActivityProvider>
      <div className="app-shell">
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="main-content">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <div className="dashboard-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/goals" element={<Goals />} />
            </Routes>
          </div>
        </main>
      </div>
    </ActivityProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<AppLayout />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
