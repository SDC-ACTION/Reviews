const express = require('express');
const { getReviews } = require('../../database/postgres/methods/reviews.js');
const { getReviewSummary } = require('../../database/postgres/methods/reviewsummary.js');
const { addReview } = require('../../database/postgres/methods/reviews.js');
const { queryReviewRating } = require('../middleware/queryParams.js');
const { updateReview } = require('../../database/postgres/methods/update/reviews.js');
const { deleteReview } = require('../../database/postgres/methods/delete/reviews.js');
const { checkRequestBody } = require('../middleware/checkRequestBody.js');
const { generateSummary } = require('../middleware/generateSummary.js');

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
    } catch (err){
      console.error(err);
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
      const summary = generateSummary(reviews.rows);
      const productReview = { reviews: reviews.rows, summary: summary};
      if (reviews.rows.length > 0) res.json(productReview);
      else {
        const noReviews = [
          {
            product_id: req.options.product_id,
            username: '',
            review_heading: '',
            review_text: '',
            review_rating: 0,
            created_at: '2021-12-31T23:59:59.000Z'
          }
        ];
        const noSummary = {
          rating_1: 0,
          rating_2: 0,
          rating_3: 0,
          rating_4: 0,
          rating_5: 0,
          total_reviews: 1
        };
        const noReview = {reviews: noReviews, summary: noSummary};
        res.send(noReview)
      };
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error.');
    }
  });

router.route('/update')
  .patch(async (req, res) => {
    try {
      let update = await updateReview(req.body);
      res.status(204).json(update);
    } catch (err){
      console.error(err);
      res.status(500).send('Internal Server Error.');
    }
  });

router.route('/add-review')
  .post(async (req, res) => {
    try {
      checkRequestBody(req.body);
      let newReview = await addReview(req.body);
      res.status(201).json(newReview);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error.');
    }
  });

router.route('/delete')
  .delete(async (req, res) => {
    try {
      let deleted = await deleteReview(req.body.review_id);
      res.status(204).json(deleted);
    } catch(err) {
      console.error(err);
      res.status(500).send('Internal Server Error.');
    }
  });

module.exports = router;
