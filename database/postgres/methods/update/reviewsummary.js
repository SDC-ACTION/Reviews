const client = require('../../index.js');

const updateRating = async (ratingData, newRating) => {
    let newData = `rating_${newRating} = rating_${newRating} + 1, rating_${ratingData.review_rating} = rating_${ratingData.review_rating} - 1`;
    let updatedRating = await client.query(`UPDATE review_summaries SET ${newData} WHERE product_id = ${ratingData.product_id}`);

    return updatedRating;
};

module.exports = {
    updateRating
};