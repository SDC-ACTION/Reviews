const queryReviewRating = (req, res, next) => {
  if (req.query.review_rating !== undefined) {
    if (Number.isNaN(Number(req.query.review_rating)) || req.query.review_rating === '') {
      res.status(400).send('Bad Request.');
      return;
    }
    req.options.review_rating = Number(req.query.review_rating);
  }
  next();
};

module.exports = {
  queryReviewRating,
};
