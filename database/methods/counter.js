const CounterModel = require('../models/counter.js');

module.exports.incrementReviewId = async () => {
  const counter = await CounterModel.findOneAndUpdate(
    { model_name: 'review' },
    { $inc: { seq: 1 } },
    { upsert: true },
  );
  return counter;
};
