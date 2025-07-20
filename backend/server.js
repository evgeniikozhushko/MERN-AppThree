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
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      // Production URLs - update these with actual frontend URLs
      'https://appthree-frontend.onrender.com',
      'https://appthree-ui.onrender.com',
      'https://mern-appthree.onrender.com',
      'https://appthree.onrender.com',
      
      // Development URLs
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:3002'
    ];
    
    // Always allow if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (process.env.NODE_ENV !== 'production') {
      // In development, also allow localhost and local IPs
      if (
        origin && (
          origin.includes('localhost') ||
          origin.includes('127.0.0.1') ||
          origin.startsWith('http://192.168.') ||
          origin.startsWith('https://localhost') ||
          origin.includes('.onrender.com')
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      callback(new Error('Not allowed by CORS'));
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
