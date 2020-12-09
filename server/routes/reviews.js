const express = require('express');
const { getReviews } = require('../../database/postgres/methods/reviews.js');
const { getReviewSummary } = require('../../database/postgres/methods/reviewsummary.js');
const { addReview } = require('../../database/postgres/methods/reviews.js');
const { queryReviewRating } = require('../middleware/queryParams.js');
const { updateReview } = require('../../database/postgres/methods/update/reviews.js');
const { deleteReview } = require('../../database/postgres/methods/delete/reviews.js');
const { checkRequestBody } = require('../middleware/checkRequestBody.js');

const router = express.Router();

router.param('product_id', (req, res, next, product_id) => {
  if (Number.isNaN(Number(product_id))) {
    res.status(400).send('Bad Request.');
    return;
  }
  req.options = { product_id: Number(product_id) };
  next();
});

router.param('review_id', (req, res, next, review_id) => {
  if (Number.isNaN(Number(review_id))) {
    res.status(400).send('Bad Request.');
    return;
  }
  req.options = { review_id: Number(review_id) };
  next();
});

router.route('/:product_id/summary')
  .get(async (req, res) => {
    try {
      const reviewSummary = await getReviewSummary(req.options.product_id);
      if (reviewSummary.rows.length > 0) res.json(reviewSummary.rows);
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
      const reviews = await getReviews(req.options.product_id, Number(req.query.limit));
      if (reviews.rows.length > 0) res.json(reviews.rows);
      else res.status(404).send('Reviews Not Found.');
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  });

router.route('/update')
  .patch(async (req, res) => {
    try {
      await updateReview(req.body);
      res.sendStatus(200);
    } catch (err){
      console.log(err);
      res.status(500).send('Internal Server Error.');
    }
  });

router.route('/add-review')
  .post((req, res) => {
    try {
      checkRequestBody(req.body);
      addReview(req.body);
      res.sendStatus(200);
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal Server Error.');
    }
  });

router.route('/delete')
  .delete(async (req, res) => {
    try {
      await deleteReview(req.body.review_id)
      res.sendStatus(200); 
    } catch(err) {
      console.error(err)
      res.status(500).send('Internal Server Error.');
    }
  });

module.exports = router;
