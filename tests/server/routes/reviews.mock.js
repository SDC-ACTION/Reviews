const express = require('express');
const { getReviews } = require('../../../database/methods/reviews.js');
const { getReviewSummary } = require('../../../database/methods/reviewsummary.js');
const { queryReviewRating } = require('../middleware/queryParams.mock.js');

const router = express.Router();

router.param('product_id', (req, res, next, product_id) => {
  if (Number.isNaN(Number(product_id))) {
    res.status(400).send('Bad Request.');
    return;
  }
  req.options = { product_id: Number(product_id) };
  next();
});

router.route('/:product_id/summary')
  .get(async (req, res) => {
    try {
      const reviewSummary = await getReviewSummary(req.options.product_id);
      if (req.options.product_id === 9999) throw new Error('Mock Fail');
      if (reviewSummary.length > 0) res.json(reviewSummary);
      else res.status(404).send('Review Summary Not Found.');
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  });

router.route('/:product_id')
  .get(queryReviewRating, async (req, res) => {
    if (req.query.limit !== undefined) {
      if (Number.isNaN(Number(req.query.limit)) || req.query.limit === '' || Number(req.query.limit) < 0) {
        res.status(400).send('Bad Request.');
        return;
      }
    } else req.query.limit = 0;
    try {
      const reviews = await getReviews(req.options, Number(req.query.limit));
      if (req.options.product_id === 9999) throw new Error('Mock Fail');
      if (reviews.length > 0) res.json(reviews);
      else res.status(404).send('Reviews Not Found.');
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  });

module.exports = router;
