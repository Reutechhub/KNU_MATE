const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for password update');
  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1);
  }
};

const updatePasswords = async () => {
  try {
    const users = await User.find();
    console.log(`Found ${users.length} users to update`);

    for (const user of users) {
      // Check if password is already hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
      if (!user.password.startsWith('$2')) {
        console.log(`Updating password for user: ${user.username}`);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        await user.save();
        console.log(`Password updated for user: ${user.username}`);
      } else {
        console.log(`Password already hashed for user: ${user.username}`);
      }
    }

    console.log('All passwords updated successfully');
  } catch (error) {
    console.error('Error updating passwords:', error);
  }
};

const run = async () => {
  await connectDB();
  await updatePasswords();
  process.exit();
};

run();
