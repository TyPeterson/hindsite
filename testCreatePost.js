const { connectToMongoDB } = require('./mongoDB');
const Post = require('./DB_models/postModel');

// Connect to MongoDB
connectToMongoDB();

// Create and save a new post
const newPost = new Post({
  content: 'This is a test post',
  user: '659c833c8b5fc07b530f3a92', // Replace with a valid user ID from your 'users' collection
  scheduledTime: new Date('2024-01-10'), // January 10, 2024
  posted: false
});

newPost.save()
  .then((doc) => {
    console.log('New post created:', doc);
    process.exit(); // Exit the script after saving
  })
  .catch((err) => {
    console.error('Error creating post:', err);
    process.exit(1); // Exit with error code
  });
