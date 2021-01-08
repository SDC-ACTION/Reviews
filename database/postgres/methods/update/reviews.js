const client = require('../../index.js');
// const { updateRating } = require('./reviewsummary.js');

const updateReview = async (reviewData) => {
    let newValues = '';
    let newUsername = ` username = '${reviewData.username}' `;
    let newHeading = ` review_heading = '${reviewData.review_heading}' `;
    let newText = ` review_text = '${reviewData.review_text}' `;
    let newRating = ` review_rating = ${reviewData.review_rating} `;

    if (reviewData.username) {
        newValues += newUsername;
    }
    if (reviewData.review_heading) {
        if (newValues.length > 0) {
            newValues += ',';
        }
        newValues += newHeading;
    }
    if (reviewData.review_text) {
        if (newValues.length > 0) {
            newValues += ',';
        }
        newValues += newText;
    }
    if (reviewData.review_rating) {
        if (reviewData.review_rating > 5 || reviewData.review_rating < 1) {
            throw '404 Bad Request';
        } else {
            if (newValues.length > 0) {
                newValues += ',';
            }
            newValues += newRating;
        }
    }

    let updatedReview = await client.query(`UPDATE reviews SET ${newValues} WHERE review_id = ${reviewData.review_id}`);

    return updatedReview;
};

module.exports = {
    updateReview
};