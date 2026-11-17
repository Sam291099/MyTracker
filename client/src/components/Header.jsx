
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

import { useLocation } from "react-router-dom";

function Header({ onMenuClick }) {
  const location = useLocation();

  const page =
    location.pathname === "/"
      ? "Dashboard"
      : location.pathname.slice(1).replace(
          /^./,
          (char) => char.toUpperCase()
        );

  return (
    <header className="topbar">
      <div className="d-flex align-items-center gap-3">
        <button
          className="icon-button mobile-menu"
          onClick={onMenuClick}
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

        <button className="icon-button notification-button">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <div className="topbar-profile">
          <div className="avatar">U</div>
          <span>My Account</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

export default Header;
