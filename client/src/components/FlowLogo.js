import React from 'react';

const FlowLogo = ({ size = 'medium', showText = true }) => {
  const sizes = {
    small: { width: '24px', height: '24px', fontSize: '14px' },
    medium: { width: '32px', height: '32px', fontSize: '18px' },
    large: { width: '48px', height: '48px', fontSize: '24px' }
  };

  const logoStyle = sizes[size] || sizes.medium;

  return (
    <div className="flow-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div 
        className="flow-logo-icon"
        style={{
          width: logoStyle.width,
          height: logoStyle.height,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '700',
          fontSize: logoStyle.fontSize,
          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
        }}
      >
        F
      </div>
      {showText && (
        <span 
          className="flow-logo-text"
          style={{ 
            fontWeight: '700', 
            fontSize: logoStyle.fontSize,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          FLOW
        </span>
      )}
    </div>
  );
};

export default FlowLogo;