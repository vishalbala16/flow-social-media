import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MediaDisplay from './MediaDisplay';
import CommentSection from './CommentSection';
import ShareModal from './ShareModal';

const ThreadsPost = ({ post, currentUser, onLike, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments?.length || 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
    }
  };

  const isLiked = post.likes.includes(currentUser.id);
  const canDelete = post.author._id === currentUser.id;

  return (
    <div className="post">
      <div className="post-header">
        <Link to={`/profile/${post.author.username}`} className="avatar">
          {post.author.avatar ? (
            <img src={post.author.avatar} alt={post.author.username} />
          ) : (
            post.author.username.charAt(0).toUpperCase()
          )}
        </Link>
        
        <div className="post-user-info">
          <div className="post-meta">
            <Link to={`/profile/${post.author.username}`} className="post-author">
              {post.author.username}
            </Link>
            <span className="post-time">
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>

        {canDelete && (
          <button 
            className="options-btn"
            onClick={() => setShowOptions(!showOptions)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        )}
        
        {showOptions && (
          <div className="options-menu">
            <button 
              onClick={() => {
                if (window.confirm('Delete this post?')) {
                  onDelete(post._id);
                }
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {post.content && (
        <div className="post-content">
          {post.content}
        </div>
      )}

      {post.media && (
        <div className="post-media">
          <MediaDisplay 
            media={post.media}
            mediaType={post.mediaType}
          />
        </div>
      )}

      <div className="post-actions">
        <button 
          className={`post-action ${isLiked ? 'liked' : ''}`}
          onClick={() => onLike(post._id)}
        >
          <svg viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {post.likes.length > 0 && <span>{post.likes.length}</span>}
        </button>
        
        <button 
          className="post-action"
          onClick={() => setShowComments(!showComments)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          {commentCount > 0 && <span>{commentCount}</span>}
        </button>
        
        <button 
          className="post-action"
          onClick={() => setShowShareModal(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16,6 12,2 8,6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
        </button>
      </div>
      
      {showComments && (
        <CommentSection 
          post={post} 
          onCommentAdded={() => setCommentCount(prev => prev + 1)}
        />
      )}
      
      <ShareModal 
        post={post}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
};

export default ThreadsPost;