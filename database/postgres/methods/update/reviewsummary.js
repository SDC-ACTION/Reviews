const client = require('../../index.js');

const updateRating = async (ratingData, newRating) => {
    let newData = `rating_${newRating} = rating_${newRating} + 1, rating_${ratingData.review_rating} = rating_${ratingData.review_rating} - 1`;
    let updatedRating = await client.query(`UPDATE review_summaries SET ${newData} WHERE product_id = ${ratingData.product_id}`);

    return updatedRating;
};

const incrementRating = async (productId, reviewRating) => {
    let newRating = await client.query(`UPDATE review_summaries SET rating_${reviewRating} = rating_${reviewRating} + 1, total_reviews = total_reviews + 1 WHERE product_id = ${productId}`);

    return newRating
};

const decrementRating = async (productId, reviewRating) => {
    let decrementedRating = await client.query(`UPDATE review_summaries SET rating_${reviewRating} = rating_${reviewRating} - 1, total_reviews = total_reviews - 1 WHERE product_id = ${productId}`);

    return decrementedRating;
};

module.exports = {
    updateRating,
    incrementRating,
    decrementRating
};