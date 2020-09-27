const ReviewModel = require('../models/reviews.js');
const counterMethods = require('./counter.js');

module.exports.addReview = async (review) => {
  const counter = await counterMethods.incrementReviewId();

  // eslint-disable-next-line no-param-reassign
  review.review_id = (counter) ? counter.seq + 1 : 1;
  const reviewDoc = new ReviewModel(review);
  return reviewDoc.save();
};
