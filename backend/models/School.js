const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

module.exports = mongoose.model('School', schoolSchema);
