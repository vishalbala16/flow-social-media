const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Create post
router.post('/', auth, upload.single('media'), async (req, res) => {
  try {
    if (!req.body.content && !req.file) {
      return res.status(400).json({ message: 'Post must have content or media' });
    }

    const postData = {
      author: req.user._id
    };

    if (req.body.content) {
      postData.content = req.body.content.trim();
    }

    if (req.file) {
      postData.media = req.file.filename;
      postData.mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';
      console.log('Media uploaded:', {
        filename: req.file.filename,
        mediaType: postData.mediaType,
        path: req.file.path
      });
    }

    const post = new Post(postData);

    await post.save();
    await post.populate('author', 'username avatar');

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts (feed)
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('author', 'username avatar')
      .populate('comments.user', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/Unlike post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json({ likes: post.likes.length, isLiked: likeIndex === -1 });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment
router.post('/:id/comment', auth, [
  body('content').isLength({ min: 1, max: 280 }).trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      user: req.user._id,
      content: req.body.content
    };

    post.comments.push(comment);
    await post.save();
    await post.populate('comments.user', 'username avatar');

    res.json(post.comments[post.comments.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;