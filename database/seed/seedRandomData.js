const mongoose = require('mongoose');
const ReviewModel = require('../models/reviews.js');
const ReviewSummaryModel = require('../models/reviewsummary.js');
const CounterModel = require('../models/counter.js');
const text = require('./reviewTextData.js');

const isProd = process.env.NODE_ENV === 'production';
const mongoUri = (isProd)
  ? 'mongodb://mongo:27017/reviews-service'
  : 'mongodb://localhost/reviews-service';

mongoose.connect(mongoUri, {
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

const heading = [
  'I hate this product', 'I love this product', 'idk', 'It\'s okay', 'Meh',
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
    const randHeading = heading[rng(0, 5)];
    const randText = text[rng(0, 5)];

    const starKey = {};
    starKey.$inc = {};
    starKey.$inc[`rating_${randRating}`] = 1;
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
      review_heading: randHeading,
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

  if (!isProd) process.exit(0);
};

seed();
