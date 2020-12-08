const client = require('../index.js')

const getReviewSummary = async (productId) => {
    let summary = await client.query(`SELECT * FROM review_summaries WHERE product_id = ${productId}`);

    return summary;
};

module.exports = {
    getReviewSummary
}