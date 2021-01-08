const client = require('../../index.js');

const deleteReview = async (reviewId) => {
    let deletedReview = await client.query(`DELETE FROM reviews WHERE review_id = ${reviewId} RETURNING product_id, review_rating`);

    return deletedReview;
};

module.exports = {
    deleteReview
}