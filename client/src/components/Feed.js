import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThreadsPostForm from './ThreadsPostForm';
import ThreadsPost from './ThreadsPost';

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('for-you');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setPosts(posts.map(post => 
        post._id === postId 
          ? { ...post, likes: Array(response.data.likes).fill(null) }
          : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleCommentAdded = (postId, newComment) => {
    setPosts(posts.map(post => 
      post._id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
  };

  if (loading) {
    return <div className="loading">Loading feed...</div>;
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchPosts();
    setIsRefreshing(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <span>Loading your feed...</span>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="feed-container">
        <ThreadsPostForm onNewPost={handleNewPost} user={user} />
        
        {posts.length === 0 ? (
          <div className="empty-feed">
            <h3>No posts yet</h3>
            <p>Be the first to share something in the flow!</p>
          </div>
        ) : (
          posts.map(post => (
            <ThreadsPost
              key={post._id}
              post={post}
              currentUser={user}
              onLike={handleLike}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default Feed;