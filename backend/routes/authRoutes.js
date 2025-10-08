const express = require('express');
const router = express.Router();
const { decodeToken, protect } = require('../middleware/authMiddleware');

// ✅ Import controller functions
const { register, login } = require('../controllers/authController');

// ✅ Define routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;
