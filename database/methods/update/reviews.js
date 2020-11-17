const { update } = require('../../models/reviews.js');
const ReviewModel = require('../../models/reviews.js');
const ReviewSummary = require('../../models/reviewsummary.js');
const reviewsMethods = require('../reviews.js');

const updateReview = (filter, newData) => {
    if (newData.review_rating) {
        if (newData.review_rating > 5 || newData.review_rating < 1) {
            throw '400 Bad Request';
        } else {
            updateRating(filter, newData);
        }
    }
    
    return ReviewModel.updateOne(filter, newData)
};

const updateRating = async (filter, newData) => {
    let newReviewValue = newData.review_rating;
    let newReviewKey = `rating_${newReviewValue}`;
    let reviewValueContainer = {};

    reviewValueContainer[newReviewKey] = 1;

    return ReviewModel.findOne(filter, async (err, res) => {
        if (err) {
            throw (err);
        } else {
            let currentReviewValue = res.review_rating;
            let currentReviewKey = `rating_${currentReviewValue}`;

            reviewValueContainer[currentReviewKey] = -1;

            if (currentReviewValue !== newReviewValue) {
                return ReviewSummary.findOneAndUpdate({product_id: res.product_id}, {$inc: reviewValueContainer});
            }
        }
    }); 
};

module.exports = {
    updateReview
};