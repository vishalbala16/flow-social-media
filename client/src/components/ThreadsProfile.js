import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ThreadsPost from './ThreadsPost';

const ThreadsProfile = ({ currentUser }) => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfileData();
  }, [username]);

  const loadProfileData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      console.log('Loading profile for username:', username);
      
      // Get user profile
      const userResponse = await axios.get(`/api/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('User response:', userResponse.data);
      setUser(userResponse.data);

      // Get all posts and filter for this user
      const postsResponse = await axios.get('/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Posts response:', postsResponse.data);
      
      const userPosts = postsResponse.data.filter(post => 
        post.author && post.author.username === username
      );
      console.log('Filtered user posts:', userPosts);
      setPosts(userPosts);
      
    } catch (error) {
      console.error('Error loading profile:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setPosts(posts => 
        posts.map(post => 
          post._id === postId 
            ? {
                ...post,
                likes: post.likes.includes(currentUser.id)
                  ? post.likes.filter(id => id !== currentUser.id)
                  : [...post.likes, currentUser.id]
              }
            : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <span>Loading profile...</span>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="error-container">
        <h2>Profile not found</h2>
        <p>The user you're looking for doesn't exist or there was an error loading the profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header-card">
        <div className="profile-info">
          <div className="profile-details">
            <h1>{user.username}</h1>
            <div className="profile-username">@{user.username}</div>
            
            {user.bio && (
              <div className="profile-bio">{user.bio}</div>
            )}

            <div className="profile-meta">
              <span>Joined {formatDate(user.createdAt)}</span>
            </div>

            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{posts.length}</span>
                <span className="stat-label">posts</span>
              </div>
            </div>
          </div>
          
          <div className="avatar avatar-large">
            {user.avatar ? (
              <img src={user.avatar} alt={user.username} />
            ) : (
              user.username.charAt(0).toUpperCase()
            )}
          </div>
        </div>
      </div>

      <div className="profile-posts">
        <h2>Posts</h2>
        
        {posts.length === 0 ? (
          <div className="empty-posts">
            <h3>No posts yet</h3>
            <p>{user.username} hasn't shared anything in the flow.</p>
          </div>
        ) : (
          posts.map((post) => (
            <ThreadsPost
              key={post._id}
              post={post}
              currentUser={currentUser}
              onLike={handleLike}
              onDelete={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ThreadsProfile;