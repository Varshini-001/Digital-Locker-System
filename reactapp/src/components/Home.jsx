import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Digital Locker</h1>
      <p className="home-subtitle">Manage your documents securely.</p>
      <Link to="/upload" className="upload-btn">
        Upload Document
      </Link>
    </div>
  );
};

export default Home;