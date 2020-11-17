const checkRequestBody = (reqBody) => {
    if (!reqBody.hasOwnProperty('product_id') || !reqBody.hasOwnProperty('username') || !reqBody.hasOwnProperty('review_heading') || !reqBody.hasOwnProperty('review_text') || !reqBody.hasOwnProperty('review_rating')) {
        throw 'MISSING REVIEW DATA';
    }
};

module.exports = {
    checkRequestBody
};