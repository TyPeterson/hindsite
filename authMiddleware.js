
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401); // No token, unauthorized
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Token is invalid, forbidden
  
      req.user = user;
      next(); // Token is valid, proceed
    });
  };
  
  module.exports = authenticateToken;