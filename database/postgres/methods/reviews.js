const client = require('../index.js');

const getReviews = async (productId) => {
    let reviews = await client.query(`SELECT * FROM reviews WHERE product_id = ${productId}`);

    return reviews;
};

module.exports = {
    getReviews
}