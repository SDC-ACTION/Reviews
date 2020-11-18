const express = require('express');
const { getReviews } = require('../../database/methods/reviews.js');
const { getReviewSummary } = require('../../database/methods/reviewsummary.js');
const { addReview } = require('../../database/methods/reviews.js');
const { queryReviewRating } = require('../middleware/queryParams.js');
const { updateReview } = require('../../database/methods/update/reviews.js');
const { deleteReview } = require('../../database/methods/delete/reviews.js');
const { checkRequestBody } = require('../middleware/checkRequestBody.js');
const { getLastReviewId } = require('../../database/methods/reviews.js');

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

router.route('/update')
  .patch(async (req, res) => {
    try {
      let options = {review_id: req.body.review_id};
      await updateReview(options, req.body);
      res.sendStatus(200);
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  });

router.route('/add-review')
  .post(async (req, res) => {
    try {
      checkRequestBody(req.body);
      addReview(req.body);
      res.sendStatus(200);
    } catch {
      console.log('there')
      res.status(500).send('Internal Server Error.');
    }
  });

router.route('/delete')
  .delete(async (req, res) => {
    try {
      getLastReviewId()
      .then(async (response) => {
        deleteReview(req.body.review_id)
        .then(async () => {
          await updateReview({review_id: response[0].review_id}, {review_id: req.body.review_id})
          res.sendStatus(200);
        })
        .catch((err) => {
          throw err;
        });
      })
      .catch((err) => {
        throw err;
      });
    } catch(err) {
      console.error(err)
      res.status(500).send('Internal Server Error.');
    }
  });

module.exports = router;
