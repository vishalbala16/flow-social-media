import React, { useState } from 'react';

const ShareModal = ({ post, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/post/${post._id}`;
  const shareText = `Check out this post on FLOW: "${post.content?.substring(0, 100)}${post.content?.length > 100 ? '...' : ''}"`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FLOW Post',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="share-header">
          <h3>Share Post</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="share-content">
          <div className="share-options">
            {navigator.share && (
              <button onClick={handleNativeShare} className="share-option">
                <div className="share-icon">📱</div>
                <span>Share</span>
              </button>
            )}
            
            <button onClick={handleCopyLink} className="share-option">
              <div className="share-icon">🔗</div>
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
            
            <button onClick={shareToTwitter} className="share-option">
              <div className="share-icon">🐦</div>
              <span>Twitter</span>
            </button>
            
            <button onClick={shareToFacebook} className="share-option">
              <div className="share-icon">📘</div>
              <span>Facebook</span>
            </button>
            
            <button onClick={shareToWhatsApp} className="share-option">
              <div className="share-icon">💬</div>
              <span>WhatsApp</span>
            </button>
          </div>
          
          <div className="share-url">
            <input 
              type="text" 
              value={shareUrl} 
              readOnly 
              onClick={(e) => e.target.select()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;