const express = require('express');
const { scheduleTask } = require('./scheduler');
const postController = require('./controllers/postController');
const { connectToMongoDB } = require('./mongoDB');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Initialize MongoDB connection
connectToMongoDB();

// Initialize scheduled tasks
scheduleTask();

// Route to create a new post
app.post('/posts', postController.createPost);

// Express routes
app.get('/', (req, res) => {
  res.send('Hello, Hindsite!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


