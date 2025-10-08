export const schools = [
  {
    id: 'business',
    name: 'School of Business Studies',
    description: 'The School of Business offers diverse programs in entrepreneurship, economics, and administration.',
    programs: [
      {
        id: 'bachelor-business-education',
        name: 'Bachelor of Business Studies with Education',
        courses: ['Business Methods', 'Education Theory', 'Entrepreneurship'],
      },
      {
        id: 'bachelor-ict-education',
        name: 'Bachelor of ICT with Education',
        courses: ['ICT Fundamentals', 'Networking', 'Teaching ICT'],
      },
      {
        id: 'bachelor-entrepreneurship',
        name: 'Bachelor of Arts in Entrepreneurship',
        courses: ['Startup Strategy', 'Business Planning', 'Innovation'],
      },
      // Add more programs here...
    ],
  },
  {
    id: 'humanities',
    name: 'School of Humanities & Social Sciences',
    description: 'Explore civic education, languages, history, and physical education combinations.',
    programs: [
      {
        id: 'english-history',
        name: 'Bachelor of Arts with Education - English & History',
        courses: ['English Literature', 'World History'],
      },
      {
        id: 'civic-french',
        name: 'Bachelor of Arts with Education - Civic Education & French',
        courses: ['Civic Theory', 'French Language'],
      },
      // Add more combinations here...
    ],
  },
  {
    id: 'natural-sciences',
    name: 'School of Natural Sciences',
    description: 'Departments in Biology, Chemistry, Physics, and Mathematics with strong education tracks.',
    programs: [
      {
        id: 'biology-chemistry-edu',
        name: 'Bachelor of Science in Biology and Chemistry with Education',
        courses: ['Cell Biology', 'Organic Chemistry'],
      },
      {
        id: 'math-physics-edu',
        name: 'Bachelor of Science in Mathematics and Physics with Education',
        courses: ['Calculus', 'Mechanics'],
      },
      // Add more departments and programs...
    ],
  },
  {
    id: 'education',
    name: 'School of Education',
    description: 'Focused on teacher training, psychology, and educational management.',
    programs: [
      {
        id: 'primary-education',
        name: 'Bachelor of Primary Education',
        courses: ['Child Development', 'Curriculum Design'],
      },
      {
        id: 'early-childhood',
        name: 'Bachelor of Education in Early Childhood Education',
        courses: ['Play-Based Learning', 'Early Literacy'],
      },
      // Add postgraduate programs separately if needed
    ],
  },
];
