import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FlowLogo from './FlowLogo';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
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
        <h2>Join FLOW</h2>
        
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength="3"
            maxLength="20"
            pattern="[a-zA-Z0-9_]+"
            title="Username can only contain letters, numbers, and underscores"
          />
        </div>

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
            minLength="6"
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="btn btn-full" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        <div className="auth-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;