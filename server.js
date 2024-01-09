require('dotenv').config();
const express = require('express');
const { scheduleTask } = require('./scheduler');
const postController = require('./DB_controllers/postController');
const userController = require('./DB_controllers/userController');
const authenticateToken = require('./authMiddleware');
const { connectToMongoDB } = require('./mongoDB');
const Post = require('./DB_models/postModel');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());


// Initialize MongoDB connection
connectToMongoDB();

// Initialize scheduled tasks
scheduleTask();

// Route to create a new post
app.post('/posts', postController.createPost);

// Route to register a new user
app.post('/register', userController.register);

// Route to login an existing user
app.post('/login', userController.login);

// Example endpoint to update a post's rating
app.post('/posts/:postId/rate', async (req, res) => {
  try {
    const { rating } = req.body;
    const { postId } = req.params;

    console.log(`Updating post ${postId} with rating: ${rating}`); // Additional logging

    if (!['wrong', 'neutral', 'correct'].includes(rating)) {
      return res.status(400).send('Invalid rating');
    }

    const update = { $inc: { [`ratings.${rating}`]: 1 } };
    const updatedPost = await Post.findByIdAndUpdate(postId, update, { new: true });

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error); // Detailed error logging
    res.status(500).json({ error: error.message });
  }
});


// Express routes
app.get('/', (req, res) => {
  res.send('Hello, Hindsite!');
});

// Example of a protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.send(`Welcome ${req.user.username}, you have access to the protected route!`);
});

app.get('/posts', postController.getPosts);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


