const mongoose = require('mongoose');
const CounterModel = require('./counter.js');

const reviewSchema = new mongoose.Schema({
  review_id: { type: Number, default: 0 },
  product_id: { type: Number, required: true },
  username: { type: String, required: true },
  review_text: String,
  review_rating: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

reviewSchema.pre('save', async () => {
  await CounterModel.findOneAndUpdate(
    { model_name: 'review' },
    { $inc: { seq: 1 } },
    { upsert: true },
  );
});

reviewSchema.post('save', (doc) => {
});

module.exports = mongoose.model('Review', reviewSchema);
