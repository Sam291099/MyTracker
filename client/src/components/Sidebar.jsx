
import {
  LayoutDashboard,
  CalendarDays,
  ChartNoAxesCombined,
  Target,
  CheckCircle2,
  Flame,
  Zap,
  MoreHorizontal,
  X,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

const navigation = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Activities", path: "/activities", icon: CheckCircle2 },
  { label: "Calendar", path: "/calendar", icon: CalendarDays },
  { label: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
  { label: "Goals", path: "/goals", icon: Target },
];

function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-logo">
          <Zap size={23} fill="currentColor" />
        </div>

        <span>
          My<span className="brand-highlight">Tracker</span>
        </span>

        <button className="mobile-close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="sidebar-section-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (
            <button
              key={item.path}
              className={`nav-item ${active ? "active" : ""}`}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-section-label">
          YOUR PROGRESS
        </div>

        <div className="streak-card">
          <div className="streak-icon">
            <Flame size={22} />
          </div>
          <div>
            <h6>3 Day Streak</h6>
            <p>Keep your momentum!</p>
          </div>
        </div>

        <div className="profile-card">
          <div className="avatar">U</div>
          <div className="profile-info">
            <h6>My Profile</h6>
            <p>Personal workspace</p>
          </div>
          <MoreHorizontal size={19} />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
