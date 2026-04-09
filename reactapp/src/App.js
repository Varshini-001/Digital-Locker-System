import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UploadPage from './components/UploadPage';
import DocumentList from './components/DocumentList';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }
  } catch {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/upload" element={<PrivateRoute><UploadPage /></PrivateRoute>} />
            <Route path="/documents" element={<PrivateRoute><DocumentList /></PrivateRoute>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
