import React, { useState } from 'react';

const MediaUpload = ({ onMediaSelect, selectedMedia, onRemoveMedia }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files) => {
    const file = files[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (isImage || isVideo) {
        if (file.size > 50 * 1024 * 1024) {
          alert('File size must be less than 50MB');
          return;
        }
        onMediaSelect(file);
      } else {
        alert('Please select an image or video file');
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="media-upload">
      {selectedMedia ? (
        <div className="media-preview">
          {selectedMedia.type.startsWith('image/') ? (
            <img 
              src={URL.createObjectURL(selectedMedia)} 
              alt="Preview" 
              className="preview-image"
            />
          ) : (
            <video 
              src={URL.createObjectURL(selectedMedia)} 
              controls 
              className="preview-video"
            />
          )}
          <button 
            onClick={onRemoveMedia}
            className="remove-media"
            type="button"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="media-input"
            accept="image/*,video/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="media-input" className="upload-label">
            <div className="upload-icon">📷</div>
            <div className="upload-text">
              <span>Click to upload or drag & drop</span>
              <small>Images and videos up to 50MB</small>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;