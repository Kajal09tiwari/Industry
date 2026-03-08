const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to verify JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token is valid!');
    console.log('Decoded payload:', decoded);
    return decoded;
  } catch (error) {
    console.log('Token is invalid:', error.message);
    return null;
  }
}

// Example usage
if (process.argv[2]) {
  const token = process.argv[2];
  verifyToken(token);
} else {
  console.log('Usage: node verifyToken.js <token>');
  console.log('Example: node verifyToken.js eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
}