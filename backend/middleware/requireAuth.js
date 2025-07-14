// Import the jsonwebtoken library
// This is used to verify and decode JWTs (JSON Web Tokens)
const jwt = require('jsonwebtoken');

// Export this function as middleware for Express
// It runs BEFORE your protected route handlers
module.exports = (req, res, next) => {
  
  // 1. Try to get the JWT token from the cookies sent by the client
  const token = req.cookies.token;

  // 2. If there's no token, respond with 401 Unauthorized
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    // 3. If there is a token, verify it using your secret key
    //    This makes sure the token is valid and wasn't tampered with
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the decoded token data to req.user
    //    So your next route handlers can access user info
    req.user = decoded;

    // 5. Call next() to pass control to the next middleware or route handler
    next();

  } catch {
    // 6. If token verification fails (invalid or expired token), respond with 403 Forbidden
    res.status(403).json({ message: 'Invalid token' });
  }
};
