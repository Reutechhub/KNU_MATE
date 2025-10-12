const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'faculty'], default: 'faculty' },
});

module.exports = mongoose.model('User', userSchema);
