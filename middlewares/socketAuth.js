const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const socketAuth = (socket, next) => {
  const token = socket.handshake.query.token;

  if (!token) {
    console.error('No token provided');
    return next(new Error('Authentication error: No token provided'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return next(new Error('Authentication error: Invalid token'));
    }
    next();
  });
};

module.exports = socketAuth;
