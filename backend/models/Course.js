const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  // intakeYear: the year students in this course intake started (e.g. 2020)
  intakeYear: { type: Number },
});

module.exports = mongoose.model('Course', courseSchema);
