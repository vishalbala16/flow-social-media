import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';
import ThreadsNavbar from './components/ThreadsNavbar';
import ThreadsProfile from './components/ThreadsProfile';
import Settings from './components/Settings';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          setUser(data);
        } else {
          localStorage.removeItem('token');
        }
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {user && <ThreadsNavbar user={user} onSettings={() => setShowSettings(true)} />}
        {showSettings && <Settings user={user} onClose={() => setShowSettings(false)} />}
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/" 
            element={user ? <Feed user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile/:username" 
            element={user ? <ThreadsProfile currentUser={user} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;