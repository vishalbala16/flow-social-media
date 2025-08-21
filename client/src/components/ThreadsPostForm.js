import React, { useState } from 'react';
import axios from 'axios';
import MediaUpload from './MediaUpload';

const ThreadsPostForm = ({ onNewPost, user }) => {
  const [content, setContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !selectedMedia) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      if (content.trim()) {
        formData.append('content', content.trim());
      }
      
      if (selectedMedia) {
        formData.append('media', selectedMedia);
      }
      
      const response = await axios.post('/api/posts', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      onNewPost(response.data);
      setContent('');
      setSelectedMedia(null);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const charCount = content.length;
  const maxChars = 280;
  const isOverLimit = charCount > maxChars;
  const canPost = (content.trim() || selectedMedia) && !isOverLimit;

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="post-form-header">
        <div className="avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={user.username} />
          ) : (
            user.username.charAt(0).toUpperCase()
          )}
        </div>
        <div style={{ flex: 1 }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's flowing through your mind?"
            maxLength={maxChars + 20}
          />
        </div>
      </div>
      
      <MediaUpload 
        onMediaSelect={setSelectedMedia}
        selectedMedia={selectedMedia}
        onRemoveMedia={() => setSelectedMedia(null)}
      />
      
      <div className="post-form-footer">
        <div className="post-form-actions">
          <button 
            type="button" 
            className="action-btn" 
            title="Add media"
            onClick={() => document.getElementById('media-input')?.click()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
          </button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className={`char-count ${charCount > maxChars - 20 ? 'warning' : ''} ${isOverLimit ? 'error' : ''}`}>
            {charCount}/{maxChars}
          </div>
          
          <button 
            type="submit" 
            className="btn" 
            disabled={loading || !canPost}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ThreadsPostForm;