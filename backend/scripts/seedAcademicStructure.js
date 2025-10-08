import mongoose from 'mongoose';
import dotenv from 'dotenv';
import School from '../models/School.js';
import Program from '../models/Program.js';
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
        courses: ['Business Methods', 'Education Theory'],
      },
      {
        name: 'Bachelor of ICT with Education',
        courses: ['ICT Fundamentals', 'Networking'],
      },
      {
        name: 'Bachelor of Arts in Economics',
        courses: ['Microeconomics', 'Macroeconomics'],
      },
    ],
  },
  {
    name: 'School of Humanities & Social Sciences',
    description: 'Explore civic education, languages, history, and physical education combinations.',
    programs: [
      {
        name: 'Bachelor of Arts with Education - English & History',
        courses: ['English Literature', 'World History'],
      },
      {
        name: 'Bachelor of Arts with Education - Civic Education & French',
        courses: ['Civic Theory', 'French Language'],
      },
    ],
  },
  {
    name: 'School of Natural Sciences',
    description: 'Departments in Biology, Chemistry, Physics, and Mathematics.',
    programs: [
      {
        name: 'Bachelor of Science in Biology and Chemistry with Education',
        courses: ['Cell Biology', 'Organic Chemistry'],
      },
      {
        name: 'Bachelor of Science in Mathematics and Physics with Education',
        courses: ['Calculus', 'Mechanics'],
      },
    ],
  },
  {
    name: 'School of Education',
    description: 'Focused on teacher training, psychology, and educational management.',
    programs: [
      {
        name: 'Bachelor of Primary Education',
        courses: ['Child Development', 'Curriculum Design'],
      },
      {
        name: 'Bachelor of Education in Early Childhood Education',
        courses: ['Play-Based Learning', 'Early Literacy'],
      },
    ],
  },
];

for (const schoolData of structure) {
  const school = await School.create({ name: schoolData.name, description: schoolData.description });

  for (const programData of schoolData.programs) {
    const program = await Program.create({ name: programData.name, schoolId: school._id });

    for (const courseName of programData.courses) {
      await Course.create({ name: courseName, programId: program._id });
    }
  }
}

console.log('Academic structure seeded successfully.');
process.exit();
