const generateSummary = (reviews) => {
    let summary = {product_id: reviews[0].product_id, rating_1: 0, rating_2: 0, rating_3: 0, rating_4: 0, rating_5: 0, total_reviews: 0};

    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].review_rating == 1) summary.rating_1 += 1;
        if (reviews[i].review_rating == 2) summary.rating_2 += 1;
        if (reviews[i].review_rating == 3) summary.rating_3 += 1;
        if (reviews[i].review_rating == 4) summary.rating_4 += 1;
        if (reviews[i].review_rating == 5) summary.rating_5 += 1;

        summary.total_reviews += 1;
    }

    return summary;
};

module.exports = {
    generateSummary
};