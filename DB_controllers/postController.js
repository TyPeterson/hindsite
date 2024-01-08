// Import the Post model
const Post = require('../DB_models/postModel');

// Function to handle creating a new post
const createPost = async (req, res) => {
  try {
    // Create a new post using data from the request body
    const newPost = new Post({
      content: req.body.content,
      user: req.body.user,  // Assuming this is the user's ID
      scheduledTime: req.body.scheduledTime,
      posted: false // Default value, but can be set based on req.body if needed
    });

    // Save the new post to the database
    await newPost.save();

    // Send back the created post as a response
    res.status(201).json(newPost);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(400).json({ error: error.message });
  }
};

// Export the createPost function
module.exports = {
  createPost,
};
