import React, { useState } from 'react';

const MediaDisplay = ({ media, mediaType }) => {
  const [imageError, setImageError] = useState(false);

  if (!media || !mediaType) return null;

  const mediaUrl = `/uploads/${media}`;

  const handleImageError = (e) => {
    console.error('Media failed to load:', mediaUrl);
    console.error('Error details:', e);
    setImageError(true);
  };

  if (imageError) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        background: 'var(--color-background)',
        borderRadius: '8px',
        color: 'var(--color-text-secondary)',
        border: '1px solid var(--color-border)'
      }}>
        <span>📷 Media unavailable</span>
      </div>
    );
  }

  return (
    <div className="media-container">
      {mediaType === 'image' ? (
        <img
          src={mediaUrl}
          alt="Post media"
          className="post-media"
          onError={handleImageError}
          onLoad={() => console.log('Image loaded:', mediaUrl)}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      ) : (
        <video
          src={mediaUrl}
          controls
          className="post-media"
          onError={handleImageError}
          onLoadedData={() => console.log('Video loaded:', mediaUrl)}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
    </div>
  );
};

export default MediaDisplay;