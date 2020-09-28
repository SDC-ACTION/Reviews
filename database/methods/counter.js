const CounterModel = require('../models/counter.js');

module.exports.incrementReviewSeq = async () => {
  const counter = await CounterModel.findOneAndUpdate(
    { model_name: 'review' },
    { $inc: { seq: 1 } },
    { upsert: true },
  );
  return counter;
};

module.exports.decrementReviewSeq = async () => {
  const counter = await CounterModel.findOneAndUpdate(
    { model_name: 'review', seq: { $gte: 2 } },
    { $inc: { seq: -1 } },
  );
  return counter;
};
