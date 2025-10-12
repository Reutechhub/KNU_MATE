const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

// Support multiple possible env var naming schemes so existing .env files
// (e.g. CLOUD_NAME / CLOUD_API_KEY / CLOUD_API_SECRET) continue to work
// while also supporting the standard CLOUDINARY_* names or a CLOUDINARY_URL.
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY || process.env.CLOUD_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.CLOUD_API_SECRET;

if (process.env.CLOUDINARY_URL) {
  // If a full URL is provided, let the SDK parse it.
  cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
} else if (cloudName && apiKey && apiSecret) {
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
} else {
  // Provide a clear runtime error so developers can quickly see which vars are missing.
  console.error('Cloudinary configuration error: missing credentials.');
  console.error('Searched for CLOUDINARY_CLOUD_NAME or CLOUD_NAME, CLOUDINARY_API_KEY or CLOUD_API_KEY, CLOUDINARY_API_SECRET or CLOUD_API_SECRET');
  console.error('You can also set CLOUDINARY_URL. Current env keys:', {
    CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
    CLOUD_NAME: !!process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
    CLOUD_API_KEY: !!process.env.CLOUD_API_KEY,
    CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET,
    CLOUD_API_SECRET: !!process.env.CLOUD_API_SECRET,
    CLOUDINARY_URL: !!process.env.CLOUDINARY_URL,
  });
}

module.exports = cloudinary;
