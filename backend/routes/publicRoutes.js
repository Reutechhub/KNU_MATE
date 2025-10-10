const express = require('express');
const School = require('../models/School');
const Program = require('../models/Program');
const Intake = require('../models/Intake');
const Course = require('../models/Course');
const Material = require('../models/Material');

const router = express.Router();

// GET all schools
router.get('/schools', async (req, res) => {
  const schools = await School.find({});
  res.json(schools);
});

// GET programs, optionally filtered by schoolId
router.get('/programs', async (req, res) => {
  const { schoolId } = req.query;
  const filter = schoolId ? { schoolId } : {};
  const programs = await Program.find(filter);
  res.json(programs);
});

// GET intakes, optionally filtered by programId
router.get('/intakes', async (req, res) => {
  const { programId } = req.query;
  const filter = programId ? { programId } : {};
  const intakes = await Intake.find(filter);
  res.json(intakes);
});

// GET courses, optionally filtered by intakeId
router.get('/courses', async (req, res) => {
  const { intakeId } = req.query;
  const filter = intakeId ? { intakeId } : {};
  const courses = await Course.find(filter);
  res.json(courses);
});

module.exports = router;