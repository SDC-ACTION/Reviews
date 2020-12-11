const client = require('../../index.js');
const { decrementRating } = require('../update/reviewsummary.js');

const deleteReview = async (reviewId) => {
    let deletedReview = await client.query(`DELETE FROM reviews WHERE review_id = ${reviewId} RETURNING product_id, review_rating`);
    await decrementRating(deletedReview.rows[0].product_id, deletedReview.rows[0].review_rating);

    return deletedReview;
};

module.exports = {
    deleteReview
}