const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ['notes', 'papers'], required: true },
  year: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  fileUrl: String,
  tags: [String],
});

module.exports = mongoose.model('Material', materialSchema);
