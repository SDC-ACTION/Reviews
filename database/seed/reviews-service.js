/* eslint-disable camelcase */
const mongoose = require('mongoose');
const ReviewModel = require('../models/reviews');
// const ReviewSummary = require('../models/reviewsummary');
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

const count = [];

for (let i = 1; i <= 100; i += 1) {
  count.push(i);
}

const seed = async () => {
  await ReviewModel.deleteMany({});
  // await ReviewSummary.deleteMany({});
  await CounterModel.deleteMany({});

  await CounterModel.create({ model_name: 'review', seq: 100 });

  const promises = count.map((i) => {
    const randMonth = rng(1, 13);
    const randDay = rng(1, 29);
    const randHr = rng(1, 25);
    const randMin = rng(1, 61);
    const randSec = rng(1, 61);

    const randRating = rng(1, 6);
    const randProduct = rng(1, 101);
    const randUser = usernames[rng(0, 15)];
    const randText = text[rng(0, 15)];

    return ReviewModel.create({
      review_id: i,
      product_id: randProduct,
      username: randUser,
      review_text: randText,
      review_rating: randRating,
      created_at: new Date(2020, randMonth, randDay, randHr, randMin, randSec).toISOString(),
    });
  });

  await Promise.all(promises)
    .then(() => console.log('Seeding Database Successfull'))
    .catch((err) => console.error('Error Seeding Database: ', err.message));

  process.exit(1);
};

seed();
