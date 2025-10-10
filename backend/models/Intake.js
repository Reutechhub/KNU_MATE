const mongoose = require('mongoose');

const intakeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
});

module.exports = mongoose.model('Intake', intakeSchema);
