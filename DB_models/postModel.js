const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  username: {
    type: String,
    required: true
  },
  composedAt: {
    type: Date,
    default: Date.now
  },
  scheduledTime: {
    type: Date,
    required: true
  },
  posted: {
    type: Boolean,
    default: false
  },
  ratings: {
    wrong: { type: Number, default: 0 },
    neutral: { type: Number, default: 0 },
    correct: { type: Number, default: 0 }
  },
  // Additional fields as necessary
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
