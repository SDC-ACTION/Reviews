const ReviewModel = require('../../database/models/reviews.js');

const checkForReviewId = async (reviewId) => ReviewModel.findOne({review_id: reviewId});

module.exports = {
    checkForReviewId
};