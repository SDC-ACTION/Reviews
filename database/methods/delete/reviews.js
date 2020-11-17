const ReviewModel = require('../../models/reviews.js');

const deleteReview = (reviewId) => {
    return ReviewModel.deleteOne({review_id: reviewId}, (err, res) => {
        if (err) {
            throw err;
        } 
    });
};

module.exports = {
    deleteReview
};