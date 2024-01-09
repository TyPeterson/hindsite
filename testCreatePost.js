require('dotenv').config();
const { connectToMongoDB } = require('./mongoDB');
const Post = require('./DB_models/postModel');
const User = require('./DB_models/userModel'); // Import User model

// Connect to MongoDB
connectToMongoDB();

// Define user ID
const userId = '659c8482b697040643b68799'; // Replace with a valid user ID

// Fetch the user and create a post
User.findById(userId).then(user => {
  if (!user) {
    console.error('User not found');
    process.exit(1);
  }

  const newPost = new Post({
    content: 'testing',
    user: userId,
    username: user.username, // Set the username
    scheduledTime: new Date('2024-01-10'), // January 10, 2024
    posted: false
  });

  return newPost.save();
}).then(doc => {
  console.log('New post created:', doc);
  process.exit();
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
