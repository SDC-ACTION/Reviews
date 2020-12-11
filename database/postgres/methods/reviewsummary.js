const client = require('../index.js')

const getReviewSummary = async (productId) => await client.query(`SELECT * FROM review_summaries WHERE product_id = ${productId}`);

module.exports = {
    getReviewSummary
}