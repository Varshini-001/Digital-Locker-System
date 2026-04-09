import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', { email, password });
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-logo">
          <div className="auth-logo-icon">✨</div>
          <h2>Create Account</h2>
          <p className="auth-desc">Start managing your documents securely</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {message && <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</div>}
          <button type="submit">Create Account</button>
        </form>
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
};

export default Signup;
