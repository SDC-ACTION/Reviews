const express = require('express');
const reviewSummaryTable = require('../../../database/methods/reviewsummary.js');

const router = express.Router();

router.param('product_id', (req, res, next, product_id) => {
  if (Number.isNaN(Number(product_id))) {
    res.status(400).send('Bad Request.');
    return;
  }
  req.product_id = Number(product_id);
  next();
});

router.route('/:product_id')
  .get(async (req, res) => {
    try {
      const reviewSummary = await reviewSummaryTable.getReviewSummary(req.product_id);
      if (req.product_id === 9999) throw new Error('Mock Fail');
      if (reviewSummary.length > 0) res.json(reviewSummary);
      else res.status(404).send('Review Summary Not Found.');
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  });

module.exports = router;
