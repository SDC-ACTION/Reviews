const ReviewModel = require('../models/reviews.js');

module.exports.addReview = (review) => {
  const reviewDoc = new ReviewModel(review);
  return reviewDoc.save();
};
