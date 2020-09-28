const mongoose = require('mongoose');

const reviewSummarySchema = new mongoose.Schema({
  product_id: { type: Number, required: true, unique: true },
  total_reviews: Number,
  stars_1: { type: Number, default: 0 },
  stars_2: { type: Number, default: 0 },
  stars_3: { type: Number, default: 0 },
  stars_4: { type: Number, default: 0 },
  stars_5: { type: Number, default: 0 },
});

module.exports = mongoose.model('ReviewSummary', reviewSummarySchema);
