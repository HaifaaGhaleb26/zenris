import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <h2>Zenris</h2>
      <ul className="sidebar-menu">
        <li>
          <Link to="/" className={`sidebar-item ${isActive('/') ? 'active-link' : ''}`}>
             Dashboard
          </Link>
        </li>
        <li>
          <Link to="/projects" className={`sidebar-item ${isActive('/projects') ? 'active-link' : ''}`}>
             Manage Projects
          </Link>
        </li>
        <li>
          <Link to="/settings" className={`sidebar-item ${isActive('/settings') ? 'active-link' : ''}`}>
             Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;