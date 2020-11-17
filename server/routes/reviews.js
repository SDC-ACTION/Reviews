const express = require('express');
const { getReviews } = require('../../database/methods/reviews.js');
const { getReviewSummary } = require('../../database/methods/reviewsummary.js');
const { addReview } = require('../../database/methods/reviews.js');
const { queryReviewRating } = require('../middleware/queryParams.js');
const { updateReview } = require('../../database/methods/update/reviews.js');
const { deleteReview } = require('../../database/methods/delete/reviews.js');
const { checkRequestBody } = require('../middleware/checkRequestBody.js');
const { checkForReviewId } = require('../middleware/checkForReviewId.js');

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
      if (reviews.length > 0) res.json(reviews);
      else res.status(404).send('Reviews Not Found.');
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  });

  router.route('/:review_id/update')
    .patch(async (req, res) => {
      try {
        let options = {review_id: req.options.review_id};
        console.log(req.body);
        await updateReview(options, req.body);
        res.sendStatus(200);
      } catch {
        res.status(500).send('Internal Server Error.');
      }
    });

  router.route('/:review_id/create')
    .post(async (req, res) => {
      try {
        let newReviewId = req.options;
        let newReview = Object.assign({
          product_id: req.body.product_id, 
          username: req.body.username, 
          review_heading: req.body.review_heading, 
          review_text: req.body.review_text,
          review_rating: req.body.review_rating}, newReviewId);

        checkRequestBody(req.body);
        checkForReviewId(newReviewId.review_id)
        .then((result) => {
          if (!result) {
            addReview(newReview);
            res.sendStatus(200);
          } else {
            res.status(500).send('Internal Server Error.');
          }
        })
        .catch((err) => {
          res.status(500).send('Internal Server Error.');
        });
      } catch {
        console.log('there')
        res.status(500).send('Internal Server Error.');
      }
    });

  router.route('/:review_id/delete')
    .delete(async (req, res) => {
      try {
        deleteReview(req.options.review_id);
        res.sendStatus(200);
      } catch(err) {
        console.error(err)
        res.status(500).send('Internal Server Error.');
      }
    });

module.exports = router;
