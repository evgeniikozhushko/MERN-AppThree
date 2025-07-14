// Import bcrypt for hashing passwords
const bcrypt = require('bcrypt');

// Import jsonwebtoken for creating and verifying JWT tokens
const jwt = require('jsonwebtoken');

// Import the Mongoose AuthUser model to interact with the database
const AuthUser = require('../models/AuthUser');

// ===========================
// Helper function to create a JWT
// ===========================
const createToken = (id) => {
  // Creates a signed JWT containing the user ID as payload
  // It will expire in 7 days
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ===========================
// Register a new user
// POST /api/auth/register
// ===========================
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if a user with this email already exists
    const exists = await AuthUser.findOne({ email });
    if (exists) return res.status(409).json({ message: 'User with this email already exists' });

    // 2. Hash the password with bcrypt (12 salt rounds)
    const hashed = await bcrypt.hash(password, 12);

    // 3. Create and save the new user in the database
    const user = await AuthUser.create({ email, password: hashed });

    // 4. Create a JWT token containing the user ID
    const token = createToken(user._id);

    // 5. Set the token as an HTTP-only cookie on the client
    res.cookie('token', token, {
      httpOnly: true,   // Not accessible via JavaScript on client
      secure: false,    // Should be true in production with HTTPS
      sameSite: 'lax',  // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days
    });

    // 6. Respond with the new user's ID and email (never send the password)
    res.status(201).json({ id: user._id, email: user.email });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

// ===========================
// Login an existing user
// POST /api/auth/login
// ===========================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user in the database by email
    const user = await AuthUser.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Email not found. Please register first.' });

    // 2. Compare the provided password with the hashed password in DB
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password. Please try again.' });

    // 3. If password matches, create a new JWT token
    const token = createToken(user._id);

    // 4. Set the token as an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // 5. Send back the user ID and email
    res.json({ id: user._id, email: user.email });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};

// ===========================
// Logout the user
// POST /api/auth/logout
// ===========================
exports.logout = (req, res) => {
  // Clears the token cookie so the user is logged out
  res.clearCookie('token').json({ message: 'Logged out' });
};

// ===========================
// Get the current user info
// GET /api/auth/me
// (Assumes you have middleware to attach req.user)
// ===========================
exports.getMe = (req, res) => {
  // Simply send back the user object attached by your auth middleware
  res.json(req.user);
};
