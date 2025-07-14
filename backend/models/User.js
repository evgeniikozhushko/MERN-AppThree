const mongoose = require('mongoose');

// AuthUser - for authentication
const authUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }  // For login/register
});

// User - for user management
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
  // No password needed for simple user management
});

module.exports = mongoose.model('User', userSchema);
