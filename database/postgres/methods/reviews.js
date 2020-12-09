const client = require('../index.js');
const { incrementRating } = require('../methods/update/reviewsummary.js');

const addReview = async (reviewData) => {
    let newReview = await client.query(`INSERT INTO reviews (product_id, username, review_heading, review_text, review_rating) VALUES (${reviewData.product_id}, '${reviewData.username}', '${reviewData.review_heading}', '${reviewData.review_text}', ${reviewData.review_rating})`);

    await incrementRating(reviewData.product_id, reviewData.review_rating);

    return newReview
};

const getReviews = async (productId) => {
    let reviews = await client.query(`SELECT * FROM reviews WHERE product_id = ${productId}`);

    return reviews;
};

module.exports = {
    addReview,
    getReviews
}