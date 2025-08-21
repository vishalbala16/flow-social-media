import React from 'react';
import { Link } from 'react-router-dom';
import FlowLogo from './FlowLogo';

const ThreadsNavbar = ({ user, onSettings }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <FlowLogo size="medium" showText={true} />
        </Link>
        
        <div className="navbar-right">
          <div className="nav-icon" onClick={onSettings} title="Settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
            </svg>
          </div>
          
          <Link to={`/profile/${user.username}`} className="navbar-user">
            <div className="avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} />
              ) : (
                user.username.charAt(0).toUpperCase()
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ThreadsNavbar;