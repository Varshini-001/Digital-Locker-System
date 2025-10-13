import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UploadPage from './components/UploadPage';
import DocumentList from './components/DocumentList';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/documents" element={<DocumentList />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;