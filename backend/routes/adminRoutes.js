const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const requireAdmin = require('../middleware/requireAdmin');
const School = require('../models/School');
const Program = require('../models/Program');
const Course = require('../models/Course');
const Material = require('../models/Material');
const { decodeToken, protect } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Add School
// Require token decode first so requireAdmin can inspect req.user
router.post('/schools', decodeToken, requireAdmin, async (req, res) => {
  const { name, description } = req.body;
  const school = await School.create({ name, description });
  res.json(school);
});

// Add Program
router.post('/programs', decodeToken, requireAdmin, async (req, res) => {
  const { name, schoolId } = req.body;
  const program = await Program.create({ name, schoolId });
  res.json(program);
});

// Add Course
router.post('/courses', decodeToken, requireAdmin, async (req, res) => {
  const { name, programId } = req.body;
  const course = await Course.create({ name, programId });
  res.json(course);
});

// Upload Material
router.post('/materials/upload', decodeToken, requireAdmin, upload.single('file'), async (req, res) => {
  const fs = require('fs');
  const path = req.file?.path;
  const { title, type, year, courseId, tags } = req.body;

  // Helper: upload using a stream to avoid any path resolution issues
  const uploadStream = (filePath) => new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto', folder: 'knu_mate_materials' }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    readStream.on('error', (err) => { return reject(err); });
    readStream.pipe(stream);
  });

  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await uploadStream(req.file.path);

    const material = await Material.create({
      title,
      type,
      year,
      courseId,
      fileUrl: result.secure_url,
      tags: tags?.split(',').map(tag => tag.trim()),
    });

    // remove temp file
    fs.unlink(path, () => {});
    return res.json(material);
  } catch (err) {
    // verbose logging to help diagnose Cloudinary / file / db errors
    try {
      const util = require('util');
      console.error('Upload error:', util.inspect(err, { depth: null }));
      if (err && err.response) {
        try { console.error('Error response body:', util.inspect(err.response.body || err.response, { depth: null })); } catch (e) { /* ignore */ }
      }
    } catch (logErr) {
      console.error('Upload error (failed to inspect):', err);
    }
    // try to remove temp file if exists
    if (path) {
      try { fs.unlinkSync(path); } catch (e) { /* ignore */ }
    }
    return res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

module.exports = router;
