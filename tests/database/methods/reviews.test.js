/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const ReviewModel = require('../../../database/models/reviews.js');
const CounterModel = require('../../../database/models/counter.js');
const reviewsMethods = require('../../../database/methods/reviews.js');

describe('Reviews Collection', () => {
  beforeAll(async () => {
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    await mongoose.connect(global.__MONGO_URI__, options, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await ReviewModel.deleteMany({});
    await CounterModel.deleteMany({});
  });

  describe('addReview method', () => {
    it('should insert a valid doc into the reviews collection', async () => {
      await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });
      await reviewsMethods.addReview({ review_rating: 5, username: 'Test2', product_id: 2 });

      const count = await ReviewModel.countDocuments({});
      const review = await ReviewModel.find({ username: 'Test1' });

      expect(review[0].username).toBe('Test1');
      expect(review[0].product_id).toBe(1);
      expect(review[0].review_rating).toBe(4);
      expect(count).toBe(2);
    });

    it('should create counter document if it does not exists when adding a review', async () => {
      await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });
      const count1 = await CounterModel.find({});
      expect(count1.length).toBe(1);
    });

    it('review_id should increment for each new document added to the review collection', async () => {
      for (let i = 1; i <= 10; i += 1) {
        const doc = await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });
        expect(doc.review_id).toBe(i);
      }
    });

    it('should increment seq field in counters collection for each new document added to the review collection', async () => {
      for (let i = 1; i <= 10; i += 1) {
        await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });
        const count1 = await CounterModel.find({ model_name: 'review' });
        expect(count1[0].seq).toBe(i);
      }
    });

    it('should not be able to add a review with invalid input', async () => {
      // review_rating is a string
      await expect(reviewsMethods.addReview({ review_rating: 'a', username: 'Test1', product_id: 1 }))
        .rejects.toEqual(expect.any(Error));
      // product_id is a string
      await expect(reviewsMethods.addReview({ review_rating: 1, username: 'Test1', product_id: 'a' }))
        .rejects.toEqual(expect.any(Error));
      const count = await ReviewModel.countDocuments({});
      expect(count).toBe(0);
    });

    it('should not be able to add a review with missing required field', async () => {
      // review_rating is missing
      await expect(reviewsMethods.addReview({ username: 'Test1', product_id: 1 }))
        .rejects.toEqual(expect.any(Error));
      // product_id is missing
      await expect(reviewsMethods.addReview({ review_rating: 1, username: 'Test1' }))
        .rejects.toEqual(expect.any(Error));
      // username is missing
      await expect(reviewsMethods.addReview({ review_rating: 1, product_id: 1 }))
        .rejects.toEqual(expect.any(Error));
      const count = await ReviewModel.countDocuments({});
      expect(count).toBe(0);
    });
  });

  describe('getReviews method', () => {
    it('should get all reviews at a the provided options', async () => {
      await ReviewModel.create({
        review_id: 1, review_rating: 4, username: 'Test1', product_id: 1,
      });
      await ReviewModel.create({
        review_id: 2, review_rating: 3, username: 'Test1', product_id: 1,
      });
      const reviews = await reviewsMethods.getReviews({ product_id: 1 }, 0);
      expect(reviews.length).toBe(2);

      const reviewsWithRating = await reviewsMethods.getReviews({
        product_id: 1, review_rating: 3,
      }, 0);
      expect(reviewsWithRating.length).toBe(1);
    });

    it('should return all records when limit is not defined', async () => {
      await ReviewModel.create({
        review_id: 1, review_rating: 4, username: 'Test1', product_id: 1,
      });
      await ReviewModel.create({
        review_id: 2, review_rating: 3, username: 'Test1', product_id: 1,
      });
      const reviews = await reviewsMethods.getReviews({ product_id: 1 });
      expect(reviews.length).toBe(2);
    });

    it('should limit the amount of records returned when defined', async () => {
      await ReviewModel.create({
        review_id: 1, review_rating: 4, username: 'Test1', product_id: 1,
      });
      await ReviewModel.create({
        review_id: 2, review_rating: 3, username: 'Test1', product_id: 1,
      });
      const reviews = await reviewsMethods.getReviews({ product_id: 1 }, 1);
      expect(reviews.length).toBe(1);
    });

    it('should return an error when limit is not a number', async () => {
      await ReviewModel.create({
        review_id: 1, review_rating: 4, username: 'Test1', product_id: 1,
      });
      await expect(reviewsMethods.getReviews({ product_id: 1 }, 'a'))
        .rejects.toEqual(expect.any(Error));
    });

    it('should return an empty array if nothing is found', async () => {
      await ReviewModel.create({
        review_id: 1, review_rating: 4, username: 'Test1', product_id: 1,
      });
      await ReviewModel.create({
        review_id: 2, review_rating: 3, username: 'Test1', product_id: 1,
      });
      const reviews = await reviewsMethods.getReviews({ product_id: 2 });
      expect(reviews.length).toBe(0);
    });
  });
});
