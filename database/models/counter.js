const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  model_name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0, min: 0 },
});

module.exports = mongoose.model('Counter', counterSchema);
