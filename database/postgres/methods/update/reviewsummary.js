const client = require('../../index.js');

const updateRating = async (currentData, newRating) => await client.query(`UPDATE review_summaries SET rating_${newRating} = rating_${newRating} + 1, rating_${currentData.review_rating} = rating_${currentData.review_rating} - 1 WHERE product_id = ${currentData.product_id}`);

const incrementRating = async (productId, reviewRating) => await client.query(`UPDATE review_summaries SET rating_${reviewRating} = rating_${reviewRating} + 1, total_reviews = total_reviews + 1 WHERE product_id = ${productId}`);

const decrementRating = async (productId, reviewRating) => await client.query(`UPDATE review_summaries SET rating_${reviewRating} = rating_${reviewRating} - 1, total_reviews = total_reviews - 1 WHERE product_id = ${productId}`);

module.exports = {
    updateRating,
    incrementRating,
    decrementRating
};