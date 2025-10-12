const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ username: 'root' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create default admin user
    const hashedPassword = await bcrypt.hash('1@knumate', 10);
    const adminUser = new User({
      username: 'root',
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user seeded successfully');

    // Create additional admin user
    const existingAdmin2 = await User.findOne({ username: 'root' });
    if (!existingAdmin2) {
      const hashedPassword2 = await bcrypt.hash('1@knumate', 10);
      const adminUser2 = new User({
        username: 'root',
        password: hashedPassword2,
        role: 'admin'
      });

      await adminUser2.save();
      console.log('Additional admin user (admin2) seeded successfully');
    } else {
      console.log('Additional admin user (admin2) already exists');
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const run = async () => {
  await connectDB();
  await seedUsers();
  process.exit();
};

run();
