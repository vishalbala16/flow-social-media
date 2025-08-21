import React, { useState } from 'react';
import axios from 'axios';

const CommentSection = ({ post, onCommentAdded }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/posts/${post._id}/comment`, {
        content: newComment.trim()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setComments([...comments, response.data]);
      setNewComment('');
      onCommentAdded && onCommentAdded();
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  return (
    <div className="comment-section">
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <div className="comment-avatar">
              {comment.user?.avatar ? (
                <img src={comment.user.avatar} alt={comment.user.username} />
              ) : (
                comment.user?.username?.charAt(0).toUpperCase() || '?'
              )}
            </div>
            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-author">{comment.user?.username || 'Unknown'}</span>
                <span className="comment-time">{formatDate(comment.createdAt)}</span>
              </div>
              <div className="comment-text">{comment.content}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          maxLength={280}
          rows={2}
        />
        <button 
          type="submit" 
          className="btn btn-small"
          disabled={loading || !newComment.trim()}
        >
          {loading ? 'Posting...' : 'Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;