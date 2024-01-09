require('dotenv').config();
const express = require('express');
const { scheduleTask } = require('./scheduler');
const postController = require('./DB_controllers/postController');
const userController = require('./DB_controllers/userController');
const { connectToMongoDB } = require('./mongoDB');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

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


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
module.exports = { authenticateToken };

// Express routes
app.get('/', (req, res) => {
  res.send('Hello, Hindsite!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


