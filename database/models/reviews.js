const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review_id: { type: Number, required: true, unique: true },
  product_id: { type: Number, required: true },
  username: { type: String, required: true },
  review_text: String,
  review_rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
