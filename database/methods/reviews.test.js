/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const ReviewModel = require('../models/reviews.js');
const CounterModel = require('../models/counter.js');
const reviewsMethods = require('./reviews.js');

describe('Methods for reviews collection', () => {
  beforeAll(async () => {
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    // eslint-disable-next-line no-underscore-dangle
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

  describe('addReview method tests', () => {
    afterEach(async () => {
      await ReviewModel.deleteMany({});
      await CounterModel.deleteMany({});
    });

    it('method should insert a valid doc into the reviews collection', async () => {
      const count0 = await ReviewModel.countDocuments({});
      await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });
      const count1 = await ReviewModel.countDocuments({});
      await reviewsMethods.addReview({ review_rating: 5, username: 'Test2', product_id: 2 });
      const count2 = await ReviewModel.countDocuments({});

      const review1 = await ReviewModel.find({ username: 'Test1' });
      const review2 = await ReviewModel.find({ username: 'Test3' });

      expect(review1.length).toBe(1);
      expect(review1[0].username).toBe('Test1');
      expect(review1[0].product_id).toBe(1);
      expect(review1[0].review_rating).toBe(4);
      expect(review2.length).toBe(0);
      expect(count0).toBe(0);
      expect(count1).toBe(1);
      expect(count2).toBe(2);
    });

    it('method should create counter document if it does not exists when adding a review', async () => {
      const count0 = await CounterModel.find({});
      await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });
      const count1 = await CounterModel.find({});

      expect(count0.length).toBe(0);
      expect(count1.length).toBe(1);
    });

    it('review_id should increment for each new document added to the review collection', async () => {
      for (let i = 1; i <= 10; i += 1) {
        const doc = await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });
        expect(doc.review_id).toBe(i);
      }
    });

    it('method should increment seq field in counters collection for each new document added to the review collection', async () => {
      for (let i = 1; i <= 10; i += 1) {
        await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });
        const count1 = await CounterModel.find({ model_name: 'review' });
        expect(count1[0].seq).toBe(i);
      }
    });

    it('method should not increment seq field in counters collection when adding a reivew fails', async () => {
      await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });

      for (let i = 1; i <= 10; i += 1) {
        await expect(reviewsMethods.addReview({ review_rating: 123, product_id: 123 }))
          .rejects.toEqual(expect.any(Error));
        const count = await CounterModel.find({ model_name: 'review' });
        expect(count[0].seq).toBe(1);
      }
    });
  });
});
