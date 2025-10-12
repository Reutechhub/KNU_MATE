const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for dropping index');
  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1);
  }
};

const dropEmailIndex = async () => {
  try {
    const collection = mongoose.connection.db.collection('users');
    await collection.dropIndex('email_1');
    console.log('Email index dropped successfully');
  } catch (error) {
    console.error('Error dropping email index:', error.message);
  }
};

const run = async () => {
  await connectDB();
  await dropEmailIndex();
  process.exit();
};

run();
