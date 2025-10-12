import mongoose from 'mongoose';
import dotenv from 'dotenv';
import School from '../models/School.js';
import Program from '../models/Program.js';
import Intake from '../models/Intake.js';
import Course from '../models/Course.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const structure = [
  {
    name: 'School of Business Studies',
    description: 'Programs in entrepreneurship, economics, and administration.',
    programs: [
      {
        name: 'Bachelor of Business Studies with Education',
        intakes: [
          {
            name: 'Year 1',
            courses: ['Business Methods', 'Education Theory'],
          },
          {
            name: 'Year 2',
            courses: ['Advanced Business', 'Teaching Practice'],
          },
        ],
      },
      {
        name: 'Bachelor of ICT with Education',
        intakes: [
          {
            name: 'Year 1',
            courses: ['ICT Fundamentals', 'Networking'],
          },
          {
            name: 'Year 2',
            courses: ['Advanced ICT', 'System Administration'],
          },
        ],
      },
    ],
  },
  {
    name: 'School of Humanities & Social Sciences',
    description: 'Explore civic education, languages, history, and physical education combinations.',
    programs: [
      {
        name: 'Bachelor of Arts with Education - English & History',
        intakes: [
          {
            name: 'Year 1',
            courses: ['English Literature', 'World History'],
          },
          {
            name: 'Year 2',
            courses: ['Advanced English', 'Modern History'],
          },
        ],
      },
    ],
  },
];

for (const schoolData of structure) {
  let school = await School.findOne({ name: schoolData.name });
  if (!school) {
    school = await School.create({ name: schoolData.name, description: schoolData.description });
  }

  for (const programData of schoolData.programs) {
    let program = await Program.findOne({ name: programData.name, schoolId: school._id });
    if (!program) {
      program = await Program.create({ name: programData.name, schoolId: school._id });
    }

    for (const intakeData of programData.intakes) {
      let intake = await Intake.findOne({ name: intakeData.name, programId: program._id });
      if (!intake) {
        intake = await Intake.create({ name: intakeData.name, programId: program._id });
      }

      for (const courseName of intakeData.courses) {
        const existingCourse = await Course.findOne({ name: courseName, intakeId: intake._id });
        if (!existingCourse) {
          await Course.create({ name: courseName, intakeId: intake._id });
        }
      }
    }
  }
}

console.log('Academic structure seeded successfully.');
process.exit();
