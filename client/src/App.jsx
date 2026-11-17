
import { useState } from "react";
import { ActivityProvider } from "./context/ActivityContext";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
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
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

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
  );
}

function App() {
  return (
    <ActivityProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ActivityProvider>
  );
}

export default App;
