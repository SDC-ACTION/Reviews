const ReviewModel = require('../../models/reviews.js');
const reviewSummaryMethods = require('../update/reviewsummary.js');
const counterMethods = require('../counter.js');

const deleteReview = (reviewId) => new Promise((resolve, reject) => {
    reviewSummaryMethods.decrementRating(reviewId);
    counterMethods.decrementReviewSeq()
    .then((counter) => {
        resolve(ReviewModel.findOneAndDelete({review_id: reviewId}));
    })
    .catch((err) => reject(err));

});

module.exports = {
    deleteReview
};