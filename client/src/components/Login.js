import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FlowLogo from './FlowLogo';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-logo">
          <FlowLogo size="large" showText={true} />
        </div>
        <h2>Welcome to FLOW</h2>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="btn btn-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="auth-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;