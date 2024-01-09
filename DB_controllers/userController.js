const User = require('../DB_models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --------------- register ----------------

const register = async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user in the database
    const savedUser = await user.save();

    // Send a success response (avoid sending back the password, even if it's hashed)
    res.status(201).json({ id: savedUser._id, username: savedUser.username, email: savedUser.email });
  } catch (error) {
    // Handle errors (e.g., duplicate username/email)
    res.status(400).json({ error: error.message });
  }
};


// --------------- login ----------------

const login = async (req, res) => {
  try {
    // Find the user by their email or username
    const user = await User.findOne({ email: req.body.email }); // or username
    if (!user) {
      return res.status(401).send('Authentication failed');
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send('Authentication failed');
    }

    // Create a token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send the token to the client
    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
};
