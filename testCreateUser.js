const { connectToMongoDB } = require('./mongoDB'); // Adjust the path as necessary
const User = require('./DB_models/userModel'); // Adjust the path as necessary

// Connect to MongoDB
connectToMongoDB();

// Create and save a new user
const newUser = new User({
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'password123' // In a real application, make sure to hash passwords
});

newUser.save()
  .then((doc) => {
    console.log('New user created:', doc);
    process.exit(); // Exit the script after saving
  })
  .catch((err) => {
    console.error('Error creating user:', err);
    process.exit(1); // Exit with error code
  });
