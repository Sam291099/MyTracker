
import {
  Search,
  Bell,
  Menu,
  LogOut,
  User,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const page =
    location.pathname === "/"
      ? "Dashboard"
      : location.pathname.slice(1).replace(
          /^./,
          (char) => char.toUpperCase()
        );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="d-flex align-items-center gap-3">
        <button
          className="icon-button mobile-menu"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>

        <div>
          <div className="breadcrumb-text">
            Workspace / {page}
          </div>
          <h6 className="topbar-title">{page}</h6>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={17} />
          <input placeholder="Search activities..." />
          <span className="search-shortcut">/</span>
        </div>

        <button
          className="icon-button notification-button"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <div className="topbar-profile">
          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <span className="d-none d-sm-inline">
            {user?.name || "My Account"}
          </span>

          <button
            type="button"
            className="icon-button"
            onClick={handleLogout}
            title="Logout"
            aria-label="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
