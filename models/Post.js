const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    maxlength: 280,
    trim: true
  },
  media: {
    type: String,
    default: ''
  },
  mediaType: {
    type: String,
    enum: ['image', 'video', ''],
    default: ''
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String,
      required: true,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isEdited: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);