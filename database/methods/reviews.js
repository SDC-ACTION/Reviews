const ReviewModel = require('../models/reviews.js');
const counterMethods = require('./counter.js');

module.exports.addReview = (review) => new Promise((resolve, reject) => {
  counterMethods.incrementReviewSeq()
    .then((counter) => {
      // eslint-disable-next-line no-param-reassign
      review.review_id = (counter) ? counter.seq + 1 : 1;
      resolve(ReviewModel.create(review));
    })
    .catch((err) => reject(err));
});

module.exports.getReviews = (options, limit = 0) => ReviewModel.find(options, '-_id -__v').limit(limit);
