const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route (this must come AFTER app is defined)
app.get('/api/ping', (req, res) => {
  res.send('KNU MATE backend is running 🚀');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/materials', require('./routes/materialRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
// Public routes (schools, programs, courses, materials listing)
app.use('/api', require('./routes/public'));
// Debug routes (temporary) - exposes raw DB rows for troubleshooting locally
app.use('/api/debug', require('./routes/debug'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Cloudinary env keys present:', {
    CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
    CLOUD_NAME: !!process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
    CLOUD_API_KEY: !!process.env.CLOUD_API_KEY,
    CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET,
    CLOUD_API_SECRET: !!process.env.CLOUD_API_SECRET,
    CLOUDINARY_URL: !!process.env.CLOUDINARY_URL,
  });
});
