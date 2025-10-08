const express = require('express');
const { uploadMaterial, getMaterials } = require('../controllers/materialController');
const { decodeToken, protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', decodeToken, protect(['admin', 'faculty']), upload.single('file'), uploadMaterial);
router.get('/', getMaterials);

module.exports = router;
