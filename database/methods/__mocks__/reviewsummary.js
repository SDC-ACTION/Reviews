const ReviewSummary = require('../../models/reviewsummary.js');

const getReviewSummary = (product_id) => {
  if (product_id === 9999999999) throw new Error('error');
  return ReviewSummary.find({ product_id }, '-_id -__v');
};

module.exports = {
  getReviewSummary,
};
