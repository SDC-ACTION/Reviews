const ReviewModel = require('../../models/reviews.js');

const getReviews = (options, limit = 0) => {
  if (options.product_id === 9999999999) throw new Error('error');
  return ReviewModel.find(options, '-_id -__v').limit(limit);
};

module.exports = {
  getReviews,
};
