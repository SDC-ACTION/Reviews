const ReviewModel = require('../../models/reviews.js');
const reviewSummaryMethods = require('./reviewsummary.js');

const updateReview = (filter, newData) => {
    if (newData.review_rating) {
        if (newData.review_rating > 5 || newData.review_rating < 1) {
            throw '400 Bad Request';
        } else {
            reviewSummaryMethods.updateRating(filter, newData);
        }
    }
    
    return ReviewModel.updateOne(filter, newData)
};

module.exports = {
    updateReview
};