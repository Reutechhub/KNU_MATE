const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('../utils/cloudinary');
const requireAdmin = require('../middleware/requireAdmin');
const School = require('../models/School');
const Program = require('../models/Program');
const Intake = require('../models/Intake');
const Course = require('../models/Course');
const Material = require('../models/Material');
const { decodeToken, protect } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Helper: upload using a stream to avoid any path resolution issues
const uploadStream = (filePath) => new Promise((resolve, reject) => {
  const readStream = fs.createReadStream(filePath);
  const stream = cloudinary.uploader.upload_stream({ resource_type: 'raw', folder: 'knu_mate_materials' }, (error, result) => {
    if (error) return reject(error);
    resolve(result);
  });
  readStream.on('error', (err) => { return reject(err); });
  readStream.pipe(stream);
});

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

// Add Intake
router.post('/intakes', decodeToken, requireAdmin, async (req, res) => {
  const { name, programId } = req.body;
  // You might want to add validation here to ensure name and programId exist
  const intake = await Intake.create({ name, programId });
  res.status(201).json(intake);
});

// Add Course
router.post('/courses', decodeToken, requireAdmin, async (req, res) => {
  const { name, intakeId } = req.body; // Changed from programId to intakeId
  const course = await Course.create({ name, intakeId }); // Changed from programId to intakeId
  res.json(course);
});

// Upload Material
router.post('/materials/upload', decodeToken, requireAdmin, upload.single('file'), async (req, res) => {
  const path = req.file?.path;
  const { title, type, year, courseId, tags } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const result = await uploadStream(req.file.path);

    const material = await Material.create({
      title,
      type,
      year,
      courseId,
      fileUrl: result.secure_url,
      tags: tags?.split(',').map(tag => tag.trim()),
    });

    return res.json(material);
  } catch (err) {
    // verbose logging to help diagnose Cloudinary / file / db errors
    const util = require('util');
    console.error('Upload error:', util.inspect(err, { depth: null }));
    return res.status(500).json({ error: 'Upload failed', details: err.message });
  } finally {
    // Ensure temp file is removed
    if (path) {
      await fs.unlink(path).catch(e => console.error("Failed to remove temp upload file:", e));
    }
  }
});

// Get all schools
router.get('/schools', decodeToken, requireAdmin, async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (err) {
    console.error('Error fetching schools:', err);
    res.status(500).json({ error: 'Failed to fetch schools' });
  }
});

// Get all programs
router.get('/programs', decodeToken, requireAdmin, async (req, res) => {
  try {
    const programs = await Program.find().populate('schoolId', 'name');
    res.json(programs);
  } catch (err) {
    console.error('Error fetching programs:', err);
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

// Get all intakes
router.get('/intakes', decodeToken, requireAdmin, async (req, res) => {
  try {
    const intakes = await Intake.find().populate('programId', 'name');
    res.json(intakes);
  } catch (err) {
    console.error('Error fetching intakes:', err);
    res.status(500).json({ error: 'Failed to fetch intakes' });
  }
});

// Get all courses
router.get('/courses', decodeToken, requireAdmin, async (req, res) => {
  try {
    const courses = await Course.find().populate('intakeId', 'name');
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get all materials
router.get('/materials', decodeToken, requireAdmin, async (req, res) => {
  try {
    const materials = await Material.find().populate('courseId', 'name');
    res.json(materials);
  } catch (err) {
    console.error('Error fetching materials:', err);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
});

// Delete school
router.delete('/schools/:id', decodeToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findByIdAndDelete(id);
    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }
    res.json({ message: 'School deleted successfully' });
  } catch (err) {
    console.error('Error deleting school:', err);
    res.status(500).json({ error: 'Failed to delete school' });
  }
});

// Delete program
router.delete('/programs/:id', decodeToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findByIdAndDelete(id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    res.json({ message: 'Program deleted successfully' });
  } catch (err) {
    console.error('Error deleting program:', err);
    res.status(500).json({ error: 'Failed to delete program' });
  }
});

// Delete intake
router.delete('/intakes/:id', decodeToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const intake = await Intake.findByIdAndDelete(id);
    if (!intake) {
      return res.status(404).json({ error: 'Intake not found' });
    }
    res.json({ message: 'Intake deleted successfully' });
  } catch (err) {
    console.error('Error deleting intake:', err);
    res.status(500).json({ error: 'Failed to delete intake' });
  }
});

// Delete course
router.delete('/courses/:id', decodeToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// Delete material
router.delete('/materials/:id', decodeToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findByIdAndDelete(id);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.json({ message: 'Material deleted successfully' });
  } catch (err) {
    console.error('Error deleting material:', err);
    res.status(500).json({ error: 'Failed to delete material' });
  }
});

module.exports = router;
