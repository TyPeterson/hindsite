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
  scheduledTime: {
    type: Date,
    required: true
  },
  posted: {
    type: Boolean,
    default: false
  },
  // Additional fields as necessary
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
