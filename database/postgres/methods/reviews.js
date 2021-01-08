const client = require('../index.js');

const addReview = async (reviewData) => {
    let newReview = await client.query(`INSERT INTO reviews (product_id, username, review_heading, review_text, review_rating) VALUES (${reviewData.product_id}, '${reviewData.username}', '${reviewData.review_heading}', '${reviewData.review_text}', ${reviewData.review_rating})`);

    return newReview
};

const getReviews = async (productId) => await client.query(`SELECT * FROM reviews WHERE product_id = ${productId}`);

module.exports = {
    addReview,
    getReviews
}