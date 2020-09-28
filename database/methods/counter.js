const CounterModel = require('../models/counter.js');

module.exports.incrementReviewSeq = async (value) => {
  const counter = await CounterModel.findOneAndUpdate(
    { model_name: 'review' },
    { $inc: { seq: value } },
    { upsert: true },
  );
  return counter;
};
