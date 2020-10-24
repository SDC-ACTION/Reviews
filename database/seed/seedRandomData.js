const mongoose = require('mongoose');
const ReviewModel = require('../models/reviews.js');
const ReviewSummaryModel = require('../models/reviewsummary.js');
const CounterModel = require('../models/counter.js');

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

const text = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu non odio euismod lacinia at quis. Vel facilisis volutpat est velit egestas dui id ornare arcu. Est lorem ipsum dolor sit amet consectetur adipiscing. Quam lacus suspendisse faucibus interdum posuere. Sem viverra aliquet eget sit amet tellus cras adipiscing enim. Habitasse platea dictumst vestibulum rhoncus. Lacinia quis vel eros donec ac odio tempor orci dapibus. Dignissim enim sit amet venenatis urna cursus eget. Vehicula ipsum a arcu cursus vitae.

  Sed augue lacus viverra vitae congue eu consequat. Commodo ullamcorper a lacus vestibulum sed arcu. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Sed libero enim sed faucibus turpis in eu mi. Ultricies integer quis auctor elit sed vulputate mi sit amet. Elementum sagittis vitae et leo. Et odio pellentesque diam volutpat commodo. Consequat mauris nunc congue nisi vitae suscipit tellus mauris. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Sed sed risus pretium quam vulputate dignissim suspendisse in est. Aliquet enim tortor at auctor urna nunc. Ullamcorper velit sed ullamcorper morbi tincidunt ornare. Non blandit massa enim nec dui nunc. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Sit amet aliquam id diam. Rhoncus mattis rhoncus urna neque viverra. Morbi leo urna molestie at elementum eu facilisis sed.

  Adipiscing bibendum est ultricies integer quis auctor elit sed. Viverra vitae congue eu consequat. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Tortor consequat id porta nibh venenatis. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent. Mollis aliquam ut porttitor leo. Mollis aliquam ut porttitor leo a diam sollicitudin tempor. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Amet risus nullam eget felis eget nunc lobortis. Eget duis at tellus at urna condimentum.`,

  'Short',
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
    const randText = text[rng(0, 2)];

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
