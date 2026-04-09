import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-links">
          {isLoggedIn && (
            <>
              <Link to="/">Home</Link>
              <Link to="/upload">Upload</Link>
              <Link to="/documents">Documents</Link>
            </>
          )}
        </div>
        {isLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;