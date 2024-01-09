// Import the Post model
const Post = require('../DB_models/postModel');
const User = require('../DB_models/userModel');

// --------------- createPost ----------------

// Function to handle creating a new post
const createPost = async (req, res) => {
  try {
    // Find the user by their ID
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Create a new post with the user's username
    const newPost = new Post({
      content: req.body.content,
      user: req.body.user,
      username: user.username, // Add the username
      scheduledTime: req.body.scheduledTime,
      posted: req.body.posted
    });

    // Save the new post to the database
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --------------- getPosts ----------------

const getPosts = async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find({});
    
    // Send the posts as a response
    res.json(posts);
  } catch (error) {
    // Handle any potential errors
    res.status(500).json({ error: error.message });
  }
};

// Export the createPost function
module.exports = {
  createPost,
  getPosts,
};
