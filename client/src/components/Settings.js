import React, { useState } from 'react';

const Settings = ({ user, onClose }) => {
  const [theme, setTheme] = useState('light');
  const [bio, setBio] = useState(user.bio || '');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme === 'dark' ? 'theme-dark' : '';
  };

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>Settings</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>Theme</h3>
            <div className="theme-toggle">
              <button 
                onClick={toggleTheme}
                className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
              >
                ☀️ Light
              </button>
              <button 
                onClick={toggleTheme}
                className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
              >
                🌙 Dark
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h3>Profile</h3>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                maxLength={160}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;