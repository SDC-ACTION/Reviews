const mongoose = require('mongoose');

const reviewSummarySchema = new mongoose.Schema({
  product_id: { type: Number, required: true, unique: true },
  total_reviews: Number,
  rating_1: { type: Number, default: 0 },
  rating_2: { type: Number, default: 0 },
  rating_3: { type: Number, default: 0 },
  rating_4: { type: Number, default: 0 },
  rating_5: { type: Number, default: 0 },
});

module.exports = mongoose.model('ReviewSummary', reviewSummarySchema);
