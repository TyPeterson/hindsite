// require('dotenv').config();
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
  }
};

module.exports = { connectToMongoDB };

