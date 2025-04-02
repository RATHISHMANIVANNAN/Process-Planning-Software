import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">PROCESS PLANNER</h2>
      <ul className="menu">
        <li><Link to="/" className="menu-item">Dashboard</Link></li>
        <li><Link to="/chat" className="menu-item">Chat System</Link></li>
        <li><Link to="/notifications" className="menu-item">Notifications</Link></li>
        <li><Link to="/eyegaze" className="menu-item">Eye Gaze Detection</Link></li> {/* New Menu Item */}
      </ul>
    </div>
  );
};
