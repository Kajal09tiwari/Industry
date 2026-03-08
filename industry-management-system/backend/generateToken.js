const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate a sample JWT token for testing
const payload = {
  userId: '507f1f77bcf86cd799439011', // Sample user ID
  email: 'test@example.com'
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

console.log('Sample JWT Token:');
console.log(token);
console.log('\nUse this token in the Authorization header:');
console.log('Bearer ' + token);