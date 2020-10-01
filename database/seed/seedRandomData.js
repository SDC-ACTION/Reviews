/* eslint-disable camelcase */
const mongoose = require('mongoose');
const ReviewModel = require('../models/reviews.js');
const ReviewSummaryModel = require('../models/reviewsummary.js');
const CounterModel = require('../models/counter.js');

mongoose.connect('mongodb://localhost/reviews-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const rng = (min, max) => Math.floor(Math.random() * (max - min) + min);

const usernames = [
  'FasterThanFast1', 'BillyBob4', 'NoProblem321', 'Ace', 'WhatThe5',
  'GodlyOfGods', 'abc123', 'Shortcake7', 'IHateEverything', '45Minutes',
  '52Cards', 'HelloKitty5', 'Driller40', 'Muppets', 'Slinky',
];

const text = [
  'test1', 'test2', 'test3', 'test4', 'test5',
  'test6', 'test7', 'test8', 'test9', 'test10',
  'test11', 'test12', 'test13', 'test14', 'test15',
];

const reviewDocCount = [];
const reviewSummaryDocCount = [];
const maxReviewCount = 300;

for (let i = 1; i <= maxReviewCount; i += 1) {
  reviewDocCount.push(i);
}

for (let i = 1; i <= 100; i += 1) {
  reviewSummaryDocCount.push(i);
}

const seed = async () => {
  await ReviewModel.deleteMany({});
  await ReviewSummaryModel.deleteMany({});
  await CounterModel.deleteMany({});

  const initReviewSummaries = reviewSummaryDocCount.map(
    (i) => ReviewSummaryModel.create({ product_id: i }),
  );

  await Promise.all(initReviewSummaries)
    .then(() => console.log('Successfully initialized ReviewSummaries'))
    .catch((err) => console.error('Error initializing ReviewSummaries: ', err.message));

  await CounterModel.create({ model_name: 'review', seq: maxReviewCount })
    .then(() => console.log('Successfully Seeded Counters'))
    .catch((err) => console.error('Error Seeding Counters: ', err.message));

  const summaryPromises = [];

  const reviewPromises = reviewDocCount.map((i) => {
    const randMonth = rng(1, 13);
    const randDay = rng(1, 29);
    const randHr = rng(1, 25);
    const randMin = rng(1, 61);
    const randSec = rng(1, 61);

    const randRating = rng(1, 6);
    const randProduct = rng(1, 101);
    const randUser = usernames[rng(0, 15)];
    const randText = text[rng(0, 15)];

    const starKey = {};
    starKey.$inc = {};
    starKey.$inc[`stars_${randRating}`] = 1;
    starKey.$inc.total_reviews = 1;

    summaryPromises.push(ReviewSummaryModel.findOneAndUpdate(
      { product_id: randProduct },
      starKey,
      { upsert: true, setDefaultsOnInsert: true },
    ));

    return ReviewModel.create({
      review_id: i,
      product_id: randProduct,
      username: randUser,
      review_text: randText,
      review_rating: randRating,
      created_at: new Date(2020, randMonth, randDay, randHr, randMin, randSec).toISOString(),
    });
  });

  await Promise.all(summaryPromises)
    .then(() => console.log('Successfully Seeded ReviewSummaries'))
    .catch((err) => console.error('Error Seeding ReviewSummaries: ', err.message));

  await Promise.all(reviewPromises)
    .then(() => console.log('Successfully Seeded Reviews'))
    .catch((err) => console.error('Error Seeding Reviews: ', err.message));

  process.exit(0);
};

seed();
