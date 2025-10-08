const express = require('express');
const School = require('../models/School');
const Program = require('../models/Program');
const Course = require('../models/Course');
const Material = require('../models/Material');

const router = express.Router();

router.get('/schools', async (req, res) => {
  const schools = await School.find();
  res.json(schools);
});

router.get('/programs', async (req, res) => {
  const { schoolId } = req.query;
  const programs = await Program.find({ schoolId });
  res.json(programs);
});

router.get('/courses', async (req, res) => {
  const { programId } = req.query;
  const courses = await Course.find({ programId });
  res.json(courses);
});

router.get('/materials', async (req, res) => {
  const { courseId, type, year } = req.query;
  const query = { courseId };
  if (type) query.type = type;
  if (year) query.year = year;
  // Populate course and program names to help frontend render contextual info
  const materials = await Material.find(query)
    .populate({ path: 'courseId', select: 'name programId' })
    .lean();

  // For each material, fetch the program name for convenience (if available)
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
});

module.exports = router;
