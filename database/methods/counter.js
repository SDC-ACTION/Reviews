const CounterModel = require('../models/counter.js');

module.exports.incrementReviewSeq = () => CounterModel.findOneAndUpdate(
  { model_name: 'review' },
  { $inc: { seq: 1 } },
  { upsert: true },
);
