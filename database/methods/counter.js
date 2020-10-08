const CounterModel = require('../models/counter.js');

const incrementReviewSeq = () => CounterModel.findOneAndUpdate(
  { model_name: 'review' },
  { $inc: { seq: 1 } },
  { upsert: true },
);

module.exports = {
  incrementReviewSeq,
};
