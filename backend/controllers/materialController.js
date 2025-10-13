const Material = require('../models/Material');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

// Helper to upload local file via stream
const uploadStream = (filePath, originalName) => new Promise((resolve, reject) => {
  const cleanName = originalName.replace(/\.pdf+$/i, '');
  const publicId = `${Date.now()}-${cleanName}`;
  const readStream = fs.createReadStream(filePath);
  const stream = cloudinary.uploader.upload_stream({ folder: 'knu-mate', resource_type: 'raw', public_id: publicId, type: 'upload' }, (error, result) => {
    if (error) return reject(error);
    resolve(result);
  });
  readStream.on('error', (err) => reject(err));
  readStream.pipe(stream);
});

const uploadMaterial = async (req, res) => {
  // Support multer file upload (req.file) and form fields in req.body
  const { title, courseId, year, type, tags } = req.body;
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await uploadStream(req.file.path, req.file.originalname);

    const material = await Material.create({
      title,
      fileUrl: result.secure_url,
      courseId,
      year,
      type,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
    });

    // remove temp file
    fs.unlink(req.file.path, () => {});
    res.status(201).json(material);
  } catch (err) {
    // attempt cleanup
    if (req.file && req.file.path) {
      try { fs.unlinkSync(req.file.path); } catch (e) { /* ignore */ }
    }
    res.status(500).json({ error: err.message });
  }
};

const getMaterials = async (req, res) => {
  const { courseId, year, type, tag } = req.query;
  let query = {};
  if (courseId) query.courseId = courseId;
  if (year) query.year = year;
  if (type) query.type = type;
  if (tag) query.tags = tag;

  try {
    const materials = await Material.find(query)
      .populate({ path: 'courseId', select: 'name programId' })
      .lean();

    const Program = require('../models/Program');
    const Course = require('../models/Course');

    const enhanced = await Promise.all(materials.map(async (m) => {
      const course = m.courseId ? await Course.findById(m.courseId._id).select('name programId').lean() : null;
      const program = course?.programId ? await Program.findById(course.programId).select('name').lean() : null;
      return {
        _id: m._id,
        title: m.title,
        type: m.type,
        year: m.year,
        tags: m.tags,
        fileUrl: m.fileUrl,
        course: course ? { _id: course._id, name: course.name } : null,
        program: program ? { _id: program._id, name: program.name } : null,
      };
    }));

    res.json(enhanced);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadMaterial, getMaterials };
