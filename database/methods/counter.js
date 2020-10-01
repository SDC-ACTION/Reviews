const CounterModel = require('../models/counter.js');

module.exports.incrementReviewSeq = () => CounterModel.findOneAndUpdate(
  { model_name: 'review' },
  { $inc: { seq: 1 } },
  { upsert: true },
);

module.exports.decrementReviewSeq = () => CounterModel.findOneAndUpdate(
  { model_name: 'review', seq: { $gte: 2 } },
  { $inc: { seq: -1 } },
);
