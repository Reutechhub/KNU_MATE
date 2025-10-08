// Seed script (CommonJS) to populate schools, programs, and a default course per program
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const School = require('../models/School');
const Program = require('../models/Program');
const Course = require('../models/Course');

dotenv.config();

const structure = [
  {
    name: 'School of Business Studies',
    description: 'The school of business has some of the most',
    programs: [
      'Bachelor of Business Studies with Education',
      'Bachelor of ICT with Education',
      'Bachelor of Arts in Entrepreneurship with Education',
      'Bachelor of Arts in Entrepreneurship',
      'Bachelor of Arts in Economics',
      'Bachelor of Accountancy',
      'Bachelor of Business Administration',
      'Bachelor of Science in Marketing',
      'Bachelor of Arts in Human Resources',
      'Bachelor of Science in Procurement and Supply Chain Management',
    ],
  },
  {
    name: 'School of Humanities & Social Sciences',
    description: 'Explore civic education, languages, history, and physical education combinations.',
    programs: [
      'Bachelor of Arts with Education - Religious Education & Civic Education',
      'Bachelor of Arts with Education - Civic Education & Religious Studies Education',
      'Bachelor of Arts with Education - Civic Education & French',
      'Bachelor of Arts with Education - Civic Education & Linguistics and African Languages',
      'Bachelor of Arts with Education - Civic Education & Physical Education Sport',
      'Bachelor of Arts with Education - English & History',
      'Bachelor of Arts with Education - English & Geography',
      'Bachelor of Arts with Education – English & French',
      'Bachelor of Arts with Education – English & Linguistics and African Languages',
      'Bachelor of Arts with Education - French & Geography',
      'Bachelor of Arts with Education - French & History',
      'Bachelor of Arts with Education – French & Mathematics',
      'Bachelor of Arts with Education - French & Religious Studies Education',
      'Bachelor of Arts with Education – Geography & History',
      'Bachelor of Arts with Education - Geography & Mathematics',
      'Bachelor of Arts with Education – Geography & Civic Education',
      'Bachelor of Arts with Education – Geography & Linguistics and African Languages',
      'Bachelor of Arts with Education - Geography & Physical Education and Sport',
      'Bachelor of Arts with Education - History & Religious Studies Education',
      'Bachelor of Arts with Education- History & Civic Education',
      'Bachelor of Arts with Education- History & Linguistics and African Languages',
      'Bachelor of Arts Education- History & Physical Education and Sport',
    ],
  },
  {
    name: 'School of Natural Sciences',
    description: 'Departments in Biology, Chemistry, Physics, and Mathematics.',
    programs: [
      'Bachelor of Science in Biology and Chemistry with Education',
      'Bachelor of Science in Biology and Mathematics with Education',
      'Bachelor of Science in Chemistry and Biology with Education',
      'Bachelor of Science in Chemistry and Mathematics with Education',
      'Bachelor of Science in Chemistry and Physics with Education',
      'Bachelor of Science in Physics and Chemistry with Education',
      'Bachelor of Science in Physics and Mathematics with Education',
      'Bachelor of Science in Mathematics',
      'Bachelor of Science in Mathematics and Biology with Education',
      'Bachelor of Science in Mathematics and Chemistry with Education',
      'Bachelor of Science in Mathematics and Physics with Education',
      'Bachelor of Science in Mathematics and French with Education',
      'Bachelor of Science in Mathematics and Geography with Education',
      'Bachelor of Science in Mathematics and History with Education',
      'Bachelor of Science in Mathematics and ICT with Education',
      'Bachelor of Science in Mathematics and Physical Education and Sport with Education',
      'Bachelor of Science in Mathematics and Special Needs Education with Education',
      'Diploma in Agriculture Science Education',
      'Master of Education in Mathematics Education',
      'Master of Education in Science Education',
    ],
  },
  {
    name: 'School of Education',
    description: 'Focused on teacher training, psychology, and educational management.',
    programs: [
      'Bachelor of Primary Education',
      'Bachelor of Arts with Education - Physical Education Sport & Mathematics',
      'Bachelor of Arts with Education - Special Education Needs & Physical Education and Sport',
      'Bachelor of Arts with Education - Special Education Needs & French',
      'Bachelor of Arts in Educational Administration and Management',
      'Bachelor of Education in Sociology of Education',
      'Bachelor of Education in Educational Psychology',
      'Bachelor of Education in Early Childhood Education',
      "Early Childhood Education Teachers Diploma",
      "Primary Teacher's Diploma",
      'Master of Business Studies (Accountancy)',
      'Master of Business Studies (Marketing)',
      'Master of Business Studies (Entrepreneurship)',
      'Master of Business Studies (Human Resource Management)',
      'Master of Business Studies (Information Systems)',
      'Master of Business Administration (Generic)',
      'Master of Education in Educational Management, Administration and Leadership',
      'Master of Arts (MA) in History',
      'Master of Arts in (MA) Religious Studies',
      'Master of Education (MEd) in Special Education',
      'Masters of Arts (MA) in Civic Education',
      'Master of Arts (MA) in General Linguistics',
      'Master of Science (MSc) in Geography',
      'Master of Business Studies',
      'Postgraduate Diploma in Teaching Methodology - Under Distance learning August 2019',
    ],
  },
];

async function seed() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/knu_mate';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding...');

    for (const schoolData of structure) {
      let school = await School.findOne({ name: schoolData.name });
      if (!school) {
        school = await School.create({ name: schoolData.name, description: schoolData.description });
        console.log(`Created school: ${school.name}`);
      } else {
        console.log(`School already exists: ${school.name}`);
      }

      for (const programName of schoolData.programs) {
        let program = await Program.findOne({ name: programName, schoolId: school._id });
        if (!program) {
          program = await Program.create({ name: programName, schoolId: school._id });
          console.log(`  Created program: ${program.name}`);
        } else {
          console.log(`  Program already exists: ${program.name}`);
        }

        // Ensure there is at least one default course so admin upload has a selectable course
        const existingCourses = await Course.find({ programId: program._id });
        if (!existingCourses || existingCourses.length === 0) {
          const course = await Course.create({ name: 'General', programId: program._id });
          console.log(`    Created default course for program ${program.name}: ${course.name}`);
        }
      }
    }

    console.log('Academic structure seeded successfully.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
