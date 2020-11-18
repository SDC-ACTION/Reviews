const ReviewModel = require('../models/reviews.js');
const reviewSummaryMethods = require('./update/reviewsummary.js');
const counterMethods = require('./counter.js');

const addReview = (review) => new Promise((resolve, reject) => {
  counterMethods.incrementReviewSeq()
    .then((counter) => {
      // eslint-disable-next-line no-param-reassign
      review.review_id = (counter) ? counter.seq + 1 : 1;
      
      ReviewModel.create(review)
      .then(() => {
        resolve(reviewSummaryMethods.incrementRating(review));
      })
      .catch((err) => {
        throw err;
      });
    })
    .catch((err) => reject(err));
});

const getReviews = (options, limit = 0) => ReviewModel.find(options, '-_id -__v').limit(limit);

const getLastReviewId = () => {
  return ReviewModel.find().sort({review_id: -1}).limit(1);
};

module.exports = {
  addReview,
  getReviews,
  getLastReviewId
};
