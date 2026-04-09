import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-logo">
          <div className="auth-logo-icon">🔐</div>
          <h2>Welcome Back</h2>
          <p className="auth-desc">Sign in to access your documents</p>
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
          {message && <div className="message error">{message}</div>}
          <button type="submit">Sign In</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
