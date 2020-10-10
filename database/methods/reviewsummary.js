const ReviewSummary = require('../models/reviewsummary.js');

const getReviewSummary = (product_id) => ReviewSummary.find({ product_id }, '-_id -__v');

module.exports = {
  getReviewSummary,
};
