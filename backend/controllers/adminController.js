const School = require('../models/School');
const Programme = require('../models/Programme');
const Course = require('../models/Course');

const createSchool = async (req, res) => {
  try {
    const school = await School.create({ name: req.body.name });
    res.status(201).json(school);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createProgramme = async (req, res) => {
  try {
    const programme = await Programme.create({
      name: req.body.name,
      school: req.body.schoolId,
    });
    res.status(201).json(programme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      programme: req.body.programmeId,
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSchools = async (req, res) => {
  const schools = await School.find();
  res.json(schools);
};

const getProgrammes = async (req, res) => {
  const programmes = await Programme.find().populate('school');
  res.json(programmes);
};

const getCourses = async (req, res) => {
  const courses = await Course.find().populate('programme');
  res.json(courses);
};

module.exports = {
  createSchool,
  createProgramme,
  createCourse,
  getSchools,
  getProgrammes,
  getCourses,
};
