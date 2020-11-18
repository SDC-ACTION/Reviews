const ReviewModel = require('../../models/reviews.js');
const ReviewSummary = require('../../models/reviewsummary.js');

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

const incrementRating = async (review) => {
    return ReviewModel.findOne({review_id: review.review_id}, async (err, res) => {
        if (err) {
            throw err;
        } else {
            let reviewContainer = {};
            let ReviewValue = res.review_rating;
            let ReviewKey = `rating_${ReviewValue}`;

            reviewContainer[ReviewKey] = 1;
            reviewContainer['total_reviews'] = 1;

            return ReviewSummary.findOneAndUpdate({product_id: review.product_id}, {$inc: reviewContainer});
        }
    });
};

const decrementRating = async (review) => {
    return ReviewModel.findOne({review_id: review}, async (err, res) => {
        if (err) {
            throw err;
        } else {
            let reviewContainer = {};
            let ReviewValue = res.review_rating;
            let ReviewKey = `rating_${ReviewValue}`;

            reviewContainer[ReviewKey] = -1;
            reviewContainer['total_reviews'] = -1;

            return ReviewSummary.findOneAndUpdate({product_id: res.product_id}, {$inc: reviewContainer});
        }
    });
};

module.exports = {
    updateRating,
    incrementRating,
    decrementRating
}