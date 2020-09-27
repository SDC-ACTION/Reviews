const ReviewModel = require('../models/reviews.js');
const CounterModel = require('../models/counter.js');

module.exports.addReview = async (review) => {
  const counter = await CounterModel.findOneAndUpdate(
    { model_name: 'review' },
    { $inc: { seq: 1 } },
    { upsert: true },
  );
  // eslint-disable-next-line no-param-reassign
  review.review_id = (counter) ? counter.seq + 1 : 1;
  const reviewDoc = new ReviewModel(review);
  return reviewDoc.save();
};
