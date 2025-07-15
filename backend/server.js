const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// More flexible CORS for development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (process.env.NODE_ENV === 'production') {
      // In production, only allow specific domains
      const allowedOrigins = ['https://your-frontend-domain.netlify.app', 'https://your-frontend-domain.vercel.app'];
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      // In development, allow any localhost or local IP with any port
      if (origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('192.168.')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'MERN Backend API is running!',
    endpoints: {
      test: '/test',
      users: '/api/users',
      auth: '/api/auth/*'
    }
  });
});

// Test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// MongoDB connection with error handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 5001;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
